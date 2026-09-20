import React from "react";
import type { Metadata } from "next";
import { ENV_CONFIG, getWhatsAppLink } from "@/lib/config";
import { DemonstracaoClient } from "@/components/demonstracao/DemonstracaoClient";

export const metadata: Metadata = {
  title: "Agendar Demonstração Prática (15 min) | Dendrix CRM",
  description:
    "Escolha o melhor dia e horário para ver o Dendrix ler um processo da sua banca e estruturar a minuta ao vivo.",
  alternates: {
    canonical: "https://dendrixcrm.com.br/demonstracao/",
  },
  openGraph: {
    title: "Agendar Demonstração Prática (15 min) | Dendrix CRM",
    description:
      "Escolha o melhor dia e horário para ver o Dendrix ler um processo da sua banca e estruturar a minuta ao vivo.",
    url: "https://dendrixcrm.com.br/demonstracao/",
    siteName: "Dendrix CRM",
    locale: "pt_BR",
    type: "website",
  },
};

export default function DemonstracaoPage() {
  const calUrl = ENV_CONFIG.calUrl;
  const whatsappUrl = getWhatsAppLink(
    "Olá! Estava na página de agendamento do Dendrix e gostaria de marcar uma demonstração de 15 minutos para o meu escritório."
  );

  return <DemonstracaoClient calUrl={calUrl} whatsappUrl={whatsappUrl} />;
}
