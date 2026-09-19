"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Bell,
  Sun,
  Moon,
  FolderKanban,
  FileText,
  Clock,
  Send,
  Sparkles,
  Users,
  Scale,
  CheckSquare,
  Calendar,
  ChevronRight,
  Bot,
  LayoutGrid,
  Mic,
  Paperclip,
  Bookmark,
  ExternalLink,
  MessageSquare,
  Volume2,
  CheckCircle2,
  CornerDownLeft,
  Briefcase
} from "lucide-react";
import { Card3D } from "@/components/motion/Card3D";
import { BorderBeam } from "@/components/motion/BorderBeam";

export type TabView = "dashboard" | "pipeline" | "assistente" | "jurisprudencia" | "publicacoes" | "agenda";
export type ThemeMode = "dark" | "light";

interface AssistenteChatState {
  prompt: string;
  selectedArea: string;
  simulatedResponse?: {
    title: string;
    step1: string;
    step2: string;
    actionLabel: string;
    docRef?: string;
  };
}

export function ProductCockpit() {
  const [activeTab, setActiveTab] = useState<TabView>("dashboard");
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);

  // Assistente Interativo State
  const [assistenteState, setAssistenteState] = useState<AssistenteChatState>({
    prompt: "",
    selectedArea: "Geral",
  });

  // Jurisprudência State
  const [selectedTribunal, setSelectedTribunal] = useState<string>("STJ");
  const [jurisSearchQuery, setJurisSearchQuery] = useState("dano moral por negativação indevida");

  const isDark = theme === "dark";

  const handleStarterPromptClick = (starterText: string, simulation: {
    title: string;
    step1: string;
    step2: string;
    actionLabel: string;
    docRef?: string;
  }) => {
    setAssistenteState({
      prompt: starterText,
      selectedArea: "Geral",
      simulatedResponse: simulation,
    });
  };

  const tabs: Array<{ id: TabView; label: string; icon: React.ElementType; badge?: string }> = [
    { id: "dashboard", label: "Painel do Escritório", icon: LayoutGrid },
    { id: "pipeline", label: "Pipeline de Processos", icon: FolderKanban },
    { id: "assistente", label: "Assistente Jurídico IA", icon: Sparkles, badge: "Novo" },
    { id: "jurisprudencia", label: "Jurisprudência IA", icon: Scale },
    { id: "publicacoes", label: "Publicações DJEN", icon: FileText },
    { id: "agenda", label: "Agenda & Tarefas", icon: Calendar },
  ];

  const tribunaisList = [
    "STF", "STJ", "TST", "TRF3", "TRF4", "TJSP", "TJMG", "TJRJ", "TJRS", "TJPR", "TJSC", "TJCE", "TJGO", "TJMA", "TJMT", "CARF"
  ];

  return (
    <div className="w-full">
      {/* Top Controller Bar (Inspirado em Skiper UI & Cult UI) */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-6">
        {/* Module Switcher Tabs com Indicador Deslizante */}
        <div className="flex flex-wrap items-center justify-center p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-xl gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as TabView)}
                className={`relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive ? "text-emerald-400" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabBadge"
                    className="absolute inset-0 bg-[#0F2432] border border-emerald-500/40 rounded-xl shadow-inner -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Live Theme Toggle & Feedback Visual */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-400 hidden sm:inline-block">
            Modo visual do Dendrix:
          </span>
          <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-xs font-semibold text-slate-200 shadow-md hover:border-slate-500 cursor-pointer transition-colors"
            title="Alternar entre modo claro e escuro no cockpit"
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span>Ver Modo Claro</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-400" />
                <span>Ver Modo Escuro</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Janela Principal do Cockpit Interativo */}
      <Card3D enableSpotlight={false}>
        <div
          className={`relative rounded-2xl border transition-colors duration-300 shadow-2xl overflow-hidden font-sans ${
            isDark
              ? "bg-[#061118] border-[#152E42] text-slate-200"
              : "bg-[#F8FAFC] border-[#E2E8F0] text-slate-800"
          }`}
        >
          <BorderBeam size={220} duration={8} colorFrom="#10B981" colorTo="#38BDF8" borderWidth={1.5} />

          {/* Barra Superior da Aplicação (Header Dendrix) */}
          <div
            className={`h-12 px-4 border-b flex items-center justify-between gap-4 transition-colors ${
              isDark ? "bg-[#081722] border-[#152E42]" : "bg-white border-[#E2E8F0]"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="font-serif text-lg font-bold tracking-tight text-emerald-500">
                Dendrix
              </span>
              <span
                className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${
                  isDark
                    ? "bg-[#0B1E2B] text-slate-400 border-[#152E42]"
                    : "bg-slate-100 text-slate-600 border-slate-200"
                }`}
              >
                Ambiente de Produção
              </span>
            </div>

            {/* Barra de Busca Global (⌘K) */}
            <div
              className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs w-72 transition-colors ${
                isDark
                  ? "bg-[#0B1E2B] border-[#152E42] text-slate-400"
                  : "bg-slate-50 border-slate-200 text-slate-500"
              }`}
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Busque autos, clientes ou prazos...</span>
              <kbd
                className={`ml-auto font-mono text-[10px] px-1.5 py-0.5 rounded border ${
                  isDark
                    ? "bg-[#081722] border-[#152E42] text-slate-400"
                    : "bg-white border-slate-200 text-slate-500"
                }`}
              >
                ⌘K
              </kbd>
            </div>

            {/* Ações Rápidas do Topo */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bell className="w-4 h-4 text-slate-400" />
                <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  20
                </span>
              </div>
              <button
                type="button"
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className={`p-1.5 rounded-lg cursor-pointer transition-colors ${
                  isDark ? "hover:bg-white/10 text-amber-400" : "hover:bg-black/5 text-slate-600"
                }`}
                title="Alternar tema"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Corpo do Cockpit: Barra Lateral + Palco Principal */}
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[620px]">
            {/* Sidebar Esquerda (Rigorosamente Fiel ao Dendrix Real) */}
            <div
              className={`hidden md:block md:col-span-3 lg:col-span-2 border-r p-3 space-y-4 transition-colors text-xs ${
                isDark ? "bg-[#081722] border-[#152E42]" : "bg-[#FAFBFB] border-[#E2E8F0]"
              }`}
            >
              {/* Workspace Badge da Banca */}
              <div
                className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${
                  isDark ? "bg-[#0B1E2B] border-[#152E42]" : "bg-white border-slate-200 shadow-2xs"
                }`}
              >
                <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white text-[11px] font-bold flex items-center justify-center">
                  IA
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`font-semibold truncate ${isDark ? "text-white" : "text-[#0F2B48]"}`}>
                    Iori Advocacia
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono">Banca Contenciosa</p>
                </div>
              </div>

              {/* Categorias Jurídicas */}
              <div className="space-y-1">
                <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-2 py-1">
                  Jurídico
                </p>

                {[
                  { label: "Início", icon: LayoutGrid, active: activeTab === "dashboard", tab: "dashboard" as TabView },
                  { label: "Processos", icon: FolderKanban, active: activeTab === "pipeline", tab: "pipeline" as TabView },
                  { label: "Assistente jurídico", icon: Sparkles, active: activeTab === "assistente", tab: "assistente" as TabView },
                  { label: "Jurisprudência", icon: Scale, active: activeTab === "jurisprudencia", tab: "jurisprudencia" as TabView },
                  { label: "Publicações jurídicas", icon: FileText, active: activeTab === "publicacoes", tab: "publicacoes" as TabView },
                  { label: "Agenda Forense", icon: Calendar, active: activeTab === "agenda", tab: "agenda" as TabView },
                  { label: "Tarefas", icon: CheckSquare, active: false },
                  { label: "Clientes", icon: Users, active: false },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => item.tab && setActiveTab(item.tab)}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                        item.active
                          ? isDark
                            ? "bg-[#0F2E40] text-emerald-400 font-semibold"
                            : "bg-[#E6F4EA] text-[#0F5132] font-semibold"
                          : isDark
                            ? "text-slate-400 hover:text-slate-200"
                            : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Gatilho Rápido do Copilot na Sidebar */}
              <div className="pt-3 border-t border-slate-700/40">
                <button
                  type="button"
                  onClick={() => setIsCopilotOpen(!isCopilotOpen)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                    isDark
                      ? "bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 hover:bg-emerald-900/40"
                      : "bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Copilot Forense</span>
                  </span>
                  <span className="text-[9px] font-mono px-1 rounded bg-emerald-500/20">IA</span>
                </button>
              </div>
            </div>

            {/* Palco Principal do Conteúdo (Renderiza as Abas Reais) */}
            <div className="md:col-span-9 lg:col-span-10 p-5 sm:p-7 overflow-y-auto relative min-h-[580px]">
              <AnimatePresence mode="wait">
                {/* 1. ABA: PAINEL DO ESCRITÓRIO */}
                {activeTab === "dashboard" && (
                  <motion.div
                    key="dashboard"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h3 className={`font-serif text-xl sm:text-2xl font-semibold tracking-tight ${isDark ? "text-white" : "text-[#0F2B48]"}`}>
                          Painel do escritório
                        </h3>
                        <p className="text-xs text-slate-400">
                          Seus prazos e processos num relance integrado à leitura dos autos.
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className={isDark ? "text-emerald-400" : "text-emerald-700 font-semibold"}>
                          Varredura DJEN em dia
                        </span>
                      </div>
                    </div>

                    {/* Cards de Métricas Operacionais */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { label: "Clientes Ativos", count: "142", icon: Users, change: "+12 este mês" },
                        { label: "Processos em Andamento", count: "89", icon: FolderKanban, change: "R$ 4.2M sob gestão" },
                        { label: "Prazos Próximos (7d)", count: "6", icon: Clock, change: "1 fatal hoje", alert: true },
                        { label: "Intimações DJEN", count: "2.518", icon: FileText, change: "Varredura automática" },
                      ].map((card, idx) => {
                        const Icon = card.icon;
                        return (
                          <div
                            key={idx}
                            className={`p-3.5 rounded-xl border transition-colors ${
                              isDark
                                ? "bg-[#0B1E2B] border-[#152E42]"
                                : "bg-white border-[#E2E8F0] shadow-2xs"
                            }`}
                          >
                            <div className="flex items-center justify-between pb-1">
                              <span className="text-[11px] text-slate-400">{card.label}</span>
                              <Icon className="w-3.5 h-3.5 text-slate-400" />
                            </div>
                            <p className={`text-lg font-bold font-mono ${isDark ? "text-white" : "text-[#0F172A]"}`}>
                              {card.count}
                            </p>
                            <p className={`text-[10px] pt-1 font-mono ${card.alert ? "text-amber-500 font-semibold" : "text-emerald-500"}`}>
                              {card.change}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Minha Rotina Forense & Jurisprudência Sugerida */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                      <div className="lg:col-span-7 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-semibold uppercase tracking-wider font-mono text-slate-400">
                            Minha Rotina Forense
                          </h4>
                          <span className="text-[10px] font-mono text-emerald-500">
                            Prioridade Algorítmica
                          </span>
                        </div>

                        <div
                          className={`divide-y rounded-xl border ${
                            isDark ? "bg-[#0B1E2B] border-[#152E42] divide-[#152E42]" : "bg-white border-slate-200 divide-slate-100 shadow-2xs"
                          }`}
                        >
                          {[
                            {
                              title: "Embargos de Declaração",
                              caseNo: "1002341-89.2024.8.26.0100",
                              type: "Prazo Crítico (Vence em 24h)",
                              tagColor: "bg-rose-500/20 text-rose-300 border-rose-500/40",
                              action: "Abrir no Redator",
                            },
                            {
                              title: "Contestação com Preliminar",
                              caseNo: "2004123-11.2024.8.26.0002",
                              type: "Contradição Mapeada às Fls. 89",
                              tagColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
                              action: "Ver Autos",
                            },
                            {
                              title: "Intimação de Manifestação DJEN",
                              caseNo: "0012984-55.2023.8.26.0100",
                              type: "Prazo Computado em 15 dias",
                              tagColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
                              action: "Criar Minuta",
                            },
                          ].map((item, idx) => (
                            <div key={idx} className="p-3.5 flex items-center justify-between gap-3 text-xs">
                              <div className="space-y-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <p className={`font-semibold truncate ${isDark ? "text-white" : "text-[#0F172A]"}`}>
                                    {item.title}
                                  </p>
                                  <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${item.tagColor}`}>
                                    {item.type}
                                  </span>
                                </div>
                                <p className="font-mono text-[10px] text-slate-400">
                                  Processo {item.caseNo}
                                </p>
                              </div>

                              <button
                                type="button"
                                className={`px-2.5 py-1 rounded text-[11px] font-semibold shrink-0 cursor-pointer transition-colors ${
                                  isDark
                                    ? "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
                                    : "bg-slate-100 text-[#0F2B48] hover:bg-slate-200"
                                }`}
                              >
                                {item.action}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="lg:col-span-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-semibold uppercase tracking-wider font-mono text-slate-400">
                            Jurisprudência Sugerida
                          </h4>
                          <span className="text-[10px] font-mono text-slate-400">
                            TJSP / STJ
                          </span>
                        </div>

                        <div
                          className={`p-4 rounded-xl border space-y-2.5 text-xs ${
                            isDark ? "bg-[#0B1E2B] border-[#152E42]" : "bg-white border-slate-200 shadow-2xs"
                          }`}
                        >
                          <div className="flex items-center justify-between border-b pb-2 border-slate-700/40">
                            <span className="font-mono text-[10px] text-emerald-400 font-semibold">
                              TJSP • Apelação Cível
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              Fls. 112 dos Autos
                            </span>
                          </div>
                          <p className={`text-[11px] leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                            &ldquo;Incontroverso o atraso na entrega da obra, devida a incidência da multa moratória expressamente pactuada, consoante laudo pericial anexado.&rdquo;
                          </p>
                          <div className="pt-1 flex items-center justify-between text-[10px]">
                            <span className="text-slate-400 font-mono">Conformidade com a tese: 98%</span>
                            <span
                              onClick={() => setActiveTab("jurisprudencia")}
                              className="text-emerald-500 font-semibold cursor-pointer hover:underline"
                            >
                              Ver Pesquisa Completa →
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 2. ABA: PIPELINE DE PROCESSOS (KANBAN) */}
                {activeTab === "pipeline" && (
                  <motion.div
                    key="pipeline"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h3 className={`font-serif text-xl sm:text-2xl font-semibold tracking-tight ${isDark ? "text-white" : "text-[#0F2B48]"}`}>
                          Pipeline Jurídico
                        </h3>
                        <p className="text-xs text-slate-400">
                          Gestão de litígios por fase processual com controle de valores da causa.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Total sob gestão: R$ 1.042.850
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Coluna 1: Novo Caso */}
                      <div
                        className={`p-3.5 rounded-xl border space-y-3 ${
                          isDark ? "bg-[#0B1E2B]/80 border-[#152E42]" : "bg-slate-100 border-slate-200"
                        }`}
                      >
                        <div className="flex items-center justify-between pb-1">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span className={`text-xs font-bold ${isDark ? "text-white" : "text-slate-800"}`}>
                              Novo Caso
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">(4)</span>
                          </div>
                          <span className="text-xs font-mono font-semibold text-emerald-500">
                            R$ 517.850
                          </span>
                        </div>

                        <div className="space-y-2.5">
                          {[
                            { title: "Cobrança Indevida Bancária", val: "R$ 4.800", resp: "Dra. Camila" },
                            { title: "Indenizatória c/c Dano Material", val: "R$ 480.000", resp: "Dr. Lucas" },
                            { title: "Cumprimento Provisório de Sentença", val: "R$ 12.500", resp: "Dra. Camila" },
                          ].map((item, i) => (
                            <div
                              key={i}
                              className={`p-3 rounded-lg border text-xs space-y-1.5 cursor-grab hover:scale-[1.01] transition-all ${
                                isDark
                                  ? "bg-[#081722] border-[#152E42] text-slate-200"
                                  : "bg-white border-slate-200 text-slate-800 shadow-2xs"
                              }`}
                            >
                              <p className="font-semibold text-xs">{item.title}</p>
                              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                                <span className="text-emerald-500 font-bold">{item.val}</span>
                                <span>{item.resp}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Coluna 2: Análise Jurídica */}
                      <div
                        className={`p-3.5 rounded-xl border space-y-3 ${
                          isDark ? "bg-[#0B1E2B]/80 border-[#152E42]" : "bg-slate-100 border-slate-200"
                        }`}
                      >
                        <div className="flex items-center justify-between pb-1">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-amber-500" />
                            <span className={`text-xs font-bold ${isDark ? "text-white" : "text-slate-800"}`}>
                              Análise Jurídica
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">(2)</span>
                          </div>
                          <span className="text-xs font-mono font-semibold text-amber-500">
                            R$ 185.000
                          </span>
                        </div>

                        <div className="space-y-2.5">
                          {[
                            { title: "Contestação em Ação Civil Pública", val: "R$ 110.000", resp: "Dr. Lucas" },
                            { title: "Recurso Inominado — Defeito Produto", val: "R$ 75.000", resp: "Dra. Camila" },
                          ].map((item, i) => (
                            <div
                              key={i}
                              className={`p-3 rounded-lg border text-xs space-y-1.5 cursor-grab hover:scale-[1.01] transition-all ${
                                isDark
                                  ? "bg-[#081722] border-[#152E42] text-slate-200"
                                  : "bg-white border-slate-200 text-slate-800 shadow-2xs"
                              }`}
                            >
                              <p className="font-semibold text-xs">{item.title}</p>
                              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                                <span className="text-amber-500 font-bold">{item.val}</span>
                                <span>{item.resp}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Coluna 3: Em Execução */}
                      <div
                        className={`p-3.5 rounded-xl border space-y-3 ${
                          isDark ? "bg-[#0B1E2B]/80 border-[#152E42]" : "bg-slate-100 border-slate-200"
                        }`}
                      >
                        <div className="flex items-center justify-between pb-1">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500" />
                            <span className={`text-xs font-bold ${isDark ? "text-white" : "text-slate-800"}`}>
                              Em Execução
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">(1)</span>
                          </div>
                          <span className="text-xs font-mono font-semibold text-blue-500">
                            R$ 340.000
                          </span>
                        </div>

                        <div className="space-y-2.5">
                          {[
                            { title: "Cumprimento Definitivo de Sentença", val: "R$ 340.000", resp: "Dr. Lucas" },
                          ].map((item, i) => (
                            <div
                              key={i}
                              className={`p-3 rounded-lg border text-xs space-y-1.5 cursor-grab hover:scale-[1.01] transition-all ${
                                isDark
                                  ? "bg-[#081722] border-[#152E42] text-slate-200"
                                  : "bg-white border-slate-200 text-slate-800 shadow-2xs"
                              }`}
                            >
                              <p className="font-semibold text-xs">{item.title}</p>
                              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                                <span className="text-blue-500 font-bold">{item.val}</span>
                                <span>{item.resp}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 3. ABA: ASSISTENTE JURÍDICO IA (Fiel a media_1789825688705.png) */}
                {activeTab === "assistente" && (
                  <motion.div
                    key="assistente"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                    {/* Header do Módulo */}
                    <div className="flex items-center justify-between border-b pb-3 border-slate-700/40">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className={`text-sm font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                            Consulta jurídica assistida
                          </h4>
                          <p className="text-[11px] text-slate-400 font-mono">
                            Área: Geral • Contexto ativo dos autos digitais
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-emerald-500 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                        IA Forense Conectada
                      </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                      {/* Histórico Lateral de Consultas (Fiel à captura) */}
                      <div
                        className={`lg:col-span-4 p-3 rounded-xl border space-y-2 text-xs ${
                          isDark ? "bg-[#081722] border-[#152E42]" : "bg-white border-slate-200 shadow-2xs"
                        }`}
                      >
                        <div className="flex items-center justify-between pb-2 border-b border-slate-700/40">
                          <span className="font-semibold text-slate-400 font-mono text-[11px]">
                            Histórico de Consultas
                          </span>
                          <button
                            type="button"
                            onClick={() => setAssistenteState({ prompt: "", selectedArea: "Geral" })}
                            className="text-[10px] font-mono text-emerald-500 hover:underline cursor-pointer"
                          >
                            + Nova consulta
                          </button>
                        </div>

                        <div className="space-y-1.5 max-h-[360px] overflow-y-auto pr-1">
                          {[
                            { title: "Análise de cobrança bancária", desc: "Verificação de juros remuneratórios e TAC", active: true },
                            { title: "Tarefa revisão documental", desc: "Conferência de procuração e custas iniciais", active: false },
                            { title: "Cobrança indevida — Banco", desc: "Mapeamento de negativação no SERASA às Fls. 47", active: false },
                            { title: "Padronização de contratos", desc: "Cláusulas de eleição de foro e arbitragem", active: false },
                            { title: "Triagem benefício INSS", desc: "Cálculo de carência e períodos especiais", active: false },
                          ].map((hist, hIdx) => (
                            <div
                              key={hIdx}
                              className={`p-2 rounded-lg cursor-pointer transition-colors ${
                                hist.active
                                  ? isDark
                                    ? "bg-[#0F2E40] border border-emerald-500/30 text-emerald-300"
                                    : "bg-emerald-50 border border-emerald-200 text-emerald-800"
                                  : isDark
                                    ? "hover:bg-slate-800/60 text-slate-300"
                                    : "hover:bg-slate-50 text-slate-700"
                              }`}
                            >
                              <p className="font-semibold text-[11px] truncate">{hist.title}</p>
                              <p className="text-[10px] text-slate-400 truncate">{hist.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Palco Central do Chat: "Conte o caso do seu jeito" */}
                      <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
                        <div className="text-center py-4 space-y-2 max-w-lg mx-auto">
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-1">
                            <Sparkles className="w-5 h-5" />
                          </div>
                          <h3 className={`text-xl font-bold font-serif ${isDark ? "text-white" : "text-[#0F2B48]"}`}>
                            Conte o caso do seu jeito.
                          </h3>
                          <p className={`text-xs leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                            Pode começar com fatos soltos, uma dúvida, um prazo ou um PDF. O Dendrix organiza a conversa e mostra o próximo passo de cada vez.
                          </p>
                        </div>

                        {/* 4 Chips de Ação Rápida Interativos (Fiel à captura) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {[
                            {
                              label: "Tenho um caso e quero saber por onde começar.",
                              sim: {
                                title: "Triagem Preliminar de Caso Cível",
                                step1: "Autos analisados: 124 folhas de petição e anexos bancários.",
                                step2: "Sugestão do Dendrix: Elaborar Ação Declaratória com Tutela de Urgência para baixa no Serasa em 48h.",
                                actionLabel: "Minuta Sugerida Pronta no Redator",
                                docRef: "Fls. 14 / Fls. 47",
                              },
                            },
                            {
                              label: "Recebi uma decisão ou intimação. O que confiro agora?",
                              sim: {
                                title: "Análise de Intimação Judicial",
                                step1: "Despacho de especificação de provas mapeado no DJEN.",
                                step2: "Prazo fatal: 5 dias úteis para rol de testemunhas e quesitos.",
                                actionLabel: "Agendar Prazo Fatal na Agenda",
                                docRef: "Fls. 89 dos Autos",
                              },
                            },
                            {
                              label: "Tenho documentos e quero organizar o caso.",
                              sim: {
                                title: "OCR & Mapeamento Cronológico",
                                step1: "15 PDFs processados com OCR forense de alta precisão.",
                                step2: "Cronologia de fatos gerada com datas, contratos e comprovantes vinculados.",
                                actionLabel: "Abrir Linha do Tempo dos Fatos",
                                docRef: "Fls. 01 a Fls. 210",
                              },
                            },
                            {
                              label: "Preciso preparar uma peça e quero revisar os dados antes.",
                              sim: {
                                title: "Revisão e Checagem de Consistência",
                                step1: "Confronto entre a inicial e a contestação da parte adversa.",
                                step2: "Contradição material identificada sobre data da notificação extrajudicial.",
                                actionLabel: "Inserir Apontamento na Réplica",
                                docRef: "Fls. 112 da Contestação",
                              },
                            },
                          ].map((chip, cIdx) => (
                            <button
                              key={cIdx}
                              type="button"
                              onClick={() => handleStarterPromptClick(chip.label, chip.sim)}
                              className={`p-3 rounded-xl border text-left text-xs font-medium cursor-pointer transition-all hover:scale-[1.01] ${
                                assistenteState.prompt === chip.label
                                  ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-xs"
                                  : isDark
                                    ? "bg-[#0B1E2B] border-[#152E42] text-slate-300 hover:border-slate-600"
                                    : "bg-white border-slate-200 text-slate-700 hover:border-emerald-300 shadow-2xs"
                              }`}
                            >
                              {chip.label}
                            </button>
                          ))}
                        </div>

                        {/* Resultado da Simulação Interativa */}
                        {assistenteState.simulatedResponse && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={`p-3.5 rounded-xl border text-xs space-y-2 ${
                              isDark ? "bg-[#0B2538] border-emerald-500/40 text-slate-200" : "bg-emerald-50/70 border-emerald-200 text-emerald-950"
                            }`}
                          >
                            <div className="flex items-center justify-between font-mono text-[11px] border-b pb-1.5 border-emerald-500/20">
                              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                {assistenteState.simulatedResponse.title}
                              </span>
                              <span className="text-slate-400">
                                {assistenteState.simulatedResponse.docRef}
                              </span>
                            </div>
                            <p className="text-[11px] leading-relaxed">
                              {assistenteState.simulatedResponse.step1}
                            </p>
                            <p className="text-[11px] leading-relaxed font-semibold">
                              {assistenteState.simulatedResponse.step2}
                            </p>
                            <div className="pt-1 flex items-center justify-between text-[10px]">
                              <span className="text-emerald-500 font-mono">Status: Raciocínio contextual concluído</span>
                              <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-semibold cursor-pointer hover:bg-emerald-700">
                                {assistenteState.simulatedResponse.actionLabel} →
                              </span>
                            </div>
                          </motion.div>
                        )}

                        {/* Barra de Prompt Fiel com Botão de Microfone e Envio */}
                        <div
                          className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                            isDark ? "bg-[#081722] border-[#152E42]" : "bg-white border-slate-200 shadow-sm"
                          }`}
                        >
                          <span className="text-xs font-mono px-2 py-1 rounded bg-slate-500/10 text-slate-400 shrink-0">
                            Geral
                          </span>
                          <input
                            type="text"
                            value={assistenteState.prompt}
                            onChange={(e) => setAssistenteState({ ...assistenteState, prompt: e.target.value })}
                            placeholder="Descreva os fatos, o objetivo do cliente, o prazo ou a dúvida..."
                            className={`flex-1 bg-transparent text-xs outline-hidden ${
                              isDark ? "text-slate-200 placeholder-slate-500" : "text-slate-800 placeholder-slate-400"
                            }`}
                          />
                          <button type="button" className="p-1.5 text-slate-400 hover:text-slate-200">
                            <Mic className="w-4 h-4" />
                          </button>
                          <button type="button" className="p-1.5 text-slate-400 hover:text-slate-200">
                            <Paperclip className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            className="p-2 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white cursor-pointer shadow-md hover:scale-105 transition-all"
                            title="Enviar consulta ao Dendrix"
                          >
                            <Sparkles className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 4. ABA: PESQUISA DE JURISPRUDÊNCIA COM IA (Fiel a media_1789825711633 e media_1789825720814) */}
                {activeTab === "jurisprudencia" && (
                  <motion.div
                    key="jurisprudencia"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    {/* Barra de Busca de Jurisprudência */}
                    <div className="flex gap-2">
                      <div
                        className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-xl border text-xs ${
                          isDark ? "bg-[#081722] border-[#152E42]" : "bg-white border-slate-200 shadow-2xs"
                        }`}
                      >
                        <Search className="w-4 h-4 text-emerald-500" />
                        <input
                          type="text"
                          value={jurisSearchQuery}
                          onChange={(e) => setJurisSearchQuery(e.target.value)}
                          className={`flex-1 bg-transparent outline-hidden text-xs font-medium ${
                            isDark ? "text-white" : "text-slate-900"
                          }`}
                        />
                      </div>
                      <button
                        type="button"
                        className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold cursor-pointer hover:bg-emerald-700 transition-colors flex items-center gap-1.5 shadow-sm"
                      >
                        <Search className="w-3.5 h-3.5" />
                        <span>Buscar</span>
                      </button>
                    </div>

                    {/* Decomposição Automática de Consultas IA (Fiel à captura real) */}
                    <div
                      className={`p-3 rounded-xl border text-xs space-y-2 ${
                        isDark ? "bg-[#0B1E2B] border-[#152E42]" : "bg-slate-50 border-slate-200"
                      }`}
                    >
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        A busca será organizada em consultas focadas. O texto continua como contexto, mas o Dendrix consulta até três combinações curtas e deduplicadas para melhorar a precisão.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div
                          className={`p-2 rounded-lg border text-[11px] ${
                            isDark ? "bg-[#081722] border-slate-700/60" : "bg-white border-slate-200 shadow-2xs"
                          }`}
                        >
                          <span className="text-slate-400 font-mono text-[9px] block">Consulta 1</span>
                          <span className="font-semibold text-emerald-400">dano moral por negativacao indevida</span>
                        </div>
                        <div
                          className={`p-2 rounded-lg border text-[11px] ${
                            isDark ? "bg-[#081722] border-slate-700/60" : "bg-white border-slate-200 shadow-2xs"
                          }`}
                        >
                          <span className="text-slate-400 font-mono text-[9px] block">Consulta 2</span>
                          <span className="font-semibold text-cyan-400">dano moral negativacao indevida</span>
                        </div>
                      </div>
                    </div>

                    {/* Chips de Tribunais Filtráveis */}
                    <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none text-[11px]">
                      <span className="text-slate-400 font-mono text-[10px] shrink-0 mr-1">Tribunais:</span>
                      {tribunaisList.map((trib) => (
                        <button
                          key={trib}
                          type="button"
                          onClick={() => setSelectedTribunal(trib)}
                          className={`px-2 py-0.5 rounded font-mono text-[10px] cursor-pointer transition-colors ${
                            selectedTribunal === trib
                              ? "bg-emerald-600 text-white font-bold"
                              : isDark
                                ? "bg-slate-800/80 text-slate-300 hover:bg-slate-700"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          {trib}
                        </button>
                      ))}
                    </div>

                    {/* Card de Acórdão Real do STJ (Fiel à captura real) */}
                    <div
                      className={`p-4 rounded-xl border space-y-3 ${
                        isDark ? "bg-[#0B1E2B] border-[#152E42]" : "bg-white border-slate-200 shadow-2xs"
                      }`}
                    >
                      <div className="flex items-center justify-between border-b pb-2.5 border-slate-700/40 text-xs">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-emerald-400 font-mono text-xs sm:text-sm">
                              STJ • AgInt no AREsp 3070579 • 202503903393
                            </span>
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-500/20 text-slate-300">
                              Acórdão Paradigma
                            </span>
                          </div>
                          <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                            Rel. Min. HUMBERTO MARTINS • Julgamento: 01/06/2026
                          </p>
                        </div>
                        <button
                          type="button"
                          className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700 text-[10px] text-slate-300 hover:text-white cursor-pointer"
                        >
                          <Bookmark className="w-3 h-3 text-emerald-400" />
                          <span>Salvar na Biblioteca</span>
                        </button>
                      </div>

                      {/* Ementa e Citação Real Destacada */}
                      <p className={`text-xs leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                        ...época, não implicando, por si só, negativação ou qualquer informação prejudicial ao crédito do consumidor, que não há anotação negativa em nome da parte pelo recorrido, tampouco valores classificados como &ldquo;prejuízo&rdquo; que possam justificar restrição de crédito ou configurar dano moral. Súmula n. 83/STJ. Precedentes.
                      </p>

                      <div
                        className={`p-3 rounded-lg border font-serif text-xs leading-relaxed italic ${
                          isDark ? "bg-[#081722] border-slate-700/40 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-800"
                        }`}
                      >
                        &ldquo;...No caso em tela, o acórdão recorrido afastou a existência de inscrição indevida, pois não houve registro de dívida vencida, sendo apenas um apontamento de movimentação financeira, não configurando a ocorrência de danos morais...&rdquo;
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-1 text-[11px]">
                        <span className="text-slate-400 text-[10px] font-mono">
                          * Confira número, teor e adequação no portal oficial antes de citar.
                        </span>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            className="text-emerald-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>Abrir Inteiro Teor</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            className="px-2.5 py-1 rounded bg-emerald-600 text-white font-semibold cursor-pointer hover:bg-emerald-700"
                          >
                            Inserir no Redator
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 5. ABA: PUBLICAÇÕES DJEN */}
                {activeTab === "publicacoes" && (
                  <motion.div
                    key="publicacoes"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h3 className={`font-serif text-xl sm:text-2xl font-semibold tracking-tight ${isDark ? "text-white" : "text-[#0F2B48]"}`}>
                          Publicações Jurídicas (DJEN)
                        </h3>
                        <p className="text-xs text-slate-400">
                          DJEN do escritório centralizado com leitura automática do teor do despacho.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Robô DJEN Ativo
                        </span>
                      </div>
                    </div>

                    {/* Banner de Monitoramento Ativo OAB/SP */}
                    <div
                      className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                        isDark ? "bg-[#0B1E2B] border-[#152E42]" : "bg-white border-slate-200 shadow-2xs"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold font-mono">
                          SP
                        </div>
                        <div>
                          <p className={`font-semibold text-xs sm:text-sm ${isDark ? "text-white" : "text-slate-900"}`}>
                            OAB/SP 412.890 • Dr. Lucas Iori
                          </p>
                          <p className="text-[10px] text-slate-400 font-mono">
                            Monitoramento em dia • Última varredura: Hoje às 08:30
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold cursor-pointer hover:bg-emerald-700 transition-colors"
                      >
                        Varredura Agora
                      </button>
                    </div>

                    {/* Publicação Extraída com Sugestão de Minuta */}
                    <div
                      className={`p-4 rounded-xl border space-y-3 ${
                        isDark ? "bg-[#0B1E2B] border-[#152E42]" : "bg-white border-slate-200 shadow-2xs"
                      }`}
                    >
                      <div className="flex items-center justify-between border-b pb-2.5 border-slate-700/40 text-xs">
                        <span className="font-mono text-emerald-400 font-semibold">
                          PROCESSO 1002341-89.2024.8.26.0100 — 2ª VARA CÍVEL
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          Prazo Fatal: 8 dias úteis
                        </span>
                      </div>

                      <p className={`text-xs leading-relaxed font-mono ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                        &ldquo;...Intime-se a parte autora para que, no prazo legal de 15 (quinze) dias, manifeste-se sobre a contestação e documentos juntados aos autos pelo requerido...&rdquo;
                      </p>

                      <div className="pt-2 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                          <Bot className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Sugestão do Dendrix: Elaboração de Réplica com refutação de ilegitimidade</span>
                        </div>

                        <button
                          type="button"
                          className="text-emerald-400 font-semibold text-xs hover:underline cursor-pointer"
                        >
                          Gerar Minuta no Redator →
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 6. ABA: AGENDA & TAREFAS (Fiel a media_1789825730050 e media_1789825738968) */}
                {activeTab === "agenda" && (
                  <motion.div
                    key="agenda"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h3 className={`font-serif text-xl sm:text-2xl font-semibold tracking-tight ${isDark ? "text-white" : "text-[#0F2B48]"}`}>
                          Agenda Forense & Tarefas
                        </h3>
                        <p className="text-xs text-slate-400">
                          Tarefas, follow-ups, audiências e prazos em visão semanal integrada da banca.
                        </p>
                      </div>

                      {/* Botões de Filtro de Calendário */}
                      <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs font-mono">
                        <button type="button" className="px-2 py-0.5 rounded text-slate-400">Dia</button>
                        <button type="button" className="px-2 py-0.5 rounded bg-emerald-600 text-white font-bold">Semana</button>
                        <button type="button" className="px-2 py-0.5 rounded text-slate-400">Mês</button>
                        <button type="button" className="px-2 py-0.5 rounded text-slate-400">Ano</button>
                      </div>
                    </div>

                    {/* Grade Semanal com Cards Agendados */}
                    <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
                      {[
                        { day: "seg. 14", items: [] },
                        { day: "ter. 15", items: [] },
                        { day: "qua. 16", items: [] },
                        { day: "qui. 17", items: [] },
                        { day: "sex. 18", items: [] },
                        { day: "sáb. 19", items: [] },
                        {
                          day: "dom. 20",
                          items: [
                            { time: "09:00", title: "QA-20260911 Revisar...", lawyer: "Dra. Camila" },
                            { time: "14:30", title: "Prazo Contestação", lawyer: "Dr. Lucas" },
                          ],
                        },
                      ].map((col, cIdx) => (
                        <div
                          key={cIdx}
                          className={`p-2 rounded-xl border min-h-[140px] flex flex-col justify-between ${
                            isDark ? "bg-[#081722] border-[#152E42]" : "bg-white border-slate-200 shadow-2xs"
                          }`}
                        >
                          <span className="font-mono text-[10px] text-slate-400 font-semibold block pb-1 border-b border-slate-700/30">
                            {col.day}
                          </span>
                          <div className="space-y-1.5 my-auto">
                            {col.items.length > 0 ? (
                              col.items.map((it, itIdx) => (
                                <div
                                  key={itIdx}
                                  className="p-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-left text-[9px] font-mono text-emerald-300"
                                >
                                  <span className="font-bold block text-emerald-400">{it.time}</span>
                                  <span className="truncate block font-semibold">{it.title}</span>
                                  <span className="text-slate-400 block">{it.lawyer}</span>
                                </div>
                              ))
                            ) : (
                              <span className="text-[10px] text-slate-500 italic block py-4">
                                Livre
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Lista de Tarefas da Equipe com Controle de Atraso */}
                    <div
                      className={`p-4 rounded-xl border space-y-3 ${
                        isDark ? "bg-[#0B1E2B] border-[#152E42]" : "bg-white border-slate-200 shadow-2xs"
                      }`}
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-slate-700/40 text-xs">
                        <span className="font-mono font-semibold text-slate-400">
                          Tarefas & Follow-ups da Equipe
                        </span>
                        <span className="text-[10px] font-mono text-emerald-500">
                          Sincronizado com CRM
                        </span>
                      </div>

                      <div className="space-y-2">
                        {[
                          { title: "Welcome Mariana Costa", delay: "Atrasado 38d", lawyer: "Dra. Camila", cat: "Cliente" },
                          { title: "Pedir vídeo original e contatos das testemunhas", delay: "Atrasado 36d", lawyer: "Dra. Camila", cat: "Processo" },
                          { title: "Conferir prazo de resposta do Banco Horizonte", delay: "Atrasado 24d", lawyer: "Dr. Lucas", cat: "3 itens de checklist" },
                          { title: "Follow up: Ação Penal — Defesa Prévia", delay: "Atrasado 14d", lawyer: "Dr. Lucas", cat: "Processo" },
                        ].map((t, tIdx) => (
                          <div
                            key={tIdx}
                            className={`p-2.5 rounded-lg border flex items-center justify-between gap-3 text-xs ${
                              isDark ? "bg-[#081722] border-[#152E42]" : "bg-slate-50 border-slate-200"
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="w-2.5 h-2.5 rounded-full border border-slate-500 shrink-0" />
                              <span className="font-medium truncate">{t.title}</span>
                            </div>

                            <div className="flex items-center gap-3 shrink-0 text-[10px] font-mono">
                              <span className="text-amber-500 font-semibold">{t.delay}</span>
                              <span className="text-slate-400">{t.lawyer}</span>
                              <span className="px-1.5 py-0.5 rounded bg-slate-500/20 text-slate-300">
                                {t.cat}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Botão Flutuante do Copilot & Modal Interativo (Estilo Cult UI) */}
          <div className="absolute bottom-5 right-5 z-30">
            <button
              type="button"
              onClick={() => setIsCopilotOpen(!isCopilotOpen)}
              className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-xl flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all"
              title="Abrir Copilot Forense"
            >
              <Sparkles className="w-5 h-5" />
            </button>

            <AnimatePresence>
              {isCopilotOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  className={`absolute bottom-16 right-0 w-80 sm:w-96 p-4 rounded-2xl border shadow-2xl backdrop-blur-md ${
                    isDark ? "bg-[#081722]/95 border-[#152E42] text-white" : "bg-white/95 border-slate-200 text-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-700/40">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span className="font-semibold text-xs">Copilot Forense Dendrix</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsCopilotOpen(false)}
                      className="text-slate-400 hover:text-white text-xs cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="py-3 space-y-2 text-xs">
                    <p className="text-slate-400 text-[11px]">Advogado:</p>
                    <p
                      className={`p-2 rounded font-mono text-[11px] ${
                        isDark ? "bg-white/5 text-slate-200" : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      &ldquo;Onde a ré confessa o inadimplemento nos autos?&rdquo;
                    </p>

                    <p className="text-emerald-400 text-[11px] font-semibold pt-1">Copilot:</p>
                    <p className="text-[11px] leading-relaxed">
                      Às <strong className="text-emerald-400 font-mono">fls. 47</strong> da Contestação, a ré admite que não entregou o laudo no prazo fixado, sustentando força maior não comprovada.
                    </p>
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Faça uma pergunta sobre os autos..."
                      readOnly
                      className={`flex-1 px-3 py-1.5 rounded-lg border text-xs ${
                        isDark
                          ? "bg-white/5 border-slate-700/40 text-slate-300 placeholder-slate-500"
                          : "bg-slate-100 border-slate-300 text-slate-700 placeholder-slate-400"
                      }`}
                    />
                    <button
                      type="button"
                      className="p-1.5 rounded-lg bg-emerald-600 text-white"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Card3D>
    </div>
  );
}
