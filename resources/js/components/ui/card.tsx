import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    hoverable?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
};

export function Card({ children, className, hoverable, padding = 'md' }: CardProps) {
    return (
        <div
            className={cn(
                'rounded-xl border border-surface-200 bg-white shadow-sm',
                hoverable && 'transition-all duration-300 hover:shadow-md hover:-translate-y-0.5',
                paddingStyles[padding],
                className,
            )}
        >
            {children}
        </div>
    );
}

interface CardHeaderProps {
    children: ReactNode;
    className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
    return <div className={cn('mb-4', className)}>{children}</div>;
}

interface CardTitleProps {
    children: ReactNode;
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4';
}

export function CardTitle({ children, className, as: Tag = 'h3' }: CardTitleProps) {
    return <Tag className={cn('text-lg font-semibold text-surface-900', className)}>{children}</Tag>;
}
