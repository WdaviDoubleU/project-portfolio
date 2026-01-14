import React, { useRef, useEffect } from 'react';

interface Point {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    originalX: number;
    originalY: number;
    color: string;
}

const ParticleCloud: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: Point[] = [];
        let animationFrameId: number;
        let width = window.innerWidth;
        let height = window.innerHeight;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            const density = 0.8;
            const numParticles = Math.min(width * density, 800);

            const palettes = [
                'rgba(249, 219, 109, ', // Main Accent (Yellow)
                'rgba(255, 255, 255, ', // White
                'rgba(255, 245, 200, ', // Pale Yellow
                'rgba(255, 200, 100, ', // Warm Orange-ish
                'rgba(220, 220, 220, ', // Light Grey
            ];

            const R = Math.min(width, height) * 0.35;
            const r = R * 0.6;
            const d = R * 0.8;
            const steps = numParticles;

            // Spirograph parameters (Hypotrochoid)
            for (let i = 0; i < numParticles; i++) {
                const t = (i / steps) * Math.PI * 100;

                // Add jitter for loose pattern
                const jitter = (Math.random() - 0.5) * 50;

                let x = (width / 2) + ((R - r) * Math.cos(t) + d * Math.cos(((R - r) / r) * t)) + jitter;
                let y = (height / 2) + ((R - r) * Math.sin(t) - d * Math.sin(((R - r) / r) * t)) + jitter;

                // Wrap bounds
                if (x < 0) x += width;
                if (x > width) x -= width;
                if (y < 0) y += height;
                if (y > height) y -= height;

                const randomBase = palettes[Math.floor(Math.random() * palettes.length)];

                particles.push({
                    x: x,
                    y: y,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2 + 1,
                    originalX: x,
                    originalY: y,
                    color: randomBase
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {
                const dx = mouseRef.current.x - p.x;
                const dy = mouseRef.current.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const minDist = 200;

                if (dist < minDist) {
                    const force = (minDist - dist) / minDist;
                    const angle = Math.atan2(dy, dx);
                    p.vx -= Math.cos(angle) * force * 2; // Stronger push
                    p.vy -= Math.sin(angle) * force * 2;
                }

                const vdx = p.originalX - p.x;
                const vdy = p.originalY - p.y;
                p.vx += vdx * 0.005;
                p.vy += vdy * 0.005;

                p.vx *= 0.92;
                p.vy *= 0.92;

                p.x += p.vx;
                p.y += p.vy;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                const opacity = 0.5 + (1 - dist / 500) * 0.5; // Base opacity 0.5
                ctx.fillStyle = `${p.color}${opacity})`;
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);

        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 0,
                pointerEvents: 'none',
                background: 'radial-gradient(circle at center, #1a1a1a 0%, #0c0c0c 100%)'
            }}
        />
    );
};

export default ParticleCloud;
