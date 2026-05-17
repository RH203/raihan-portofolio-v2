import type { Hero } from '@/types';
import { ArrowDown, Download, Send } from 'lucide-react';

interface HeroSectionProps {
    hero: Hero | null;
}

export function HeroSection({ hero }: HeroSectionProps) {
    if (!hero) return null;

    const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

    return (
        <section id="home" className="relative min-h-screen flex items-center pt-20" aria-labelledby="hero-heading">
            {/* Subtle background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-white to-accent-50/30 -z-10" aria-hidden="true" />
            <div className="absolute top-20 right-10 w-72 h-72 bg-primary-100/40 rounded-full blur-3xl -z-10" aria-hidden="true" />
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent-50/40 rounded-full blur-3xl -z-10" aria-hidden="true" />

            <div className="mx-auto max-w-6xl px-6 py-20 w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="order-2 lg:order-1">
                        <p className="text-primary-600 font-medium text-sm tracking-wide uppercase mb-3">
                            {hero.role}
                        </p>
                        <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-bold text-surface-900 leading-tight tracking-tight">
                            {hero.headline}
                        </h1>
                        <p className="mt-6 text-lg text-surface-500 leading-relaxed max-w-xl">
                            {hero.description}
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <button
                                onClick={() => scrollTo('#portfolio')}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-600 text-white font-medium text-sm hover:bg-primary-700 active:bg-primary-800 transition-all duration-200 shadow-sm shadow-primary-600/20 hover:shadow-md hover:shadow-primary-600/30"
                            >
                                {hero.primary_cta_text}
                                <ArrowDown className="h-4 w-4" aria-hidden="true" />
                            </button>
                            <button
                                onClick={() => scrollTo('#contact')}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-surface-300 text-surface-700 font-medium text-sm hover:bg-surface-50 active:bg-surface-100 transition-all duration-200"
                            >
                                {hero.secondary_cta_text}
                                <Send className="h-4 w-4" aria-hidden="true" />
                            </button>
                            {hero.cv_url && (
                                <a
                                    href={`/storage/${hero.cv_url}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary-200 bg-primary-50 text-primary-700 font-medium text-sm hover:bg-primary-100 active:bg-primary-200 transition-all duration-200"
                                    aria-label="View latest CV"
                                >
                                    <Download className="h-4 w-4" aria-hidden="true" />
                                    View CV
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Avatar / illustration area */}
                    <div className="order-1 lg:order-2 flex justify-center">
                        <div className="relative">
                            <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center overflow-hidden">
                                {hero.photo_url ? (
                                    <img src={`/storage/${hero.photo_url}`} alt={hero.name} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-7xl sm:text-8xl font-bold text-primary-400/60">
                                        {hero.name.charAt(0)}
                                    </span>
                                )}
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-accent-500/10 rounded-full blur-xl" aria-hidden="true" />
                            <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary-500/10 rounded-full blur-xl" aria-hidden="true" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
