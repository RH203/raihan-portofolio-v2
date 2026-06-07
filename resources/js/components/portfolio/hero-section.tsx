import type { Hero } from '@/types';
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
        <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-20" aria-labelledby="hero-heading">
            {/* Fine dotted grid backdrop — quiet, technical, no gradient blobs */}
            <div className="absolute inset-0 -z-10 bg-white" aria-hidden="true" />
            <div
                className="absolute inset-0 -z-10 opacity-60"
                style={{ backgroundImage: 'radial-gradient(circle, #e2e8f0 1px, transparent 1px)', backgroundSize: '32px 32px' }}
                aria-hidden="true"
            />
            <div className="absolute inset-x-0 top-20 -z-10 h-px bg-surface-200" aria-hidden="true" />

            <div className="mx-auto w-full max-w-6xl px-6 py-20">
                <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="order-2 lg:order-1">
                        <div className="mb-5 inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-primary-600 uppercase">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary-600" aria-hidden="true" />
                            {hero.role}
                        </div>
                        <h1 id="hero-heading" className="text-4xl leading-[1.1] font-bold tracking-tight text-surface-900 sm:text-5xl lg:text-6xl">
                            {hero.headline}
                        </h1>
                        <p className="mt-6 max-w-xl text-lg leading-relaxed text-surface-500">{hero.description}</p>

                        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                            <button
                                onClick={() => scrollTo('#portfolio')}
                                className="group inline-flex items-center gap-2.5 rounded-full bg-surface-900 px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-primary-600"
                            >
                                {hero.primary_cta_text}
                                <ArrowDown className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" aria-hidden="true" />
                            </button>
                            <button
                                onClick={() => scrollTo('#contact')}
                                className="group inline-flex items-center gap-2 border-b border-surface-300 pb-0.5 text-sm font-medium text-surface-700 transition-colors duration-200 hover:border-primary-600 hover:text-primary-600"
                            >
                                {hero.secondary_cta_text}
                                <Send className="h-3.5 w-3.5" aria-hidden="true" />
                            </button>
                            {hero.cv_url && (
                                <a
                                    href={`/storage/${hero.cv_url}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm font-medium text-surface-400 transition-colors duration-200 hover:text-surface-700"
                                    aria-label="View latest CV"
                                >
                                    <Download className="h-3.5 w-3.5" aria-hidden="true" />
                                    View CV
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Framed portrait — offset border frame instead of circular glow avatar */}
                    <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
                        <div className="relative w-full max-w-xs lg:max-w-sm">
                            <div
                                className="absolute inset-0 translate-x-3 translate-y-3 rounded-sm border border-surface-300"
                                aria-hidden="true"
                            />
                            <div className="relative aspect-4/5 overflow-hidden rounded-sm border border-surface-200 bg-surface-100">
                                {hero.photo_url ? (
                                    <img
                                        src={`/storage/${hero.photo_url}`}
                                        alt="Raihan Firdaus — Full-Stack Developer and Flutter Developer based in Surabaya, Indonesia"
                                        className="h-full w-full object-cover grayscale-15"
                                        loading="lazy"
                                        width={384}
                                        height={480}
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center">
                                        <span className="text-7xl font-bold text-primary-300">{hero.name?.charAt(0) ?? '?'}</span>
                                    </div>
                                )}
                            </div>
                            <div className="absolute -bottom-4 -left-4 inline-flex items-center gap-2 rounded-full border border-surface-200 bg-white px-3.5 py-2 shadow-sm">
                                <span
                                    className={`h-2 w-2 rounded-full ${hero.is_open_to_work ? 'bg-emerald-500' : 'bg-surface-300'}`}
                                    aria-hidden="true"
                                />
                                <span className="text-xs font-medium whitespace-nowrap text-surface-600">
                                    {hero.is_open_to_work ? 'Open to freelance work' : 'Not taking new projects'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
