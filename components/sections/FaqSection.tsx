"use client";

import { useState } from "react";
import { SectionWrapper } from "../layout/SectionWrapper";
import { ChevronDown } from "lucide-react";
import { FAQ_DATA } from "@/lib/faqData";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((current) => (current === idx ? null : idx));
  };

  return (
    <SectionWrapper id="faq" className="border-t border-[#E2E8F0]/70 bg-white/70" spacing="default" width="narrow">
      <div className="text-center mb-14">
        <div className="eyebrow mb-3">ESCLARECIMENTOS TÉCNICOS</div>
        <h2 className="font-serif text-3xl sm:text-4xl text-[var(--text-primary)] mb-4 text-balance">
          Perguntas diretas sobre o funcionamento do Dendrix.
        </h2>
        <p className="text-[var(--text-secondary)] text-base sm:text-lg max-w-xl mx-auto">
          Informações objetivas para esclarecer pontos operacionais antes de agendar sua demonstração.
        </p>
      </div>

      <div className="divide-y divide-[var(--border-subtle)] bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:p-8 shadow-xs">
        {FAQ_DATA.map((faq, idx) => {
          const isOpen = openIndex === idx;
          const contentId = `faq-content-${idx}`;
          const buttonId = `faq-btn-${idx}`;

          return (
            <div key={faq.id} className="py-5 first:pt-2 last:pb-2">
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
                  className="pt-3 pb-2 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed animate-in fade-in-50 duration-200"
                >
                  {faq.bullets ? (
                    <div className="space-y-3">
                      <p>{faq.answerText}</p>
                      <ul className="list-disc pl-5 space-y-2 text-sm text-[#475569]">
                        {faq.bullets.map((bullet, bIdx) => (
                          <li key={bIdx}>
                            <strong className="text-[var(--text-primary)] font-semibold">{bullet.label}:</strong>{" "}
                            {bullet.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p>{faq.answerText}</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
