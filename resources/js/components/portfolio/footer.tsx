import { cn } from '@/lib/utils';
import { SocialIcon } from '@/components/portfolio/social-icons';
import type { SocialLink } from '@/types';
import { Heart } from 'lucide-react';

interface FooterProps {
    socialLinks: SocialLink[];
    isDevelopMode?: boolean;
}

export function Footer({ socialLinks, isDevelopMode = false }: FooterProps) {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className={cn(
                'border-t',
                isDevelopMode ? 'border-white/10 bg-slate-950' : 'border-surface-100 bg-surface-50',
            )}
            role="contentinfo"
        >
            <div className="mx-auto max-w-6xl px-6 py-10">
                <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                    <div className="flex items-center gap-3 text-center md:text-left">
                        <span className={cn('font-mono text-sm font-bold', isDevelopMode ? 'text-cyan-400' : 'text-primary-600')}>RF</span>
                        <span className={cn('h-3 w-px', isDevelopMode ? 'bg-white/15' : 'bg-surface-200')} aria-hidden="true" />
                        <div>
                            <p className={cn('text-sm', isDevelopMode ? 'text-slate-300' : 'text-surface-500')}>
                                &copy; {currentYear} Raihan Firdaus. All rights reserved.
                            </p>
                            <p className={cn('mt-0.5 flex items-center justify-center gap-1 text-xs md:justify-start', isDevelopMode ? 'text-slate-500' : 'text-surface-400')}>
                                Built with <Heart className="h-3 w-3 fill-danger-500 text-danger-500" aria-hidden="true" /> using Laravel &amp; React
                            </p>
                        </div>
                    </div>
                    {socialLinks.length > 0 && (
                        <div className="flex items-center gap-2">
                            {socialLinks.map((link) => (
                                <SocialIcon key={link.id} link={link} size="sm" />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </footer>
    );
}
