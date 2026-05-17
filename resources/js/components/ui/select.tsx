import { cn } from '@/lib/utils';
import { type SelectHTMLAttributes, forwardRef } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: { value: string; label: string }[];
    placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({ className, label, error, options, placeholder, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className="space-y-1.5">
            {label && (
                <label htmlFor={inputId} className="block text-sm font-medium text-surface-700">
                    {label}
                    {props.required && <span className="ml-0.5 text-danger-500" aria-hidden="true">*</span>}
                </label>
            )}
            <select
                ref={ref}
                id={inputId}
                className={cn(
                    'block w-full rounded-lg border border-surface-300 bg-white px-3.5 py-2.5 text-sm text-surface-800 transition-colors duration-200',
                    'focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none',
                    'disabled:cursor-not-allowed disabled:bg-surface-50 disabled:text-surface-400',
                    error && 'border-danger-500 focus:border-danger-500 focus:ring-danger-500/20',
                    className,
                )}
                aria-invalid={error ? 'true' : undefined}
                aria-describedby={error ? `${inputId}-error` : undefined}
                {...props}
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && (
                <p id={`${inputId}-error`} className="text-xs text-danger-500" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
});

Select.displayName = 'Select';

export { Select };
export type { SelectProps };
