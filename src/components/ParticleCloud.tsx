import React, { useRef, useEffect } from 'react';

// Each 'Point' represents a single dot (particle) in our cloud
interface Point {
    x: number;         // Current horizontal position
    y: number;         // Current vertical position
    vx: number;        // Velocity (speed/direction) on the horizontal axis
    vy: number;        // Velocity on the vertical axis
    size: number;      // How big the dot is
    originalX: number; // The "home" position where the dot wants to return to
    originalY: number; // The "home" position where the dot wants to return to
    color: string;     // The base color (e.g., "rgba(255, 255, 255, ")
    interactRadius: number; // Unique interaction radius for this particle
}

interface ParticleCloudProps {
    accentColor: string;
    isDarkMode: boolean;
}

const ParticleCloud: React.FC<ParticleCloudProps> = ({ accentColor, isDarkMode }) => {
    // These 'refs' allow us to access the HTML Canvas and track the mouse
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

        // This runs whenever the window is resized
        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initParticles(); // Re-create the dots to fit the new screen size
        };

        // This creates all the dots and arranges them in a spirograph pattern
        const initParticles = () => {
            particles = [];

            // 1. Decide how many dots we want based on screen size
            const density = 0.9;
            const numParticles = Math.min(width * density, 1100);

            // 2. Define a list of colors based on accent color
            // Helper function to convert hex to RGB
            const hexToRgb = (hex: string) => {
                const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                return result ? {
                    r: parseInt(result[1], 16),
                    g: parseInt(result[2], 16),
                    b: parseInt(result[3], 16)
                } : { r: 249, g: 219, b: 109 }; // fallback to yellow
            };

            const rgb = hexToRgb(accentColor);

            // Particle colors change based on theme
            const palettes = isDarkMode ? [
                `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, `, // Main Accent
                `rgba(${Math.min(255, rgb.r + 30)}, ${Math.min(255, rgb.g + 30)}, ${Math.min(255, rgb.b + 30)}, `, // Lighter tint
                `rgba(${Math.max(0, rgb.r - 30)}, ${Math.max(0, rgb.g - 30)}, ${Math.max(0, rgb.b - 30)}, `, // Darker shade
                'rgba(255, 255, 255, ', // Pure White (dark mode)
                'rgba(220, 220, 220, ', // Light Grey (dark mode)
            ] : [
                `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, `, // Main Accent
                `rgba(${Math.max(0, rgb.r - 40)}, ${Math.max(0, rgb.g - 40)}, ${Math.max(0, rgb.b - 40)}, `, // Darker accent shade
                'rgba(0, 0, 0, ', // Pure black for high contrast
                'rgba(40, 40, 40, ', // Very dark grey
                'rgba(80, 80, 80, ', // Medium grey
            ];

            // 3. Spirograph math settings (Hypotrochoid formula)
            // Imagine a small circle rolling inside a big circle
            const R = Math.min(width, height); // Radius of big circle (Outer size)
            const r = R * 0.7;                        // Radius of small circle (Inner size)
            const d = R * 0.6;                         // Distance of the "pen" from center of small circle

            for (let i = 0; i < numParticles; i++) {
                // 't' is the "angle" or "time" along the curve
                // We do about 12 full rotations (PI * 2 * 12)
                const t = (i / numParticles) * Math.PI * 2 * 36;

                // Add a bit of 'jitter' so the dots aren't in a perfect mathematical line
                const jitter = (Math.random() - 0.5) * 40;

                // Calculate the "home" position using the Spirograph formula
                const x = (width / 2) + ((R - r) * Math.cos(t) + d * Math.cos(((R - r) / r) * t)) + jitter;
                const y = (height / 2) + ((R - r) * Math.sin(t) - d * Math.sin(((R - r) / r) * t)) + jitter;

                // Pick a random color from our list
                const randomBase = palettes[Math.floor(Math.random() * palettes.length)];

                // Save this dot!
                particles.push({
                    x: x,
                    y: y,
                    vx: (Math.random() - 0.5) * 0.5, // Start with a tiny bit of random movement
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2 + 1,
                    originalX: x,
                    originalY: y,
                    color: randomBase,
                    interactRadius: 30 + Math.random() * 100 // Varied radius for each particle
                });
            }
        };

        // Helper function to convert hex to RGB (used in both initParticles and animate)
        const hexToRgb = (hex: string) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : { r: 249, g: 219, b: 109 }; // fallback to yellow
        };

        // This is the animation loop that runs ~60 times per second
        const animate = () => {
            // Clear the screen before drawing the next frame
            ctx.clearRect(0, 0, width, height);

            // 0. DRAW MOUSE GLOW (Spotlight effect)
            ctx.save();
            const rgb = hexToRgb(accentColor);
            const glow = ctx.createRadialGradient(
                mouseRef.current.x, mouseRef.current.y, 0,
                mouseRef.current.x, mouseRef.current.y, 75
            );
            glow.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)`);
            glow.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
            ctx.fillStyle = glow;
            ctx.fillRect(0, 0, width, height);
            ctx.restore();

            // GLOBAL PULSE FACTOR
            // Oscillates between 0.8 and 1.2 over time
            const time = Date.now() * 0.002;
            const pulse = 1 + Math.sin(time) * 0.2;

            particles.forEach(p => {
                // 1. MOUSE INTERACTION
                const dx = mouseRef.current.x - p.x;
                const dy = mouseRef.current.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const minDist = p.interactRadius; // Use the unique radius for this particle

                if (dist < minDist) {
                    const force = (minDist - dist) / minDist; // Stronger force if closer
                    const angle = Math.atan2(dy, dx);
                    p.vx -= Math.cos(angle) * force * 1.5; // Push away from mouse
                    p.vy -= Math.sin(angle) * force * 1.5;
                }

                // 2. RETURN TO HOME (Spring Physics)
                // This makes the dots always drift back to their spirograph position
                const vdx = p.originalX - p.x;
                const vdy = p.originalY - p.y;
                p.vx += vdx * 0.005; // Pull back toward Home
                p.vy += vdy * 0.005;

                // 3. FRICTION
                // Slows the dots down so they don't bounce forever
                p.vx *= 0.92;
                p.vy *= 0.92;

                // Update the position
                p.x += p.vx;
                p.y += p.vy;

                // 4. DRAWING
                ctx.beginPath();
                // Apply pulse to size
                ctx.arc(p.x, p.y, p.size * pulse, 0, Math.PI * 2);

                // Make dots far from the mouse slightly stealthier
                const opacity = Math.max(0.2, 0.4 + (1 - dist / 500) * 0.5);

                ctx.fillStyle = `${p.color}${opacity})`;
                ctx.fill();
            });

            // Keep the loop going!
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        // Set up listeners for browser events
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);

        // Kick off the first run
        resize();
        animate();

        // Clean up when the component is removed
        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [accentColor, isDarkMode]); // Re-initialize particles when accent color or theme changes

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 0, // Stay in the background
                pointerEvents: 'none', // Allow clicking through the dots to buttons below
                background: isDarkMode
                    ? `
                        radial-gradient(circle at center, transparent 0%, #0c0c0c 100%),
                        linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                        #1a1a1a
                    `
                    : `
                        radial-gradient(circle at center, transparent 0%, #f0f0f0 100%),
                        linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                        #ffffff
                    `,
                backgroundSize: '100% 100%, 30px 30px, 30px 30px, 100% 100%'
            }}
        />
    );
};

export default ParticleCloud;
