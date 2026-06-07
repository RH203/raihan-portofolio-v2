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
        <section id="skills" className={cn('py-24', isDevelopMode ? 'bg-slate-950/70' : 'bg-white')} aria-labelledby="skills-heading">
            <div className="mx-auto max-w-5xl px-6">
                <div className={cn('mb-12 flex items-end gap-4 border-b pb-6', isDevelopMode ? 'border-white/10' : 'border-surface-200')}>
                    <span className={cn('font-mono text-sm', isDevelopMode ? 'text-cyan-400' : 'text-primary-600')}>01</span>
                    <div>
                        <h2 id="skills-heading" className={cn('text-3xl font-bold tracking-tight sm:text-4xl', isDevelopMode ? 'text-white' : 'text-surface-900')}>
                            Skills &amp; Technologies
                        </h2>
                        <p className={cn('mt-1.5 text-sm', isDevelopMode ? 'text-slate-400' : 'text-surface-500')}>
                            {isDevelopMode ? 'Tools that keep the workflow fast, tidy, and fun to ship.' : 'Technologies and tools I use to bring ideas to life'}
                        </p>
                    </div>
                </div>

                <dl className="space-y-0">
                    {Array.from(grouped.entries()).map(([category, items]) => (
                        <div
                            key={category}
                            className={cn(
                                'grid gap-x-8 gap-y-3 border-b py-6 sm:grid-cols-[180px_1fr] sm:items-baseline',
                                isDevelopMode ? 'border-white/10' : 'border-surface-100',
                            )}
                        >
                            <dt className={cn('text-sm font-semibold tracking-wide uppercase', isDevelopMode ? 'text-cyan-300' : 'text-surface-900')}>
                                {category}
                            </dt>
                            <dd className="flex flex-wrap gap-x-5 gap-y-2.5">
                                {items.map((skill) => (
                                    <span
                                        key={skill.id}
                                        className={cn(
                                            'inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200',
                                            isDevelopMode ? 'text-slate-300 hover:text-cyan-300' : 'text-surface-600 hover:text-primary-600',
                                        )}
                                    >
                                        <DynamicIcon name={skill.icon} className="h-4 w-4 shrink-0 opacity-70" aria-hidden="true" />
                                        {skill.name}
                                    </span>
                                ))}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
