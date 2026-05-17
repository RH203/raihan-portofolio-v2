import type { Experience } from '@/types';
import { Briefcase, MapPin } from 'lucide-react';

interface ExperienceSectionProps {
    experiences: Experience[];
}

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
    if (experiences.length === 0) return null;

    return (
        <section id="experience" className="py-20" aria-labelledby="experience-heading">
            <div className="mx-auto max-w-6xl px-6">
                <div className="text-center mb-14">
                    <p className="text-primary-600 font-medium text-sm tracking-wide uppercase mb-2">Career Journey</p>
                    <h2 id="experience-heading" className="text-3xl sm:text-4xl font-bold text-surface-900">
                        Work Experience
                    </h2>
                    <p className="mt-3 text-surface-500 max-w-xl mx-auto">
                        My professional experience and career highlights
                    </p>
                </div>

                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-6 top-0 bottom-0 w-px bg-surface-200 hidden md:block" aria-hidden="true" />

                    <div className="space-y-8">
                        {experiences.map((exp, index) => (
                            <div key={exp.id} className="relative md:pl-16 group">
                                {/* Timeline dot */}
                                <div className="absolute left-4 top-6 hidden md:flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary-300 bg-white group-hover:border-primary-500 transition-colors" aria-hidden="true">
                                    <div className="h-2 w-2 rounded-full bg-primary-500" />
                                </div>

                                <div className="bg-white rounded-xl border border-surface-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                                        <div>
                                            <h3 className="text-lg font-semibold text-surface-900">{exp.title}</h3>
                                            <p className="text-primary-600 font-medium text-sm flex items-center gap-1.5 mt-0.5">
                                                <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
                                                {exp.organization}
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-start sm:items-end gap-1">
                                            <span className="text-xs font-medium text-surface-500 bg-surface-50 px-2.5 py-1 rounded-full whitespace-nowrap">
                                                {formatDate(exp.start_date)} — {exp.is_current ? 'Present' : exp.end_date ? formatDate(exp.end_date) : ''}
                                            </span>
                                            {exp.location && (
                                                <span className="text-xs text-surface-400 flex items-center gap-1">
                                                    <MapPin className="h-3 w-3" aria-hidden="true" />
                                                    {exp.location}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {exp.description && (
                                        <p className="text-sm text-surface-500 leading-relaxed mb-3">{exp.description}</p>
                                    )}

                                    {exp.achievements && exp.achievements.length > 0 && (
                                        <ul className="space-y-1.5" aria-label="Achievements">
                                            {exp.achievements.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-surface-600">
                                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary-400 flex-shrink-0" aria-hidden="true" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
