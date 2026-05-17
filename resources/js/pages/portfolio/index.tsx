import { ContactSection } from '@/components/portfolio/contact-section';
import { EducationSection } from '@/components/portfolio/education-section';
import { ExperienceSection } from '@/components/portfolio/experience-section';
import { Footer } from '@/components/portfolio/footer';
import { HeroSection } from '@/components/portfolio/hero-section';
import { Navbar } from '@/components/portfolio/navbar';
import { PortfolioSection } from '@/components/portfolio/portfolio-section';
import { SkillsSection } from '@/components/portfolio/skills-section';
import type { Education, Experience, Hero, Project, Skill } from '@/types';
import { Head } from '@inertiajs/react';

interface Props {
    hero: Hero | null;
    skills: Skill[];
    experiences: Experience[];
    education: Education[];
    projects: Project[];
}

export default function PortfolioIndex({ hero, skills, experiences, education, projects }: Props) {
    return (
        <>
            <Head>
                <title>{hero?.name ? `${hero.name} — ${hero.role}` : 'Portfolio'}</title>
                <meta name="description" content={hero?.description || 'Personal portfolio website'} />
            </Head>

            <Navbar />

            <main>
                <HeroSection hero={hero} />
                <SkillsSection skills={skills} />
                <ExperienceSection experiences={experiences} />
                <EducationSection education={education} />
                <PortfolioSection projects={projects} />
                <ContactSection />
            </main>

            <Footer />
        </>
    );
}
