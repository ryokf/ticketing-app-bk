import { ButtonHTMLAttributes } from 'react';

interface BrutalistButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'accent' | 'outline';
    children: React.ReactNode;
}

export default function BrutalistButton({
    variant = 'default',
    children,
    className = '',
    ...props
}: BrutalistButtonProps) {
    const baseClass = 'btn-brutalist';
    const variantClass = variant === 'accent'
        ? 'btn-brutalist-accent'
        : variant === 'outline'
            ? 'btn-brutalist-outline'
            : '';

    return (
        <button
            className={`${baseClass} ${variantClass} ${className}`.trim()}
            {...props}
        >
            {children}
        </button>
    );
}
