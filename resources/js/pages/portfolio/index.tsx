import { ContactSection } from '@/components/portfolio/contact-section';
import { EducationSection } from '@/components/portfolio/education-section';
import { ExperienceSection } from '@/components/portfolio/experience-section';
import { Footer } from '@/components/portfolio/footer';
import { HeroSection } from '@/components/portfolio/hero-section';
import { Navbar } from '@/components/portfolio/navbar';
import { PortfolioSection } from '@/components/portfolio/portfolio-section';
import { SkillsSection } from '@/components/portfolio/skills-section';
import type { Education, Experience, Hero, Project, Skill, SocialLink } from '@/types';
import { Head } from '@inertiajs/react';

interface Props {
    hero: Hero | null;
    skills: Skill[];
    experiences: Experience[];
    education: Education[];
    projects: Project[];
    socialLinks: SocialLink[];
}

export default function PortfolioIndex({ hero, skills, experiences, education, projects, socialLinks }: Props) {
    const isDevelopMode = hero?.develop_mode ?? false;

    return (
        <>
            <Head>
                <title>{hero?.name ? `${hero.name} — ${hero.role}` : 'Portfolio'}</title>
                <meta name="description" content={hero?.description || 'Personal portfolio website'} />
            </Head>

            {isDevelopMode ? (
                <main>
                    <HeroSection hero={hero} />
                </main>
            ) : (
                <div className="min-h-screen">
                    <Navbar isDevelopMode={false} />

                    <main>
                        <HeroSection hero={hero} />
                        <SkillsSection skills={skills} isDevelopMode={false} />
                        <ExperienceSection experiences={experiences} />
                        <EducationSection education={education} />
                        <PortfolioSection projects={projects} isDevelopMode={false} />
                        <ContactSection socialLinks={socialLinks} />
                    </main>

                    <Footer socialLinks={socialLinks} isDevelopMode={false} />
                </div>
            )}
        </>
    );
}
