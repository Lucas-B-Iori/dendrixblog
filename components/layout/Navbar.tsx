"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  onOpenDemo?: () => void;
}

export function Navbar({ onOpenDemo }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Recursos", href: "#recursos" },
    { label: "O Loop do Caso", href: "#como-funciona" },
    { label: "Calculadora", href: "#calculadora" },
    { label: "Segurança", href: "#seguranca" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? "bg-[#FBFBFA]/90 backdrop-blur-md border-b border-[#E2E8F0] shadow-xs"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-serif text-2xl sm:text-[1.65rem] font-medium tracking-tight text-[#0F172A] group-hover:text-[#0F2B48] transition-colors">
              Dendrix
            </span>
            <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#0F2B48]/8 text-[#0F2B48] font-semibold tracking-wider">
              CRM
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#334155] hover:text-[#0F2B48] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://dendrix.app.br"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-[#334155] hover:text-[#0F2B48] transition-colors px-2 py-1.5"
            >
              Entrar
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>

            <button
              type="button"
              onClick={onOpenDemo}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-[#0F2B48] hover:bg-[#0A1C30] rounded-md transition-colors shadow-xs cursor-pointer focus-ring"
            >
              Agendar demonstração
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={onOpenDemo}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#0F2B48] rounded-md cursor-pointer"
            >
              Agendar
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#334155] hover:text-[#0F172A] focus-ring rounded-md"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E2E8F0] bg-[#FBFBFA]/98 backdrop-blur-xl px-4 pt-2 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-2 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-medium text-[#334155] hover:bg-[#F4F4F2] rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-4 border-t border-[#E2E8F0] flex flex-col gap-3">
            <a
              href="https://dendrix.app.br"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 w-full py-2.5 text-sm font-medium text-[#334155] bg-[#F4F4F2] rounded-md"
            >
              Acessar plataforma (Entrar)
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemo?.();
              }}
              className="w-full py-3 text-sm font-semibold text-white bg-[#0F2B48] rounded-md text-center shadow-xs cursor-pointer"
            >
              Agendar demonstração prática (15 min)
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
