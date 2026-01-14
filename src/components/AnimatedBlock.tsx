import React, { useEffect, useRef, useState } from 'react';

interface AnimatedBlockProps {
    children: React.ReactNode;
    delay?: string;
    className?: string;
}

const AnimatedBlock: React.FC<AnimatedBlockProps> = ({
    children,
    delay = '',
    className = ''
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`${className} animate-on-scroll ${isVisible ? 'visible' : ''} ${delay}`}
        >
            {children}
        </div>
    );
};

export default AnimatedBlock;
