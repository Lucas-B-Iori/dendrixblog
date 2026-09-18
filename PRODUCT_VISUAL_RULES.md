# PRODUCT_VISUAL_RULES.md — Diretrizes para Exibição do Produto Real

> **Status:** Especificação Oficial de Representação de Interface (Etapa 4)  
> **Conformidade:** Alinhado com `AI_WEBSITE_ANTI_PATTERNS.md` e a skill `impeccable`.  
> **Regra Central:** O software Dendrix é o protagonista visual. É proibido utilizar capturas inteiras miniaturizadas e ilegíveis ou colocar o sistema dentro de molduras genéricas de MacBook compradas em bancos de imagens.

---

## 1. A Técnica dos Macro-Recortes (UI Chunks)

Em vez de tentar mostrar uma tela inteira de 1920x1080 em um espaço de 500px na landing page (o que torna todos os textos ilegíveis e transmite poluição visual), adotamos a técnica de **macro-recorte cirúrgico**:

```
┌─────────────────────────────────────────────────────────────┬─────────────────────────────────────────────────────────────┐
│ ❌ O QUE NÃO FAZER (MINIATURA ILEGÍVEL)                     │ ✅ PADRÃO DENDRIX (MACRO-RECORTE COM FOCO EM 1 AÇÃO)        │
├─────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────┤
│ • Screenshot inteira da tela do sistema com menu lateral,   │ • Recorte ampliado em 120% a 140% de escala focado apenas   │
│   barra superior, 15 colunas de tabela e textos minúsculos. │   no card da controvérsia e no grifo da folha 47.           │
│ • O visitante não consegue ler nada e sente que o software  │ • O texto do processo judicial e o texto da petição são     │
│   é complicado e confuso.                                   │   perfeitamente legíveis sem zoom (tamanho real de leitura).│
└─────────────────────────────────────────────────────────────┴─────────────────────────────────────────────────────────────┘
```

---

## 2. Princípios de Enquadramento e Composição

1. **Escala de Leitura Humana:** Todo texto exibido dentro de uma captura ou mockup do produto (seja uma linha de autos ou um parágrafo de petição) deve ter no mínimo **13px a 15px de tamanho aparente** na tela do visitante. Se o texto não puder ser lido com naturalidade, o enquadramento está errado.
2. **Eliminação de Menus Irrelevantes:** Nas demonstrações de pilares específicos (como a leitura de autos na Mesa Jurídica), removemos a barra de navegação global do app e o rodapé da página para dar foco exclusivo à ferramenta em ação.
3. **Sobreposição Controlada de Camadas:** Para ilustrar conexão (ex: a Ficha do Processo gerando um alerta de publicação), permitimos uma sobreposição suave com elevação leve (`--shadow-elevated`), onde o card em primeiro plano projeta uma sombra discreta de 8px sobre a tela de fundo.
4. **Moldura Minimalista de Software (Window Frame):** Quando o componente representar uma janela completa, a moldura consiste exclusivamente em:
   - Uma barra superior de `36px` de altura em fundo neutro (`#F8F9FA`).
   - Três pontos circulares mínimos de `10px` em cinza neutro (`#CBD5E1`), sem cores de semáforo chamativas.
   - O nome do arquivo em tipografia monospace discreta: `Processo_CNJ_1002341.pdf` ou `Minuta_Replica.docx`.
   - Borda externa ultrafina de `1px solid var(--border-hairline)`.

---

## 3. Diretrizes para Dados Forenses em Mockups

- **Realismo Jurídico Absoluto:** Todo texto exibido em simulações de tela deve soar 100% autêntico para um advogado brasileiro. Usamos formatações reais de numeração CNJ (`0012345-67.2024.8.26.0100`), nomenclaturas formais de varas judiciais e termos técnicos precisos (contestação, réplica, tutela de urgência, agravo de instrumento).
- **Preservação de Sigilo:** Fica estritamente proibido utilizar nomes reais de partes, CPFs ou empresas reais do mundo corporativo em mockups públicos. Todos os nomes são fictícios (ex: *João Silva*, *Empresa Alfa Participações S/A*).
- **Sem Telas Hallucinadas:** É expressamente vetado criar mockups de funcionalidades que o produto não possui (ex: dashboards cheios de gráficos circulares coloridos ou mapas 3D que não existem em `dendrix.app.br`).
