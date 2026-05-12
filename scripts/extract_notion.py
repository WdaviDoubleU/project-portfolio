"""
Fetch a public Notion page tree via loadPageChunk, emit src/data/notionExtracted.json,
and download images to public/notion/.
"""
from __future__ import annotations

import json
import os
import re
import urllib.parse
import urllib.request

ROOT_PAGE_ID = "2da6af44-1cd6-812a-a42a-d4758125598d"
OUT_JSON = os.path.join("src", "data", "notionExtracted.json")
IMG_DIR = os.path.join("public", "notion")

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36"


def post_json(url: str, payload: dict) -> dict:
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        headers={"Content-Type": "application/json; charset=utf-8", "User-Agent": UA},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=120) as resp:
        return json.loads(resp.read().decode("utf-8"))


def inner_value(block: dict) -> dict:
    v = block.get("value") or {}
    return v.get("value", v)


def rich_to_plain(rich) -> str:
    if not rich:
        return ""
    parts: list[str] = []

    def walk(node):
        if isinstance(node, str):
            parts.append(node)
        elif isinstance(node, list):
            if not node:
                return
            if isinstance(node[0], str):
                parts.append(node[0])
            else:
                for x in node:
                    walk(x)

    walk(rich)
    return "".join(parts).strip()


def load_page_blocks(page_id: str) -> dict[str, dict]:
    merged: dict[str, dict] = {}
    cursor: dict = {"stack": []}
    while True:
        payload = {
            "pageId": page_id,
            "chunkNumber": 0,
            "cursor": cursor,
            "limit": 100,
            "verticalColumns": False,
        }
        data = post_json("https://www.notion.so/api/v3/loadPageChunk", payload)
        for bid, b in data.get("recordMap", {}).get("block", {}).items():
            merged[bid] = b
        cursor = data.get("cursor") or {}
        if not cursor.get("stack"):
            break
    return merged


def load_all_blocks_bfs(root_id: str) -> dict[str, dict]:
    all_blocks: dict[str, dict] = {}
    queue = [root_id]
    loaded_pages: set[str] = set()
    while queue:
        pid = queue.pop(0)
        if pid in loaded_pages:
            continue
        loaded_pages.add(pid)
        new = load_page_blocks(pid)
        for bid, b in new.items():
            all_blocks[bid] = b
        for bid, b in new.items():
            iv = inner_value(b)
            if iv.get("type") == "page" and bid not in loaded_pages:
                queue.append(bid)
    return all_blocks


def image_proxy_url(block_id: str, attachment: str) -> str:
    enc = urllib.parse.quote(attachment, safe="")
    return f"https://www.notion.so/image/{enc}?table=block&id={block_id}&cache=v2"


def download_image(url: str, dest_path: str) -> bool:
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            data = r.read()
        with open(dest_path, "wb") as f:
            f.write(data)
        return True
    except Exception:
        return False


def find_ordered_project_pages(all_blocks: dict, root_id: str) -> list[tuple[str, str]]:
    root_iv = inner_value(all_blocks[root_id])
    for bid in root_iv.get("content", []):
        if bid not in all_blocks:
            continue
        iv = inner_value(all_blocks[bid])
        if iv.get("type") != "callout":
            continue
        cids = iv.get("content") or []
        if not cids:
            continue
        first = inner_value(all_blocks.get(cids[0], {}))
        if first.get("type") != "sub_header":
            continue
        if rich_to_plain(first.get("properties", {}).get("title")) != "Projects":
            continue
        out: list[tuple[str, str]] = []
        for cid in cids[1:]:
            if cid not in all_blocks:
                continue
            cv = inner_value(all_blocks[cid])
            if cv.get("type") == "page":
                out.append(
                    (cid, rich_to_plain(cv.get("properties", {}).get("title")))
                )
        if out:
            return out
    return []


