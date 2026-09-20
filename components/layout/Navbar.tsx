"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight, Calendar, LogIn } from "lucide-react";
import { useDemoModal } from "@/components/providers/DemoModalProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import { KineticLink } from "@/components/motion/KineticLink";
import { MorphingThemeToggle } from "@/components/motion/MorphingThemeToggle";
import { trackDemoCtaClick, trackLoginClick } from "@/lib/analytics";
import { ENV_CONFIG } from "@/lib/config";

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
    { label: "Recursos", href: "/#recursos" },
    { label: "Cockpit", href: "/#cockpit" },
    { label: "Como Funciona", href: "/#como-funciona" },
    { label: "Especialidades", href: "/#especialidades" },
    { label: "Segurança", href: "/#seguranca" },
    { label: "FAQ", href: "/#faq" },
    { label: "Blog", href: "/blog" },
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
        <div className="flex items-center justify-between h-18 gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 mr-2 lg:mr-6 group">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-2xs group-hover:scale-105 transition-transform duration-200 shrink-0 bg-[#0A121A]">
              <img
                src="/icon-96x96.png"
                alt="Dendrix CRM"
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-serif text-2xl sm:text-[1.65rem] font-medium tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
              Dendrix
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-semibold tracking-wider whitespace-nowrap">
              CRM JURÍDICO
            </span>
          </Link>

          {/* Desktop Navigation Links com KineticLink */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7 shrink-0">
            {navLinks.map((link) => (
              <KineticLink
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap"
              >
                {link.label}
              </KineticLink>
            ))}
          </nav>

          {/* Action CTAs & Controls */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4 shrink-0">
            {/* Morphing Theme Toggle Conectado ao ThemeProvider */}
            <MorphingThemeToggle
              isDark={isDark}
              onToggle={toggleTheme}
              size="sm"
            />

            <a
              href={ENV_CONFIG.appLoginUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackLoginClick({ cta_location: "navbar_desktop" })}
              title="Acessar o sistema Dendrix (Área do Cliente)"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-100/90 dark:bg-white/[0.06] hover:bg-slate-200/90 dark:hover:bg-white/[0.12] border border-slate-300/80 dark:border-white/15 rounded-xl transition-all duration-200 shadow-2xs hover:shadow-xs hover:border-slate-400 dark:hover:border-white/30 whitespace-nowrap group"
            >
              <LogIn className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 transition-transform duration-200 group-hover:scale-110" />
              <span>Entrar</span>
            </a>

            <button
              type="button"
              onClick={() => {
                trackDemoCtaClick({
                  cta_location: "navbar_desktop",
                  cta_text: "Agendar demonstração",
                });
                handleOpen();
              }}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#0F2B48] to-[#0A3D62] hover:from-[#13375C] hover:to-[#0C4A75] border border-white/10 rounded-xl transition-all duration-200 shadow-[0_0_15px_rgba(15,43,72,0.4)] cursor-pointer hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
            >
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>Agendar demonstração</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button & Quick Actions */}
          <div className="flex md:hidden items-center gap-1.5 sm:gap-2">
            <MorphingThemeToggle
              isDark={isDark}
              onToggle={toggleTheme}
              size="sm"
            />
            <a
              href={ENV_CONFIG.appLoginUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackLoginClick({ cta_location: "navbar_mobile_top" })}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-800 dark:text-slate-100 bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.08] dark:hover:bg-white/[0.15] border border-slate-300/90 dark:border-white/15 rounded-lg transition-colors whitespace-nowrap"
            >
              <LogIn className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Entrar</span>
            </a>
            <button
              type="button"
              onClick={() => {
                trackDemoCtaClick({
                  cta_location: "navbar_mobile",
                  cta_text: "Agendar",
                });
                handleOpen();
              }}
              className="px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-white bg-[#0F2B48] border border-white/10 rounded-lg cursor-pointer whitespace-nowrap"
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

      {/* Mobile Drawer com animação sutil e suave de abertura e fechamento */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-b border-slate-200 dark:border-white/10 bg-[#FBFBFA]/98 dark:bg-[#05080C]/98 backdrop-blur-2xl px-4 pt-2 pb-6 space-y-3"
          >
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
              <div className="p-3 rounded-xl bg-emerald-500/[0.07] border border-emerald-500/20 dark:bg-emerald-950/20 dark:border-emerald-500/30 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">Já é cliente Dendrix?</p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 truncate">Acesse sua conta e processos</p>
                </div>
                <a
                  href={ENV_CONFIG.appLoginUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    trackLoginClick({ cta_location: "navbar_mobile_drawer" });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-xs transition-colors shrink-0"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Entrar</span>
                </a>
              </div>
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
