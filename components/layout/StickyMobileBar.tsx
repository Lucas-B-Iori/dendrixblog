"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Calendar } from "lucide-react";
import { getWhatsAppLink } from "@/lib/config";
import { useDemoModal } from "@/components/providers/DemoModalProvider";

export function StickyMobileBar() {
  const [isVisible, setIsVisible] = useState(false);
  const { openDemoModal } = useDemoModal();

  useEffect(() => {
    const heroEl = document.getElementById("hero");
    if (!heroEl) {
      const handleScroll = () => {
        setIsVisible(window.scrollY > 500);
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // A barra surge após o Hero sair do campo de visão superior
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  const whatsappUrl = getWhatsAppLink(
    "Olá! Estava no site do Dendrix e gostaria de agendar uma demonstração prática de 15 minutos para o meu escritório."
  );

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Barra de ações rápidas"
      className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--surface-primary)]/95 backdrop-blur-md border-t border-[var(--border-subtle)] px-4 py-2.5 shadow-2xl transition-transform duration-300 animate-in slide-in-from-bottom-full"
      style={{ paddingBottom: "calc(0.625rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <div className="flex items-center gap-2.5 max-w-md mx-auto">
        <button
          type="button"
          onClick={openDemoModal}
          className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--accent-emerald)] text-white text-xs font-semibold shadow-xs active:scale-[0.98] transition-transform cursor-pointer"
        >
          <Calendar className="w-4 h-4" />
          <span>Agendar Demonstração (15m)</span>
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar no WhatsApp"
          className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg bg-[var(--surface-subtle)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-emerald-700 active:scale-[0.98] transition-colors"
        >
          <MessageSquare className="w-5 h-5 text-emerald-600" />
        </a>
      </div>
    </aside>
  );
}
