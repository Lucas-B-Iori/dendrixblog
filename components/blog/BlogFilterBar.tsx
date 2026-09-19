"use client";

import React from "react";
import { Search, X } from "lucide-react";

interface CategoryOption {
  label: string;
  slug: string;
}

interface BlogFilterBarProps {
  categories: CategoryOption[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export function BlogFilterBar({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}: BlogFilterBarProps) {
  return (
    <div className="space-y-4 my-8">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Abas de Categorias */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => onSelectCategory(cat.slug)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs"
                    : "bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/[0.08]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Campo de Busca Rápida */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar artigos por tema..."
            className="w-full h-10 pl-9 pr-8 text-xs font-sans rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0A121A] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              aria-label="Limpar busca"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
