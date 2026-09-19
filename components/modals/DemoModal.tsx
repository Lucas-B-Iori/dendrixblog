"use client";

import { useState, useEffect } from "react";
import { X, Calendar, ArrowRight, ShieldCheck, MessageSquare, ExternalLink } from "lucide-react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TEAM_SIZES = [
  "Apenas eu (Solo)",
  "2 a 4 advogados",
  "5 a 8 advogados",
  "Mais de 8 advogados",
];

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [teamSize, setTeamSize] = useState("2 a 4 advogados");
  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string }>({});

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Mask phone
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    } else if (value.length > 6) {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,5})$/, "($1) $2");
    } else if (value.length > 0) {
      value = `(${value}`;
    }
    setPhone(value);
  };

  const validate = () => {
    const newErrors: { name?: string; phone?: string; email?: string } = {};
    if (!name.trim() || name.trim().length < 3) {
      newErrors.name = "Informe seu nome completo.";
    }
    const cleanPhone = phone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone = "Informe um telefone válido com DDD.";
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Informe um e-mail profissional válido.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // In production, send lead data to webhook/API here
      setStep(2);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Olá! Estava no site do Dendrix e gostaria de agendar uma demonstração prática de 15 minutos para o meu escritório (${teamSize}). Meu nome é ${name || "Doutor(a)"}.`
  );
  const whatsappUrl = `https://wa.me/5511999999999?text=${whatsappMessage}`;

  const calUrl = `https://cal.com/dendrix/demonstracao-15min?name=${encodeURIComponent(
    name
  )}&email=${encodeURIComponent(email)}&guests=${encodeURIComponent(
    phone
  )}&metadata[team_size]=${encodeURIComponent(teamSize)}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-[var(--surface-primary)] border border-[var(--border-subtle)] rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto relative flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[var(--border-subtle)] flex items-start justify-between bg-[var(--surface-subtle)] rounded-t-2xl">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] text-xs font-mono font-medium mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>SESSÃO DE 15 MINUTOS VIA GOOGLE MEET</span>
            </div>
            <h3 id="modal-title" className="font-serif text-2xl text-[var(--text-primary)] font-semibold">
              Demonstração Prática do Dendrix
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              Traga um caso real da sua banca ou acompanhe nosso processo modelo ao vivo.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] p-1.5 rounded-md hover:bg-[var(--surface-primary)] transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 ? (
            <form onSubmit={handleSubmitStep1} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-1.5 font-mono">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Dr(a). Seu Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-strong)] bg-white text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-navy)] focus:border-transparent transition-all"
                />
                {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-1.5 font-mono">
                    WhatsApp com DDD *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(11) 99999-9999"
                    value={phone}
                    onChange={handlePhoneChange}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-strong)] bg-white text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-navy)] focus:border-transparent transition-all font-mono"
                  />
                  {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-1.5 font-mono">
                    E-mail Profissional *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="voce@seuescritorio.com.br"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-strong)] bg-white text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-navy)] focus:border-transparent transition-all"
                  />
                  {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-2 font-mono">
                  Tamanho da Banca Jurídica
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {TEAM_SIZES.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setTeamSize(size)}
                      className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all text-left cursor-pointer ${
                        teamSize === size
                          ? "bg-[var(--accent-navy)] text-white border-[var(--accent-navy)] shadow-xs"
                          : "bg-[var(--surface-subtle)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--border-strong)]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[var(--accent-emerald)] hover:bg-[#047857] text-white font-medium text-sm transition-all shadow-sm cursor-pointer"
                >
                  <span>Continuar para Escolha de Horário</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--accent-emerald)] transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Prefere tirar dúvidas ou agendar direto pelo WhatsApp?</span>
                </a>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[var(--text-tertiary)] pt-3 border-t border-[var(--border-subtle)]">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>Seus dados são confidenciais e protegidos pela LGPD. Sem spam.</span>
              </div>
            </form>
          ) : (
            <div className="space-y-4 text-center">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-left">
                <p className="font-semibold text-sm mb-1">Quase pronto, {name.split(" ")[0]}!</p>
                <p className="text-xs text-emerald-800">
                  Selecione o melhor dia e horário na agenda oficial abaixo. Um link do Google Meet será gerado e enviado para <strong>{email}</strong>.
                </p>
              </div>

              {/* Cal.com embed container or direct launcher */}
              <div className="h-[380px] w-full border border-[var(--border-subtle)] rounded-xl overflow-hidden bg-white relative">
                <iframe
                  src={calUrl}
                  title="Agendamento de Demonstração Dendrix"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <a
                  href={calUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[var(--accent-navy)] hover:underline"
                >
                  <span>Abrir agenda em tela cheia</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 hover:bg-emerald-200 text-xs font-medium transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Confirmar horário via WhatsApp</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
