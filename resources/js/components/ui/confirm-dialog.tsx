import { cn } from '@/lib/utils';
import { AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';

interface ConfirmDialogProps {
    open: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: 'danger' | 'warning';
    loading?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export function ConfirmDialog({
    open,
    title,
    message,
    confirmLabel = 'Delete',
    cancelLabel = 'Cancel',
    variant = 'danger',
    loading,
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={onCancel} aria-hidden="true" />
            <div className="relative mx-4 w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                <button onClick={onCancel} className="absolute top-4 right-4 rounded-md p-1 text-surface-400 hover:text-surface-600 transition-colors" aria-label="Close dialog">
                    <X className="h-5 w-5" />
                </button>

                <div className="flex gap-4">
                    <div
                        className={cn(
                            'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full',
                            variant === 'danger' ? 'bg-danger-50' : 'bg-warning-50',
                        )}
                    >
                        <AlertTriangle className={cn('h-5 w-5', variant === 'danger' ? 'text-danger-500' : 'text-warning-500')} />
                    </div>
                    <div>
                        <h3 id="confirm-title" className="text-base font-semibold text-surface-900">
                            {title}
                        </h3>
                        <p className="mt-1 text-sm text-surface-500">{message}</p>
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="rounded-lg border border-surface-300 px-4 py-2 text-sm font-medium text-surface-700 hover:bg-surface-50 transition-colors"
                        disabled={loading}
                    >
                        {cancelLabel}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={cn(
                            'rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors disabled:opacity-50',
                            variant === 'danger' ? 'bg-danger-500 hover:bg-danger-600' : 'bg-warning-500 hover:bg-warning-600',
                        )}
                        disabled={loading}
                    >
                        {loading ? 'Deleting...' : confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}

export function useConfirmDialog() {
    const [state, setState] = useState<{
        open: boolean;
        resolve: ((value: boolean) => void) | null;
    }>({ open: false, resolve: null });

    const confirm = () =>
        new Promise<boolean>((resolve) => {
            setState({ open: true, resolve });
        });

    const handleConfirm = () => {
        state.resolve?.(true);
        setState({ open: false, resolve: null });
    };

    const handleCancel = () => {
        state.resolve?.(false);
        setState({ open: false, resolve: null });
    };

    return { isOpen: state.open, confirm, handleConfirm, handleCancel };
}
