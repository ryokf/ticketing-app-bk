import { ReactNode } from 'react';

interface BrutalistCardProps {
    children: ReactNode;
    hover?: boolean;
    className?: string;
}

export default function BrutalistCard({
    children,
    hover = true,
    className = ''
}: BrutalistCardProps) {
    const cardClass = hover ? 'card-brutalist' : 'card-brutalist-no-hover';

    return (
        <div className={`${cardClass} ${className}`.trim()}>
            {children}
        </div>
    );
}
