"use client";

import React from "react";
import Link from "next/link";
import { BlogPostMeta } from "@/lib/blog";
import { Clock, Calendar, ArrowUpRight } from "lucide-react";

interface BlogCardProps {
  post: BlogPostMeta;
  featured?: boolean;
}

const CATEGORY_COLORS: Record<string, { badge: string; border: string }> = {
  "ia-juridica": {
    badge: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
    border: "group-hover:border-emerald-500/40",
  },
  "gestao-crm": {
    badge: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
    border: "group-hover:border-amber-500/40",
  },
  produtividade: {
    badge: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20",
    border: "group-hover:border-cyan-500/40",
  },
  default: {
    badge: "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20",
    border: "group-hover:border-slate-300 dark:group-hover:border-white/20",
  },
};

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const colors = CATEGORY_COLORS[post.categorySlug] || CATEGORY_COLORS.default;

  const formattedDate = new Date(post.date).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  if (featured) {
    return (
      <article className="group relative rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#0A121A]/90 backdrop-blur-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between">
        {/* Glow de destaque */}
        <div
          className="pointer-events-none absolute -right-20 -top-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl group-hover:bg-emerald-500/15 transition-all duration-500"
          aria-hidden="true"
        />

        <div className={`grid ${post.coverImage ? 'lg:grid-cols-12 gap-8 items-center' : 'space-y-4'}`}>
          <div className={`${post.coverImage ? 'lg:col-span-7 space-y-4' : 'space-y-4'}`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span
                className={`font-mono text-xs font-semibold px-3 py-1 rounded-full border ${colors.badge}`}
              >
                ★ DESTAQUE • {post.category}
              </span>
              <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-500" />
                  {post.readingTime}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {formattedDate}
                </span>
              </div>
            </div>

            <Link href={`/blog/${post.slug}`} className="block group-hover:underline">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                {post.title}
              </h2>
            </Link>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
              {post.description}
            </p>
          </div>

          {post.coverImage && (
            <div className="lg:col-span-5">
              <Link href={`/blog/${post.slug}`} className="block overflow-hidden rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-lg group-hover:border-emerald-500/40 transition-colors">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full aspect-video sm:aspect-16/10 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </Link>
            </div>
          )}
        </div>

        <div className="relative z-10 pt-6 mt-6 border-t border-slate-200/80 dark:border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-serif font-bold text-sm">
              {post.author.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white">
                {post.author.name}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                {post.author.role}
              </p>
            </div>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-mono"
          >
            <span>Ler artigo completo</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#0A121A]/80 backdrop-blur-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:border-slate-300 dark:hover:border-white/20">
      <div className="space-y-3">
        {post.coverImage && (
          <Link href={`/blog/${post.slug}`} className="block overflow-hidden rounded-xl border border-slate-200/70 dark:border-white/10 mb-3 shadow-xs">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </Link>
        )}

        <div className="flex items-center justify-between gap-2">
          <span
            className={`font-mono text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${colors.badge}`}
          >
            {post.category}
          </span>
          <span className="flex items-center gap-1 font-mono text-[11px] text-slate-500 dark:text-slate-400">
            <Clock className="w-3 h-3 text-emerald-500" />
            {post.readingTime}
          </span>
        </div>

        <Link href={`/blog/${post.slug}`} className="block">
          <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {post.title}
          </h3>
        </Link>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
          {post.description}
        </p>
      </div>

      <div className="pt-4 mt-5 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
        <span>{post.author.name}</span>
        <span>{formattedDate}</span>
      </div>
    </article>
  );
}
