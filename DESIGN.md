# DESIGN.md — Direção Visual Preliminar, Princípios e Territórios

> **Status:** Documento Preliminar de Pesquisa (Etapa 2)  
> **Nota de Governança:** Este documento NÃO define a identidade visual definitiva nem escolhe cores ou tipografias de forma arbitrária. Ele registra os princípios aprendidos, referências visuais de benchmark, restrições ergonômicas e os **4 Territórios Conceituais de Hero** para validação na sessão com a skill `grill-me`.

---

## 1. Princípios de Design Descobertos na Pesquisa

1. **A Interface Real é a Identidade Visual Primária:**
   - O maior ativo estético do Dendrix é o seu próprio software. A beleza da landing page deve emergir da clareza da tipografia, da precisão dos cards de processo, da linha do tempo dos autos e da elegância do editor de redação.
2. **Gravidade Institucional sem Peso Burocrático:**
   - O advogado precisa sentir que o Dendrix tem a solidez e a seriedade de uma instituição centenária (como os grandes escritórios Mattos Filho / TozziniFreire), combinada com a velocidade, fluidez e inteligência de um software de ponta (Linear / Attio).
3. **Calma Óptica e Baixa Fricção Cognitiva:**
   - Advogados trabalham sob constante estresse de prazos. O site do Dendrix deve ser um oásis de serenidade visual: fundos limpos, respiração generosa, contrastes suaves mas nítidos, evitando poluição de cores neon, popups agressivos e animações circenses.
4. **Física e Motion com Propósito Funcional:**
   - Qualquer animação deve demonstrar uma transição real do software: o PDF sendo lido, o prazo sendo recalculado, a petição sendo redigida em streaming bloco a bloco. Zero animações puramente cosméticas.
5. **Mobile-First Realista:**
   - O advogado frequentemente acessa o site entre uma audiência e outra pelo celular. O layout mobile não pode ser um "desktop esmagado"; deve apresentar cards compactos, tipografia dimensionada com precisão e CTAs táteis acessíveis ao polegar.

---

## 2. Hipóteses e Restrições Técnicas

### Hipóteses Visuais em Avaliação:
- **Hipótese A (Tipografia Híbrida):** Utilizar uma fonte serifada editorial refinada (estilo *Newsreader*, *Playfair* ou *Merriweather*) para títulos conceituais de destaque, combinada com uma sans-serif neutra de alta densidade técnica (como *Inter* ou *Plus Jakarta Sans*) para a interface e textos corridos.
- **Hipótese B (Tema Claro vs. Tema Escuro):** Priorizar uma base predominantemente clara (*light mode* sofisticado com tons off-white/marfim e cinza carvão) na maior parte do site para transmitir transparência e legibilidade documental, utilizando seções escuras com moderação apenas para destacar a tecnologia da Mesa Jurídica.
- **Hipótese C (Demonstração Interativa):** Permitir que o usuário clique em abas ou botões simulados na própria landing page para ver o "Raio-X de Provas" revelando a citação da página sem precisar fazer login.

### Restrições Técnicas Rígidas:
- **Performance:** Respeitar integralmente o Core Web Vitals (LCP < 2.5s, CLS < 0.1, INP < 200ms).
- **Acessibilidade:** Conformidade WCAG 2.1 AA (contraste mínimo de cor de 4.5:1 em todos os textos).
- **Redução de Movimento:** Respeitar a preferência de sistema `prefers-reduced-motion: reduce`, desativando animações complexas para usuários sensíveis.

---

## 3. Os 4 Territórios Conceituais de Hero

Nenhum hero foi escolhido definitivamente. A pesquisa estruturou **4 territórios conceituais**, cada um explorando uma faceta diferente do posicionamento do produto:

---

### Território 1: "O Caso Inteiro Conectado" (Foco em Contexto e Fim dos Silos)
- **Tese Central:** O problema do advogado não é a falta de software, é ter que explicar o mesmo caso para cinco ferramentas diferentes. O Dendrix é o ambiente onde o cliente, os autos, a linha do tempo e a IA já vivem juntos.
- **Headline Conceitual Provisória:**  
  *“Antes da peça, existe um caso inteiro. O CRM jurídico que conecta seus autos, prazos e clientes ao mesmo raciocínio.”*
- **Visual do Hero:**  
  Uma composição central cinematográfica mostrando um processo real se expandindo: de um lado o contato do WhatsApp e a timeline; do outro, a folha de autos com a IA destacando a prova e a petição sendo redigida.
- **Vibe:** Arquitetura de software de alta precisão, ordem, sincronia e visão sistêmica.

---

### Território 2: "Do Caos ao Controle de Prazos" (Foco em Alívio Emocional e Risco Zero)
- **Tese Central:** Ataca diretamente a maior fonte de pesadelo e ansiedade do advogado: o prazo fatal descoberto tarde demais e a desorganização de rotina.
- **Headline Conceitual Provisória:**  
  *“Chega de trabalhar no susto. Prazos sob controle absoluto e inteligência que lê seus autos antes de protocolar.”*
- **Visual do Hero:**  
  Destaque para o widget de contagem regressiva de prazos do Dendrix (com alertas visuais impecáveis) integrado a uma visão limpa de agenda e um conferidor marcando "Nenhum erro encontrado no processo".
- **Vibe:** Tranquilidade, alívio, confiança imediata e proteção contra o erro humano.

---

### Território 3: "O Estagiário Sênior Ultra-Organizado" (Foco em Mesa Jurídica e Raio-X)
- **Tese Central:** A IA não substitui o advogado; ela faz o trabalho hercúleo e tedioso de ler centenas de páginas de autos, cruzar contradições e entregar o mapa do caso pronto para o advogado decidir.
- **Headline Conceitual Provisória:**  
  *“Transforme 300 páginas de autos em um mapa claro do caso em minutos. A IA apoia. O advogado decide.”*
- **Visual do Hero:**  
  Uma interface interativa em tela dividida: à esquerda, o PDF do processo judicial aberto com uma tarja na `Página 42`; à direita, o Raio-X do Dendrix apontando: *"Contradição detectada entre a petição inicial e a contestação da ré"*.
- **Vibe:** Inteligência analítica cirúrgica, rigor documental e empoderamento do profissional.

---

### Território 4: "O Redator com Memória do Caso" (Foco em Produção Jurídica sem Página em Branco)
- **Tese Central:** O ChatGPT cospe generalidades porque não conhece o processo. O Dendrix redige a peça junto com você, puxando os fatos, as partes e os pedidos que já estão na ficha do caso.
- **Headline Conceitual Provisória:**  
  *“Escreva peças de alto nível em minutos. Sem folha em branco, sem copiar e colar e sem prompts infinitos.”*
- **Visual do Hero:**  
  O editor rico do Dendrix (Tiptap) gerando uma petição trabalhista ou cível em streaming, enquanto as variáveis do cliente e do processo são preenchidas dinamicamente ao lado com indicação de fontes.
- **Vibe:** Produtividade fluida, artesanato textual e velocidade com segurança.
