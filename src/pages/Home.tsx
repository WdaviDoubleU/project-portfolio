import React from 'react';
import { Link } from 'react-router-dom';
import ParticleCloud from '../components/ParticleCloud';
import AnimatedBlock from '../components/AnimatedBlock';
import { portfolioData } from '../data/content';
import '../styles/animations.css';
import { useTheme } from '../ThemeContext';

/** Bundled photo when present; add `src/assets/profile.png` (any square JPEG/PNG works). */
const profilePhotoModules = import.meta.glob('../assets/profile.png', { eager: true }) as Record<
    string,
    { default: string }
>;
const profilePhotoSrc = Object.values(profilePhotoModules)[0]?.default;

function ProfilePhotoFallback({ accentColor }: { accentColor: string }) {
    const gradId = React.useId().replace(/:/g, '');
    return (
        <svg
            width={200}
            height={200}
            viewBox="0 0 200 200"
            style={{ display: 'block' }}
            role="img"
            aria-label="David Wang"
        >
            <defs>
                <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={accentColor} />
                    <stop offset="100%" stopColor="#1f1f1f" />
                </linearGradient>
            </defs>
            <rect width="200" height="200" fill={`url(#${gradId})`} />
            <text
                x="100"
                y="108"
                textAnchor="middle"
                dominantBaseline="central"
                fill="rgba(255,255,255,0.92)"
                fontSize="56"
                fontFamily="system-ui, -apple-system, Segoe UI, sans-serif"
                fontWeight={700}
            >
                DW
            </text>
        </svg>
    );
}

const Home: React.FC = () => {
    const { home } = portfolioData;

    const { accentColor, isDarkMode } = useTheme();

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
                            <div
                                className="art-deco-border"
                                style={{
                                    width: '200px',
                                    height: '200px',
                                    flexShrink: 0,
                                    boxShadow: '0 0 30px rgba(252, 225, 129, 0.2)',
                                    overflow: 'hidden',
                                    lineHeight: 0
                                }}
                            >
                                {profilePhotoSrc ? (
                                    <img
                                        src={profilePhotoSrc}
                                        alt="David Wang"
                                        width={200}
                                        height={200}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            display: 'block'
                                        }}
                                    />
                                ) : (
                                    <ProfilePhotoFallback accentColor={accentColor} />
                                )}
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
                                        borderRadius: '0',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        transition: 'transform 0.3s ease, border-color 0.3s ease',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'stretch',
                                        gap: '1.5rem'
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
                                    {/* Image Placeholder */}
                                    <div style={{
                                        width: '100%',
                                        height: '200px',
                                        background: 'rgba(0,0,0,0.2)',
                                        border: '1px dashed var(--secondary-text)',
                                        borderRadius: '0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '3rem',
                                        transition: 'border-color 0.3s ease'
                                    }}>
                                        {project.icon}
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <h4 style={{ fontSize: '1.4rem', color: 'var(--text-color)', margin: 0 }}>{project.title}</h4>
                                        {project.description && (
                                            <p style={{ fontSize: '1rem', color: 'var(--secondary-text)', margin: 0, lineHeight: 1.5 }}>
                                                {project.description}
                                            </p>
                                        )}
                                    </div>
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
