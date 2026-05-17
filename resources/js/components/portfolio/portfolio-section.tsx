import { GitHubIcon } from '@/components/icons';
import type { Project } from '@/types';
import { ExternalLink, Star } from 'lucide-react';
import { useState } from 'react';

interface PortfolioSectionProps {
    projects: Project[];
}

export function PortfolioSection({ projects }: PortfolioSectionProps) {
    const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];
    const [active, setActive] = useState('All');

    const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active);

    if (projects.length === 0) return null;

    return (
        <section id="portfolio" className="py-20" aria-labelledby="portfolio-heading">
            <div className="mx-auto max-w-6xl px-6">
                <div className="text-center mb-14">
                    <p className="text-primary-600 font-medium text-sm tracking-wide uppercase mb-2">My Work</p>
                    <h2 id="portfolio-heading" className="text-3xl sm:text-4xl font-bold text-surface-900">Portfolio</h2>
                    <p className="mt-3 text-surface-500 max-w-xl mx-auto">A selection of projects I&apos;ve worked on</p>
                </div>

                {/* Category filters */}
                <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist" aria-label="Filter projects by category">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            role="tab"
                            aria-selected={active === cat}
                            onClick={() => setActive(cat)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                active === cat
                                    ? 'bg-primary-600 text-white shadow-sm'
                                    : 'text-surface-600 hover:bg-surface-100'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((project) => (
                        <article
                            key={project.id}
                            className="group bg-white rounded-xl border border-surface-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* Thumbnail */}
                            <div className="relative h-48 bg-gradient-to-br from-primary-50 to-primary-100 overflow-hidden">
                                {project.thumbnail_url ? (
                                    <img
                                        src={`/storage/${project.thumbnail_url}`}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full">
                                        <span className="text-4xl font-bold text-primary-300/60">{project.title.charAt(0)}</span>
                                    </div>
                                )}
                                {project.is_featured && (
                                    <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-warning-500 text-white text-xs font-medium shadow-sm">
                                        <Star className="h-3 w-3 fill-current" aria-hidden="true" />
                                        Featured
                                    </span>
                                )}
                            </div>

                            <div className="p-5">
                                <h3 className="font-semibold text-surface-900 group-hover:text-primary-600 transition-colors">
                                    {project.title}
                                </h3>
                                {project.description && (
                                    <p className="mt-2 text-sm text-surface-500 line-clamp-2">{project.description}</p>
                                )}

                                {project.technologies && project.technologies.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mt-3">
                                        {project.technologies.slice(0, 4).map((tech) => (
                                            <span key={tech} className="px-2 py-0.5 rounded-md bg-surface-50 text-xs text-surface-600 font-medium">
                                                {tech}
                                            </span>
                                        ))}
                                        {project.technologies.length > 4 && (
                                            <span className="px-2 py-0.5 rounded-md bg-surface-50 text-xs text-surface-400">
                                                +{project.technologies.length - 4}
                                            </span>
                                        )}
                                    </div>
                                )}

                                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-surface-100">
                                    {project.demo_url && (
                                        <a
                                            href={project.demo_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 text-sm text-primary-600 font-medium hover:text-primary-700 transition-colors"
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
                                            className="inline-flex items-center gap-1.5 text-sm text-surface-500 font-medium hover:text-surface-700 transition-colors"
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
