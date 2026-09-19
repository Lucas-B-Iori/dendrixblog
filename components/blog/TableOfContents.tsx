"use client";

import React, { useEffect, useState } from "react";
import { TocItem } from "@/lib/blog";
import { ListCollapse, ChevronRight, ChevronDown } from "lucide-react";

interface TableOfContentsProps {
  toc: TocItem[];
  variant?: "mobile" | "desktop" | "both";
}

export function TableOfContents({ toc, variant = "both" }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (toc.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "0px 0px -65% 0px",
        threshold: 0.1,
      }
    );

    toc.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [toc]);

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
      setMobileOpen(false);
    }
  };

  if (toc.length === 0) return null;

  const showMobile = variant === "mobile" || variant === "both";
  const showDesktop = variant === "desktop" || variant === "both";

  return (
    <>
      {/* 1. Versão Mobile: Dropdown Colapsável no Topo do Artigo */}
      {showMobile && (
        <div className="lg:hidden my-6 p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/90 dark:bg-[#0A121A]/90 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-full flex items-center justify-between text-left font-mono text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-white"
          >
            <div className="flex items-center gap-2">
              <ListCollapse className="w-4 h-4 text-emerald-500" />
              <span>Neste Artigo (Índice de Tópicos)</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                mobileOpen ? "rotate-180 text-emerald-500" : ""
              }`}
            />
          </button>

          {mobileOpen && (
            <nav className="mt-3 pt-3 border-t border-slate-200 dark:border-white/[0.08] space-y-1.5">
              {toc.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToHeading(item.id)}
                    className={`w-full text-left text-xs py-1 transition-colors flex items-center gap-1.5 ${
                      item.level === 3 ? "pl-4" : "pl-1"
                    } ${
                      isActive
                        ? "text-emerald-600 dark:text-emerald-400 font-semibold"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <ChevronRight
                      className={`w-3 h-3 shrink-0 ${
                        isActive ? "text-emerald-500 opacity-100" : "opacity-0"
                      }`}
                    />
                    <span className="truncate">{item.text}</span>
                  </button>
                );
              })}
            </nav>
          )}
        </div>
      )}

      {/* 2. Versão Desktop: Barra Lateral Fixa com Tracking (Sticky TOC) */}
      {showDesktop && (
        <aside className="hidden lg:block sticky top-28 space-y-4">
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-[#070D14]/70 backdrop-blur-xl shadow-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-white/[0.06] mb-3">
              <ListCollapse className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Neste Artigo
              </span>
            </div>

          <nav className="space-y-1 max-h-[calc(100vh-280px)] overflow-y-auto scrollbar-none pr-1">
            {toc.map((item) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToHeading(item.id)}
                  className={`group w-full text-left text-xs py-1.5 px-2 rounded-lg transition-all flex items-center gap-2 ${
                    item.level === 3 ? "pl-5" : ""
                  } ${
                    isActive
                      ? "text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-500/10 dark:bg-emerald-500/15"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04]"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${
                      isActive ? "bg-emerald-500 dark:bg-emerald-400" : "bg-transparent group-hover:bg-slate-400 dark:group-hover:bg-slate-600"
                    }`}
                  />
                  <span className="truncate leading-snug">{item.text}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>
      )}
    </>
  );
}
