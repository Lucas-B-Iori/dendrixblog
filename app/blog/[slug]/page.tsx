import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { ReadingProgressBar } from "@/components/blog/ReadingProgressBar";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { ArticleCta } from "@/components/blog/ArticleCta";
import { BlogCard } from "@/components/blog/BlogCard";
import { ArrowLeft, Clock, Calendar, ChevronRight, User } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Artigo Não Encontrado | Dendrix Blog",
    };
  }

  const canonicalUrl = `https://dendrixcrm.com.br/blog/${slug}/`;
  const absoluteImageUrl = post.coverImage
    ? post.coverImage.startsWith("http")
      ? post.coverImage
      : `https://dendrixcrm.com.br${post.coverImage.startsWith("/") ? "" : "/"}${post.coverImage}`
    : undefined;

  return {
    title: `${post.title} | Blog Dendrix`,
    description: post.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonicalUrl,
      siteName: "Dendrix CRM",
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      tags: post.tags,
      locale: "pt_BR",
      images: absoluteImageUrl ? [{ url: absoluteImageUrl, alt: post.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: absoluteImageUrl ? [absoluteImageUrl] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.slug, post.categorySlug, 2);

  const formattedDate = new Date(post.date).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const canonicalUrl = `https://dendrixcrm.com.br/blog/${slug}/`;
  const absoluteImageUrl = post.coverImage
    ? post.coverImage.startsWith("http")
      ? post.coverImage
      : `https://dendrixcrm.com.br${post.coverImage.startsWith("/") ? "" : "/"}${post.coverImage}`
    : undefined;

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    author: {
      "@type": "Person",
      name: post.author.name || "Lucas Iori",
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "Dendrix CRM",
      url: "https://dendrixcrm.com.br",
      logo: {
        "@type": "ImageObject",
        url: "https://dendrixcrm.com.br/icon.svg",
      },
    },
    image: absoluteImageUrl,
    inLanguage: "pt-BR",
    keywords: post.tags?.join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: "https://dendrixcrm.com.br/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://dendrixcrm.com.br/blog/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-[var(--surface-canvas)] text-[var(--text-primary)] transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Barra de Progresso de Leitura Suave */}
      <ReadingProgressBar />

      <Navbar />

      <main className="flex-1 py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs de Navegação */}
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Início
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/blog" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 dark:text-slate-200 truncate max-w-[200px] sm:max-w-md">
              {post.category}
            </span>
          </nav>

          {/* Cabeçalho do Artigo */}
          <header className="max-w-4xl space-y-5 pb-8 border-b border-slate-200 dark:border-white/10 mb-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                {post.category}
              </span>
              <div className="flex items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-500" />
                  {post.readingTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {formattedDate}
                </span>
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight sm:leading-tight">
              {post.title}
            </h1>

            <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              {post.description}
            </p>

            {/* Informações do Autor e Botões de Compartilhamento */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-serif font-bold text-base shadow-xs">
                  {post.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {post.author.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {post.author.role}
                  </p>
                </div>
              </div>

              <ShareButtons title={post.title} url={canonicalUrl} />
            </div>
          </header>

          {/* Grid Principal: Conteúdo do Artigo + Sumário Lateral (TOC) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Coluna Central do Artigo (8 colunas) */}
            <div className="lg:col-span-8 space-y-8">
              {/* Imagem de Capa do Artigo */}
              {post.coverImage && (
                <div className="overflow-hidden rounded-3xl border border-slate-200/90 dark:border-white/10 shadow-2xl bg-slate-100 dark:bg-white/[0.02]">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full aspect-video sm:aspect-16/9 object-cover"
                  />
                </div>
              )}

              {/* Sumário no Mobile (Colapsável) */}
              <TableOfContents toc={post.toc} variant="mobile" />

              {/* Corpo do Artigo HTML */}
              <div
                className="blog-content font-sans text-slate-800 dark:text-slate-200"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              />

              {/* CTA Contextual Embutido ao Fim do Artigo */}
              <ArticleCta />

              {/* Tags e Compartilhamento Final */}
              <div className="pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-mono text-slate-400 mr-1">Tags:</span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/[0.08]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <ShareButtons title={post.title} url={canonicalUrl} />
              </div>

              {/* Box de Assinatura do Autor */}
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-[#0A121A]/70 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-serif font-bold text-lg shrink-0">
                  {post.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Publicado por {post.author.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {post.author.role}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 pt-1 leading-relaxed">
                    Artigo revisado pelo comitê editorial da Dendrix, focado em boas práticas de tecnologia processual, segurança da informação e produtividade jurídica.
                  </p>
                </div>
              </div>
            </div>

            {/* Coluna Lateral Direita (Desktop 4 colunas - Sticky) */}
            <div className="hidden lg:block lg:col-span-4 space-y-6">
              <TableOfContents toc={post.toc} variant="desktop" />
              <ArticleCta compact />
            </div>
          </div>

          {/* Seção de Artigos Relacionados */}
          {relatedPosts.length > 0 && (
            <section className="mt-20 pt-12 border-t border-slate-200 dark:border-white/10 space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    Continue Lendo
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
                    Artigos Recomendados
                  </h3>
                </div>
                <Link
                  href="/blog"
                  className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <span>Ver todos os artigos</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((rPost) => (
                  <BlogCard key={rPost.slug} post={rPost} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
