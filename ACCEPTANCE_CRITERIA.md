# ACCEPTANCE_CRITERIA.md — Critérios de Aceite e Definição de Pronto (DoD)

> **Status:** Especificação Oficial de Verificação e QA (Etapa 4)  
> **Objetivo:** Estabelecer a lista de checagem objetiva ("Consideramos pronto quando...") para validar cada entrega da implementação antes de qualquer homologação ou deploy.

---

## 1. Critérios de Aceite por Dimensão e Seção

### 1. Design System & Tipografia
* [ ] As fontes `Newsreader` (serifa) e `Plus Jakarta Sans` (sans) estão configuradas via `@next/font` com subconjuntos latinos e `display: swap`.
* [ ] Nenhuma cor fora da paleta semântica oficial (`DESIGN_SYSTEM_SPEC.md`) é utilizada no CSS.
* [ ] Os contrastes de cor atendem rigorosamente ao padrão WCAG 2.1 AA (mínimo de 4.5:1 para texto normal e 3:1 para títulos grandes).
* [ ] A escala de raios de borda limita-se estritamente a `4px`, `8px` e `12px` (sem cards redondos de 24px/32px).

### 2. Dobra Principal (Hero)
* [ ] A copy exibida é **100% idêntica** ao texto oficial travado em `HOME_COPY_V2.md`, sem alterar vírgulas ou palavras.
* [ ] O Split-Screen de produto é perfeitamente legível sem zoom, com o PDF dos autos na folha 47 e o editor exibindo a minuta com o badge `[Fls. 47]`.
* [ ] O storyboard funcional de 6 estados executa suavemente no carregamento inicial e é completamente desligado sob `prefers-reduced-motion: reduce`.
* [ ] O botão primário abre a modal de agendamento de 15 minutos e o botão secundário faz scroll suave para a Seção 03.
* [ ] O layout não quebra em viewports de 360px (mobile) até 2560px (telas ultrawide).

### 3. Seções Narrativas (O Custo do Caos & O Loop do Caso)
* [ ] A Seção 02 (Caos) adota composição editorial aberta em vez de 3 cards retangulares idênticos lado a lado.
* [ ] A Seção 03 (Loop) apresenta uma linha do tempo contínua demonstrando os 3 marcos (`01. Gestão`, `02. Leitura`, `03. Redação`) como partes de um fluxo integrado.
* [ ] Nenhum claim inventado de estatística de mercado é utilizado.

### 4. Pilares Técnicos (Mesa Jurídica, Redator & Foro)
* [ ] Os 3 pilares alternam harmoniosamente o lado da imagem/interface (Mesa: cópia à esq./produto à dir.; Redator: produto à esq./cópia à dir.; Prazos: cópia à esq./produto à dir.).
* [ ] Todas as telas do produto exibem dados forenses brasileiros autênticos (CNJ válido, termos de varas e comarcas reais), sem nomes de pessoas reais.
* [ ] O card de publicação oficial destaca o badge da IA com sugestão prática de providência processual.

### 5. Estudo de Caso Desidentificado
* [ ] A seção utiliza **exclusivamente os placeholders estruturais** definidos em `HOME_COPY_V2.md`.
* [ ] Nenhum número de páginas, tempo de resposta ou processo judicial fictício é exibido na tela.

### 6. Calculadora Interativa de Tempo
* [ ] Os sliders respondem em tempo real a 60fps sem engasgos ou travamentos no DOM.
* [ ] O resultado exibido é apresentado expressamente como **estimativa de horas operacionais**, sem promessas arbitrárias de retorno financeiro em Reais.
* [ ] A nota metodológica transparente está legível na base da calculadora.
* [ ] O botão da calculadora direciona para o agendamento da demonstração com os parâmetros da banca pré-carregados.

### 7. Governança, Segurança & FAQ
* [ ] A grade de segurança destaca servidores em São Paulo, termos de não-treinamento de IA e criptografia (TLS 1.3 / AES-256).
* [ ] O FAQ expande suavemente (250ms), permite navegação por teclado (`Tab`, `Enter`, `Space`, `Esc`) e incorpora os dados estruturados Schema.org `FAQPage`.
* [ ] A resposta para risco de segurança reflete com precisão as três camadas técnicas e contratuais estabelecidas.

### 8. Funil de Demonstração (Cal.com + Mini-Formulário)
* [ ] O mini-formulário valida Nome, WhatsApp (com máscara automática), E-mail e Tamanho da banca antes de abrir o calendário.
* [ ] Os dados preenchidos são repassados aos parâmetros de URL do Cal.com para evitar digitação duplicada.
* [ ] O link rápido para o WhatsApp abre uma conversa com a mensagem pré-formatada correta.

### 9. Mobile & Ergonomia
* [ ] A barra de ação inferior fixa (`StickyMobileBar`) surge após a primeira dobra e recolhe em scroll rápido para baixo.
* [ ] Todos os botões e links interativos possuem área de toque de no mínimo `44px x 44px`.
* [ ] Zero rolagem horizontal (*overflow-x: hidden*) em qualquer largura de tela móvel.

### 10. Performance & SEO Técnico
* [ ] `npm run build` compila sem erros, avisos de TypeScript ou advertências de CSS.
* [ ] LCP em ambiente local / preview inferior a 1.8 segundos.
* [ ] CLS rigorosamente inferior a 0.02.
* [ ] Metadados OpenGraph e Twitter Cards configurados para `dendrixcrm.com.br`.
