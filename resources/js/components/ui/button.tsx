import { cn } from '@/lib/utils';
import { type LucideIcon } from 'lucide-react';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: LucideIcon;
    iconPosition?: 'left' | 'right';
    loading?: boolean;
    fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary:
        'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 focus-visible:ring-primary-500 shadow-sm',
    secondary:
        'bg-surface-100 text-surface-700 hover:bg-surface-200 active:bg-surface-300 focus-visible:ring-surface-400',
    outline:
        'border border-surface-300 text-surface-700 hover:bg-surface-50 active:bg-surface-100 focus-visible:ring-primary-500',
    ghost: 'text-surface-600 hover:bg-surface-100 active:bg-surface-200 focus-visible:ring-primary-500',
    danger: 'bg-danger-500 text-white hover:bg-danger-600 active:bg-danger-600 focus-visible:ring-danger-500 shadow-sm',
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-2.5 text-base gap-2',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', icon: Icon, iconPosition = 'left', loading, fullWidth, disabled, children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                    variantStyles[variant],
                    sizeStyles[size],
                    fullWidth && 'w-full',
                    className,
                )}
                disabled={disabled || loading}
                {...props}
            >
                {loading && (
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                )}
                {!loading && Icon && iconPosition === 'left' && <Icon className="h-4 w-4" aria-hidden="true" />}
                {children}
                {!loading && Icon && iconPosition === 'right' && <Icon className="h-4 w-4" aria-hidden="true" />}
            </button>
        );
    },
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps };
