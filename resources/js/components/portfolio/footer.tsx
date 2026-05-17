import { SocialIcon } from '@/components/portfolio/social-icons';
import type { SocialLink } from '@/types';
import { Heart } from 'lucide-react';

interface FooterProps {
    socialLinks: SocialLink[];
}

export function Footer({ socialLinks }: FooterProps) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-surface-100 bg-surface-50" role="contentinfo">
            <div className="mx-auto max-w-6xl px-6 py-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                        <p className="text-sm text-surface-500">
                            &copy; {currentYear} Raihan. All rights reserved.
                        </p>
                        <p className="text-xs text-surface-400 mt-1 flex items-center justify-center md:justify-start gap-1">
                            Built with <Heart className="h-3 w-3 text-danger-500 fill-danger-500" aria-hidden="true" /> using Laravel &amp; React
                        </p>
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
