"use client";

import { useState } from "react";
import { SectionWrapper } from "../layout/SectionWrapper";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: React.ReactNode;
}


const faqs: FaqItem[] = [
  {
    question: "O Dendrix substitui o advogado ou redige peças sem intervenção humana?",
    answer: (
      <p>
        <strong className="text-[var(--text-primary)]">Não.</strong> O Dendrix é uma ferramenta de suporte. Ele localiza informações nos autos, indica as páginas pertinentes e fornece uma base textual estruturada para a peça. O raciocínio jurídico, a estratégia processual e a revisão final são indelegáveis e pertencem ao advogado.
      </p>
    ),
  },
  {
    question: "Como o sistema lida com autos digitalizados antigos ou escaneados?",
    answer: (
      <p>
        O sistema conta com pipeline de OCR (Reconhecimento Óptico de Caracteres). Documentos em PDF que não possuem texto nativo selecionável são processados para identificação de caracteres, permitindo a leitura e a referência de páginas mesmo em peças digitalizadas legadas.
      </p>
    ),
  },
  {
    question: "Quais medidas são adotadas para a segurança e privacidade dos dados dos processos?",
    answer: (
      <div className="space-y-2">
        <p>A segurança é tratada por meio de camadas técnicas e contratuais:</p>
        <ul className="list-disc pl-5 space-y-1.5 text-sm">
          <li>
            <strong className="text-[var(--text-primary)]">Armazenamento:</strong> Dados alocados em infraestrutura de nuvem em São Paulo, com criptografia em trânsito (TLS 1.3) e repouso (AES-256).
          </li>
          <li>
            <strong className="text-[var(--text-primary)]">Processamento de IA:</strong> Uso exclusivo de APIs corporativas cujos termos vedam o uso dos dados de clientes para treinamento de modelos abertos.
          </li>
          <li>
            <strong className="text-[var(--text-primary)]">Governança:</strong> Controles de acesso por credenciais individuais e práticas alinhadas às diretrizes da LGPD e ao sigilo profissional.
          </li>
        </ul>
      </div>
    ),
  },
  {
    question: "É necessário instalar algum software localmente?",
    answer: (
      <p>
        <strong className="text-[var(--text-primary)]">Não.</strong> O Dendrix é uma aplicação web que opera em nuvem. O acesso é feito diretamente pelo navegador em computadores conectados à internet, sem necessidade de servidores locais ou manutenção de infraestrutura de TI no escritório.
      </p>
    ),
  },
  {
    question: "O que acontece durante a demonstração de 15 minutos?",
    answer: (
      <p>
        É uma sessão prática individual via Google Meet conduzida por um especialista. Você pode acompanhar a leitura de um processo da sua própria banca (ou de um caso modelo de exemplo), observando o mapeamento dos autos e a geração assistida da minuta em tempo real.
      </p>
    ),
  },
  {
    question: "Qual é a cobertura do monitoramento de publicações?",
    answer: (
      <p>
        O monitoramento é integrado aos Diários de Justiça Eletrônicos (incluindo o DJEN e os principais diários oficiais dos tribunais estaduais e federais), cobrindo o território nacional a partir do cadastro do nome do profissional e número de inscrição na OAB.
      </p>
    ),
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((current) => (current === idx ? null : idx));
  };

  return (
    <SectionWrapper id="faq" className="bg-[var(--surface-subtle)]" spacing="default">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="eyebrow mb-3">ESCLARECIMENTOS TÉCNICOS</div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[var(--text-primary)] mb-4">
            Perguntas diretas sobre o funcionamento do Dendrix.
          </h2>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg">
            Informações objetivas para esclarecer pontos operacionais antes de agendar sua demonstração.
          </p>
        </div>

        <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)] bg-[var(--surface-primary)] rounded-xl px-4 sm:px-6 shadow-xs">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const contentId = `faq-content-${idx}`;
            const buttonId = `faq-btn-${idx}`;

            return (
              <div key={idx} className="py-4">
                <button
                  id={buttonId}
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  className="w-full flex items-center justify-between text-left py-2 font-medium text-[var(--text-primary)] hover:text-[var(--accent-navy)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-navy)] rounded-md cursor-pointer group"
                >
                  <span className="text-base sm:text-lg pr-4 font-semibold group-hover:text-[var(--accent-navy)]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 text-[var(--text-tertiary)] transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[var(--accent-navy)]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="pt-2 pb-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed animate-in fade-in-50 duration-200"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
