import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { portfolioData, Section, CalloutCard, CalloutColor } from '../data/content';
import '../styles/index.css';

import AnimatedBlock from '../components/AnimatedBlock';

const getCardStyle = (color?: CalloutColor) => {
    switch (color) {
        case 'green':
            return { border: '#4ade80', text: '#e6f2eb' };
        case 'brown':
            return { border: '#fb923c', text: '#f5ebe3' };
        case 'blue':
            return { border: '#60a5fa', text: '#e3ebf5' };
        case 'purple':
            return { border: '#c084fc', text: '#f2e6f3' };
        case 'red':
            return { border: '#f87171', text: '#f5e3e3' };
        default:
            return { border: 'rgba(255,255,255,0.2)', text: 'var(--text-color)' };
    }
};

const getWidthPercent = (width: 'full' | 'half' | 'third' | 'two-thirds', isMobile: boolean) => {
    if (isMobile) return '100%';
    switch (width) {
        case 'full': return '100%';
        case 'half': return 'calc(50% - 0.5rem)';
        case 'third': return 'calc(33.333% - 0.66rem)';
        case 'two-thirds': return 'calc(66.666% - 0.33rem)';
        default: return '100%';
    }
};

const CardComponent: React.FC<{ card: CalloutCard, isMobile: boolean }> = ({ card, isMobile }) => {
    if (card.type === 'image' && card.image) {
        const fit = card.image.fit ?? 'cover';
        const isContain = fit === 'contain';
        return (
            <div style={{
                width: getWidthPercent(card.width, isMobile),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: isContain
                    ? 'linear-gradient(165deg, rgba(255,255,255,0.07) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.5) 100%)'
                    : 'rgba(0,0,0,0.22)',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.08)',
                overflow: 'hidden',
                boxShadow: '0 8px 40px rgba(0,0,0,0.35)',
                padding: isContain ? 'clamp(1rem, 4vw, 2.25rem)' : 0,
                boxSizing: 'border-box'
            }}>
                <img
                    src={card.image.src}
                    alt={card.image.alt}
                    style={{
                        width: '100%',
                        height: 'auto',
                        maxHeight: isContain ? 'min(58vh, 620px)' : undefined,
                        display: 'block',
                        objectFit: fit
                    }}
                />
            </div>
        );
    }

    const theme = getCardStyle(card.color);

    const imgFit = card.image?.fit ?? 'cover';

    return (
        <div style={{
            width: getWidthPercent(card.width, isMobile),
            background: 'transparent',
            border: `1px solid ${theme.border}`,
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 6px 28px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxSizing: 'border-box'
        }}>
            {/* Card Header */}
            {(card.title || card.icon) && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: card.content || card.listItems ? '0.5rem' : '0' }}>
                    {card.icon && <span style={{ fontSize: '1.2rem' }}>{card.icon}</span>}
                    {card.title && <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: '#fff', letterSpacing: '0.05em' }}>{card.title}</h3>}
                </div>
            )}

            {/* Card Body and optional right-aligned image */}
            <div style={{ display: 'flex', flexDirection: isMobile || card.image?.position === 'bottom' ? 'column' : 'row', gap: '1.5rem' }}>
                <div style={{ flex: 1 }}>
                    {card.content && card.content.map((p, i) => (
                        <p key={i} style={{ marginBottom: '1rem', color: theme.text, lineHeight: '1.6', fontSize: '0.95rem' }} dangerouslySetInnerHTML={{ __html: p }}></p>
                    ))}

                    {card.listItems && (
                        <ul style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            display: card.twoColumnList && !isMobile ? 'grid' : 'block',
                            gridTemplateColumns: card.twoColumnList && !isMobile ? '1fr 1fr' : '1fr',
                            gap: card.twoColumnList ? '0.5rem 1rem' : '0'
                        }}>
                            {card.listItems.map((item, i) => (
                                <li key={i} style={{
                                    marginBottom: '0.75rem',
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '0.5rem',
                                    color: theme.text,
                                    fontSize: '0.9rem',
                                    lineHeight: '1.5'
                                }}>
                                    <span style={{ color: card.color === 'green' ? '#4ade80' : 'rgba(255,255,255,0.5)', marginTop: '2px', flexShrink: 0 }}>
                                        {card.color === 'green' ? '✅' : '•'}
                                    </span>
                                    <div className="callout-list" dangerouslySetInnerHTML={{ __html: item }} />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {card.image && card.image.position === 'right' && (
                    <div style={{
                        width: isMobile ? '100%' : '38%',
                        flexShrink: 0,
                        borderRadius: '10px',
                        overflow: 'hidden',
                        border: `1px solid ${theme.border}`,
                        background: imgFit === 'contain' ? 'rgba(0,0,0,0.25)' : undefined,
                        alignSelf: 'flex-start'
                    }}>
                        <img
                            src={card.image.src}
                            alt={card.image.alt}
                            style={{
                                width: '100%',
                                height: 'auto',
                                display: 'block',
                                objectFit: imgFit,
                                verticalAlign: 'middle'
                            }}
                        />
                    </div>
                )}
            </div>

            {card.image && card.image.position === 'bottom' && (
                <div style={{
                    marginTop: '0.5rem',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    border: `1px solid ${theme.border}`,
                    background: imgFit === 'contain' ? 'rgba(0,0,0,0.2)' : undefined
                }}>
                    <img
                        src={card.image.src}
                        alt={card.image.alt}
                        style={{ width: '100%', height: 'auto', display: 'block', objectFit: imgFit }}
                    />
                </div>
            )}
        </div>
    );
};

const SectionView: React.FC<{ section: Section, isMobile: boolean }> = ({ section, isMobile }) => {
    return (
        <div style={{ marginBottom: '4rem' }}>
            <AnimatedBlock delay="delay-1">
                <h2 style={{
                    fontSize: '1.4rem',
                    marginBottom: '1.5rem',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em'
                }}>
                    <span style={{ color: 'var(--accent-color)' }}>◆</span> {section.title}
                </h2>
            </AnimatedBlock>

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.35rem',
                alignItems: 'flex-start'
            }}>
                {section.cards.map((card, i) => (
                    <AnimatedBlock key={i} delay={`delay-${Math.min(i % 3 + 1, 3)}`} style={{ display: 'contents' }}>
                        <CardComponent card={card} isMobile={isMobile} />
                    </AnimatedBlock>
                ))}
            </div>
        </div>
    );
};

