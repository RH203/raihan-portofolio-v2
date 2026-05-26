import type { Hero } from '@/types';
import { cn } from '@/lib/utils';
import { ArrowDown, Code2, Download, Send } from 'lucide-react';

interface HeroSectionProps {
    hero: Hero | null;
}

export function HeroSection({ hero }: HeroSectionProps) {
    if (!hero) return null;

    const isDevelopMode = hero.develop_mode;
    const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

    if (isDevelopMode) {
        return (
            <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-6 py-20" aria-labelledby="hero-heading">
                <div
                    className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_28%),linear-gradient(135deg,_#020617_0%,_#0f172a_45%,_#111827_100%)]"
                    aria-hidden="true"
                />
                <div className="absolute left-10 top-16 -z-10 h-48 w-48 rounded-full bg-cyan-400/15 blur-3xl" aria-hidden="true" />
                <div className="absolute bottom-10 right-10 -z-10 h-72 w-72 rounded-full bg-emerald-300/10 blur-3xl" aria-hidden="true" />

                <div className="mx-auto w-full max-w-5xl">
                    <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur md:p-12">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-cyan-200">
                            <span className="inline-block h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,0.9)]" />
                            Develop Mode
                        </div>

                        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                            <div>
                                <h1 id="hero-heading" className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                                    We&apos;re polishing things up. It&apos;ll be back looking sharper soon.
                                </h1>
                                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
                                    This page is currently in development mode. A few parts are being refined, tested, and cleaned up before the full experience goes live.
                                </p>
                                <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-300">
                                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">UI polishing</span>
                                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">layout tuning</span>
                                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">quality check</span>
                                </div>
                            </div>

                            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5 text-sm text-slate-300">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                                        <Code2 className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white">Build Status</p>
                                        <p className="text-slate-400">Relaxed pace, still shipping.</p>
                                    </div>
                                </div>
                                <div className="space-y-3 rounded-2xl border border-white/8 bg-white/4 p-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-400">mode</span>
                                        <span className="font-medium text-cyan-200">development</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-400">status</span>
                                        <span className="font-medium text-emerald-300">work in progress</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-400">visibility</span>
                                        <span className="font-medium text-white">hero only</span>
                                    </div>
                                </div>
                                <p className="mt-4 text-xs leading-relaxed text-slate-500">
                                    Check back soon. The rest is being prepared so it launches in a more polished state.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

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
                                    <img
                                        src={`/storage/${hero.photo_url}`}
                                        alt="Raihan Firdaus — Full-Stack Developer and Flutter Developer based in Surabaya, Indonesia"
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                        width={320}
                                        height={320}
                                    />
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
