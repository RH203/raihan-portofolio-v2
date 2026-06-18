import { Link } from '@inertiajs/react';
import { ArrowRight, Clock, FileText } from 'lucide-react';

export type PortfolioBlogPost = {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    cover_image?: string | null;
    tags?: string[] | null;
    reading_time: number;
    published_at: string;
};

interface Props {
    posts: PortfolioBlogPost[];
}

export function BlogSection({ posts }: Props) {
    if (posts.length === 0) return null;

    return (
        <section id="blog" className="bg-surface-50 py-20 sm:py-24">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-600">Latest writing</p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-surface-950 sm:text-4xl">Ideas, lessons, and code</h2>
                        <p className="mt-4 leading-7 text-surface-600">Practical notes from building web, mobile, and backend products.</p>
                    </div>
                    <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700">
                        View all articles <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <article key={post.id} className="group overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                            <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
                                <div className="aspect-[16/10] overflow-hidden bg-surface-100">
                                    {post.cover_image ? (
                                        <img
                                            src={`/storage/${post.cover_image}`}
                                            alt={post.title}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary-50 to-surface-100">
                                            <FileText className="h-10 w-10 text-primary-300" />
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-1 flex-col p-6">
                                    {post.tags && post.tags.length > 0 && (
                                        <div className="mb-3 flex flex-wrap gap-2">
                                            {post.tags.slice(0, 3).map((tag) => (
                                                <span key={tag} className="rounded-full bg-surface-100 px-3 py-1 text-xs text-surface-600">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <h3 className="text-xl font-bold tracking-tight text-surface-950 transition group-hover:text-primary-700">{post.title}</h3>
                                    <p className="mt-3 line-clamp-3 leading-7 text-surface-600">{post.excerpt}</p>

                                    <div className="mt-auto flex items-center justify-between pt-6 text-sm text-surface-500">
                                        <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {post.reading_time} min read</span>
                                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
