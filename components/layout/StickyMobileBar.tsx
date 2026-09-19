"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Calendar } from "lucide-react";
import { getWhatsAppLink } from "@/lib/config";
import { useDemoModal } from "@/components/providers/DemoModalProvider";

export function StickyMobileBar() {
  const [isVisible, setIsVisible] = useState(false);
  const { openDemoModal } = useDemoModal();

  useEffect(() => {
    const handleScroll = () => {
      // No mobile, ativa quando o usuário rola além de 350px (passou dos botões do Hero)
      setIsVisible(window.scrollY > 350);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappUrl = getWhatsAppLink(
    "Olá! Estava no site do Dendrix e gostaria de agendar uma demonstração prática de 15 minutos para o meu escritório."
  );

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Barra de ações rápidas"
      className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-[#05080C]/90 backdrop-blur-xl border-t border-slate-200 dark:border-white/10 px-4 py-2.5 shadow-xl dark:shadow-[0_-10px_30px_rgba(0,0,0,0.8)] transition-transform duration-300 animate-in slide-in-from-bottom-full"
      style={{ paddingBottom: "calc(0.625rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <div className="flex items-center gap-2.5 max-w-md mx-auto">
        <button
          type="button"
          onClick={openDemoModal}
          className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-semibold shadow-[0_0_15px_rgba(16,185,129,0.3)] active:scale-[0.98] transition-transform cursor-pointer border border-emerald-400/30"
        >
          <Calendar className="w-4 h-4 text-emerald-200" />
          <span>Agendar Demonstração (15m)</span>
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar no WhatsApp"
          className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:text-emerald-500 dark:hover:text-emerald-400 active:scale-[0.98] transition-colors"
        >
          <MessageSquare className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
        </a>
      </div>
    </aside>
  );
}
