# DECISIONS.md — Registro de Decisões do Projeto

> **Regra de Governança:** Este documento registra estritamente decisões que foram formalmente tomadas e validadas. Nenhuma hipótese, suposição ou ideia preliminar é registrada aqui como decisão.

---

## 1. Decisões Estratégicas e de Negócio

| ID | Data | Decisão | Racional / Justificativa | Status |
| :--- | :--- | :--- | :--- | :--- |
| **DEC-001** | 18/09/2026 | **Separação de Domínios e Repositórios** | `dendrixcrm.com.br` será exclusivamente o site de marketing, aquisição, blog e SEO. A aplicação de produto continua isolada em `dendrix.app.br`. O código do aplicativo não deve ser modificado neste projeto. | ✅ Definitivo |
| **DEC-002** | 18/09/2026 | **Posicionamento Central Anti-Substituição** | O Dendrix NÃO será posicionado como "IA que substitui o advogado" nem como "chatbot jurídico". O posicionamento oficial é: *"O Dendrix organiza. A IA apoia. O advogado decide."* e *"Antes da peça, existe um caso inteiro."* | ✅ Definitivo |
| **DEC-003** | 18/09/2026 | **Público-Alvo Prioritário (ICPs)** | Foco comercial imediato em: **ICP A:** Advogados autônomos / solo; **ICP B:** Pequenos escritórios (2 a 8 advogados), com atenção especial à realidade do interior. | ✅ Definitivo |
| **DEC-004** | 18/09/2026 | **Governança de Claims Comerciais** | Fica expressamente proibido publicar depoimentos fictícios, estatísticas inventadas ou registrar funcionalidades não confirmadas. Toda funcionalidade deve ser rotulada como `VERIFIED`, `NEEDS VERIFICATION` ou `OPPORTUNITY`. | ✅ Definitivo |

---

## 2. Decisões Técnicas e de Arquitetura

| ID | Data | Decisão | Racional / Justificativa | Status |
| :--- | :--- | :--- | :--- | :--- |
| **DEC-005** | 18/09/2026 | **Stack do Frontend de Marketing** | Next.js 16 (App Router), React 19, TypeScript e Tailwind CSS v4, preparado para deploy na Vercel. Repositório versionado no GitHub em `Lucas-B-Iori/dendrixblog`. | ✅ Implementado |
| **DEC-006** | 18/09/2026 | **Arquitetura do Blog** | O blog inicial será baseado em arquivos Markdown / MDX versionados no próprio repositório (`content/blog/`), sem necessidade de bancos de dados ou CMS externo nesta fase. | ✅ Definido |
| **DEC-007** | 18/09/2026 | **Framework de Habilidades (Skills)** | Adoção do padrão nativo `.agents/skills/` com 5 capacidades ativas: `impeccable` (design e UX), `seo` (Agentic-SEO-Skill), `copywriting`, `cro` e `product-marketing`. | ✅ Implementado |
| **DEC-008** | 18/09/2026 | **Integração Firecrawl MCP** | Configuração inicial via endpoint remoto oficial (`https://mcp.firecrawl.dev/v2/mcp`) em modo Keyless, permitindo buscas e raspagens seguras sem expor chaves de API. | ✅ Implementado |
| **DEC-009** | 18/09/2026 | **Metodologia de Validação (Grill Me)** | A transição da Etapa 2 para a Etapa 3 não será automática; o documento `SITE_PLAN_V0.md` será submetido a uma sabatina interativa estruturada usando a skill `grill-me` para resolução de todas as dúvidas em aberto. | ✅ Definido |

---

