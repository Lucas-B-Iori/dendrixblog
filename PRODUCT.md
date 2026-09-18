# PRODUCT.md — Dendrix CRM: Entendimento Real do Produto

> **Documento de Verdade do Produto**  
> Versão: 1.0 — Etapa 2 (Imersão e Diagnóstico)  
> Regra Fundamental: Nenhuma funcionalidade é declarada como existente sem evidência comprovada no código, documentação técnica ou validação do proprietário.

---

## 1. Definição do Produto

O **Dendrix CRM** é um software de gestão jurídica (SaaS) verticalizado para a advocacia (`law_firm`), projetado especificamente para conectar a **gestão diária do escritório** à **inteligência jurídica contextual**.

Ele resolve a desconexão fundamental enfrentada pelo advogado moderno:
- As ferramentas tradicionais de gestão (planilhas, softwares jurídicos legados) apenas acumulam dados operacionais estáticos e burocráticos.
- As ferramentas genéricas de Inteligência Artificial (ChatGPT, Claude web, copilot isolados) são "ilhas sem memória", exigindo que o advogado copie, cole, contextualize e explique o caso do zero a cada nova demanda.

### O Diferencial Conceitual
> **"Antes da peça, existe um caso inteiro."**  
> **"O Dendrix organiza. A IA apoia. O advogado decide."**

No Dendrix, o trabalho jurídico e o contexto já vivem no mesmo ecossistema. A IA não opera no vácuo: ela enxerga o cliente, o processo, os autos anexados, a linha do tempo, as tarefas, os prazos e os documentos relacionados.

**Não é:**
- Um chatbot jurídico superficial ou "mágico".
- Uma "IA advogada que substitui o profissional" (posicionamento repudiado por destruir a credibilidade jurídica e violar a ética de responsabilização profissional).

**É:**
- Um "estagiário sênior ultra-organizado": lê os autos, organiza o histórico, audita prazos e incongruências, redige minutas assistidas em streaming e entrega clareza cirúrgica para que o advogado tome a decisão final com segurança.

---

## 2. Perfis de Cliente Ideal (ICP)

### ICP A: Advogado Autônomo / Solo
- **Realidade:** Opera sozinho ou com apoio pontual. Desempenha simultaneamente os papéis de captador, gestor, redator, controlador de prazos e cobrador de honorários.
- **Dores Críticas:**
  - Prazos descobertos em cima da hora quando viram urgência operacional.
  - Ansiedade permanente ("será que esqueci algum prazo ou andamento?").
  - Horas caras perdidas caçando documentos no WhatsApp, pastas do Windows e downloads.
  - Perda de margem e tempo reescrevendo peças da folha em branco ou explicando casos para o ChatGPT em prompts gigantes.
- **Sensibilidade:** Alta sensibilidade a software inchado, complexo ou com dezenas de menus inúteis. Busca simplicidade de uso, segurança e alívio mental imediato.

### ICP B: Pequenos Escritórios (2 a 8 advogados, com foco expressivo no interior)
- **Realidade:** Uma equipe pequena em crescimento, onde o fundador ainda centraliza todas as decisões críticas e teme que a entrada de novos processos aumente o ruído em vez do lucro.
- **Dores Críticas:**
  - Dependência excessiva do sócio-fundador (se ele viaja ou adoece, o escritório desacelera).
  - Equipe que executa tarefas sem registrar o raciocínio ou sem conferir dados básicos antes de protocolar.
  - Atendimento ao cliente desarticulado: cada mensagem de cliente reabre uma investigação para descobrir qual foi o último acordo.
  - Autos digitalizados pesados, muitas vezes escaneados como imagem (típico de comarcas do interior), que exigem leitura manual exaustiva de dezenas de páginas.

---

## 3. Classificação de Funcionalidades

### Categoria 1: VERIFIED (Confirmadas no Produto / Base Técnica)
*Funcionalidades implementadas, presentes no código-fonte ou em fase de produção ativa no ecossistema Dendrix:*

