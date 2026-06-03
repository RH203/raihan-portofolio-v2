export type User = {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
};

export type Auth = {
    user: User;
};

export type Hero = {
    id: number;
    name: string;
    role: string;
    headline: string;
    description: string;
    primary_cta_text: string;
    secondary_cta_text: string;
    photo_url: string | null;
    cv_url: string | null;
    develop_mode: boolean;
    created_at: string;
    updated_at: string;
};

export type Skill = {
    id: number;
    name: string;
    category: string;
    icon: string;
    sort_order: number;
    created_at: string;
    updated_at: string;
};

export type Experience = {
    id: number;
    title: string;
    organization: string;
    location: string | null;
    start_date: string;
    end_date: string | null;
    is_current: boolean;
    description: string | null;
    achievements: string[] | null;
    sort_order: number;
    created_at: string;
    updated_at: string;
};

export type Education = {
    id: number;
    institution: string;
    program: string;
    start_year: number;
    end_year: number | null;
    description: string | null;
    sort_order: number;
    created_at: string;
    updated_at: string;
};

export type Project = {
    id: number;
    title: string;
    thumbnail_url: string | null;
    description: string | null;
    technologies: string[] | null;
    demo_url: string | null;
    repository_url: string | null;
    category: string;
    is_featured: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
};

export type ContactMessage = {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    is_read: boolean;
    created_at: string;
    updated_at: string;
};

export type DashboardStats = {
    skills: number;
    experiences: number;
    education: number;
    projects: number;
    messages: number;
    unreadMessages: number;
    totalViews: number;
};

export type GitHubRepo = {
    name: string;
    description: string | null;
    url: string;
    stars: number;
    forks: number;
    language: string | null;
    updated_at: string;
};

export type GitHubData = {
    username: string;
    profile_url: string;
    avatar_url: string | null;
    public_repos: number;
    followers: number;
    total_stars: number;
    languages: Record<string, number>;
    top_repos: GitHubRepo[];
};

export type ChartPoint = {
    date: string;
    views?: number;
    contact?: number;
};

export type SocialLink = {
    id: number;
    platform: string;
    url: string;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
};

export type FlashMessages = {
    success?: string;
    error?: string;
};
