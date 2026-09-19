import React from "react";
import Link from "next/link";
import { ShieldCheck, Server, Lock } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[#0B0F17] text-[#F8FAFC] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Positioning */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-medium tracking-tight text-white">
                Dendrix
              </span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/10 text-white/90 font-semibold tracking-wider">
                CRM
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              O CRM jurídico onde a gestão do escritório e a inteligência dos autos vivem no mesmo lugar. Dos autos à minuta, com a origem das informações sempre visível.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2">
              <span className="inline-flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-slate-400" />
                Nuvem no Brasil (São Paulo)
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                Criptografia TLS 1.3 / AES-256
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                Zero Retenção para Treino de IA
              </span>
            </div>
          </div>

          {/* Col 2: Produto & Navegação */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono">
              Produto
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="#recursos" className="hover:text-white transition-colors">
                  Recursos & Pilares
                </a>
              </li>
              <li>
                <a href="#como-funciona" className="hover:text-white transition-colors">
                  O Loop do Caso
                </a>
              </li>
              <li>
                <a href="#calculadora" className="hover:text-white transition-colors">
                  Calculadora de Tempo
                </a>
              </li>
              <li>
                <a href="#seguranca" className="hover:text-white transition-colors">
                  Segurança & LGPD
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Perguntas Frequentes
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Acesso & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono">
              Plataforma
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a
                  href="https://dendrix.app.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  Acessar Aplicativo (Login)
                </a>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog Forense
                </Link>
              </li>
              <li>
                <a href="#agendar" className="hover:text-white transition-colors">
                  Agendar Demonstração (15 min)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal notice and compliance */}
        <div className="pt-8 space-y-4 text-xs text-slate-400 leading-relaxed">
          <p>
            <strong className="text-slate-300 font-medium">Nota de Conformidade Ética:</strong> O Dendrix é uma ferramenta de apoio analítico e operacional à advocacia. A responsabilidade técnica, a escolha de teses jurídicas e a aprovação final de petições permanecem integralmente sob a exclusiva condução do profissional do direito, em estrita observância ao Estatuto da Advocacia e ao Código de Ética e Disciplina da OAB.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-slate-850 text-slate-400">
            <p>© {new Date().getFullYear()} Dendrix CRM. Todos os direitos reservados.</p>
            <p className="font-mono text-[11px]">dendrixcrm.com.br</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
