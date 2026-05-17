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

    return (
        <section id="contact" className="py-20 bg-surface-50/50" aria-labelledby="contact-heading">
            <div className="mx-auto max-w-6xl px-6">
                <div className="text-center mb-14">
                    <p className="text-primary-600 font-medium text-sm tracking-wide uppercase mb-2">Get In Touch</p>
                    <h2 id="contact-heading" className="text-3xl sm:text-4xl font-bold text-surface-900">Contact Me</h2>
                    <p className="mt-3 text-surface-500 max-w-xl mx-auto">
                        Interested in working together? Let&apos;s talk.
                    </p>
                </div>

                <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
                    {/* Contact info */}
                    <div className="lg:col-span-2 space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-surface-900 mb-4">Let&apos;s connect</h3>
                            <p className="text-sm text-surface-500 leading-relaxed">
                                Feel free to reach out through the form or any of the channels below. I&apos;ll get back to you as soon as possible.
                            </p>
                        </div>

                        {socialLinks.length > 0 && (
                            <div className="space-y-2">
                                {socialLinks.map((link) => {
                                    const config = getPlatformConfig(link.platform);
                                    const Icon = config.icon;
                                    return (
                                        <a
                                            key={link.id}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-white transition-colors group"
                                        >
                                            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${config.color} transition-colors`}>
                                                <Icon className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-surface-700">{config.label}</p>
                                                <p className="text-xs text-surface-400 truncate max-w-[200px]">{link.url.replace(/^https?:\/\//, '')}</p>
                                            </div>
                                        </a>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Contact form */}
                    <div className="lg:col-span-3">
                        {wasSuccessful && (
                            <div className="mb-6 rounded-lg bg-accent-50 border border-accent-500/20 px-4 py-3 text-sm text-accent-600" role="alert">
                                Thank you for your message! I&apos;ll get back to you soon.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-surface-100 p-6 shadow-sm space-y-5" noValidate>
                            <div className="grid sm:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label htmlFor="contact-name" className="block text-sm font-medium text-surface-700">
                                        Name <span className="text-danger-500" aria-hidden="true">*</span>
                                    </label>
                                    <input
                                        id="contact-name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="block w-full rounded-lg border border-surface-300 bg-white px-3.5 py-2.5 text-sm text-surface-800 placeholder:text-surface-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-colors"
                                        placeholder="Your name"
                                        required
                                        aria-invalid={errors.name ? 'true' : undefined}
                                    />
                                    {errors.name && <p className="text-xs text-danger-500" role="alert">{errors.name}</p>}
                                </div>
                                <div className="space-y-1.5">
                                    <label htmlFor="contact-email" className="block text-sm font-medium text-surface-700">
                                        Email <span className="text-danger-500" aria-hidden="true">*</span>
                                    </label>
                                    <input
                                        id="contact-email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="block w-full rounded-lg border border-surface-300 bg-white px-3.5 py-2.5 text-sm text-surface-800 placeholder:text-surface-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-colors"
                                        placeholder="your@email.com"
                                        required
                                        aria-invalid={errors.email ? 'true' : undefined}
                                    />
                                    {errors.email && <p className="text-xs text-danger-500" role="alert">{errors.email}</p>}
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="contact-subject" className="block text-sm font-medium text-surface-700">
                                    Subject <span className="text-danger-500" aria-hidden="true">*</span>
                                </label>
                                <input
                                    id="contact-subject"
                                    type="text"
                                    value={data.subject}
                                    onChange={(e) => setData('subject', e.target.value)}
                                    className="block w-full rounded-lg border border-surface-300 bg-white px-3.5 py-2.5 text-sm text-surface-800 placeholder:text-surface-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-colors"
                                    placeholder="Project inquiry"
                                    required
                                    aria-invalid={errors.subject ? 'true' : undefined}
                                />
                                {errors.subject && <p className="text-xs text-danger-500" role="alert">{errors.subject}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="contact-message" className="block text-sm font-medium text-surface-700">
                                    Message <span className="text-danger-500" aria-hidden="true">*</span>
                                </label>
                                <textarea
                                    id="contact-message"
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    rows={5}
                                    className="block w-full rounded-lg border border-surface-300 bg-white px-3.5 py-2.5 text-sm text-surface-800 placeholder:text-surface-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-colors resize-y"
                                    placeholder="Tell me about your project..."
                                    required
                                    aria-invalid={errors.message ? 'true' : undefined}
                                />
                                {errors.message && <p className="text-xs text-danger-500" role="alert">{errors.message}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary-600 text-white font-medium text-sm hover:bg-primary-700 active:bg-primary-800 transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
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
