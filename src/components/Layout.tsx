import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/index.css';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <div className="layout">
            {!isHome && (
                <nav style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    padding: '1rem 2rem',
                    zIndex: 100,
                    background: 'rgba(12, 12, 12, 0.9)',
                    backdropFilter: 'blur(10px)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.13)'
                }}>
                    <Link to="/" style={{
                        fontWeight: 600,
                        fontSize: '1.2rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        ← Back to Home
                    </Link>
                </nav>
            )}
            <main style={{ paddingTop: isHome ? 0 : '80px' }}>
                {children}
            </main>
        </div>
    );
};

export default Layout;
