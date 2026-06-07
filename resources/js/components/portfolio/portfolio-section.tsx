import { cn } from '@/lib/utils';
import { GitHubIcon } from '@/components/icons';
import type { Project } from '@/types';
import { ExternalLink, Star } from 'lucide-react';
import { useState } from 'react';

interface PortfolioSectionProps {
    projects: Project[];
    isDevelopMode?: boolean;
}

export function PortfolioSection({ projects, isDevelopMode = false }: PortfolioSectionProps) {
    const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];
    const [active, setActive] = useState('All');

    const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active);

    if (projects.length === 0) return null;

    return (
        // The outer div provides the #projects anchor for SEO-friendly navigation
        // while preserving the existing #portfolio anchor on the section itself.
        <div id="projects">
        <section id="portfolio" className={cn('py-24', isDevelopMode ? 'bg-[#08111f]' : undefined)} aria-labelledby="portfolio-heading">
            <div className="mx-auto max-w-6xl px-6">
                <div
                    className={cn(
                        'mb-10 flex flex-col gap-6 border-b pb-6 sm:flex-row sm:items-end sm:justify-between',
                        isDevelopMode ? 'border-white/10' : 'border-surface-200',
                    )}
                >
                    <div className="flex items-end gap-4">
                        <span className={cn('font-mono text-sm', isDevelopMode ? 'text-cyan-400' : 'text-primary-600')}>03</span>
                        <div>
                            <h2 id="portfolio-heading" className={cn('text-3xl font-bold tracking-tight sm:text-4xl', isDevelopMode ? 'text-white' : 'text-surface-900')}>
                                Portfolio
                            </h2>
                            <p className={cn('mt-1.5 text-sm', isDevelopMode ? 'text-slate-400' : 'text-surface-500')}>
                                {isDevelopMode ? 'Projects that came out of sketchpads, commits, and a few good late-night ideas.' : "A selection of projects I've worked on"}
                            </p>
                        </div>
                    </div>

                    {/* Category filters — underline tabs */}
                    <div className="flex flex-wrap gap-x-5 gap-y-2" role="tablist" aria-label="Filter projects by category">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                role="tab"
                                aria-selected={active === cat}
                                onClick={() => setActive(cat)}
                                className={cn(
                                    'border-b-2 pb-1 text-sm font-medium transition-colors duration-200',
                                    isDevelopMode
                                        ? active === cat
                                            ? 'border-cyan-400 text-cyan-300'
                                            : 'border-transparent text-slate-400 hover:text-white'
                                        : active === cat
                                          ? 'border-primary-600 text-surface-900'
                                          : 'border-transparent text-surface-500 hover:text-surface-900',
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((project) => (
                        <article key={project.id} className="group">
                            {/* Thumbnail — bleeds to edge, no card chrome */}
                            <div
                                className={cn(
                                    'relative aspect-4/3 overflow-hidden border',
                                    isDevelopMode
                                        ? 'border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950'
                                        : 'border-surface-200 bg-surface-50',
                                )}
                            >
                                {project.thumbnail_url ? (
                                    <img
                                        src={`/storage/${project.thumbnail_url}`}
                                        alt={`${project.title} — project by Raihan Firdaus`}
                                        className="h-full w-full object-cover grayscale-30 transition-all duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                                        loading="lazy"
                                        width={480}
                                        height={360}
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center">
                                        <span className={cn('text-4xl font-bold', isDevelopMode ? 'text-cyan-200/40' : 'text-primary-300/50')}>
                                            {project.title.charAt(0)}
                                        </span>
                                    </div>
                                )}
                                {project.is_featured && (
                                    <span
                                        className={cn(
                                            'absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-1 text-xs font-medium',
                                            isDevelopMode ? 'bg-emerald-400 text-slate-950' : 'bg-surface-900 text-white',
                                        )}
                                    >
                                        <Star className="h-3 w-3 fill-current" aria-hidden="true" />
                                        Featured
                                    </span>
                                )}
                            </div>

                            <div className="pt-4">
                                <div className="flex items-start justify-between gap-3">
                                    <h3
                                        className={cn(
                                            'font-semibold transition-colors',
                                            isDevelopMode ? 'text-white group-hover:text-cyan-300' : 'text-surface-900 group-hover:text-primary-600',
                                        )}
                                    >
                                        {project.title}
                                    </h3>
                                    <div className="flex shrink-0 items-center gap-3 pt-0.5">
                                        {project.demo_url && (
                                            <a
                                                href={project.demo_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`Open live demo of ${project.title}`}
                                                className={cn(
                                                    'transition-colors',
                                                    isDevelopMode ? 'text-slate-400 hover:text-cyan-300' : 'text-surface-400 hover:text-primary-600',
                                                )}
                                            >
                                                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                                            </a>
                                        )}
                                        {project.repository_url && (
                                            <a
                                                href={project.repository_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`Open source code of ${project.title}`}
                                                className={cn(
                                                    'transition-colors',
                                                    isDevelopMode ? 'text-slate-400 hover:text-white' : 'text-surface-400 hover:text-surface-700',
                                                )}
                                            >
                                                <GitHubIcon className="h-4 w-4" aria-hidden="true" />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {project.description && (
                                    <p className={cn('mt-1.5 line-clamp-2 text-sm leading-relaxed', isDevelopMode ? 'text-slate-400' : 'text-surface-500')}>
                                        {project.description}
                                    </p>
                                )}

                                {project.technologies && project.technologies.length > 0 && (
                                    <p className={cn('mt-2.5 font-mono text-xs tracking-wide', isDevelopMode ? 'text-slate-500' : 'text-surface-400')}>
                                        {project.technologies.slice(0, 4).join('  ·  ')}
                                        {project.technologies.length > 4 && `  ·  +${project.technologies.length - 4}`}
                                    </p>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
        </div>
    );
}
