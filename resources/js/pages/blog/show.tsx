import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Clock, Link as LinkIcon } from 'lucide-react';

const SITE_URL = 'https://www.raihanfirdaus.tech';

type Post = {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    html: string;
    cover_image?: string | null;
    tags?: string[];
    reading_time: number;
    published_at: string;
    updated_at: string;
    meta_title?: string | null;
    meta_description?: string | null;
};

type RelatedPost = Pick<Post, 'id' | 'title' | 'slug' | 'excerpt' | 'cover_image' | 'tags' | 'reading_time' | 'published_at'>;

export default function BlogShow({ post, related }: { post: Post; related: RelatedPost[] }) {
    const canonical = `${SITE_URL}/blog/${post.slug}`;
    const title = post.meta_title || `${post.title} — Raihan Firdaus`;
    const description = post.meta_description || post.excerpt;
    const image = post.cover_image ? `${SITE_URL}/storage/${post.cover_image}` : `${SITE_URL}/og-image.jpg`;
    const jsonLd = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description,
        image: [image],
        datePublished: post.published_at,
        dateModified: post.updated_at,
        author: { '@type': 'Person', name: 'Raihan Firdaus', url: SITE_URL },
        publisher: { '@type': 'Person', name: 'Raihan Firdaus' },
        mainEntityOfPage: canonical,
        keywords: post.tags?.join(', '),
    });

    const share = (platform: 'twitter' | 'linkedin') => {
        const url = platform === 'twitter'
            ? `https://twitter.com/intent/tweet?url=${encodeURIComponent(canonical)}&text=${encodeURIComponent(post.title)}`
            : `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonical)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="robots" content="index, follow, max-image-preview:large" />
                <link rel="canonical" href={canonical} />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={canonical} />
                <meta property="og:image" content={image} />
                <meta property="article:published_time" content={post.published_at} />
                <meta property="article:modified_time" content={post.updated_at} />
                {post.tags?.map((tag) => <meta key={tag} property="article:tag" content={tag} />)}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={image} />
                <script type="application/ld+json">{jsonLd}</script>
            </Head>

            <header className="border-b border-surface-200 bg-white">
                <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
                    <Link href="/" className="text-xl font-bold text-surface-950">Raihan<span className="text-primary-600">.</span></Link>
                    <Link href="/blog" className="text-sm font-medium text-surface-600 hover:text-surface-950">All stories</Link>
                </nav>
            </header>

            <main>
                <article className="mx-auto max-w-3xl px-6 pb-20 pt-12 sm:pt-20">
                    <Link href="/blog" className="mb-10 inline-flex items-center gap-2 text-sm text-surface-500 hover:text-surface-900"><ArrowLeft className="h-4 w-4" /> Back to blog</Link>
                    <div className="flex flex-wrap gap-2">{post.tags?.map((tag) => <span key={tag} className="rounded-full bg-surface-100 px-3 py-1 text-xs font-medium text-surface-600">{tag}</span>)}</div>
                    <h1 className="article-heading mt-5 text-4xl font-bold tracking-tight text-surface-950 sm:text-6xl">{post.title}</h1>
                    <p className="article-excerpt mt-6 text-xl leading-8 text-surface-600">{post.excerpt}</p>

                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-surface-200 py-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">RF</div>
                            <div><p className="text-sm font-semibold text-surface-900">Raihan Firdaus</p><p className="flex items-center gap-1 text-xs text-surface-500"><Clock className="h-3.5 w-3.5" /> {post.reading_time} min read · {new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p></div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => share('twitter')} aria-label="Share on X" className="flex h-9 w-9 items-center justify-center rounded-full border border-surface-200 text-sm font-semibold text-surface-500 hover:text-surface-900">X</button>
                            <button onClick={() => share('linkedin')} aria-label="Share on LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-full border border-surface-200 text-xs font-bold text-surface-500 hover:text-surface-900">in</button>
                            <button onClick={() => navigator.clipboard.writeText(canonical)} aria-label="Copy link" className="rounded-full border border-surface-200 p-2 text-surface-500 hover:text-surface-900"><LinkIcon className="h-4 w-4" /></button>
                        </div>
                    </div>

                    {post.cover_image && <img src={`/storage/${post.cover_image}`} alt={post.title} className="my-10 aspect-[16/9] w-full rounded-2xl object-cover" />}
                    <div
                        className="article-content prose prose-lg prose-surface max-w-none [counter-reset:figure] prose-headings:font-bold prose-a:text-primary-700 [&_figure]:my-10 [&_figure]:text-center [&_figure[data-size=compact]]:mx-auto [&_figure[data-size=compact]]:max-w-xl [&_figure[data-size=full]]:w-full [&_figure_img]:mx-auto [&_figure_img]:h-auto [&_figure_img]:max-h-[720px] [&_figure_img]:w-auto [&_figure_img]:max-w-full [&_figure_img]:rounded-xl [&_figcaption]:mt-3 [&_figcaption]:text-sm [&_figcaption]:font-normal [&_figcaption]:text-surface-500 [&_figcaption_[data-figure-label]]:before:[content:'Figure_'_counter(figure)_'—_'] [&_figcaption_[data-figure-label]]:[counter-increment:figure] [&_figcaption_[data-source]]:mt-1 [&_figcaption_[data-source]]:block [&_figcaption_[data-source]]:text-xs [&_figcaption_[data-source]:not(:empty)]:before:[content:'Source:_']"
                        dangerouslySetInnerHTML={{ __html: post.html }}
                    />
                </article>

                {related.length > 0 && <section className="border-t border-surface-200 bg-surface-50"><div className="mx-auto max-w-6xl px-6 py-16"><h2 className="article-heading text-2xl font-bold text-surface-950">More stories</h2><div className="mt-8 grid gap-8 md:grid-cols-3">{related.map((item) => <Link key={item.id} href={`/blog/${item.slug}`} className="group"><div className="aspect-[16/10] overflow-hidden rounded-xl bg-surface-200">{item.cover_image && <img src={`/storage/${item.cover_image}`} alt={item.title} loading="lazy" className="h-full w-full object-cover transition group-hover:scale-[1.03]" />}</div><h3 className="article-heading mt-4 text-xl font-bold text-surface-950 group-hover:text-primary-700">{item.title}</h3><p className="article-excerpt mt-2 line-clamp-2 text-sm leading-6 text-surface-600">{item.excerpt}</p></Link>)}</div></div></section>}
            </main>
        </>
    );
}
