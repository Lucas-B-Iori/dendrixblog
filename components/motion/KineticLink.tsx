"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface KineticLinkProps {
  href: string;
  children: string;
  className?: string;
  target?: string;
  rel?: string;
  showArrow?: boolean;
  arrowClassName?: string;
  onClick?: () => void;
}

/**
 * KineticLink (Inspirado em Skiper 40 / CssLink)
 * Link cinético com efeito split-text roll no hover e rotação de seta em 45º.
 * Substitui links estáticos convencionais por microinterações táteis de alta precisão.
 */
export function KineticLink({
  href,
  children,
  className = "",
  target,
  rel,
  showArrow = false,
  arrowClassName = "",
  onClick,
}: KineticLinkProps) {
  const isExternal = href.startsWith("http");

  const content = (
    <span className="relative inline-flex items-center gap-1.5 overflow-hidden group cursor-pointer">
      <span className="relative block overflow-hidden leading-tight">
        {/* Texto original que sobe no hover */}
        <span className="block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
          {children}
        </span>
        {/* Texto espelho que surge de baixo */}
        <span
          className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 text-emerald-600 dark:text-emerald-400 font-medium"
          aria-hidden="true"
        >
          {children}
        </span>
      </span>

      {showArrow && (
        <ArrowUpRight
          className={`w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-500 ${arrowClassName}`}
        />
      )}
    </span>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target={target || "_blank"}
        rel={rel || "noopener noreferrer"}
        onClick={onClick}
        className={`inline-block ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={`inline-block ${className}`}>
      {content}
    </Link>
  );
}