1. **Gestão de Prazos Operacionais:**
   - Visualização com contagem regressiva em dias/horas.
   - Alertas visuais de proximidade e vencimento.
   - Distinção entre prazo fatal e audiência.
   - Vínculo direto e bidirecional com a entidade Processo.
   - Widget de controle no Dashboard ("Prazos vencendo esta semana").
2. **Ficha Estruturada do Processo:**
   - Cadastro detalhado: Número do processo (padrão CNJ), Vara / Comarca, Parte Contrária, Valor da Causa, Fase Processual, Área do Direito.
   - Visualização centralizada de andamentos em timeline.
3. **Gestão de Clientes e Relacionamento:**
   - Cadastro de contatos e pessoas vinculadas ao processo.
   - Integração nativa com WhatsApp e secretária virtual de atendimento.
   - Histórico de interações registrado no contexto do cliente.
4. **Financeiro e Gestão de Honorários:**
   - Módulo de honorários com divisão: Contratual, Êxito (%), Consultivo/Mensal.
   - Visão de valores faturados, a receber e divisão por área de atuação.
5. **Estrutura de Documentos e Editor Rico:**
   - Editor de texto embutido (Tiptap / Web Doc Editor) para confecção colaborativa de textos.
   - Infraestrutura de upload e armazenamento de PDFs (Supabase Storage SP).
   - Extração determinística de textos via `pdfjs-dist` com preservação precisa de página de referência.
6. **Infraestrutura de Processamento Assíncrono:**
   - Orquestração de jobs em background (Inngest) e controle estrito de teto de custos de LLM (`budget guardrails`).

---

### Categoria 2: NEEDS VERIFICATION (Em Desenvolvimento / Roteiro Ativo)
*Funcionalidades concebidas e documentadas no planejamento técnico da Mesa Jurídica / Redator, que precisam de confirmação sobre estágio de liberação comercial:*

1. **Mesa Jurídica — Mapa do Processo (Leitura de Autos):**
   - Extração automática de partes, pedidos, decisões interlocutórias, cronologia e pendências com link para a página dos autos.
   - Exportação automática do relatório gerado em Word (.docx) e PDF.
2. **OCR para Autos Escaneados:**
   - Pipeline de OCR (Tesseract / Visão LLM) para digitalizações legadas do interior onde não há camada de texto nativa.
3. **Raio-X de Provas e Contradições:**
   - Cruzamento automatizado: fato alegado na inicial vs. contestação vs. prova documental vs. depoimentos, apontando lacunas.
4. **Conferidor Pré-Protocolo:**
   - Validador híbrido: regras determinísticas (CPF/CNPJ inválido, datas incompatíveis, tags `[XXX]`, documentos citados e não anexados) + análise semântica de pedidos não fundamentados nos fatos.
5. **Redator Jurídico em Streaming por Seção:**
   - Geração de petições estruturadas (endereçamento, qualificação, fatos, direito, pedidos) diretamente no editor, puxando as variáveis do caso sem que o advogado copie e cole.
6. **Perguntar aos Autos (RAG Contextual):**
   - Busca semântica nos autos com pgvector com exigência de citação exata de página ("onde está o comprovante de residência?").
7. **Pesquisa Jurisprudencial nos Tribunais Superiores (STF/STJ):**
   - Motor de busca integrado e comparador de julgados.

---

### Categoria 3: OPPORTUNITY (Identificadas no Mercado / Não Implementadas)
*Funcionalidades populares em concorrentes ou identificadas na pesquisa que NÃO estão evidenciadas no produto e NÃO devem ser prometidas:*

1. **Varredura Automática de Todos os Diários de Justiça Eletrônicos (DJEs) Nacionais:**
   - Concorrentes antigos (ADVBOX, Projuris, Astrea) possuem robôs de busca de publicações por nome/OAB em todos os diários oficiais. No Dendrix, o foco inicial é o contexto dos autos e o CRM; a cobertura massiva de diários requer verificação ou integração parceira.
2. **Protocolo Eletrônico Automático Direto nos Tribunais (PJe, e-SAJ, Projudi):**
   - Envio de petições com certificado digital em lote diretamente para as plataformas dos tribunais sem abrir o navegador do tribunal.
