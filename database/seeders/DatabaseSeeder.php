<?php

namespace Database\Seeders;

use App\Models\ContactMessage;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Hero;
use App\Models\Project;
use App\Models\Skill;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin user
        User::updateOrCreate(
            ['email' => 'admin@portfolio.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('password'),
            ]
        );

        // Hero
        Hero::updateOrCreate(
            ['id' => 1],
            [
                'name' => 'Raihan',
                'role' => 'Full-Stack Developer',
                'headline' => 'Building Digital Experiences That Matter',
                'description' => 'I craft clean, performant web applications with modern technologies. Passionate about turning complex problems into elegant, user-friendly solutions.',
                'primary_cta_text' => 'View Portfolio',
                'secondary_cta_text' => 'Contact Me',
                'photo_url' => null,
                'cv_url' => null,
            ]
        );

        // Skills
        $skills = [
            // Frontend
            ['name' => 'React', 'category' => 'Frontend', 'icon' => 'atom', 'sort_order' => 1],
            ['name' => 'Vue.js', 'category' => 'Frontend', 'icon' => 'component', 'sort_order' => 2],
            ['name' => 'TypeScript', 'category' => 'Frontend', 'icon' => 'file-code', 'sort_order' => 3],
            ['name' => 'Tailwind CSS', 'category' => 'Frontend', 'icon' => 'palette', 'sort_order' => 4],
            ['name' => 'Next.js', 'category' => 'Frontend', 'icon' => 'layout', 'sort_order' => 5],
            ['name' => 'HTML5', 'category' => 'Frontend', 'icon' => 'code-xml', 'sort_order' => 6],
            ['name' => 'CSS3', 'category' => 'Frontend', 'icon' => 'brush', 'sort_order' => 7],
            // Backend
            ['name' => 'Laravel', 'category' => 'Backend', 'icon' => 'flame', 'sort_order' => 1],
            ['name' => 'PHP', 'category' => 'Backend', 'icon' => 'braces', 'sort_order' => 2],
            ['name' => 'Node.js', 'category' => 'Backend', 'icon' => 'hexagon', 'sort_order' => 3],
            ['name' => 'Python', 'category' => 'Backend', 'icon' => 'terminal', 'sort_order' => 4],
            // Database
            ['name' => 'MySQL', 'category' => 'Database', 'icon' => 'database', 'sort_order' => 1],
            ['name' => 'PostgreSQL', 'category' => 'Database', 'icon' => 'hard-drive', 'sort_order' => 2],
            ['name' => 'Redis', 'category' => 'Database', 'icon' => 'zap', 'sort_order' => 3],
            // DevOps
            ['name' => 'Docker', 'category' => 'DevOps', 'icon' => 'container', 'sort_order' => 1],
            ['name' => 'Git', 'category' => 'DevOps', 'icon' => 'folder-git', 'sort_order' => 2],
            ['name' => 'Linux', 'category' => 'DevOps', 'icon' => 'terminal', 'sort_order' => 3],
            // Tools
            ['name' => 'VS Code', 'category' => 'Tools', 'icon' => 'code-2', 'sort_order' => 1],
            ['name' => 'Postman', 'category' => 'Tools', 'icon' => 'rocket', 'sort_order' => 2],
            ['name' => 'Figma', 'category' => 'Tools', 'icon' => 'figma', 'sort_order' => 3],
        ];

        foreach ($skills as $skill) {
            Skill::updateOrCreate(
                ['name' => $skill['name'], 'category' => $skill['category']],
                $skill
            );
        }

        // Experiences
        $experiences = [
            [
                'title' => 'Senior Full-Stack Developer',
                'organization' => 'Tech Corp',
                'location' => 'Jakarta, Indonesia',
                'start_date' => '2023-01-01',
                'end_date' => null,
                'is_current' => true,
                'description' => 'Leading development of enterprise web applications using Laravel and React. Mentoring junior developers and implementing best practices.',
                'achievements' => [
                    'Led migration of legacy system to modern tech stack, improving performance by 40%',
                    'Implemented CI/CD pipeline reducing deployment time by 60%',
                    'Mentored team of 5 junior developers',
                ],
                'sort_order' => 1,
            ],
            [
                'title' => 'Full-Stack Developer',
                'organization' => 'Digital Agency',
                'location' => 'Jakarta, Indonesia',
                'start_date' => '2021-06-01',
                'end_date' => '2022-12-31',
                'is_current' => false,
                'description' => 'Developed and maintained multiple client projects using Laravel, Vue.js, and React. Worked directly with clients to gather requirements and deliver solutions.',
                'achievements' => [
                    'Delivered 15+ client projects on time and within budget',
                    'Built reusable component library reducing development time by 30%',
                    'Implemented automated testing increasing code coverage to 80%',
                ],
                'sort_order' => 2,
            ],
            [
                'title' => 'Junior Web Developer',
                'organization' => 'Startup Inc',
                'location' => 'Bandung, Indonesia',
                'start_date' => '2020-01-01',
                'end_date' => '2021-05-31',
                'is_current' => false,
                'description' => 'Started my professional career building web applications. Gained experience in PHP, JavaScript, and database management.',
                'achievements' => [
                    'Developed internal tools that automated manual processes',
                    'Contributed to the main product codebase',
                    'Learned agile methodologies and team collaboration',
                ],
                'sort_order' => 3,
            ],
        ];

        foreach ($experiences as $exp) {
            Experience::updateOrCreate(
                ['title' => $exp['title'], 'organization' => $exp['organization']],
                $exp
            );
        }

        // Education
        $education = [
            [
                'institution' => 'University of Technology',
                'program' => 'Bachelor of Computer Science',
                'start_year' => 2016,
                'end_year' => 2020,
                'description' => 'Focused on software engineering, web development, and database systems. Graduated with honors.',
                'sort_order' => 1,
            ],
            [
                'institution' => 'Coding Bootcamp',
                'program' => 'Full-Stack Web Development',
                'start_year' => 2019,
                'end_year' => 2019,
                'description' => 'Intensive 12-week program covering modern web development technologies including React, Node.js, and databases.',
                'sort_order' => 2,
            ],
        ];

        foreach ($education as $edu) {
            Education::updateOrCreate(
                ['institution' => $edu['institution'], 'program' => $edu['program']],
                $edu
            );
        }

        // Projects
        $projects = [
            [
                'title' => 'E-Commerce Platform',
                'description' => 'A full-featured e-commerce platform with product management, shopping cart, payment integration, and order tracking.',
                'technologies' => ['Laravel', 'React', 'MySQL', 'Tailwind CSS', 'Stripe'],
                'demo_url' => 'https://example.com/ecommerce',
                'repository_url' => 'https://github.com/example/ecommerce',
                'category' => 'Web App',
                'is_featured' => true,
                'sort_order' => 1,
            ],
            [
                'title' => 'Project Management Tool',
                'description' => 'A collaborative project management application with real-time updates, task tracking, and team communication.',
                'technologies' => ['Next.js', 'TypeScript', 'PostgreSQL', 'Socket.io'],
                'demo_url' => 'https://example.com/pm-tool',
                'repository_url' => 'https://github.com/example/pm-tool',
                'category' => 'Web App',
                'is_featured' => true,
                'sort_order' => 2,
            ],
            [
                'title' => 'Restaurant POS System',
                'description' => 'Point of sale system for restaurants with order management, kitchen display, and real-time reporting.',
                'technologies' => ['Laravel', 'Inertia.js', 'React', 'MySQL'],
                'demo_url' => 'https://example.com/pos',
                'repository_url' => 'https://github.com/example/pos',
                'category' => 'Web App',
                'is_featured' => true,
                'sort_order' => 3,
            ],
            [
                'title' => 'Portfolio Website',
                'description' => 'A modern portfolio website with CMS built using Laravel and React with Inertia.js.',
                'technologies' => ['Laravel', 'React', 'Inertia.js', 'Tailwind CSS'],
                'demo_url' => 'https://example.com/portfolio',
                'repository_url' => 'https://github.com/example/portfolio',
                'category' => 'Website',
                'is_featured' => false,
                'sort_order' => 4,
            ],
            [
                'title' => 'Weather Dashboard',
                'description' => 'A weather dashboard application with location-based forecasts, interactive maps, and weather alerts.',
                'technologies' => ['React', 'TypeScript', 'OpenWeather API', 'Chart.js'],
                'demo_url' => 'https://example.com/weather',
                'repository_url' => 'https://github.com/example/weather',
                'category' => 'Web App',
                'is_featured' => false,
                'sort_order' => 5,
            ],
            [
                'title' => 'Blog CMS',
                'description' => 'A headless blog CMS with markdown support, media management, and SEO optimization tools.',
                'technologies' => ['Laravel', 'Vue.js', 'MySQL', 'Redis'],
                'demo_url' => 'https://example.com/blog',
                'repository_url' => 'https://github.com/example/blog',
                'category' => 'Web App',
                'is_featured' => false,
                'sort_order' => 6,
            ],
        ];

        foreach ($projects as $project) {
            Project::updateOrCreate(
                ['title' => $project['title']],
                $project
            );
        }

        // Contact Messages (sample)
        $messages = [
            [
                'name' => 'John Doe',
                'email' => 'john@example.com',
                'subject' => 'Project Inquiry',
                'message' => 'Hi, I would like to discuss a potential project collaboration. I need a web application for my business.',
                'is_read' => false,
            ],
            [
                'name' => 'Jane Smith',
                'email' => 'jane@example.com',
                'subject' => 'Freelance Opportunity',
                'message' => 'Hello! We are looking for a freelance developer to help with our React project. Would you be interested?',
                'is_read' => true,
            ],
        ];

        foreach ($messages as $msg) {
            ContactMessage::updateOrCreate(
                ['email' => $msg['email'], 'subject' => $msg['subject']],
                $msg
            );
        }
    }
}
