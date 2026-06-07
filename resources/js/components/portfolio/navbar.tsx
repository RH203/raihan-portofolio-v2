import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Skills', href: '#skills' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Projects', href: '#projects' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
];

interface NavbarProps {
    isDevelopMode?: boolean;
}

export function Navbar({ isDevelopMode = false }: NavbarProps) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { rootMargin: '-40% 0px -60% 0px' },
        );
        navItems.forEach(({ href }) => {
            const el = document.querySelector(href);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    const handleClick = (href: string) => {
        setMobileOpen(false);
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
                isDevelopMode
                    ? scrolled
                        ? 'border-b border-cyan-400/20 bg-slate-950/80 shadow-sm shadow-cyan-950/20 backdrop-blur-md'
                        : 'bg-transparent'
                    : scrolled
                      ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-surface-100'
                      : 'bg-transparent',
            )}
            role="banner"
        >
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4" aria-label="Main navigation">
                <Link href="/" className={cn('font-mono text-lg font-bold tracking-tight', isDevelopMode ? 'text-white' : 'text-surface-900')}>
                    <span className={isDevelopMode ? 'text-cyan-400' : 'text-primary-600'}>RF</span>
                    <span className={isDevelopMode ? 'text-slate-500' : 'text-surface-300'}>/</span>
                    portfolio
                </Link>

                {/* Desktop nav */}
                <ul className="hidden md:flex items-center gap-0.5" role="list">
                    {navItems.map(({ label, href }, idx) => (
                        <li key={href} className="flex items-center">
                            {idx > 0 && <span className={cn('mx-1 text-xs', isDevelopMode ? 'text-white/10' : 'text-surface-200')}>/</span>}
                            <button
                                onClick={() => handleClick(href)}
                                className={cn(
                                    'border-b-2 px-1.5 py-2 text-sm font-medium transition-colors duration-200',
                                    isDevelopMode
                                        ? activeSection === href.slice(1)
                                            ? 'border-cyan-400 text-cyan-300'
                                            : 'border-transparent text-slate-400 hover:text-white'
                                        : activeSection === href.slice(1)
                                          ? 'border-primary-600 text-surface-900'
                                          : 'border-transparent text-surface-500 hover:text-surface-900',
                                )}
                            >
                                {label}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Mobile toggle */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className={cn(
                        'md:hidden rounded-lg p-2 transition-colors',
                        isDevelopMode ? 'text-slate-200 hover:bg-white/5' : 'text-surface-600 hover:bg-surface-100',
                    )}
                    aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={mobileOpen}
                >
                    {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </nav>

            {/* Mobile nav */}
            {mobileOpen && (
                <div
                    className={cn(
                        'md:hidden border-t backdrop-blur-md',
                        isDevelopMode ? 'border-cyan-400/15 bg-slate-950/95' : 'border-surface-100 bg-white/95',
                    )}
                >
                    <ul className="flex flex-col px-4 py-3 space-y-1" role="list">
                        {navItems.map(({ label, href }) => (
                            <li key={href}>
                                <button
                                    onClick={() => handleClick(href)}
                                    className={cn(
                                        'w-full border-l-2 px-4 py-2.5 text-left text-sm font-medium transition-colors',
                                        isDevelopMode
                                            ? activeSection === href.slice(1)
                                                ? 'border-cyan-400 bg-white/5 text-cyan-300'
                                                : 'border-transparent text-slate-400 hover:bg-white/5 hover:text-white'
                                            : activeSection === href.slice(1)
                                              ? 'border-primary-600 bg-primary-50/60 text-primary-700'
                                              : 'border-transparent text-surface-500 hover:bg-surface-50 hover:text-surface-900',
                                    )}
                                >
                                    {label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
}
