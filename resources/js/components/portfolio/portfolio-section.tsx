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
        <section id="portfolio" className={cn('py-20', isDevelopMode ? 'bg-[#08111f]' : undefined)} aria-labelledby="portfolio-heading">
            <div className="mx-auto max-w-6xl px-6">
                <div className="text-center mb-14">
                    <p className={cn('font-medium text-sm tracking-wide uppercase mb-2', isDevelopMode ? 'text-cyan-300' : 'text-primary-600')}>
                        {isDevelopMode ? 'Recent Builds' : 'My Work'}
                    </p>
                    <h2 id="portfolio-heading" className={cn('text-3xl sm:text-4xl font-bold', isDevelopMode ? 'text-white' : 'text-surface-900')}>Portfolio</h2>
                    <p className={cn('mt-3 max-w-xl mx-auto', isDevelopMode ? 'text-slate-400' : 'text-surface-500')}>
                        {isDevelopMode ? 'Projects that came out of sketchpads, commits, and a few good late-night ideas.' : 'A selection of projects I&apos;ve worked on'}
                    </p>
                </div>

                {/* Category filters */}
                <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist" aria-label="Filter projects by category">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            role="tab"
                            aria-selected={active === cat}
                            onClick={() => setActive(cat)}
                            className={cn(
                                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                                isDevelopMode
                                    ? active === cat
                                        ? 'bg-cyan-400 text-slate-950 shadow-sm shadow-cyan-400/20'
                                        : 'text-slate-300 hover:bg-white/5'
                                    : active === cat
                                      ? 'bg-primary-600 text-white shadow-sm'
                                      : 'text-surface-600 hover:bg-surface-100',
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((project) => (
                        <article
                            key={project.id}
                            className={cn(
                                'group overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1',
                                isDevelopMode
                                    ? 'border border-white/10 bg-white/5 shadow-sm shadow-cyan-950/10 hover:shadow-lg hover:shadow-cyan-950/20'
                                    : 'border border-surface-100 bg-white shadow-sm hover:shadow-lg',
                            )}
                        >
                            {/* Thumbnail */}
                            <div
                                className={cn(
                                    'relative h-48 overflow-hidden',
                                    isDevelopMode
                                        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950'
                                        : 'bg-gradient-to-br from-primary-50 to-primary-100',
                                )}
                            >
                                {project.thumbnail_url ? (
                                    <img
                                        src={`/storage/${project.thumbnail_url}`}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full">
                                        <span className={cn('text-4xl font-bold', isDevelopMode ? 'text-cyan-200/50' : 'text-primary-300/60')}>
                                            {project.title.charAt(0)}
                                        </span>
                                    </div>
                                )}
                                {project.is_featured && (
                                    <span
                                        className={cn(
                                            'absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium shadow-sm',
                                            isDevelopMode ? 'bg-emerald-400 text-slate-950' : 'bg-warning-500 text-white',
                                        )}
                                    >
                                        <Star className="h-3 w-3 fill-current" aria-hidden="true" />
                                        Featured
                                    </span>
                                )}
                            </div>

                            <div className="p-5">
                                <h3 className={cn('font-semibold transition-colors', isDevelopMode ? 'text-white group-hover:text-cyan-300' : 'text-surface-900 group-hover:text-primary-600')}>
                                    {project.title}
                                </h3>
                                {project.description && (
                                    <p className={cn('mt-2 text-sm line-clamp-2', isDevelopMode ? 'text-slate-400' : 'text-surface-500')}>{project.description}</p>
                                )}

                                {project.technologies && project.technologies.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mt-3">
                                        {project.technologies.slice(0, 4).map((tech) => (
                                            <span
                                                key={tech}
                                                className={cn(
                                                    'px-2 py-0.5 rounded-md text-xs font-medium',
                                                    isDevelopMode ? 'bg-slate-900 text-slate-300' : 'bg-surface-50 text-surface-600',
                                                )}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {project.technologies.length > 4 && (
                                            <span className={cn('px-2 py-0.5 rounded-md text-xs', isDevelopMode ? 'bg-slate-900 text-slate-500' : 'bg-surface-50 text-surface-400')}>
                                                +{project.technologies.length - 4}
                                            </span>
                                        )}
                                    </div>
                                )}

                                <div className={cn('flex items-center gap-3 mt-4 pt-4 border-t', isDevelopMode ? 'border-white/10' : 'border-surface-100')}>
                                    {project.demo_url && (
                                        <a
                                            href={project.demo_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={cn(
                                                'inline-flex items-center gap-1.5 text-sm font-medium transition-colors',
                                                isDevelopMode ? 'text-cyan-300 hover:text-cyan-200' : 'text-primary-600 hover:text-primary-700',
                                            )}
                                        >
                                            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                                            Live Demo
                                        </a>
                                    )}
                                    {project.repository_url && (
                                        <a
                                            href={project.repository_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={cn(
                                                'inline-flex items-center gap-1.5 text-sm font-medium transition-colors',
                                                isDevelopMode ? 'text-slate-300 hover:text-white' : 'text-surface-500 hover:text-surface-700',
                                            )}
                                        >
                                            <GitHubIcon className="h-3.5 w-3.5" aria-hidden="true" />
                                            Source
                                        </a>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
