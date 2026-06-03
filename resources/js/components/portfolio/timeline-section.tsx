import type { Education, Experience } from '@/types';
import { Briefcase, GraduationCap, MapPin } from 'lucide-react';

interface Props {
    experiences: Experience[];
    education: Education[];
}

type TimelineItem =
    | { kind: 'work'; data: Experience; sortYear: number }
    | { kind: 'edu'; data: Education; sortYear: number };

function expDate(exp: Experience) {
    return new Date(exp.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function expEndDate(exp: Experience) {
    if (exp.is_current) return 'Present';
    if (!exp.end_date) return '';
    return new Date(exp.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function TimelineSection({ experiences, education }: Props) {
    if (experiences.length === 0 && education.length === 0) return null;

    const items: TimelineItem[] = [
        ...experiences.map((e) => ({
            kind: 'work' as const,
            data: e,
            sortYear: e.is_current ? 9999 : new Date(e.end_date ?? e.start_date).getFullYear(),
        })),
        ...education.map((e) => ({
            kind: 'edu' as const,
            data: e,
            sortYear: e.end_year ?? 9998,
        })),
    ].sort((a, b) => b.sortYear - a.sortYear);

    return (
        <section id="timeline" className="py-20" aria-labelledby="timeline-heading">
            <div className="mx-auto max-w-5xl px-6">
                <div className="text-center mb-14">
                    <p className="text-primary-600 font-medium text-sm tracking-wide uppercase mb-2">My Journey</p>
                    <h2 id="timeline-heading" className="text-3xl sm:text-4xl font-bold text-surface-900">
                        Experience &amp; Education
                    </h2>
                    <p className="mt-3 text-surface-500 max-w-xl mx-auto">
                        A timeline of my professional career and academic background
                    </p>
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center gap-6 mb-10">
                    <span className="flex items-center gap-1.5 text-sm text-surface-500">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-100">
                            <Briefcase className="h-3.5 w-3.5 text-primary-600" />
                        </span>
                        Work
                    </span>
                    <span className="flex items-center gap-1.5 text-sm text-surface-500">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                            <GraduationCap className="h-3.5 w-3.5 text-emerald-600" />
                        </span>
                        Education
                    </span>
                </div>

                <div className="relative">
                    {/* Center vertical line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-surface-200 hidden md:block" aria-hidden="true" />

                    <div className="space-y-8">
                        {items.map((item, idx) => {
                            const isLeft = idx % 2 === 0;
                            const isWork = item.kind === 'work';

                            const iconBg  = isWork ? 'bg-primary-100' : 'bg-emerald-100';
                            const iconFg  = isWork ? 'text-primary-600' : 'text-emerald-600';
                            const dotBg   = isWork ? 'border-primary-300 bg-primary-50' : 'border-emerald-300 bg-emerald-50';
                            const dotFill = isWork ? 'bg-primary-500' : 'bg-emerald-500';

                            return (
                                <div key={`${item.kind}-${item.data.id}`} className="relative">
                                    {/* Desktop: alternating layout */}
                                    <div className={`hidden md:flex items-start gap-8 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
                                        {/* Card */}
                                        <div className="flex-1">
                                            <div className={`bg-white rounded-xl border border-surface-100 p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 ${isLeft ? 'ml-auto' : 'mr-auto'}`}>
                                                <TimelineCard item={item} iconBg={iconBg} iconFg={iconFg} />
                                            </div>
                                        </div>

                                        {/* Center dot */}
                                        <div className="shrink-0 flex flex-col items-center" style={{ width: 20 }}>
                                            <div className={`h-5 w-5 rounded-full border-2 ${dotBg} flex items-center justify-center`}>
                                                <div className={`h-2 w-2 rounded-full ${dotFill}`} />
                                            </div>
                                        </div>

                                        {/* Spacer */}
                                        <div className="flex-1" />
                                    </div>

                                    {/* Mobile: single column with left line */}
                                    <div className="md:hidden flex items-start gap-4 pl-10 relative">
                                        <div className="absolute left-3.5 top-2.5 -translate-x-1/2">
                                            <div className={`h-4 w-4 rounded-full border-2 ${dotBg} flex items-center justify-center`}>
                                                <div className={`h-1.5 w-1.5 rounded-full ${dotFill}`} />
                                            </div>
                                        </div>
                                        <div className="absolute left-3.5 top-0 bottom-0 w-px bg-surface-200 -translate-x-1/2" aria-hidden="true" />
                                        <div className="flex-1 bg-white rounded-xl border border-surface-100 p-4 shadow-sm">
                                            <TimelineCard item={item} iconBg={iconBg} iconFg={iconFg} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

function TimelineCard({ item, iconBg, iconFg }: { item: TimelineItem; iconBg: string; iconFg: string }) {
    if (item.kind === 'work') {
        const exp = item.data;
        return (
            <div>
                <div className="flex items-start gap-3 mb-3">
                    <div className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconBg} ${iconFg}`}>
                        <Briefcase className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold text-surface-900">{exp.title}</h3>
                        <p className={`text-xs font-medium mt-0.5 ${iconFg}`}>{exp.organization}</p>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-surface-500 bg-surface-50 px-2 py-0.5 rounded-full">
                        {expDate(exp)} — {expEndDate(exp)}
                    </span>
                    {exp.location && (
                        <span className="flex items-center gap-0.5 text-xs text-surface-400">
                            <MapPin className="h-3 w-3" /> {exp.location}
                        </span>
                    )}
                </div>
                {exp.description && <p className="text-xs text-surface-500 leading-relaxed mb-2">{exp.description}</p>}
                {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="space-y-1">
                        {exp.achievements.map((a, i) => (
                            <li key={i} className="flex items-start gap-1.5 text-xs text-surface-600">
                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary-400" />
                                {a}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }

    const edu = item.data;
    return (
        <div>
            <div className="flex items-start gap-3 mb-2">
                <div className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconBg} ${iconFg}`}>
                    <GraduationCap className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-surface-900">{edu.institution}</h3>
                    <p className={`text-xs font-medium mt-0.5 ${iconFg}`}>{edu.program}</p>
                </div>
            </div>
            <span className="text-xs text-surface-400">
                {edu.start_year} — {edu.end_year ?? 'Present'}
            </span>
            {edu.description && <p className="text-xs text-surface-500 leading-relaxed mt-2">{edu.description}</p>}
        </div>
    );
}
