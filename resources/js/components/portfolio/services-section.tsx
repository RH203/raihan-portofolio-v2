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
        <section id="services" className={cn('py-24', isDevelopMode ? 'bg-slate-950/80' : 'bg-surface-50/60')} aria-labelledby="services-heading">
            <div className="mx-auto max-w-6xl px-6">
                {/* Section header */}
                <div className="mb-12 grid gap-6 lg:grid-cols-[auto_1fr] lg:items-end">
                    <div className={cn('flex items-end gap-4 border-b pb-6 lg:border-0 lg:pb-0', isDevelopMode ? 'border-white/10' : 'border-surface-200')}>
                        <span className={cn('font-mono text-sm', isDevelopMode ? 'text-cyan-400' : 'text-primary-600')}>04</span>
                        <h2 id="services-heading" className={cn('text-3xl font-bold tracking-tight sm:text-4xl', isDevelopMode ? 'text-white' : 'text-surface-900')}>
                            Services
                        </h2>
                    </div>
                    <p className={cn('border-b pb-6 text-sm leading-relaxed lg:max-w-xl lg:border-0 lg:pb-0', isDevelopMode ? 'border-white/10 text-slate-400' : 'border-surface-200 text-surface-500')}>
                        Freelance software engineering across web, back-end, and mobile — Laravel applications, REST
                        APIs, full-stack dashboards, and Flutter apps, end to end.
                    </p>
                </div>

                {/* Service grid — bordered cells like a spec sheet, not repeated icon cards */}
                <div className={cn('grid border-t border-l sm:grid-cols-2', isDevelopMode ? 'border-white/10' : 'border-surface-200')}>
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <div
                                key={service.title}
                                className={cn(
                                    'border-r border-b p-7 transition-colors duration-200',
                                    isDevelopMode ? 'border-white/10 hover:bg-white/3' : 'border-surface-200 hover:bg-white',
                                )}
                            >
                                <div className="mb-5 flex items-center justify-between">
                                    <span className={cn('font-mono text-xs', isDevelopMode ? 'text-slate-500' : 'text-surface-400')}>0{index + 1}</span>
                                    <Icon className={cn('h-5 w-5', isDevelopMode ? 'text-cyan-300' : 'text-primary-600')} aria-hidden="true" />
                                </div>

                                <h3 className={cn('mb-2 leading-snug font-semibold', isDevelopMode ? 'text-white' : 'text-surface-900')}>{service.title}</h3>

                                <p className={cn('mb-4 text-sm leading-relaxed', isDevelopMode ? 'text-slate-400' : 'text-surface-500')}>{service.description}</p>

                                <p className={cn('font-mono text-xs tracking-wide', isDevelopMode ? 'text-slate-500' : 'text-surface-400')}>
                                    {service.tags.join('  ·  ')}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* CTA */}
                <div
                    className={cn(
                        'mt-12 flex flex-col items-start gap-6 border-l-2 py-1 pl-6 sm:flex-row sm:items-center sm:justify-between',
                        isDevelopMode ? 'border-cyan-400/40' : 'border-primary-600',
                    )}
                >
                    <div>
                        <h3 className={cn('text-lg font-semibold', isDevelopMode ? 'text-white' : 'text-surface-900')}>
                            Looking for a freelance developer?
                        </h3>
                        <p className={cn('mt-1 max-w-xl text-sm', isDevelopMode ? 'text-slate-400' : 'text-surface-500')}>
                            Available for Laravel, back-end, full-stack, and Flutter mobile projects — let's build something great together.
                        </p>
                    </div>
                    <a
                        href="#contact"
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={cn(
                            'inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200',
                            isDevelopMode ? 'bg-cyan-400 text-slate-950 hover:bg-cyan-300' : 'bg-surface-900 text-white hover:bg-primary-600',
                        )}
                    >
                        Contact Raihan Firdaus
                    </a>
                </div>
            </div>
        </section>
    );
}
