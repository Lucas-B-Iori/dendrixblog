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

## 3. Hipóteses em Aberto (NÃO são decisões ainda)

As seguintes questões permanecem como hipóteses a serem validadas na próxima etapa:
- *Qual dos 4 territórios de hero será o escolhido como direção primária.*
- *Modelo de aquisição final da landing: Teste Grátis Self-Service (7 ou 10 dias) vs. Demonstração Comercial guiada.*
- *Padrão tipográfico final (uso de serifas clássicas no título vs. sans-serif total moderna).*
- *Estrutura de precificação pública no site vs. contato sob demanda.*
