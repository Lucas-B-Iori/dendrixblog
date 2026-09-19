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
    <SectionWrapper id="faq" className="border-t border-slate-200 dark:border-white/[0.08] bg-transparent" spacing="default" width="narrow">
      <div className="text-center mb-14">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full inline-block mb-3">
          ESCLARECIMENTOS TÉCNICOS
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 dark:text-white mb-4 text-balance">
          Perguntas diretas sobre o funcionamento do Dendrix.
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-xl mx-auto">
          Informações objetivas para esclarecer pontos operacionais antes de agendar sua demonstração.
        </p>
      </div>

      <div className="divide-y divide-slate-200 dark:divide-white/[0.08] bg-white dark:bg-[#0A121A] border border-slate-200 dark:border-white/10 rounded-2xl p-4 sm:p-8 shadow-xl dark:shadow-2xl backdrop-blur-xl">
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
                className="w-full flex items-center justify-between text-left py-2 font-medium text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md cursor-pointer group"
              >
                <span className="text-base sm:text-lg pr-4 font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-300">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 flex-shrink-0 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-emerald-500 dark:text-emerald-400" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="pt-3 pb-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed animate-in fade-in-50 duration-200"
                >
                  {faq.bullets ? (
                    <div className="space-y-3">
                      <p>{faq.answerText}</p>
                      <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                        {faq.bullets.map((bullet, bIdx) => (
                          <li key={bIdx}>
                            <strong className="text-slate-900 dark:text-white font-semibold">{bullet.label}:</strong>{" "}
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
