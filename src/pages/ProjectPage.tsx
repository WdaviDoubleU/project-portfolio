import React, { useEffect } from 'react';
import { portfolioData, Section } from '../data/content';
import '../styles/index.css';

import AnimatedBlock from '../components/AnimatedBlock';

const SectionRenderer: React.FC<{ section: Section }> = ({ section }) => {
    return (
        <div style={{ marginBottom: '3rem' }}>
            <AnimatedBlock>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', borderLeft: '4px solid var(--accent-color)', paddingLeft: '1rem' }}>
                    {section.title}
                </h3>
            </AnimatedBlock>

            <AnimatedBlock delay="delay-1">
                {section.content.map((p, i) => (
                    <p key={i} style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>{p}</p>
                ))}
            </AnimatedBlock>

            {section.listItems && (
                <AnimatedBlock delay="delay-2">
                    <ul style={{ listStyle: 'none', marginLeft: '1rem', marginBottom: '1.5rem' }}>
                        {section.listItems.map((item, i) => (
                            <li key={i} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ color: 'var(--accent-color)' }}>•</span> {item}
                            </li>
                        ))}
                    </ul>
                </AnimatedBlock>
            )}

            {section.imagePlaceholder && (
                <AnimatedBlock delay="delay-2">
                    <div style={{
                        background: '#222',
                        border: '1px dashed #444',
                        borderRadius: '8px',
                        padding: '2rem',
                        textAlign: 'center',
                        color: '#666',
                        margin: '1rem 0 2rem 0',
                        minHeight: '200px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column'
                    }}>
                        <span style={{ fontSize: '2rem', marginBottom: '1rem' }}>🖼️</span>
                        <p style={{ margin: 0 }}>{section.imagePlaceholder}</p>
                    </div>
                </AnimatedBlock>
            )}

            {section.subSections && (
                <div style={{ marginLeft: '1rem', borderLeft: '1px solid #333', paddingLeft: '1rem', marginTop: '2rem' }}>
                    {section.subSections.map((sub, i) => (
                        <SectionRenderer key={i} section={sub} />
                    ))}
                </div>
            )}
        </div>
    );
};

const ProjectPage: React.FC = () => {
    // Get the last segment of the URL to match the project
    // In a real app we might use a slug or id param, but here we strictly match the path 
    // or pass the project ID via route props. 
    // Let's assume the router passes the project ID or we find it.

    // Actually, to make it simple with the data structure:
    // We will pass the 'id' as a prop or find it by window.location.pathname
    const path = window.location.pathname;
    const project = portfolioData.projects.find(p => p.path === path);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [path]);

    if (!project) {
        return <div className="container" style={{ padding: '4rem' }}>Project not found</div>;
    }

    return (
        <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem', maxWidth: '900px' }}>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <AnimatedBlock>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{project.icon}</div>
                </AnimatedBlock>
                <AnimatedBlock delay="delay-1">
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{project.title}</h1>
                </AnimatedBlock>
                <AnimatedBlock delay="delay-2">
                    <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', color: '#888' }}>
                        {project.overview}
                    </p>
                </AnimatedBlock>
            </div>

            {/* Skills Grid (Animated Boxes) */}
            <div style={{ marginBottom: '4rem' }}>
                <AnimatedBlock>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>
                        Skills Applied & Learned
                    </h2>
                </AnimatedBlock>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.5rem'
                }}>
                    {project.skills.map((skill, i) => (
                        <AnimatedBlock key={i} delay={`delay-${Math.min(i + 1, 3)}`}>
                            <div style={{
                                background: 'var(--card-bg)',
                                padding: '1.5rem',
                                borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.05)',
                                height: '100%'
                            }}>
                                <h4 style={{ color: 'var(--accent-color)', marginBottom: '0.5rem' }}>{skill.title}</h4>
                                <p style={{ fontSize: '0.9rem', margin: 0 }}>{skill.desc}</p>
                            </div>
                        </AnimatedBlock>
                    ))}
                </div>
            </div>

            {/* Main Content Sections */}
            <div>
                {project.sections.map((section, i) => (
                    <SectionRenderer key={i} section={section} />
                ))}
            </div>

        </div>
    );
};

export default ProjectPage;
