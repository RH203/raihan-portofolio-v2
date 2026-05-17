import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from '@/components/icons';
import type { SocialLink } from '@/types';
import { ExternalLink, Globe, Mail, MessageCircle, Send, Tv, Users } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';

type IconComp = ComponentType<SVGProps<SVGSVGElement> & { className?: string }>;

const platformConfig: Record<string, { icon: IconComp; label: string; color: string }> = {
    github: { icon: GitHubIcon, label: 'GitHub', color: 'bg-surface-100 text-surface-700 group-hover:bg-surface-200' },
    linkedin: { icon: LinkedInIcon, label: 'LinkedIn', color: 'bg-blue-50 text-blue-600 group-hover:bg-blue-100' },
    facebook: { icon: Users, label: 'Facebook', color: 'bg-blue-50 text-blue-600 group-hover:bg-blue-100' },
    instagram: { icon: ExternalLink, label: 'Instagram', color: 'bg-pink-50 text-pink-600 group-hover:bg-pink-100' },
    twitter: { icon: Send, label: 'Twitter / X', color: 'bg-surface-100 text-surface-700 group-hover:bg-surface-200' },
    youtube: { icon: Tv, label: 'YouTube', color: 'bg-red-50 text-red-600 group-hover:bg-red-100' },
    tiktok: { icon: Tv, label: 'TikTok', color: 'bg-surface-100 text-surface-700 group-hover:bg-surface-200' },
    whatsapp: { icon: WhatsAppIcon, label: 'WhatsApp', color: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100' },
    telegram: { icon: Send, label: 'Telegram', color: 'bg-blue-50 text-blue-500 group-hover:bg-blue-100' },
    discord: { icon: MessageCircle, label: 'Discord', color: 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100' },
    email: { icon: Mail, label: 'Email', color: 'bg-primary-50 text-primary-600 group-hover:bg-primary-100' },
    website: { icon: Globe, label: 'Website', color: 'bg-primary-50 text-primary-600 group-hover:bg-primary-100' },
    dribbble: { icon: ExternalLink, label: 'Dribbble', color: 'bg-pink-50 text-pink-500 group-hover:bg-pink-100' },
    behance: { icon: ExternalLink, label: 'Behance', color: 'bg-blue-50 text-blue-600 group-hover:bg-blue-100' },
    medium: { icon: ExternalLink, label: 'Medium', color: 'bg-surface-100 text-surface-700 group-hover:bg-surface-200' },
    devto: { icon: ExternalLink, label: 'Dev.to', color: 'bg-surface-100 text-surface-700 group-hover:bg-surface-200' },
    stackoverflow: { icon: ExternalLink, label: 'Stack Overflow', color: 'bg-orange-50 text-orange-600 group-hover:bg-orange-100' },
};

export function getPlatformConfig(platform: string) {
    return platformConfig[platform] || { icon: Globe, label: platform, color: 'bg-surface-100 text-surface-700 group-hover:bg-surface-200' };
}

export function SocialIcon({ link, size = 'md' }: { link: SocialLink; size?: 'sm' | 'md' }) {
    const config = getPlatformConfig(link.platform);
    const Icon = config.icon;
    const sizeClass = size === 'sm' ? 'h-5 w-5' : 'h-4 w-4';
    const containerSize = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10';

    return (
        <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex ${containerSize} items-center justify-center rounded-lg ${config.color} transition-colors`}
            aria-label={config.label}
            title={config.label}
        >
            <Icon className={sizeClass} />
        </a>
    );
}
