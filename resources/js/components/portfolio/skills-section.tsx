import { DynamicIcon } from '@/components/ui/dynamic-icon';
import type { Skill } from '@/types';
import { useMemo } from 'react';

interface SkillsSectionProps {
    skills: Skill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
    const grouped = useMemo(() => {
        const map = new Map<string, Skill[]>();
        skills.forEach((skill) => {
            const group = map.get(skill.category) || [];
            group.push(skill);
            map.set(skill.category, group);
        });
        return map;
    }, [skills]);

    if (skills.length === 0) return null;

    return (
        <section id="skills" className="py-20 bg-surface-50/50" aria-labelledby="skills-heading">
            <div className="mx-auto max-w-6xl px-6">
                <div className="text-center mb-14">
                    <p className="text-primary-600 font-medium text-sm tracking-wide uppercase mb-2">What I Work With</p>
                    <h2 id="skills-heading" className="text-3xl sm:text-4xl font-bold text-surface-900">
                        Skills & Technologies
                    </h2>
                    <p className="mt-3 text-surface-500 max-w-xl mx-auto">
                        Technologies and tools I use to bring ideas to life
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.from(grouped.entries()).map(([category, items]) => (
                        <div key={category} className="bg-white rounded-xl border border-surface-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                            <h3 className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-4">
                                {category}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {items.map((skill) => (
                                    <span
                                        key={skill.id}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-50 text-sm text-surface-700 font-medium hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                                    >
                                        <DynamicIcon name={skill.icon} className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
