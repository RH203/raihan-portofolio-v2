import { router } from '@inertiajs/react';
import { AlertTriangle, CheckCircle, Info, X, XCircle } from 'lucide-react';
import {
    createContext,
    type ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
    id: string;
    type: ToastType;
    title: string;
    message?: string;
    duration?: number;
}

interface ToastContextValue {
    toasts: Toast[];
    addToast: (toast: Omit<Toast, 'id'>) => void;
    removeToast: (id: string) => void;
    success: (title: string, message?: string) => void;
    error: (title: string, message?: string) => void;
    warning: (title: string, message?: string) => void;
    info: (title: string, message?: string) => void;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error('useToast must be used within <ToastProvider>');
    return ctx;
}

// ─── Provider ────────────────────────────────────────────────────────────────

let toastCounter = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
        const id = `toast-${++toastCounter}-${Date.now()}`;
        setToasts((prev) => [...prev, { ...toast, id }]);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const success = useCallback((title: string, message?: string) => {
        addToast({ type: 'success', title, message });
    }, [addToast]);

    const error = useCallback((title: string, message?: string) => {
        addToast({ type: 'error', title, message });
    }, [addToast]);

    const warning = useCallback((title: string, message?: string) => {
        addToast({ type: 'warning', title, message });
    }, [addToast]);

    const info = useCallback((title: string, message?: string) => {
        addToast({ type: 'info', title, message });
    }, [addToast]);

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast, success, error, warning, info }}>
            {children}
            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </ToastContext.Provider>
    );
}

// ─── Inertia Flash Listener ──────────────────────────────────────────────────
// Uses router events instead of usePage() so it works outside the Inertia <App> tree

export function InertiaFlashToasts() {
    const { success, error } = useToast();

    useEffect(() => {
        const removeListener = router.on('navigate', (event) => {
            const flash = (event as any).detail?.page?.props?.flash;
            if (!flash) return;

            if (flash.success) {
                success(flash.success);
            }
            if (flash.error) {
                error(flash.error);
            }
        });

        return () => {
            if (removeListener) removeListener();
        };
    }, [success, error]);

    return null;
}

// ─── Container ───────────────────────────────────────────────────────────────

function ToastContainer({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: string) => void }) {
    if (toasts.length === 0) return null;

    return (
        <div
            className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none"
            aria-live="polite"
            aria-label="Notifications"
        >
            {toasts.map((toast) => (
                <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
            ))}
        </div>
    );
}

// ─── Single Toast ────────────────────────────────────────────────────────────

const typeConfig = {
    success: {
        icon: CheckCircle,
        containerClass: 'border-emerald-200 bg-white',
        iconClass: 'text-emerald-500',
        progressClass: 'bg-emerald-500',
    },
    error: {
        icon: XCircle,
        containerClass: 'border-red-200 bg-white',
        iconClass: 'text-red-500',
        progressClass: 'bg-red-500',
    },
    warning: {
        icon: AlertTriangle,
        containerClass: 'border-amber-200 bg-white',
        iconClass: 'text-amber-500',
        progressClass: 'bg-amber-500',
    },
    info: {
        icon: Info,
        containerClass: 'border-blue-200 bg-white',
        iconClass: 'text-blue-500',
        progressClass: 'bg-blue-500',
    },
};

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
    const [state, setState] = useState<'entering' | 'visible' | 'exiting'>('entering');
    const [progress, setProgress] = useState(100);
    const duration = toast.duration ?? 5000;
    const config = typeConfig[toast.type];
    const Icon = config.icon;

    // Enter animation
    useEffect(() => {
        const raf = requestAnimationFrame(() => setState('visible'));
        return () => cancelAnimationFrame(raf);
    }, []);

    // Progress bar & auto-dismiss
    useEffect(() => {
        if (state !== 'visible') return;

        const startTime = Date.now();
        let animFrame: number;

        const tick = () => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
            setProgress(remaining);

            if (remaining > 0) {
                animFrame = requestAnimationFrame(tick);
            } else {
                setState('exiting');
            }
        };

        animFrame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(animFrame);
    }, [state, duration]);

    // Remove after exit animation
    useEffect(() => {
        if (state !== 'exiting') return;
        const timer = setTimeout(() => onRemove(toast.id), 300);
        return () => clearTimeout(timer);
    }, [state, toast.id, onRemove]);

    const handleDismiss = () => {
        setState('exiting');
    };

    return (
        <div
            className={`
                pointer-events-auto w-80 sm:w-96 rounded-xl border shadow-lg overflow-hidden
                transition-all duration-300 ease-out
                ${config.containerClass}
                ${state === 'entering' ? 'translate-x-full opacity-0' : ''}
                ${state === 'visible' ? 'translate-x-0 opacity-100' : ''}
                ${state === 'exiting' ? 'translate-x-full opacity-0 scale-95' : ''}
            `}
            role="alert"
        >
            <div className="flex items-start gap-3 p-4">
                <Icon className={`h-5 w-5 flex-shrink-0 mt-0.5 ${config.iconClass}`} />

                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-surface-900">{toast.title}</p>
                    {toast.message && (
                        <p className="text-xs text-surface-500 mt-0.5 leading-relaxed">{toast.message}</p>
                    )}
                </div>

                <button
                    onClick={handleDismiss}
                    className="flex-shrink-0 p-1 rounded-md text-surface-400 hover:text-surface-600 hover:bg-surface-100 transition-colors"
                    aria-label="Dismiss"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>

            {/* Progress bar */}
            <div className="h-1 w-full bg-surface-100">
                <div
                    className={`h-full transition-none ${config.progressClass}`}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}
