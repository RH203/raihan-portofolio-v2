import type { Auth } from '@/types/index';

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            flash: {
                success?: string;
                error?: string;
            };
            [key: string]: unknown;
        };
    }
}
