import '../css/app.css';

import { InertiaFlashToasts, ToastProvider } from '@/components/ui/toast';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    progress: {
        color: '#4f46e5',
    },
    setup({ el, App, props }) {
        if (el) {
            createRoot(el).render(
                <ToastProvider>
                    <App {...props} />
                    <InertiaFlashToasts />
                </ToastProvider>,
            );
        }
    },
});