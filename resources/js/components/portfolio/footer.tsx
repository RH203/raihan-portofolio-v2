import { GitHubIcon, LinkedInIcon } from '@/components/icons';
import { Heart, Mail } from 'lucide-react';

export function Footer() {
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
                    <div className="flex items-center gap-4">
                        <a href="mailto:hello@example.com" className="text-surface-400 hover:text-primary-600 transition-colors" aria-label="Email">
                            <Mail className="h-5 w-5" />
                        </a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-surface-400 hover:text-primary-600 transition-colors" aria-label="GitHub">
                            <GitHubIcon className="h-5 w-5" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-surface-400 hover:text-primary-600 transition-colors" aria-label="LinkedIn">
                            <LinkedInIcon className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
