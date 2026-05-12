import React, { useEffect, useState } from 'react';
import { portfolioData, Section, CalloutCard, CalloutColor } from '../data/content';
import '../styles/index.css';

import AnimatedBlock from '../components/AnimatedBlock';

// Helper to get Art Deco inspired colors for the callout cards
const getCardStyle = (color?: CalloutColor) => {
    switch (color) {
        case 'green':
            return { bg: 'transparent', border: '#4ade80', text: '#e6f2eb' };
        case 'brown':
            return { bg: 'transparent', border: '#fb923c', text: '#f5ebe3' };
        case 'blue':
            return { bg: 'transparent', border: '#60a5fa', text: '#e3ebf5' };
        case 'purple':
            return { bg: 'transparent', border: '#c084fc', text: '#f2e6f3' };
        case 'red':
            return { bg: 'transparent', border: '#f87171', text: '#f5e3e3' };
        default:
            return { bg: 'transparent', border: 'rgba(255,255,255,0.2)', text: 'var(--text-color)' };
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
        return (
            <div style={{
                width: getWidthPercent(card.width, isMobile),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '0',
                border: '1px solid rgba(255,255,255,0.05)',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
            }}>
                <img src={card.image.src} alt={card.image.alt} style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} />
            </div>
        );
    }

    const theme = getCardStyle(card.color);

    return (
        <div style={{
            width: getWidthPercent(card.width, isMobile),
            background: theme.bg,
            border: `1px solid ${theme.border}`,
            padding: '1.5rem',
            borderRadius: '0',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
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
                    <div style={{ width: isMobile ? '100%' : '35%', flexShrink: 0 }}>
                        <img src={card.image.src} alt={card.image.alt} style={{ width: '100%', borderRadius: '0', border: `1px solid ${theme.border}`, display: 'block' }} />
                    </div>
                )}
            </div>

            {card.image && card.image.position === 'bottom' && (
                <div style={{ marginTop: '0.5rem' }}>
                    <img src={card.image.src} alt={card.image.alt} style={{ width: '100%', borderRadius: '0', border: `1px solid ${theme.border}`, display: 'block' }} />
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
                gap: '1rem',
                alignItems: 'stretch'
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

const ProjectPage: React.FC = () => {
    const path = window.location.pathname;
    const project = portfolioData.projects.find(p => p.path === path);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        window.scrollTo(0, 0);

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [path]);

    if (!project) {
        return <div className="container" style={{ padding: '4rem' }}>Project not found</div>;
    }

    return (
        <div style={{ paddingBottom: '4rem' }}>
            <div className="container" style={{ paddingTop: '8rem', maxWidth: '1100px' }}>
                {/* Title */}
                <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
                    <AnimatedBlock>
                        <div style={{ fontSize: '5rem', marginBottom: '1.5rem', filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.2))' }}>
                            {project.icon}
                        </div>
                    </AnimatedBlock>
                    <AnimatedBlock delay="delay-1">
                        <h1 style={{ fontSize: '2.5rem', margin: 0, fontWeight: 800, color: '#fff', letterSpacing: '0.05em' }}>
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
