"use client";

import React, { useState, useMemo } from "react";
import { BlogPostMeta } from "@/lib/blog";
import { BlogCard } from "./BlogCard";
import { BlogFilterBar } from "./BlogFilterBar";
import { BookOpen, SearchX } from "lucide-react";

interface BlogFeedProps {
  initialPosts: BlogPostMeta[];
}

const CATEGORIES = [
  { label: "Todos os Artigos", slug: "all" },
  { label: "IA Jurídica", slug: "ia-juridica" },
  { label: "Gestão & Prazos", slug: "gestao-crm" },
  { label: "Produtividade Forense", slug: "produtividade" },
];

export function BlogFeed({ initialPosts }: BlogFeedProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "all" || post.categorySlug === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q)) ||
        post.author.name.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [initialPosts, selectedCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    return initialPosts.find((p) => p.featured) || initialPosts[0];
  }, [initialPosts]);

  // Se o usuário estiver pesquisando ou filtrando por categoria, mostramos tudo na grade
  const isFiltering = selectedCategory !== "all" || searchQuery.length > 0;
  const regularPosts = isFiltering
    ? filteredPosts
    : filteredPosts.filter((p) => p.slug !== featuredPost?.slug);

  return (
    <div className="space-y-8">
      {/* 1. Card de Destaque Principal (Quando não estiver em busca) */}
      {!isFiltering && featuredPost && (
        <div className="mb-12">
          <BlogCard post={featuredPost} featured />
        </div>
      )}

      {/* 2. Barra de Filtro e Busca */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            {isFiltering ? "Resultados da Busca" : "Artigos Recentes"}
          </h2>
          <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
            {filteredPosts.length} {filteredPosts.length === 1 ? "artigo" : "artigos"}
          </span>
        </div>

        <BlogFilterBar
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      {/* 3. Grade de Artigos */}
      {filteredPosts.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] space-y-3">
          <SearchX className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="font-serif text-lg font-semibold text-slate-900 dark:text-white">
            Nenhum artigo encontrado
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Não encontramos resultados para sua busca. Tente buscar por outros termos ou selecionar a categoria "Todos".
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 hover:underline pt-2 cursor-pointer"
          >
            Limpar filtros de busca
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
