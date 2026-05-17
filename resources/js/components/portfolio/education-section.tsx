import type { Education } from '@/types';
import { GraduationCap } from 'lucide-react';

interface EducationSectionProps {
    education: Education[];
}

export function EducationSection({ education }: EducationSectionProps) {
    if (education.length === 0) return null;

    return (
        <section id="education" className="py-20 bg-surface-50/50" aria-labelledby="education-heading">
            <div className="mx-auto max-w-6xl px-6">
                <div className="text-center mb-14">
                    <p className="text-primary-600 font-medium text-sm tracking-wide uppercase mb-2">Learning Path</p>
                    <h2 id="education-heading" className="text-3xl sm:text-4xl font-bold text-surface-900">Education</h2>
                    <p className="mt-3 text-surface-500 max-w-xl mx-auto">My academic background and certifications</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {education.map((edu) => (
                        <div
                            key={edu.id}
                            className="bg-white rounded-xl border border-surface-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600 flex-shrink-0">
                                    <GraduationCap className="h-5 w-5" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-base font-semibold text-surface-900">{edu.institution}</h3>
                                    <p className="text-sm text-primary-600 font-medium mt-0.5">{edu.program}</p>
                                    <p className="text-xs text-surface-400 mt-1">
                                        {edu.start_year} — {edu.end_year || 'Present'}
                                    </p>
                                    {edu.description && (
                                        <p className="text-sm text-surface-500 mt-3 leading-relaxed">{edu.description}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