3. **Assinatura Eletrônica Própria de Contratos via WhatsApp:**
   - Assinatura com validade jurídica integrada (estilo DocuSign/Clicksign embutido no chat).
4. **Portal Exclusivo do Cliente Final (App do Cliente):**
   - Área do cliente com login para acompanhar o andamento processual sem acionar o advogado.
5. **Calculadora Trabalhista / Previdenciária de Liquidação Complexa:**
   - Cálculos profundos com atualização monetária e índices de correção homologados.

---

## 4. O Moat (Vantagem Competitiva Real)

| Dimensão | Soluções Legadas (Projuris, ADVBOX, Astrea) | Ferramentas de IA Genéricas (ChatGPT, Copilot) | **DENDRIX CRM** |
| :--- | :--- | :--- | :--- |
| **Origem dos Dados** | Foco burocrático em formulários, tabelas e relatórios gerenciais para sócios. | Caixa de texto vazia. O usuário precisa carregar o prompt toda vez. | **O CRM alimenta a IA e a IA alimenta o CRM.** O caso inteiro é o contexto. |
| **Tratamento de IA** | Features adicionadas como "puxadinho" (chat flutuante genérico ou resumo superficial). | IA sem conhecimento do processo, gerando texto plausível mas desconectado da prova. | **Grounding nativo com citação de página.** Toda afirmação remete ao documento dos autos. |
| **Redação Jurídica** | Modelos estáticos de Word (substituição de variáveis simples tipo mala direta). | Parede de texto em chat que precisa ser copiada, colada e reformatada. | **Editor interativo com geração streaming bloco a bloco**, respeitando a estrutura processual. |
| **Complexidade** | Telas pesadas, dezenas de abas, treinamento longo, onboarding travado. | Simples, porém inútil para o fluxo operacional do escritório. | **Interface focada e minimalista.** Poucos botões expressivos, orientados à ação do advogado. |

---

## 5. Linguagem da Marca e Diretrizes Editoriais

### O Tom de Voz:
- **Sóbrio, direto e respeitoso:** Conversa de profissional do direito para profissional do direito. Nunca infantil, pomposo ou apelativo.
- **Crítico aos maus hábitos operacionais:** Aponta o custo oculto do improviso ("procurar em 5 abas não é advocacia; é caça ao tesouro").
- **Anti-Hype:** Não utiliza termos inflacionados como "revolução cósmica da IA", "robô que substitui juiz", "advocacia 5.0". Usa termos funcionais: *conferência, contexto, linha do tempo, autos, prazos, clareza*.

---

## 6. Governança de Claims Comerciais

### Claims que PODEMOS Fazer na Landing Page:
✅ *"O CRM jurídico onde o processo, o cliente e os prazos vivem no mesmo contexto."*  
✅ *"A IA que já conhece o seu caso antes de você digitar a primeira palavra."*  
✅ *"Prazos com contagem regressiva e controle visual para você nunca mais trabalhar no susto."*  
✅ *"Fatos conectados a documentos reais com indicação exata de página."*  
✅ *"Um assistente que confere incongruências e organiza o raciocínio, enquanto a decisão final permanece 100% com você."*  
✅ *"Desenvolvido para a rotina ágil de advogados autônomos e escritórios práticos."*  

### Claims que NÃO PODEMOS Fazer (Proibidos até Validação):
❌ *"Capturamos automaticamente 100% das intimações de todos os diários do Brasil."* (A menos que homologado com fornecedor de push de publicações).  
❌ *"Protocolamos suas petições no tribunal com 1 clique."* (O Dendrix não faz protocolo direto automatizado).  
❌ *"Nossa IA sabe se você vai ganhar a causa."* (Falsa promessa ética e juridicamente inaceitável).  
❌ *"Substitui o advogado ou dispensa revisão humana."* (Repudiado explicitamente pela direção do produto).  
❌ Invenção de depoimentos com nomes fictícios, fotos de banco ou estatísticas genéricas de impacto sem medição auditada.
