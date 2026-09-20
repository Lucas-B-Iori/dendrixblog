"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, ShieldCheck, MessageSquare, ExternalLink } from "lucide-react";
import {
  trackDemoPageView,
  trackOpenCal,
  trackWhatsAppClick,
  trackGenerateLead,
} from "@/lib/analytics";

interface DemonstracaoClientProps {
  calUrl: string;
  whatsappUrl: string;
}

export function DemonstracaoClient({ calUrl, whatsappUrl }: DemonstracaoClientProps) {
  useEffect(() => {
    // 1. Registro de visualização da página de demonstração
    trackDemoPageView({ source: "direct_page_load" });

    // 2. Registro do carregamento do agendamento Cal.com incorporado
    trackOpenCal({ interaction_type: "page_embed", source: "demonstracao_page" });

    // 3. Listener para captura confiável do evento de confirmação de agendamento do Cal.com
    const handleMessage = (e: MessageEvent) => {
      let data = e.data;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          // ignora mensagens não-JSON
        }
      }
      if (!data) return;

      const isCalBooking =
        data.action === "bookingSuccessful" ||
        data.action === "bookingSuccessfulV2" ||
        data.type === "CAL:bookingSuccessful" ||
        data.type === "CAL:bookingSuccessfulV2" ||
        data.event === "bookingSuccessful" ||
        data.event === "bookingSuccessfulV2" ||
        (data.origin === "CAL" && (data.type === "bookingSuccessful" || data.type === "bookingSuccessfulV2"));

      if (isCalBooking) {
        trackGenerateLead({
          source: "cal_embed",
          context: "demonstracao_page",
          booking_id: data.data?.uid || data.payload?.uid || undefined,
        });
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--surface-canvas)] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto w-full">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-[#E2E8F0] text-xs font-mono text-[var(--text-secondary)] hover:text-[#0F2B48] hover:border-slate-300 transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar para a página inicial</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-[var(--surface-primary)] border border-[var(--border-subtle)] rounded-2xl shadow-card p-6 sm:p-8">
          <div className="mb-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] text-xs font-mono font-medium mb-3">
              <Calendar className="w-3.5 h-3.5" />
              <span>SESSÃO TÉCNICA DE 15 MINUTOS VIA GOOGLE MEET</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[var(--text-primary)]">
              Agendar Demonstração Prática
            </h1>
            <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">
              Veja o Dendrix ler os autos em PDF, mapear contradições e auxiliar na redação da minuta em tempo real. Traga um processo da sua própria banca ou acompanhe nosso caso modelo.
            </p>
          </div>

          {/* Cal.com Embed */}
          <div className="h-[520px] sm:h-[580px] w-full border border-[var(--border-subtle)] rounded-xl overflow-hidden bg-white mb-6">
            <iframe
              src={calUrl}
              title="Agendamento Cal.com"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>

          {/* Quick links & WhatsApp fast-lane */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs">
            <a
              href={calUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackOpenCal({
                  interaction_type: "full_screen_external",
                  source: "demonstracao_page_fullscreen_link",
                })
              }
              className="inline-flex items-center gap-1 text-[var(--accent-navy)] hover:underline"
            >
              <span>Abrir agenda em tela cheia</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackWhatsAppClick({
                  cta_location: "demonstracao_page",
                  cta_text: "Dúvidas ou agendamento direto pelo WhatsApp",
                })
              }
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-medium transition-colors border border-emerald-200"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Dúvidas ou agendamento direto pelo WhatsApp</span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[var(--text-tertiary)] pt-6 mt-6 border-t border-[var(--border-subtle)]">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            <span>Dados protegidos pela LGPD. Sem spam. Demonstração sem compromisso comercial.</span>
          </div>
        </div>
      </div>

      <div className="text-center pt-8 text-xs text-[var(--text-tertiary)]">
        © {new Date().getFullYear()} Dendrix CRM • dendrixcrm.com.br
      </div>
    </div>
  );
}
