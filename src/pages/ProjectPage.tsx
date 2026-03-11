import React, { useEffect, useState } from 'react';
import { portfolioData, Section } from '../data/content';
import '../styles/index.css';

import AnimatedBlock from '../components/AnimatedBlock';

// Helper component for the timeline cards
const TimelineCard: React.FC<{ section: Section, isMobile: boolean }> = ({ section, isMobile }) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'flex-start',
            position: 'relative',
            marginBottom: '4rem',
            width: '100%',
            paddingLeft: isMobile ? '3rem' : '4rem' // Make space for line
        }}>
            {/* Connector Dot */}
            <div style={{
                position: 'absolute',
                left: '0',
                top: '0',
                width: '20px',
                height: '20px',
                background: 'var(--accent-color)',
                borderRadius: '50%',
                transform: 'translateX(-9px)', // Center dot on the left line
                zIndex: 2,
                boxShadow: '0 0 10px var(--accent-color)'
            }} />

            {/* Content Card */}
            <div style={{
                width: '100%',
                background: 'var(--card-bg)',
                padding: '2rem',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.05)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                position: 'relative',
            }}>
                <AnimatedBlock delay="delay-1">
                    <h3 style={{
                        fontSize: '1.8rem',
                        marginBottom: '1rem',
                        color: 'var(--accent-color)',
                        // borderBottom: '1px solid rgba(255,255,255,0.1)',
                        paddingBottom: '0.5rem'
                    }}>
                        {section.title}
                    </h3>
                </AnimatedBlock>

                <AnimatedBlock delay="delay-2">
                    {section.content.map((p, i) => (
                        <p key={i} style={{ marginBottom: '1rem', color: 'var(--text-color)', lineHeight: '1.6' }}>{p}</p>
                    ))}
                </AnimatedBlock>

                {section.listItems && (
                    <AnimatedBlock delay="delay-3">
                        <ul style={{ listStyle: 'none', paddingLeft: '0.5rem', marginBottom: '1.5rem' }}>
                            {section.listItems.map((item, i) => (
                                <li key={i} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--secondary-text)' }}>
                                    <span style={{ color: 'var(--accent-color)', marginTop: '4px' }}>•</span> {item}
                                </li>
                            ))}
                        </ul>
                    </AnimatedBlock>
                )}

                {section.imagePlaceholder && (
                    <AnimatedBlock delay="delay-3">
                        <div style={{
                            background: 'rgba(0,0,0,0.2)',
                            border: '1px dashed var(--secondary-text)',
                            borderRadius: '8px',
                            padding: '2rem',
                            textAlign: 'center',
                            color: 'var(--secondary-text)',
                            margin: '1.5rem 0 0 0',
                            minHeight: '150px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column'
                        }}>
                            <span style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🖼️</span>
                            <p style={{ margin: 0, fontSize: '0.9rem' }}>{section.imagePlaceholder}</p>
                        </div>
                    </AnimatedBlock>
                )}

                {/* Subsections - simplified for readability inside cards */}
                {section.subSections && (
                    <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        {section.subSections.map((sub, i) => (
                            <div key={i} style={{ marginBottom: '1.5rem' }}>
                                <h4 style={{ fontSize: '1.1rem', color: 'var(--text-color)', marginBottom: '0.5rem' }}>{sub.title}</h4>
                                {sub.content.map((p, k) => (
                                    <p key={k} style={{ fontSize: '0.9rem', color: 'var(--secondary-text)', marginBottom: '0.5rem' }}>{p}</p>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
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
        <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem', maxWidth: '1000px' }}>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                <AnimatedBlock>
                    <div style={{ fontSize: '5rem', marginBottom: '1.5rem', filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.2))' }}>{project.icon}</div>
                </AnimatedBlock>
                <AnimatedBlock delay="delay-1">
                    <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', fontWeight: 800 }}>{project.title}</h1>
                </AnimatedBlock>
                <AnimatedBlock delay="delay-2">
                    <p style={{ fontSize: '1.3rem', maxWidth: '700px', margin: '0 auto', color: 'var(--secondary-text)', lineHeight: '1.6' }}>
                        {project.overview}
                    </p>
                </AnimatedBlock>
            </div>

            {/* Skills Grid */}
            <div style={{
                marginBottom: '6rem',
                background: '#333333',
                borderRadius: '8px',
                padding: '2rem',
                border: '1px solid rgba(255,255,255,0.05)'
            }}>
                <AnimatedBlock>
                    <h2 style={{
                        fontSize: '1.1rem',
                        marginBottom: '1.5rem',
                        color: '#f0f0f0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontFamily: 'monospace',
                        fontWeight: 'bold',
                        letterSpacing: '1px'
                    }}>
                        <span style={{ opacity: 0.8 }}>🔧</span> Skills Applied/Learned
                    </h2>
                </AnimatedBlock>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: '1rem'
                }}>
                    {project.skills.map((skill, i) => (
                        <AnimatedBlock key={i} delay={`delay-${Math.min(i + 1, 3)}`}>
                            <div style={{
                                background: '#253528',
                                padding: '1.2rem',
                                borderRadius: '8px',
                                border: '1px solid #2f4033',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                height: '100%',
                                boxSizing: 'border-box'
                            }}>
                                {/* Checkmark block */}
                                <div style={{
                                    background: '#5c9649',
                                    color: 'white',
                                    borderRadius: '4px',
                                    width: '24px',
                                    height: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.9rem',
                                    fontWeight: 'bold',
                                    flexShrink: 0
                                }}>
                                    ✓
                                </div>
                                <div style={{
                                    color: '#e0e0e0',
                                    fontFamily: 'monospace',
                                    fontSize: '0.95rem',
                                    lineHeight: '1.4',
                                    fontWeight: 600
                                }}>
                                    {skill.title}
                                    {skill.desc && <span style={{ display: 'block', color: '#999', fontSize: '0.8rem', marginTop: '0.3rem', fontWeight: 'normal' }}>{skill.desc}</span>}
                                </div>
                            </div>
                        </AnimatedBlock>
                    ))}
                </div>
            </div>

            {/* Timeline Section */}
            <div style={{ position: 'relative', paddingBottom: '4rem' }}>
                {/* Central Line */}
                <div style={{
                    position: 'absolute',
                    left: '0', // Fixed to left
                    top: '0',
                    bottom: '0',
                    width: '2px',
                    background: 'linear-gradient(to bottom, var(--accent-color) 0%, transparent 100%)',
                    opacity: 0.3
                }} />

                {project.sections.map((section, i) => (
                    <TimelineCard
                        key={i}
                        section={section}
                        isMobile={isMobile}
                    />
                ))}
            </div>

        </div>
    );
};

export default ProjectPage;
