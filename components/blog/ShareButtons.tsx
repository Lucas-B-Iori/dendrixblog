"use client";

import React, { useState } from "react";
import { MessageCircle, Link as LinkIcon, Check } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  url?: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const getUrl = () => {
    if (typeof window !== "undefined") {
      return url || window.location.href;
    }
    return url || "https://dendrix.app.br/blog";
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const currentUrl = getUrl();
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${title} - Leia no Blog Dendrix: ${currentUrl}`
  )}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    currentUrl
  )}`;

  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-xs text-slate-500 dark:text-slate-400 mr-1">Compartilhar:</span>

      {/* WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0A121A] text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500/30 flex items-center justify-center transition-colors shadow-2xs"
        aria-label="Compartilhar no WhatsApp"
      >
        <MessageCircle className="w-4 h-4" />
      </a>

      {/* LinkedIn */}
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0A121A] text-slate-600 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 hover:border-blue-500/30 flex items-center justify-center transition-colors shadow-2xs"
        aria-label="Compartilhar no LinkedIn"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6Z" />
        </svg>
      </a>

      {/* Copiar Link */}
      <button
        type="button"
        onClick={handleCopy}
        className={`h-8 px-2.5 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-all shadow-2xs ${
          copied
            ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            : "border-slate-200 dark:border-white/10 bg-white dark:bg-[#0A121A] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20"
        }`}
        aria-label="Copiar link do artigo"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-500" />
            <span>Copiado!</span>
          </>
        ) : (
          <>
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Copiar</span>
          </>
        )}
      </button>
    </div>
  );
}
