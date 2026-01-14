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
        opacity: (scrolled && !mouseNearTop) ? 0 : 1,
        pointerEvents: (scrolled && !mouseNearTop) ? 'none' as const : 'auto' as const
    };

    return (
        <div className="layout">
            {/* Logo Pill - Left */}
            <div style={{
                ...pillStyle,
                left: '2rem'
            }}>
                <Link to="/" style={{
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    letterSpacing: '0.5px',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    DW<span style={{ color: 'var(--accent-color)' }}>.</span>
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
