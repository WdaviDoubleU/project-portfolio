import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/index.css';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();
    const isHome = location.pathname === '/';
    const [scrolled, setScrolled] = useState(false);
    const [mouseNearTop, setMouseNearTop] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [accentColor, setAccentColor] = useState('#f9db6d');
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };

        const handleMouseMove = (e: MouseEvent) => {
            // Show nav if mouse is within 150px of the top
            setMouseNearTop(e.clientY < 150);
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        // Update CSS custom property when accent color changes
        document.documentElement.style.setProperty('--accent-color', accentColor);
    }, [accentColor]);

    useEffect(() => {
        // Update CSS variables when theme changes
        if (isDarkMode) {
            document.documentElement.style.setProperty('--bg-color', '#0c0c0c');
            document.documentElement.style.setProperty('--text-color', '#f0f0f0');
            document.documentElement.style.setProperty('--secondary-text', '#a0a0a0');
            document.documentElement.style.setProperty('--card-bg', '#1a1a1a');
        } else {
            document.documentElement.style.setProperty('--bg-color', '#ffffff');
            document.documentElement.style.setProperty('--text-color', '#1a1a1a');
            document.documentElement.style.setProperty('--secondary-text', '#404040'); // Darker for better accessibility
            document.documentElement.style.setProperty('--card-bg', '#fcfcfc');
        }
    }, [isDarkMode]);

    useEffect(() => {
        // Close menu when clicking outside
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (menuOpen && !target.closest('[data-menu-container]')) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [menuOpen]);

    const pillStyle = {
        position: 'fixed' as const,
        top: '1.5rem',
        zIndex: 100,
        background: 'rgba(20, 20, 20, 0.4)',
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        borderRadius: '100px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '0.8rem 1.5rem',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        opacity: (scrolled && !mouseNearTop && !menuOpen) ? 0 : 1,
        pointerEvents: (scrolled && !mouseNearTop && !menuOpen) ? 'none' as const : 'auto' as const
    };

    return (
        <div className="layout">
            {/* Logo Pill - Left */}
            <div style={{
                ...pillStyle,
                left: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
            }}>
                {/* Hamburger Menu */}
                <div style={{ position: 'relative' }} data-menu-container>
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '0.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px',
                            transition: 'opacity 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                        <div style={{ width: '20px', height: '2px', background: '#fff', borderRadius: '2px' }} />
                        <div style={{ width: '20px', height: '2px', background: '#fff', borderRadius: '2px' }} />
                        <div style={{ width: '20px', height: '2px', background: '#fff', borderRadius: '2px' }} />
                    </button>

                    {/* Dropdown Menu */}
                    {menuOpen && (
                        <div style={{
                            position: 'absolute',
                            top: 'auto',
                            left: '-0.8rem', // Shift left to align with pill padding
                            marginTop: '1.2rem', // Reduced gap for a more attached feel
                            background: 'rgba(20, 20, 20, 0.4)', // Match pill bg
                            backdropFilter: 'blur(16px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                            borderRadius: '24px', // Slightly larger radius
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            padding: '1.2rem',
                            minWidth: '220px',
                            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                            zIndex: 1000
                        }}>
                            {/* Theme Toggle */}
                            <div style={{ marginBottom: '1rem' }}>
                                <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>
                                    Theme
                                </div>
                                <button
                                    onClick={() => setIsDarkMode(!isDarkMode)}
                                    style={{
                                        width: '100%',
                                        padding: '0.8rem',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: '12px',
                                        color: '#fff',
                                        fontSize: '0.85rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        fontWeight: 600,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                                        e.currentTarget.style.borderColor = 'var(--accent-color)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                    }}
                                >
                                    {isDarkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
                                </button>
                            </div>

                            {/* Accent Color */}
                            <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>
                                Accent Color
                            </div>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: '0.5rem'
                            }}>
                                {[
                                    { name: 'Yellow', color: '#f9db6d' },
                                    { name: 'Blue', color: '#6db4f9' },
                                    { name: 'Green', color: '#6df9a8' },
                                    { name: 'Purple', color: '#b66df9' },
                                    { name: 'Pink', color: '#f96db4' },
                                    { name: 'Orange', color: '#f9a86d' }
                                ].map(({ name, color }) => (
                                    <button
                                        key={name}
                                        onClick={() => {
                                            setAccentColor(color);
                                            setMenuOpen(false);
                                        }}
                                        style={{
                                            background: color,
                                            border: accentColor === color ? '2px solid #fff' : '2px solid transparent',
                                            borderRadius: '8px',
                                            width: '100%',
                                            height: '40px',
                                            cursor: 'pointer',
                                            transition: 'transform 0.2s ease, border 0.2s ease',
                                            boxShadow: accentColor === color ? '0 0 12px rgba(255, 255, 255, 0.3)' : 'none'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                        title={name}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <Link to="/" style={{
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    letterSpacing: '0.5px',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <span style={{ color: 'var(--accent-color)' }}>D</span>W
                </Link>
            </div>

            {/* Menu Pill - Right */}
            <nav style={{
                ...pillStyle,
                right: '2rem'
            }}>
                <div style={{
                    display: 'flex',
                    gap: '2rem',
                    alignItems: 'center'
                }}>
                    <Link to="/" style={{
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        opacity: isHome ? 1 : 0.6,
                        transition: 'opacity 0.2s ease',
                        color: isHome ? 'var(--accent-color)' : '#fff'
                    }}>
                        Home
                    </Link>
                    <a href="#projects" style={{
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        opacity: 0.6,
                        transition: 'opacity 0.2s ease',
                        color: '#fff'
                    }} onClick={(e) => {
                        if (isHome) {
                            e.preventDefault();
                            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}>
                        Projects
                    </a>
                </div>
            </nav>
            <main>
                {children}
            </main>
        </div>
    );
};

export default Layout;
