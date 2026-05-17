import { cn } from '@/lib/utils';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
    size?: 'sm' | 'md';
    className?: string;
}

const variantStyles = {
    default: 'bg-surface-100 text-surface-700',
    primary: 'bg-primary-50 text-primary-700',
    success: 'bg-accent-50 text-accent-600',
    warning: 'bg-warning-50 text-warning-600',
    danger: 'bg-danger-50 text-danger-600',
};

const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
};

export function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
    return (
        <span className={cn('inline-flex items-center rounded-full font-medium', variantStyles[variant], sizeStyles[size], className)}>
            {children}
        </span>
    );
}
