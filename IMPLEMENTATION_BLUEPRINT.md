# IMPLEMENTATION_BLUEPRINT.md — Roteiro Sequencial de Implementação

> **Status:** Blueprint Oficial de Execução (Etapa 4)  
> **Conformidade:** Projetado para permitir execução mecânica, sem decisões arbitrárias em tempo de código.  
> **Aviso de Bloqueio:** Nenhuma fase deste roteiro deve ser iniciada sem autorização humana expressa.

---

## 1. Visão Geral das 11 Fases de Implementação

```
FASE 01: Tokens, Fontes & Tailwind v4 ──> FASE 02: Shell, Header & Footer
                                                    ↓
FASE 04: Narrativa (Caos & Loop)      <── FASE 03: Hero & Split-Screen Programático
        ↓
FASE 05: Pilares (Mesa, Redator, Foro)<── FASE 06: Caso Real & Calculadora de Horas
        ↓
FASE 07: Segurança & FAQ Accordion    ──> FASE 08: Funil Cal.com & Modal de Demonstração
                                                    ↓
FASE 10: SEO, Schemas & Performance   <── FASE 09: Ajuste Fino Mobile & Sticky Bar
        ↓
FASE 11: Auditoria Final com Impeccable (Craft Floor & Polish)
```

---

## 2. Detalhamento Fase a Fase

### FASE 01: Tokens de Design, Fontes & Configuração Base do Tailwind v4
* **Arquivos:** `app/globals.css`, `app/layout.tsx`, `tailwind.config.ts` (ou `@theme` directives no CSS v4).
* **Escopo:**
  1. Configuração de `@next/font/google` com `Newsreader` (variável) e `Plus Jakarta Sans` (variável).
  2. Declaração das variáveis CSS semânticas de cores (`--bg-page`, `--brand-primary`, etc.), raios e sombras conforme `DESIGN_SYSTEM_SPEC.md`.
  3. Verificação de compilação limpa com Turbopack.
* **Critério de Saída:** `npm run build` executa em 0 erros e as classes de cores/fontes estão disponíveis no CSS.

---

### FASE 02: Shell de Layout, Cabeçalho (Navbar) e Rodapé (Footer)
* **Arquivos:** `components/layout/Navbar.tsx`, `components/layout/Footer.tsx`, `components/layout/SectionWrapper.tsx`.
* **Escopo:**
  1. Construção da Navbar fixa com logo Dendrix, âncoras suaves (`#recursos`, `#como-funciona`, `#calculadora`, `#seguranca`, `#faq`), link externo "Entrar" para `dendrix.app.br` e CTA primário.
  2. Construção do Footer escuro sóbrio (`#0B0F17`) com links institucionais, notas de LGPD e copyright.
* **Critério de Saída:** Navegação por âncoras funcional e responsiva em desktop e mobile.

---

### FASE 03: Hero Principal e Split-Screen Programático
* **Arquivos:** `components/hero/HeroSection.tsx`, `components/hero/HeroSplitScreen.tsx`, `components/hero/CaseSourceBadge.tsx`.
* **Escopo:**
  1. Renderização da copy oficial travada de `HOME_COPY_V2.md` com tipografia balanceada.
  2. Construção do Split-Screen de produto 100% programático em Tailwind CSS:
     - Painel esquerdo: Autos judiciais em PDF com a folha 47 grifada.
     - Ponte central: Card de metadados do CRM.
     - Painel direito: Editor rico com a réplica e badge `[Fls. 47]`.
  3. Implementação do Storyboard de 6 estados funcionais com respeito a `prefers-reduced-motion`.
* **Critério de Saída:** Hero renderiza com perfeição em desktop e mobile, com LCP < 1.8s e zero layout shifts.

---

### FASE 04: Seções Narrativas Editoriais (O Custo do Caos & O Loop do Caso)
* **Arquivos:** `components/sections/CaosSection.tsx`, `components/sections/LoopSection.tsx`.
* **Escopo:**
  1. Implementação da Seção 02 em composição editorial assimétrica (3 blocos abertos em vez de cards fechados iguais).
  2. Implementação da Seção 03 com o trilho contínuo de 3 estágios do processo forense (`01. Gestão`, `02. Leitura`, `03. Redação`).
