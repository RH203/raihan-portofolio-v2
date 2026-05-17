import { cn } from '@/lib/utils';
import { type LucideIcon, PackageOpen } from 'lucide-react';

interface EmptyStateProps {
    icon?: LucideIcon;
    title: string;
    description?: string;
    action?: React.ReactNode;
    className?: string;
}

export function EmptyState({ icon: Icon = PackageOpen, title, description, action, className }: EmptyStateProps) {
    return (
        <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-100 mb-4">
                <Icon className="h-7 w-7 text-surface-400" />
            </div>
            <h3 className="text-base font-medium text-surface-700">{title}</h3>
            {description && <p className="mt-1 text-sm text-surface-500 max-w-sm">{description}</p>}
            {action && <div className="mt-4">{action}</div>}
        </div>
    );
}
