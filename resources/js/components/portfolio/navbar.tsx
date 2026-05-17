import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact', href: '#contact' },
];

export function Navbar() {
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
                scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-surface-100' : 'bg-transparent',
            )}
            role="banner"
        >
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4" aria-label="Main navigation">
                <Link href="/" className="text-xl font-bold text-surface-900 tracking-tight">
                    Raihan Firdaus<span className="text-primary-600">.</span>
                </Link>

                {/* Desktop nav */}
                <ul className="hidden md:flex items-center gap-1" role="list">
                    {navItems.map(({ label, href }) => (
                        <li key={href}>
                            <button
                                onClick={() => handleClick(href)}
                                className={cn(
                                    'px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                                    activeSection === href.slice(1)
                                        ? 'text-primary-600 bg-primary-50'
                                        : 'text-surface-600 hover:text-surface-900 hover:bg-surface-50',
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
                    className="md:hidden rounded-lg p-2 text-surface-600 hover:bg-surface-100 transition-colors"
                    aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={mobileOpen}
                >
                    {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </nav>

            {/* Mobile nav */}
            {mobileOpen && (
                <div className="md:hidden border-t border-surface-100 bg-white/95 backdrop-blur-md">
                    <ul className="flex flex-col px-4 py-3 space-y-1" role="list">
                        {navItems.map(({ label, href }) => (
                            <li key={href}>
                                <button
                                    onClick={() => handleClick(href)}
                                    className={cn(
                                        'w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                                        activeSection === href.slice(1)
                                            ? 'text-primary-600 bg-primary-50'
                                            : 'text-surface-600 hover:bg-surface-50',
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