* **Critério de Saída:** Ritmo de leitura fluido sem sensação de cartelas empilhadas.

---

### FASE 05: Pilares Técnicos (Mesa Jurídica, Redator & Publicações)
* **Arquivos:** `components/sections/MesaJuridicaSection.tsx`, `components/sections/RedatorSection.tsx`, `components/sections/PrazosSection.tsx`.
* **Escopo:**
  1. Pilar 1: Macro-recorte da leitura de PDF com tags interativas de citação.
  2. Pilar 2: Macro-recorte do editor Tiptap com preenchimento em blocos e peças ouro.
  3. Pilar 3: Painel operacional de publicações com sugestão de próximo passo com IA e contagem regressiva de prazos.
* **Critério de Saída:** Alternância de colunas esquerda/direita perfeitamente alinhada e nítida.

---

### FASE 06: Estudo de Caso Desidentificado & Calculadora de Horas
* **Arquivos:** `components/sections/CaseStudySection.tsx`, `components/sections/RoiCalculator.tsx`.
* **Escopo:**
  1. Implementação da tabela sóbria de Entrada/Saída do caso paradigma com os placeholders documentados.
  2. Construção da Calculadora Interativa em Client Component com sliders acessíveis e fórmula matemática transparente de estimativa de horas.
* **Critério de Saída:** Sliders reativos com resposta imediata a 60fps e saída contextual sem promessas financeiras infundadas.

---

### FASE 07: Governança, Segurança, LGPD & FAQ de Transparência
* **Arquivos:** `components/sections/SecuritySection.tsx`, `components/sections/FaqSection.tsx`.
* **Escopo:**
  1. Grade 2x2 de governança (Servidores em SP, Não-retenção de IA, Criptografia, Autonomia do Advogado).
  2. Acordeão acessível do FAQ com suporte total a navegação por teclado (`Enter`/`Space`) e ARIA attributes.
* **Critério de Saída:** FAQ expande com fluidez em 250ms e incorpora Schema.org `FAQPage`.

---

### FASE 08: Chamada Final & Modal de Demonstração (Cal.com + Mini-Form)
* **Arquivos:** `components/sections/ClosingCtaSection.tsx`, `components/modals/DemoModal.tsx`.
* **Escopo:**
  1. Bloco de fechamento em alto contraste com chamada para agendamento prático de 15 minutos e botão de WhatsApp.
  2. Modal de 2 passos: Mini-formulário de 4 campos com validação e máscara -> transição suave para o embed do Cal.com.
* **Critério de Saída:** Fluxo de agendamento testado de ponta a ponta com preenchimento automático de dados no Cal.com.

---

### FASE 09: Ajuste Fino Mobile, Barra de Polegar (Sticky Bar) & Breakpoints
* **Arquivos:** `components/layout/StickyMobileBar.tsx`, ajustes de CSS responsivo.
* **Escopo:**
  1. Ativação da barra fixa inferior no mobile pós-Hero.
  2. Garantia de que todos os touch targets possuam no mínimo 44x44px.
  3. Eliminação de qualquer transbordamento horizontal (*overflow-x: hidden* garantido).
* **Critério de Saída:** Navegação no mobile suave com rolagem natural a 60fps em dispositivos de teste.

---

### FASE 10: SEO Técnico, Schemas JSON-LD & Auditoria de Core Web Vitals
* **Arquivos:** `app/page.tsx`, `app/sitemap.ts`, `app/robots.ts`, `components/seo/JsonLd.tsx`.
* **Escopo:**
  1. Metadados OpenGraph e Twitter Cards configurados.
  2. Schemas JSON-LD: `SoftwareApplication`, `Organization` e `FAQPage`.
  3. Verificação de performance com medição local de LCP, CLS e INP.
* **Critério de Saída:** Build estático de produção (`npm run build`) sem avisos e metadados 100% validados.

---

### FASE 11: Auditoria Final com a Skill Impeccable (Craft Floor & Polish)
* **Ações:**
  1. Revisão heurística de espaçamentos, micro-contrastes e alinhamentos de linha base.
  2. Verificação com o detector de design anti-patterns.
  3. Validação do modo `prefers-reduced-motion`.
* **Critério de Saída:** Aprovação formal de acabamento visual (*out-of-distribution craft*).