def serialize_blocks(
    all_blocks: dict[str, dict],
    content_ids: list[str],
    page_slug: str,
    image_manifest: dict[str, str],
) -> list[dict]:
    out: list[dict] = []

    def emit(node: dict):
        out.append(node)

    def visit(bid: str):
        if bid not in all_blocks:
            emit({"type": "missing_block", "id": bid})
            return
        b = all_blocks[bid]
        iv = inner_value(b)
        if not iv.get("alive", True):
            return
        btype = iv.get("type")
        props = iv.get("properties") or {}
        fmt = iv.get("format") or {}

        if btype in ("header", "sub_header", "sub_sub_header"):
            emit({"type": btype, "text": rich_to_plain(props.get("title"))})
        elif btype == "text":
            t = rich_to_plain(props.get("title"))
            if t:
                emit({"type": "paragraph", "text": t})
        elif btype == "bulleted_list":
            emit({"type": "bullet", "text": rich_to_plain(props.get("title"))})
        elif btype == "numbered_list":
            emit({"type": "numbered", "text": rich_to_plain(props.get("title"))})
        elif btype == "to_do":
            checked = (props.get("checked") or [["no"]])[0][0] == "yes"
            emit(
                {
                    "type": "todo",
                    "text": rich_to_plain(props.get("title")),
                    "checked": checked,
                }
            )
        elif btype == "quote":
            emit({"type": "quote", "text": rich_to_plain(props.get("title"))})
        elif btype == "divider":
            emit({"type": "divider"})
        elif btype == "callout":
            icon = fmt.get("page_icon")
            emit({"type": "callout_start", "icon": icon})
            for cid in iv.get("content") or []:
                visit(cid)
            emit({"type": "callout_end"})
        elif btype == "column_list":
            for cid in iv.get("content") or []:
                visit(cid)
        elif btype == "column":
            emit({"type": "column_start"})
            for cid in iv.get("content") or []:
                visit(cid)
            emit({"type": "column_end"})
        elif btype == "image":
            src = fmt.get("display_source")
            if not src and props.get("source"):
                src = props["source"][0][0]
            alt = rich_to_plain(props.get("title")) or "Image"
            if isinstance(src, str) and src.startswith("attachment:"):
                url = image_proxy_url(bid, src)
                ext = os.path.splitext(src.split(":")[-1])[1] or ".png"
                fname = f"{page_slug}_{bid[:8]}{ext}"
                rel = f"/notion/{fname}"
                dest = os.path.join(IMG_DIR, fname)
                if bid not in image_manifest:
                    ok = download_image(url, dest)
                    image_manifest[bid] = rel if ok else url
                emit({"type": "image", "src": image_manifest[bid], "alt": alt})
            elif isinstance(src, str) and src.startswith("http"):
                emit({"type": "image", "src": src, "alt": alt})
            else:
                emit({"type": "image_placeholder", "alt": alt})
        elif btype == "page":
            emit(
                {
                    "type": "child_page_ref",
                    "id": bid,
                    "title": rich_to_plain(props.get("title")),
                }
            )
        elif btype in ("video", "audio", "file", "pdf", "bookmark", "link_preview"):
            t = rich_to_plain(props.get("title"))
            emit({"type": "embed", "embedType": btype, "text": t or btype})
        elif btype == "toggle":
            t = rich_to_plain(props.get("title"))
            if t:
                emit({"type": "paragraph", "text": t})
            for cid in iv.get("content") or []:
                visit(cid)
        elif btype == "code":
            title = props.get("title")
            lines = rich_to_plain(title) if title else ""
            lang = (fmt.get("code_language") or "plain") if fmt else "plain"
            emit({"type": "code", "language": lang, "code": lines})
        elif btype in ("table", "table_row", "equation", "synced_block"):
            for cid in iv.get("content") or []:
                visit(cid)
            t = rich_to_plain(props.get("title"))
            if t:
                emit({"type": "paragraph", "text": t})
        else:
            children = iv.get("content") or []
            if children:
                for cid in children:
                    visit(cid)
                return
            t = rich_to_plain(props.get("title"))
            if t:
                emit({"type": "paragraph", "text": f"[{btype}] {t}"})

    for cid in content_ids:
        visit(cid)
    return out


def extract_page(all_blocks: dict, page_id: str, slug: str, image_manifest: dict[str, str]) -> dict:
    iv = inner_value(all_blocks[page_id])
    return {
        "notionId": page_id,
        "title": rich_to_plain(iv.get("properties", {}).get("title")),
        "icon": (iv.get("format") or {}).get("page_icon"),
        "blocks": serialize_blocks(
            all_blocks, iv.get("content") or [], slug, image_manifest
        ),
    }


def main():
    repo_root = os.path.join(os.path.dirname(__file__), "..")
    os.chdir(repo_root)

    all_blocks = load_all_blocks_bfs(ROOT_PAGE_ID)
    image_manifest: dict[str, str] = {}

    home = extract_page(all_blocks, ROOT_PAGE_ID, "home", image_manifest)
    ordered = find_ordered_project_pages(all_blocks, ROOT_PAGE_ID)

    path_slugs = [
        "ostomy-appliance",
        "hip-implant",
        "pill-bottle-opener",
        "dp4",
    ]
    keys = ["dp1", "dp2", "dp3", "dp4"]

    projects_out = []
    for i, (pid, notion_title) in enumerate(ordered):
        slug = keys[i] if i < len(keys) else f"p{i}"
        path = path_slugs[i] if i < len(path_slugs) else re.sub(
            r"[^a-z0-9-]+", "-", notion_title.lower()
        ).strip("-")[:48]
        projects_out.append(
            {
                "notionPageId": pid,
                "notionTitle": notion_title,
                "key": slug,
                "path": f"/projects/{path}",
                "page": extract_page(all_blocks, pid, slug, image_manifest),
            }
        )

    payload = {
        "source": "https://www.notion.so/Hello-2da6af441cd6812aa42ad4758125598d",
        "rootPageId": ROOT_PAGE_ID,
        "home": home,
        "projects": projects_out,
    }

    os.makedirs(os.path.dirname(OUT_JSON), exist_ok=True)
    with open(OUT_JSON, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)

    print("Wrote", OUT_JSON, "total blocks", len(all_blocks))


if __name__ == "__main__":
    main()
