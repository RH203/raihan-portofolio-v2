import { cn } from '@/lib/utils';
import { Code2, Database, Globe, LayoutDashboard, Smartphone, Wrench } from 'lucide-react';

// ---------------------------------------------------------------------------
// ServicesSection — hardcoded freelance service offerings for Raihan Firdaus.
// Content is intentionally static so it is always present in the initial HTML
// and consistently signals freelance availability to search engines.
// ---------------------------------------------------------------------------

interface Service {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    tags: string[];
}

const services: Service[] = [
    {
        icon: Globe,
        title: 'Laravel Web Application Development',
        description:
            'End-to-end web application development using Laravel — from architecture and business logic to deployment. Includes MVC structure, authentication, role-based access control (RBAC), and clean, maintainable code.',
        tags: ['Laravel', 'PHP', 'Livewire', 'RBAC'],
    },
    {
        icon: Code2,
        title: 'RESTful API & Back-End Development',
        description:
            'Design and development of scalable RESTful APIs using Laravel and PostgreSQL or MySQL. Includes Swagger documentation, input validation, security hardening, and database query optimization.',
        tags: ['Laravel', 'PostgreSQL', 'MySQL', 'Swagger'],
    },
    {
        icon: Smartphone,
        title: 'Flutter Mobile App Development',
        description:
            'Cross-platform mobile app development with Flutter and Dart for Android and iOS. Includes API integration, state management, and clean UI implementation from design to working app.',
        tags: ['Flutter', 'Dart', 'Mobile', 'API Integration'],
    },
    {
        icon: LayoutDashboard,
        title: 'Full-Stack Development & Admin Dashboards',
        description:
            'Full-stack web development covering front-end, back-end, and database layers. Includes building feature-rich admin dashboards with real-time UI using Laravel Livewire.',
        tags: ['Full-Stack', 'Livewire', 'TypeScript', 'React'],
    },
    {
        icon: Database,
        title: 'Database Design & Query Optimization',
        description:
            'Relational database design, indexing strategies, and query optimization for MySQL and PostgreSQL. Focused on reducing latency and improving application performance at scale.',
        tags: ['MySQL', 'PostgreSQL', 'Optimization', 'Schema Design'],
    },
    {
        icon: Wrench,
        title: 'Bug Fixing, Feature Development & Code Review',
        description:
            'Feature additions, bug investigation, and refactoring for existing Laravel or Flutter codebases. Includes PHPUnit testing, code quality improvements, and performance profiling.',
        tags: ['PHPUnit', 'Refactoring', 'Code Review', 'Testing'],
    },
];

interface ServicesSectionProps {
    isDevelopMode?: boolean;
}

export function ServicesSection({ isDevelopMode = false }: ServicesSectionProps) {
    return (
        <section
            id="services"
            className={cn('py-20', isDevelopMode ? 'bg-slate-950/80' : 'bg-white')}
            aria-labelledby="services-heading"
        >
            <div className="mx-auto max-w-6xl px-6">
                {/* Section header */}
                <div className="text-center mb-14">
                    <p
                        className={cn(
                            'font-medium text-sm tracking-wide uppercase mb-2',
                            isDevelopMode ? 'text-cyan-300' : 'text-primary-600',
                        )}
                    >
                        Available for Freelance Work
                    </p>
                    <h2
                        id="services-heading"
                        className={cn('text-3xl sm:text-4xl font-bold', isDevelopMode ? 'text-white' : 'text-surface-900')}
                    >
                        Services
                    </h2>
                    <p className={cn('mt-3 max-w-2xl mx-auto leading-relaxed', isDevelopMode ? 'text-slate-400' : 'text-surface-500')}>
                        I offer freelance software engineering services covering web development, back-end systems,
                        mobile apps, and API development. Whether you need a complete Laravel application, a robust
                        REST API, or a Flutter mobile app, I can help bring your project to life.
                    </p>
                </div>

                {/* Service cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => {
                        const Icon = service.icon;
                        return (
                            <div
                                key={service.title}
                                className={cn(
                                    'rounded-xl p-6 transition-all duration-300 hover:-translate-y-1',
                                    isDevelopMode
                                        ? 'border border-white/10 bg-white/5 shadow-sm shadow-cyan-950/10 hover:shadow-md hover:shadow-cyan-900/20'
                                        : 'border border-surface-100 bg-white shadow-sm hover:shadow-md',
                                )}
                            >
                                {/* Icon */}
                                <div
                                    className={cn(
                                        'flex h-11 w-11 items-center justify-center rounded-xl mb-4',
                                        isDevelopMode ? 'bg-cyan-400/10 text-cyan-300' : 'bg-primary-50 text-primary-600',
                                    )}
                                >
                                    <Icon className="h-5 w-5" aria-hidden="true" />
                                </div>

                                {/* Title */}
                                <h3
                                    className={cn(
                                        'font-semibold mb-2 leading-snug',
                                        isDevelopMode ? 'text-white' : 'text-surface-900',
                                    )}
                                >
                                    {service.title}
                                </h3>

                                {/* Description */}
                                <p className={cn('text-sm leading-relaxed mb-4', isDevelopMode ? 'text-slate-400' : 'text-surface-500')}>
                                    {service.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-1.5">
                                    {service.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className={cn(
                                                'px-2 py-0.5 rounded-md text-xs font-medium',
                                                isDevelopMode ? 'bg-slate-900 text-slate-300' : 'bg-surface-50 text-surface-600',
                                            )}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* CTA banner */}
                <div
                    className={cn(
                        'mt-14 rounded-2xl p-8 text-center',
                        isDevelopMode
                            ? 'border border-cyan-400/20 bg-cyan-400/5'
                            : 'border border-primary-100 bg-primary-50',
                    )}
                >
                    <h3
                        className={cn('text-xl font-semibold mb-2', isDevelopMode ? 'text-white' : 'text-surface-900')}
                    >
                        Looking for a freelance developer?
                    </h3>
                    <p className={cn('text-sm mb-6 max-w-xl mx-auto', isDevelopMode ? 'text-slate-400' : 'text-surface-500')}>
                        Available for freelance Laravel, back-end, full-stack, and Flutter mobile development projects.
                        Let's discuss your requirements and build something great together.
                    </p>
                    <a
                        href="#contact"
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={cn(
                            'inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 shadow-sm',
                            isDevelopMode
                                ? 'bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-cyan-400/20'
                                : 'bg-primary-600 text-white hover:bg-primary-700 shadow-primary-600/20 hover:shadow-md hover:shadow-primary-600/30',
                        )}
                    >
                        Contact Raihan Firdaus
                    </a>
                </div>
            </div>
        </section>
    );
}
