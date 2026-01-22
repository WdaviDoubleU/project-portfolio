import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ParticleCloud from '../components/ParticleCloud';
import AnimatedBlock from '../components/AnimatedBlock';
import { portfolioData } from '../data/content';
import profilePic from '../assets/profile.png';
import '../styles/animations.css';

const Home: React.FC = () => {
    const { home } = portfolioData;

    // Track accent color from CSS variable
    const [accentColor, setAccentColor] = useState('#f9db6d');
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        // Update accent color when CSS variable changes
        const updateAccentColor = () => {
            const color = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim();
            if (color) setAccentColor(color);
        };

        // Update dark mode when CSS variable changes
        const updateDarkMode = () => {
            const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--bg-color').trim();
            setIsDarkMode(bgColor === '#0c0c0c' || bgColor === 'rgb(12, 12, 12)');
        };

        // Initial update
        updateAccentColor();
        updateDarkMode();

        // Watch for changes (poll every 100ms)
        const interval = setInterval(() => {
            updateAccentColor();
            updateDarkMode();
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <ParticleCloud accentColor={accentColor} isDarkMode={isDarkMode} />

            {/* Hero Section */}
            <div style={{
                position: 'relative',
                zIndex: 1,
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: '2rem'
            }}>
                <h1 className="fade-in" style={{
                    fontSize: '5rem',
                    marginBottom: '1rem',
                    fontWeight: 700,
                    paddingBottom: '0.1em', // Prevent 'g' from being clipped
                    display: 'inline-block', // Required for gradient text to work properly
                    backgroundImage: isDarkMode
                        ? `linear-gradient(to right, ${accentColor}, #fff)`
                        : `linear-gradient(to right, ${accentColor}, #1a1a1a)`, // Gradient ends in dark grey for light mode
                    backgroundSize: '100%',
                    backgroundRepeat: 'no-repeat',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent'
                } as React.CSSProperties}>
                    David Wang
                </h1>
                <p className="fade-in delay-1" style={{
                    fontSize: '1.5rem',
                    color: 'var(--secondary-text)',
                    maxWidth: '600px'
                }}>
                    ⚙️ Integrated Biomedical Engineering & Health Sciences I Student @ McMaster 🧪
                </p>

                {/* Scroll Indicator */}
                <div className="fade-in delay-2" style={{
                    position: 'absolute',
                    bottom: '3rem',
                    animation: 'bounce 2s infinite',
                    opacity: 0.7
                }}>
                    ↓ Scroll
                </div>
            </div>

            <div className="container" style={{
                position: 'relative',
                zIndex: 1,
                paddingBottom: '4rem',
                background: 'linear-gradient(to bottom, transparent, var(--bg-color) 20%)' // Fade into bg
            }}>

                {/* About / Intro Section */}
                {/* About / Intro Section */}
                <section style={{
                    maxWidth: '800px',
                    marginBottom: '8rem',
                    paddingTop: '4rem'
                }}>
                    <AnimatedBlock>
                        <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap-reverse' }}>
                            <div style={{ flex: 1, minWidth: '300px' }}>
                                <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Hello!</h2>
                                {home.intro.map((para, i) => (
                                    <p key={i} style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                                        {para}
                                    </p>
                                ))}
                            </div>
                            {/* Profile Picture */}
                            <div style={{
                                width: '200px',
                                height: '200px',
                                borderRadius: '24px',
                                overflow: 'hidden', // Ensure image respects border radius
                                flexShrink: 0,
                                border: '4px solid var(--accent-color)',
                                boxShadow: '0 0 30px rgba(252, 225, 129, 0.2)'
                            }}>
                                <img
                                    src={profilePic}
                                    alt="David Wang"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            </div>
                        </div>
                    </AnimatedBlock>
                </section>

                {/* Projects Grid */}
                <section id="projects">
                    <AnimatedBlock>
                        <h3 style={{
                            fontSize: '2rem',
                            marginBottom: '3rem',
                            borderBottom: '1px solid rgba(255,255,255,0.1)',
                            paddingBottom: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}>
                            <span>⚙️</span> Projects
                        </h3>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: '2rem'
                        }}>
                            {home.projects.map((project) => (
                                <Link
                                    key={project.id}
                                    to={project.path}
                                    style={{
                                        background: 'var(--card-bg)',
                                        padding: '2rem',
                                        borderRadius: '16px',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        transition: 'transform 0.3s ease, border-color 0.3s ease',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                        e.currentTarget.style.borderColor = 'var(--accent-color)'; // Use accent color
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                                    }}
                                >
                                    <div style={{ fontSize: '2rem' }}>{project.icon}</div>
                                    <h4 style={{ fontSize: '1.2rem', color: 'var(--text-color)' }}>{project.title}</h4>
                                </Link>
                            ))}
                        </div>
                    </AnimatedBlock>
                </section>

            </div>
        </div>
    );
};

export default Home;
