import { getPlatformConfig } from '@/components/portfolio/social-icons';
import type { SocialLink } from '@/types';
import { useForm } from '@inertiajs/react';
import { Send } from 'lucide-react';
import { type FormEvent } from 'react';

interface ContactSectionProps {
    socialLinks: SocialLink[];
}

export function ContactSection({ socialLinks }: ContactSectionProps) {
    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/contact', {
            onSuccess: () => reset(),
        });
    };

    const fieldClass =
        'block w-full border-0 border-b border-surface-300 bg-transparent px-0 py-2.5 text-sm text-surface-800 placeholder:text-surface-400 focus:border-primary-600 focus:ring-0 focus:outline-none transition-colors resize-none';

    return (
        <section id="contact" className="py-24" aria-labelledby="contact-heading">
            <div className="mx-auto max-w-5xl px-6">
                <div className="mb-14 flex items-end gap-4 border-b border-surface-200 pb-6">
                    <span className="font-mono text-sm text-primary-600">06</span>
                    <div>
                        <h2 id="contact-heading" className="text-3xl font-bold tracking-tight text-surface-900 sm:text-4xl">
                            Contact Me
                        </h2>
                        <p className="mt-1.5 max-w-xl text-sm text-surface-500">
                            Available for freelance Laravel, back-end, full-stack, and Flutter mobile development —
                            let&apos;s discuss your project.
                        </p>
                    </div>
                </div>

                <div className="grid gap-12 lg:grid-cols-5">
                    {/* Contact info */}
                    <div className="lg:col-span-2">
                        <h3 className="mb-3 text-sm font-semibold text-surface-900">Let&apos;s connect</h3>
                        <p className="text-sm leading-relaxed text-surface-500">
                            Feel free to reach out through the form or any of the channels below — I&apos;ll get back to you as soon as possible.
                        </p>

                        {socialLinks.length > 0 && (
                            <ul className="mt-7 space-y-0 border-t border-surface-100">
                                {socialLinks.map((link) => {
                                    const config = getPlatformConfig(link.platform);
                                    const Icon = config.icon;
                                    return (
                                        <li key={link.id} className="border-b border-surface-100">
                                            <a
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex items-center gap-3 py-3.5"
                                            >
                                                <Icon className="h-4 w-4 shrink-0 text-surface-400 transition-colors group-hover:text-primary-600" />
                                                <span className="text-sm font-medium text-surface-700 transition-colors group-hover:text-primary-600">
                                                    {config.label}
                                                </span>
                                                <span className="ml-auto truncate text-xs text-surface-400">
                                                    {link.url.replace(/^https?:\/\//, '')}
                                                </span>
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>

                    {/* Contact form */}
                    <div className="lg:col-span-3">
                        {wasSuccessful && (
                            <div className="mb-6 border-l-2 border-accent-500 bg-accent-50/60 px-4 py-3 text-sm text-accent-600" role="alert">
                                Thank you for your message! I&apos;ll get back to you soon.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-7" noValidate>
                            <div className="grid gap-7 sm:grid-cols-2">
                                <div className="space-y-1.5">
                                    <label htmlFor="contact-name" className="block text-xs font-medium tracking-wide text-surface-500 uppercase">
                                        Name <span className="text-danger-500" aria-hidden="true">*</span>
                                    </label>
                                    <input
                                        id="contact-name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className={fieldClass}
                                        placeholder="Your name"
                                        required
                                        aria-invalid={errors.name ? 'true' : undefined}
                                    />
                                    {errors.name && <p className="text-xs text-danger-500" role="alert">{errors.name}</p>}
                                </div>
                                <div className="space-y-1.5">
                                    <label htmlFor="contact-email" className="block text-xs font-medium tracking-wide text-surface-500 uppercase">
                                        Email <span className="text-danger-500" aria-hidden="true">*</span>
                                    </label>
                                    <input
                                        id="contact-email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className={fieldClass}
                                        placeholder="your@email.com"
                                        required
                                        aria-invalid={errors.email ? 'true' : undefined}
                                    />
                                    {errors.email && <p className="text-xs text-danger-500" role="alert">{errors.email}</p>}
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="contact-subject" className="block text-xs font-medium tracking-wide text-surface-500 uppercase">
                                    Subject <span className="text-danger-500" aria-hidden="true">*</span>
                                </label>
                                <input
                                    id="contact-subject"
                                    type="text"
                                    value={data.subject}
                                    onChange={(e) => setData('subject', e.target.value)}
                                    className={fieldClass}
                                    placeholder="Project inquiry"
                                    required
                                    aria-invalid={errors.subject ? 'true' : undefined}
                                />
                                {errors.subject && <p className="text-xs text-danger-500" role="alert">{errors.subject}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="contact-message" className="block text-xs font-medium tracking-wide text-surface-500 uppercase">
                                    Message <span className="text-danger-500" aria-hidden="true">*</span>
                                </label>
                                <textarea
                                    id="contact-message"
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    rows={4}
                                    className={fieldClass}
                                    placeholder="Tell me about your project..."
                                    required
                                    aria-invalid={errors.message ? 'true' : undefined}
                                />
                                {errors.message && <p className="text-xs text-danger-500" role="alert">{errors.message}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2.5 rounded-full bg-surface-900 px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {processing ? (
                                    <>
                                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                                        </svg>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-4 w-4" aria-hidden="true" />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
