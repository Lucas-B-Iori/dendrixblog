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

## 3. Classificação de Funcionalidades (Atualizada Pós-Grill-Me)

### Categoria 1: VERIFIED (100% Confirmadas e Operacionais em dendrix.app.br)
*Funcionalidades totalmente operacionais e disponíveis no produto:*

1. **CRM e Gestão Operacional de Ponta a Ponta:**
   - Gestão de Prazos com contagem regressiva em tempo real e distinção prazo vs. audiência.
   - Ficha Estruturada do Processo (CNJ, comarca, partes, valor da causa, fases, timeline de andamentos).
   - Gestão de Clientes e Relacionamento (contatos, partes vinculadas, histórico de interações).
   - Módulo Financeiro e Gestão de Honorários (contratual, êxito, consultivo, faturamento).
   - Módulo de Projetos Jurídicos (contratos, ONGs, associações, estruturação extrajudicial).
2. **Acompanhamento Automático de Publicações com IA:**
   - Cobertura nacional integrada via OAB e Diários Oficiais (DJEN e Diários de Justiça estaduais/federais).
   - Inteligência Artificial que lê a publicação e sugere proativamente o próximo passo processual e prazo cabível.
3. **Mesa Jurídica (Raio-X e Leitura Analítica de Autos):**
   - Upload de autos judiciais em PDF com processamento de texto nativo e OCR para peças escaneadas (até ~300 páginas).
   - Extração automática de partes, cronologia, pedidos e decisões interlocutórias.
   - Grounding visual absoluto: toda constatação cita expressamente a página do PDF (ex: `[Pág. 47 - Contestação]`).
   - Mapeamento de fatos, teses e contradições entre petições e documentos.
4. **Assistente Geral de IA:**
   - Copiloto inteligente treinado na legislação, doutrina e jurisprudência brasileira.
   - Respostas fundamentadas com linguagem técnica jurídica precisa.
5. **Assistente do Caso (Estratégico Contextual):**
   - IA contextual ancorada na Ficha do Processo específico: responde dúvidas sobre a prova dos autos, sugere estratégias processuais e analisa pontos fracos da parte contrária sem necessidade de repassar o contexto.
6. **Redator Jurídico em 2 Cliques (Treinado em Peças Ouro):**
   - Geração de minutas completas fundamentadas a partir dos dados do CRM e dos autos lidos.
   - Treinamento refinado em banco de "peças ouro" de alta técnica processual.
   - Editor rico em tempo real (Tiptap) para revisão humana antes do protocolo.
7. **Infraestrutura e Segurança de Nível Corporativo:**
   - Banco de dados isolado e seguro no Supabase em São Paulo (AWS sa-east-1).
   - Consumo de modelos de fronteira via APIs corporativas privadas com garantia formal de **zero retenção de dados para treinamento de modelos públicos**.
   - Criptografia em repouso e em trânsito (AES-256 e TLS 1.3).

---

### Categoria 2: OPPORTUNITY (Não prometidas nem anunciadas no lançamento)
*Funcionalidades de expansão futura que NÃO fazem parte da promessa da V1:*
1. Protocolo eletrônico automatizado via certificado digital A1/A3 direto no tribunal (sem passar pelo portal oficial).
2. Assinatura eletrônica proprietária de procurações embutida no chat de WhatsApp.
3. Portal do cliente final com aplicativo móvel próprio.
4. Calculadoras judiciais de liquidação trabalhista complexa com índices de correção homologados.

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
