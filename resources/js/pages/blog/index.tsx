import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Clock, FileText } from 'lucide-react';

const SITE_URL = 'https://www.raihanfirdaus.tech';

type Post = {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    cover_image?: string | null;
    tags?: string[];
    reading_time: number;
    published_at: string;
};

type Pagination<T> = { data: T[]; links: { url: string | null; label: string; active: boolean }[] };

export default function BlogIndex({ featured, posts }: { featured?: Post | null; posts: Pagination<Post> }) {
    const title = 'Blog — Raihan Firdaus';
    const description = 'Practical notes about Laravel, Flutter, backend engineering, architecture, and building reliable software.';

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={`${SITE_URL}/blog`} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={`${SITE_URL}/blog`} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>

            <header className="border-b border-surface-200 bg-white">
                <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
                    <Link href="/" className="text-xl font-bold text-surface-950">Raihan<span className="text-primary-600">.</span></Link>
                    <Link href="/" className="text-sm font-medium text-surface-600 hover:text-surface-950">Portfolio</Link>
                </nav>
            </header>

            <main className="mx-auto max-w-6xl px-6 py-14">
                <div className="mb-14 max-w-2xl">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-600">Writing</p>
                    <h1 className="text-4xl font-bold tracking-tight text-surface-950 sm:text-6xl">Ideas, lessons, and code.</h1>
                    <p className="mt-5 text-lg leading-8 text-surface-600">Notes from building web and mobile products in the real world.</p>
                </div>

                {featured && (
                    <Link href={`/blog/${featured.slug}`} className="group mb-16 grid overflow-hidden rounded-3xl border border-surface-200 bg-white shadow-sm transition hover:shadow-md md:grid-cols-2">
                        <div className="aspect-[16/10] bg-surface-100 md:aspect-auto">
                            {featured.cover_image ? <img src={`/storage/${featured.cover_image}`} alt={featured.title} className="h-full w-full object-cover" /> : <div className="flex h-full min-h-72 items-center justify-center bg-gradient-to-br from-primary-50 to-surface-100"><FileText className="h-14 w-14 text-primary-300" /></div>}
                        </div>
                        <div className="flex flex-col justify-center p-8 sm:p-12">
                            <span className="mb-4 text-sm font-semibold text-primary-600">Featured story</span>
                            <h2 className="text-3xl font-bold tracking-tight text-surface-950 group-hover:text-primary-700">{featured.title}</h2>
                            <p className="mt-4 line-clamp-3 leading-7 text-surface-600">{featured.excerpt}</p>
                            <div className="mt-6 flex items-center gap-2 text-sm text-surface-500"><Clock className="h-4 w-4" /> {featured.reading_time} min read</div>
                        </div>
                    </Link>
                )}

                <div className="mb-8 flex items-end justify-between gap-4">
                    <div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-600">Latest articles</p><h2 className="mt-2 text-3xl font-bold text-surface-950">All stories</h2></div>
                    <span className="text-sm text-surface-500">{posts.data.length} article{posts.data.length === 1 ? '' : 's'} on this page</span>
                </div>

                {posts.data.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-surface-300 bg-surface-50 px-6 py-16 text-center">
                        <FileText className="mx-auto h-10 w-10 text-surface-300" />
                        <h2 className="mt-4 text-xl font-semibold text-surface-900">No published stories yet</h2>
                        <p className="mt-2 text-sm text-surface-500">Published articles will appear here automatically.</p>
                    </div>
                ) : (
                    <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" aria-label="Latest stories">
                        {posts.data.map((post) => (
                            <article key={post.id} className="group overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                                <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
                                    <div className="aspect-[16/10] overflow-hidden bg-surface-100">
                                        {post.cover_image ? <img src={`/storage/${post.cover_image}`} alt={post.title} loading="lazy" className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]" /> : <div className="flex h-full items-center justify-center bg-gradient-to-br from-surface-50 to-primary-50"><FileText className="h-10 w-10 text-primary-300" /></div>}
                                    </div>
                                    <div className="flex flex-1 flex-col p-6">
                                        <div className="flex flex-wrap gap-2">{post.tags?.map((tag) => <span key={tag} className="rounded-full bg-surface-100 px-3 py-1 text-xs text-surface-600">{tag}</span>)}</div>
                                        <h3 className="mt-4 text-2xl font-bold tracking-tight text-surface-950 group-hover:text-primary-700">{post.title}</h3>
                                        <p className="mt-3 line-clamp-3 leading-7 text-surface-600">{post.excerpt}</p>
                                        <div className="mt-auto flex items-center justify-between pt-6 text-sm text-surface-500"><span>{post.reading_time} min read</span><ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></div>
                                    </div>
                                </Link>
                            </article>
                        ))}
                    </section>
                )}

                <div className="mt-14 flex flex-wrap justify-center gap-2">
                    {posts.links.map((link, index) => link.url ? <Link key={index} href={link.url} preserveScroll className={`rounded-lg px-3 py-2 text-sm ${link.active ? 'bg-surface-950 text-white' : 'border border-surface-200 text-surface-600'}`} dangerouslySetInnerHTML={{ __html: link.label }} /> : null)}
                </div>
            </main>
        </>
    );
}
