"use client";

import { useEffect, useState } from "react";
import { X, Calendar, MessageSquare, ExternalLink, ShieldCheck } from "lucide-react";
import { ENV_CONFIG, getWhatsAppLink } from "@/lib/config";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Fecha no ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
      setIframeLoaded(false);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const calUrl = ENV_CONFIG.calUrl;
  const whatsappUrl = getWhatsAppLink(
    "Olá! Estava no site do Dendrix e gostaria de agendar uma demonstração prática de 15 minutos para o meu escritório."
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-[var(--surface-primary)] border border-[var(--border-subtle)] rounded-2xl shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto relative flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[var(--border-subtle)] flex items-start justify-between bg-[var(--surface-subtle)] rounded-t-2xl">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] text-xs font-mono font-medium mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>SESSÃO DE 15 MINUTOS VIA GOOGLE MEET</span>
            </div>
            <h3 id="modal-title" className="font-serif text-xl sm:text-2xl text-[var(--text-primary)] font-semibold">
              Demonstração Prática do Dendrix
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
              Escolha o melhor horário na agenda oficial. Traga um processo da sua banca ou acompanhe nosso caso modelo.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] p-1.5 rounded-md hover:bg-[var(--surface-primary)] transition-colors cursor-pointer"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content: Cal.com Real Embed */}
        <div className="p-4 sm:p-6 space-y-4">
          <div className="h-[460px] sm:h-[500px] w-full border border-[var(--border-subtle)] rounded-xl overflow-hidden bg-white relative">
            {!iframeLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-50 text-xs font-mono text-slate-500">
                Carregando agenda oficial...
              </div>
            )}
            <iframe
              src={calUrl}
              title="Agendamento de Demonstração Dendrix"
              className="w-full h-full border-0"
              loading="lazy"
              onLoad={() => setIframeLoaded(true)}
            />
          </div>

          {/* Fast-lane WhatsApp alternative */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs">
            <a
              href={calUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[var(--accent-navy)] hover:underline"
            >
              <span>Abrir agenda em tela cheia</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-medium transition-colors border border-emerald-200"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Dúvidas ou agendamento direto pelo WhatsApp</span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[var(--text-tertiary)] pt-3 border-t border-[var(--border-subtle)]">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            <span>Seus dados são confidenciais e protegidos pela LGPD. Sem compromisso comercial.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
