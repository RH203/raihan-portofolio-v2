import { cn } from '@/lib/utils';
import { type InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className="space-y-1.5">
            {label && (
                <label htmlFor={inputId} className="block text-sm font-medium text-surface-700">
                    {label}
                    {props.required && <span className="ml-0.5 text-danger-500" aria-hidden="true">*</span>}
                </label>
            )}
            <input
                ref={ref}
                id={inputId}
                className={cn(
                    'block w-full rounded-lg border border-surface-300 bg-white px-3.5 py-2.5 text-sm text-surface-800 placeholder:text-surface-400 transition-colors duration-200',
                    'focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none',
                    'disabled:cursor-not-allowed disabled:bg-surface-50 disabled:text-surface-400',
                    error && 'border-danger-500 focus:border-danger-500 focus:ring-danger-500/20',
                    className,
                )}
                aria-invalid={error ? 'true' : undefined}
                aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
                {...props}
            />
            {hint && !error && (
                <p id={`${inputId}-hint`} className="text-xs text-surface-500">
                    {hint}
                </p>
            )}
            {error && (
                <p id={`${inputId}-error`} className="text-xs text-danger-500" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export { Input };
export type { InputProps };