const MOBILE_QUERY = '(max-width: 767px)';

const ProjectPage: React.FC = () => {
    const { pathname } = useLocation();
    const project = useMemo(
        () => portfolioData.projects.find((p) => p.path === pathname),
        [pathname]
    );
    const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        const mq = window.matchMedia(MOBILE_QUERY);
        const onChange = () => setIsMobile(mq.matches);
        mq.addEventListener('change', onChange);
        return () => mq.removeEventListener('change', onChange);
    }, []);

    if (!project) {
        return <div className="container" style={{ padding: '4rem' }}>Project not found</div>;
    }

    return (
        <div style={{ paddingBottom: '4rem' }}>
            <div className="container" style={{ paddingTop: '8rem', maxWidth: '1100px' }}>
                {/* Title */}
                <div style={{ marginBottom: 'clamp(2.5rem, 6vw, 4rem)', textAlign: 'center' }}>
                    <AnimatedBlock>
                        <div style={{
                            fontSize: 'clamp(3.5rem, 10vw, 5rem)',
                            marginBottom: '1.25rem',
                            filter: 'drop-shadow(0 0 24px rgba(255,255,255,0.15))',
                            lineHeight: 1
                        }}>
                            {project.icon}
                        </div>
                    </AnimatedBlock>
                    <AnimatedBlock delay="delay-1">
                        <h1 style={{
                            fontSize: 'clamp(1.5rem, 4.2vw, 2.35rem)',
                            margin: 0,
                            fontWeight: 800,
                            color: '#fff',
                            letterSpacing: '0.04em',
                            lineHeight: 1.25,
                            maxWidth: '22ch',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}>
                            {project.title}
                        </h1>
                    </AnimatedBlock>
                </div>

                {/* Sections containing Callout Cards */}
                {project.sections.map((section, i) => (
                    <SectionView key={i} section={section} isMobile={isMobile} />
                ))}
            </div>
        </div>
    );
};

export default ProjectPage;
