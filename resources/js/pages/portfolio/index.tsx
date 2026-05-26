import { ContactSection } from '@/components/portfolio/contact-section';
import { EducationSection } from '@/components/portfolio/education-section';
import { ExperienceSection } from '@/components/portfolio/experience-section';
import { Footer } from '@/components/portfolio/footer';
import { HeroSection } from '@/components/portfolio/hero-section';
import { Navbar } from '@/components/portfolio/navbar';
import { PortfolioSection } from '@/components/portfolio/portfolio-section';
import { ServicesSection } from '@/components/portfolio/services-section';
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

// ---------------------------------------------------------------------------
// SEO constants — hardcoded for keyword consistency regardless of DB content.
// Update SITE_URL to your real production domain before deploying.
// ---------------------------------------------------------------------------
const SITE_URL = 'https://www.raihanfirdaus.tech';
const SEO_TITLE = 'Raihan Firdaus — Full-Stack & Flutter Developer | Surabaya, Indonesia';
const SEO_DESCRIPTION =
    'Raihan Firdaus is a freelance Full-Stack Developer, Back-End Developer, and Flutter Developer based in Surabaya, East Java, Indonesia. Specializing in Laravel, RESTful API development, Livewire, and Flutter mobile app development. Available for freelance web and mobile development projects.';
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

// JSON-LD structured data — Person + WebSite + ProfilePage schemas.
const jsonLd = JSON.stringify([
    {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Raihan Firdaus',
        url: SITE_URL,
        image: OG_IMAGE,
        jobTitle: 'Full-Stack Developer & Flutter Developer',
        description:
            'Informatics Engineering student and freelance software engineer based in Surabaya, East Java, Indonesia. Specializing in Laravel, RESTful API development, and Flutter mobile app development.',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Surabaya',
            addressRegion: 'East Java',
            addressCountry: 'ID',
        },
        email: 'rfirdaus.firdaus1@gmail.com',
        sameAs: ['https://github.com/RH203', 'https://linkedin.com/in/rraihanfirdaus/'],
        knowsAbout: [
            'Laravel',
            'PHP',
            'Flutter',
            'Dart',
            'Back-End Development',
            'Full-Stack Development',
            'Mobile App Development',
            'RESTful API Development',
            'Livewire',
            'MySQL',
            'PostgreSQL',
            'Swagger',
            'Database Optimization',
            'TypeScript',
            'JavaScript',
            'Python',
            'Go',
        ],
        alumniOf: {
            '@type': 'EducationalOrganization',
            name: 'Telkom University Surabaya',
            url: 'https://surabaya.telkomuniversity.ac.id',
        },
    },
    {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Raihan Firdaus — Portfolio',
        url: SITE_URL,
        description:
            'Official portfolio of Raihan Firdaus, freelance full-stack and Flutter developer from Surabaya, Indonesia.',
    },
    {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        name: 'Raihan Firdaus — Full-Stack & Flutter Developer',
        url: SITE_URL,
        mainEntity: {
            '@type': 'Person',
            name: 'Raihan Firdaus',
        },
    },
]);

export default function PortfolioIndex({ hero, skills, experiences, education, projects, socialLinks }: Props) {
    const isDevelopMode = hero?.develop_mode ?? false;

    return (
        <>
            <Head>
                {/* Primary SEO */}
                <title>{SEO_TITLE}</title>
                <meta name="description" content={SEO_DESCRIPTION} />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={SITE_URL} />

                {/* Open Graph */}
                <meta property="og:type" content="profile" />
                <meta property="og:title" content={SEO_TITLE} />
                <meta property="og:description" content={SEO_DESCRIPTION} />
                <meta property="og:url" content={SITE_URL} />
                <meta property="og:image" content={OG_IMAGE} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="Raihan Firdaus — Full-Stack & Flutter Developer" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:site_name" content="Raihan Firdaus Portfolio" />
                <meta property="profile:first_name" content="Raihan" />
                <meta property="profile:last_name" content="Firdaus" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={SEO_TITLE} />
                <meta name="twitter:description" content={SEO_DESCRIPTION} />
                <meta name="twitter:image" content={OG_IMAGE} />
                <meta name="twitter:image:alt" content="Raihan Firdaus — Full-Stack & Flutter Developer" />

                {/* Additional identity signals */}
                <meta name="author" content="Raihan Firdaus" />
                <meta
                    name="keywords"
                    content="Raihan Firdaus, Laravel developer, Flutter developer, backend developer, full-stack developer, mobile developer, freelance software engineer, Surabaya developer, Indonesia developer, RESTful API developer"
                />

                {/* JSON-LD Structured Data */}
                <script type="application/ld+json">{jsonLd}</script>
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
                        <ServicesSection />
                        <ContactSection socialLinks={socialLinks} />
                    </main>

                    <Footer socialLinks={socialLinks} isDevelopMode={false} />
                </div>
            )}
        </>
    );
}
