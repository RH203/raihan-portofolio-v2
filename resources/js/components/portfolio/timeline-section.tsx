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
        <section id="timeline" className="py-24" aria-labelledby="timeline-heading">
            <div className="mx-auto max-w-4xl px-6">
                <div className="mb-12 flex items-end gap-4 border-b border-surface-200 pb-6">
                    <span className="font-mono text-sm text-primary-600">02</span>
                    <div>
                        <h2 id="timeline-heading" className="text-3xl font-bold tracking-tight text-surface-900 sm:text-4xl">
                            Experience &amp; Education
                        </h2>
                        <p className="mt-1.5 text-sm text-surface-500">A timeline of my professional career and academic background</p>
                    </div>
                </div>

                <div>
                    {items.map((item) => {
                        const isWork = item.kind === 'work';
                        const accent = isWork ? 'text-primary-600' : 'text-emerald-600';
                        const Icon = isWork ? Briefcase : GraduationCap;

                        const dateLabel = isWork
                            ? `${expDate(item.data)} — ${expEndDate(item.data)}`
                            : `${item.data.start_year} — ${item.data.end_year ?? 'Present'}`;

                        const title = isWork ? item.data.title : item.data.institution;
                        const org = isWork ? item.data.organization : item.data.program;
                        const description = item.data.description;

                        return (
                            <article
                                key={`${item.kind}-${item.data.id}`}
                                className="grid gap-x-6 gap-y-2 border-b border-surface-100 py-7 sm:grid-cols-[150px_1fr] sm:gap-y-0"
                            >
                                <div className="font-mono text-xs tracking-wide text-surface-400 sm:pt-1">{dateLabel}</div>

                                <div>
                                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                                        <h3 className="flex items-center gap-2 font-semibold text-surface-900">
                                            <Icon className={`h-4 w-4 shrink-0 ${accent}`} aria-hidden="true" />
                                            {title}
                                        </h3>
                                        <span className={`text-sm font-medium ${accent}`}>{org}</span>
                                    </div>

                                    {isWork && item.data.location && (
                                        <span className="mt-1 flex items-center gap-1 text-xs text-surface-400">
                                            <MapPin className="h-3 w-3" /> {item.data.location}
                                        </span>
                                    )}

                                    {description && <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-surface-500">{description}</p>}

                                    {isWork && item.data.achievements && item.data.achievements.length > 0 && (
                                        <ul className="mt-2.5 space-y-1.5">
                                            {item.data.achievements.map((a, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-surface-600">
                                                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-surface-300" />
                                                    {a}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