| **DEC-010** | 18/09/2026 | **Escopo Real e Maturidade do Produto** | O produto no `dendrix.app.br` está 100% completo e operacional: CRM de ponta a ponta, Mesa Jurídica (leitura de autos), Assistente Geral de IA treinado no direito brasileiro, Projetos Jurídicos, Acompanhamento automático de publicações com IA, Assistente do Caso e Redator treinado em peças ouro em 2 cliques. | ✅ Definitivo |
| **DEC-011** | 18/09/2026 | **Wedge de Aquisição (Cavalo de Troia)** | O cavalo de troia de aquisição é o **'Fluxo Completo do Caso'**: o advogado é fisgado pela dor aguda do tempo lendo autos pesados e redigindo peças com lentidão, e provamos que a IA redige e lê com precisão porque tem o contexto do CRM já conectado. | ✅ Definitivo |
| **DEC-012** | 18/09/2026 | **Mecânica de Conversão e Funil Primário** | O modelo de aquisição é **100% Venda Consultiva / Demonstração Guiada**. A conversão primária é o agendamento de demonstração prática (15 min) via Cal.com integrado + mini-formulário para capturar Nome, WhatsApp e Tamanho do Escritório (garantindo qualificação e contato direto). | ✅ Definitivo |
| **DEC-013** | 18/09/2026 | **Prova Visual Dominante no Hero** | A dobra principal (Hero) utilizará um **Split-Screen Dinâmico da Interface Real**: Autos em PDF com página exata grifada à esquerda -> metadados do caso -> Redator gerando a petição em streaming com badges contextuais à direita, provando o loop em 3 segundos. | ✅ Definitivo |
| **DEC-014** | 18/09/2026 | **Estratégia de Preços no Site** | Não haverá tabela fria de preços estática no lançamento. O site contará com uma **Calculadora Interativa de Economia de Horas / ROI**: o advogado insere número de processos e tamanho da banca, vê o ganho de tempo e clica para agendar a demonstração daquele plano. | ✅ Definitivo |
| **DEC-015** | 18/09/2026 | **Governança de Prova Social e Confiança** | A credibilidade será fundamentada em **Prova Técnica Radical do Produto + Caso Real Desidentificado**. Fica estritamente proibido o uso de depoimentos fictícios ou métricas falsas. A prova é sustentada por telas reais, um processo real anonimizado e transparência total de infraestrutura/LGPD. | ✅ Definitivo |
| **DEC-016** | 18/09/2026 | **Escopo Técnico de Claims e Infraestrutura** | Publicações com cobertura ampla nacional via OAB/diários oficiais; leitura OCR para autos escaneados e nativos; dados em infraestrutura segura com Supabase em São Paulo; consumo de LLM via APIs privadas sem retenção de dados para treinamento de modelos. | ✅ Definitivo |
| **DEC-017** | 18/09/2026 | **Identidade Visual e Tipografia** | Padrão visual **'Híbrido Editorial de Prestígio'**: títulos com serifa contemporânea de autoridade jurídica, corpo e interface com sans-serif técnica nítida. Tema predominantemente claro (Light Theme refinado) com alto contraste, papel off-white, carvão profundo e azul marinho institucional. | ✅ Definitivo |
| **DEC-018** | 18/09/2026 | **Arquitetura de Páginas da V1** | Escopo de lançamento: **Home Long-form Completa de Alta Conversão** (narrativa imersiva com navegação por âncoras) + `/demonstracao` (agendamento dedicado com Cal.com) + `/seguranca` (LGPD e infraestrutura) + `/blog` (arquitetura estática para SEO). | ✅ Definitivo |
| **DEC-019** | 18/09/2026 | **Tom de Voz da Marca** | **'Pragmático Forense de Alta Autoridade'**: profissional, direto, respeitoso, sem gírias de startup infantilizadas e sem juridiquês arcaico pedante. Fala a linguagem da rotina do fórum e do advogado que decide. | ✅ Definitivo |
| **DEC-020** | 18/09/2026 | **Copywriting Oficial Aprovado da Dobra Hero** | **Eyebrow:** `CRM JURÍDICO COM INTELIGÊNCIA CONTEXTUAL`. **H1:** *Dos autos à minuta, com a origem das informações sempre visível.* **Sub:** *O Dendrix conecta o contexto do processo à leitura dos autos em PDF, identifica fatos e contradições com referência às páginas e auxilia na redação da peça no mesmo ambiente.* **CTAs:** `Agendar demonstração prática` (principal) / `Ver o produto em ação` (secundário). **Microcopy:** *15 minutos • Traga um processo da sua banca ou use nosso caso modelo.* **Assinatura:** *Antes da peça, existe um caso inteiro. O Dendrix organiza. A IA apoia. O advogado decide.* | ✅ Aprovado |
| **DEC-021** | 18/09/2026 | **Classificação de Fidelidade Visual dos Elementos de Produto** | Distinção formal entre: 1. **Interface Real:** Embeds do Cal.com e acesso ao aplicativo de produção (`dendrix.app.br`); 2. **Reconstrução Fiel:** Macro-recortes dos módulos (Mesa Jurídica, Tiptap Redator, Publicações) programados em código; 3. **Representação Demonstrativa:** O Split-Screen do Hero e os autos processuais simulados (CNJ, partes e laudos), devidamente rotulados com a tag discreta `Dados demonstrativos` para prevenir qualquer indução a erro ou alegação de prova social falsa. | ✅ Definitivo |

---

## 3. Registro de Hipóteses Resolvidas na Sabatina (Grill-Me)

Todas as 4 hipóteses preliminares levantadas na Etapa 2 foram resolvidas e convalidadas como decisões definitivas (DEC-010 a DEC-019) durante a sessão interativa de grill-me:
- *Território de Hero:* Resolvido pelo Split-Screen Dinâmico do Fluxo Completo do Caso (DEC-013).
- *Modelo de Aquisição:* Resolvido por 100% Venda Consultiva / Demonstração com Cal.com + mini formulário (DEC-012).
- *Padrão Tipográfico e Tema:* Resolvido pelo Híbrido Editorial de Prestígio em tema claro dominante (DEC-017).
- *Precificação no Site:* Resolvido pela Calculadora Interativa de Economia de Horas / ROI (DEC-014).
