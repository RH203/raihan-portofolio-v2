import { cn } from '@/lib/utils';
import { DynamicIcon } from '@/components/ui/dynamic-icon';
import type { Skill } from '@/types';
import { useMemo } from 'react';

interface SkillsSectionProps {
    skills: Skill[];
    isDevelopMode?: boolean;
}

export function SkillsSection({ skills, isDevelopMode = false }: SkillsSectionProps) {
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
        <section
            id="skills"
            className={cn('py-20', isDevelopMode ? 'bg-slate-950/70' : 'bg-surface-50/50')}
            aria-labelledby="skills-heading"
        >
            <div className="mx-auto max-w-6xl px-6">
                <div className="text-center mb-14">
                    <p className={cn('font-medium text-sm tracking-wide uppercase mb-2', isDevelopMode ? 'text-cyan-300' : 'text-primary-600')}>
                        {isDevelopMode ? 'Current Stack' : 'What I Work With'}
                    </p>
                    <h2 id="skills-heading" className={cn('text-3xl sm:text-4xl font-bold', isDevelopMode ? 'text-white' : 'text-surface-900')}>
                        Skills & Technologies
                    </h2>
                    <p className={cn('mt-3 max-w-xl mx-auto', isDevelopMode ? 'text-slate-400' : 'text-surface-500')}>
                        {isDevelopMode ? 'Tools that keep the workflow fast, tidy, and fun to ship.' : 'Technologies and tools I use to bring ideas to life'}
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.from(grouped.entries()).map(([category, items]) => (
                        <div
                            key={category}
                            className={cn(
                                'rounded-xl p-6 transition-shadow duration-300',
                                isDevelopMode
                                    ? 'border border-white/10 bg-white/5 shadow-sm shadow-cyan-950/10 hover:shadow-md hover:shadow-cyan-900/20'
                                    : 'border border-surface-100 bg-white shadow-sm hover:shadow-md',
                            )}
                        >
                            <h3 className={cn('text-sm font-semibold uppercase tracking-wider mb-4', isDevelopMode ? 'text-cyan-300' : 'text-primary-600')}>
                                {category}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {items.map((skill) => (
                                    <span
                                        key={skill.id}
                                        className={cn(
                                            'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200',
                                            isDevelopMode
                                                ? 'bg-slate-900/80 text-slate-200 hover:bg-cyan-400/12 hover:text-cyan-200'
                                                : 'bg-surface-50 text-surface-700 hover:bg-primary-50 hover:text-primary-700',
                                        )}
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
