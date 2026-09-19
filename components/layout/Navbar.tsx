"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, Calendar } from "lucide-react";
import { useDemoModal } from "@/components/providers/DemoModalProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import { KineticLink } from "@/components/motion/KineticLink";
import { MorphingThemeToggle } from "@/components/motion/MorphingThemeToggle";

interface NavbarProps {
  onOpenDemo?: () => void;
}

export function Navbar({ onOpenDemo }: NavbarProps) {
  const { openDemoModal } = useDemoModal();
  const { isDark, toggleTheme } = useTheme();
  const handleOpen = onOpenDemo || openDemoModal;
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
    { label: "Cockpit do Advogado", href: "#cockpit" },
    { label: "O Loop do Caso", href: "#como-funciona" },
    { label: "Especialidades", href: "#especialidades" },
    { label: "Segurança", href: "#seguranca" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-[#FBFBFA]/90 dark:bg-[#05080C]/90 backdrop-blur-xl border-b border-slate-200 dark:border-white/[0.08] shadow-md"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="font-serif text-2xl sm:text-[1.65rem] font-medium tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
              Dendrix
            </span>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-semibold tracking-wider">
              CRM JURÍDICO
            </span>
          </Link>

          {/* Desktop Navigation Links com KineticLink */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <KineticLink
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {link.label}
              </KineticLink>
            ))}
          </nav>

          {/* Action CTAs & Controls */}
          <div className="hidden md:flex items-center gap-4">
            {/* Morphing Theme Toggle Conectado ao ThemeProvider */}
            <MorphingThemeToggle
              isDark={isDark}
              onToggle={toggleTheme}
              size="sm"
            />

            <a
              href="https://dendrix.app.br"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors px-2.5 py-1.5"
            >
              Entrar
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>

            <button
              type="button"
              onClick={handleOpen}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#0F2B48] to-[#0A3D62] hover:from-[#13375C] hover:to-[#0C4A75] border border-white/10 rounded-xl transition-all duration-200 shadow-[0_0_15px_rgba(15,43,72,0.4)] cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>Agendar demonstração</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <MorphingThemeToggle
              isDark={isDark}
              onToggle={toggleTheme}
              size="sm"
            />
            <button
              type="button"
              onClick={handleOpen}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#0F2B48] border border-white/10 rounded-lg cursor-pointer"
            >
              Agendar
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white focus-ring rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/[0.03]"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-white/10 bg-[#FBFBFA]/98 dark:bg-[#05080C]/98 backdrop-blur-2xl px-4 pt-2 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1.5 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.05] rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col gap-3">
            <a
              href="https://dendrix.app.br"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 w-full py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl"
            >
              Acessar plataforma (Entrar)
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                handleOpen();
              }}
              className="w-full py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#0F2B48] to-[#0A3D62] border border-white/10 rounded-xl text-center shadow-lg cursor-pointer"
            >
              Agendar demonstração prática (15 min)
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
