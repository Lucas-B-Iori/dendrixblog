# ASSET_REQUIREMENTS.md — Inventário e Especificação de Assets Visuais

> **Status:** Especificação Oficial de Insumos Visuais (Etapa 4)  
> **Objetivo:** Listar com precisão cirúrgica todos os arquivos gráficos, capturas de tela e assets de marca necessários para a implementação, definindo formatos, resoluções e o que pode ser gerado de forma programática via código.

---

## 1. Classificação de Prioridade dos Assets

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                TABELA GERAL DE ASSETS                                  │
├────────────────────┬───────────┬─────────────┬──────────────┬──────────────────────────┤
│ Asset              │ Nível     │ Formato     │ Resolução    │ Origem Recomendada       │
├────────────────────┼───────────┼─────────────┼──────────────┼──────────────────────────┤
│ Logotipo Oficial   │ OBRIGATÓRIO│ SVG Vetorial│ Escalável    │ Arquivo oficial da marca │
│ Símbolo / Favicon  │ OBRIGATÓRIO│ SVG + PNG   │ 32x32 / 512x │ Arquivo oficial da marca │
│ OpenGraph Image    │ OBRIGATÓRIO│ PNG / WebP  │ 1200x630px   │ Produção com brand tokens│
│ Mockup Hero Split  │ IMPORTANTE│ React / WebP│ Alta Def. @2x│ Programático com CSS/HTML│
│ Macro Mesa Jurídica│ IMPORTANTE│ WebP / PNG  │ Mín. 1600px  │ Captura real do produto  │
│ Macro Redator      │ IMPORTANTE│ WebP / PNG  │ Mín. 1600px  │ Captura real do produto  │
│ Card Publicação IA │ IMPORTANTE│ React / WebP│ Componente   │ Programático ou Real     │
│ Caso Real Paradigma│ OPCIONAL  │ Texto / PDF │ N/A          │ Fornecido pós-homologação│
│ Vídeo Teardown     │ OPCIONAL  │ MP4 / WebM  │ 1080p        │ Futuras iterações de CRO │
└────────────────────┴───────────┴─────────────┴──────────────┴──────────────────────────┘
```

---

## 2. Especificação Detalhada por Categoria

### 2.1. Assets de Marca e Identidade (OBRIGATÓRIO)
1. **Logotipo Oficial Dendrix (Wordmark + Símbolo):**
   - **Formato:** `.svg` vetorial limpo, sem caminhos rasterizados embutidos.
   - **Variantes necessárias:**
     - Versão para fundo claro (Texto em `--brand-primary` `#0F2B48` ou Carvão `#0F172A`).
     - Versão monocromática branca para o rodapé escuro (`#FFFFFF`).
   - **Fallback temporário:** Caso o arquivo vetorizado não esteja disponível de imediato, o logotipo pode ser renderizado programaticamente utilizando a tipografia oficial com peso 700 e tracking calibrado.
2. **Ícone / Favicon:**
   - Formatos: `favicon.ico`, `icon.svg` e `apple-touch-icon.png` (180x180).

### 2.2. Interface do Hero e Pilares de Produto (IMPORTANTE)
1. **Split-Screen do Hero:**
   - **Abordagem recomendada:** **100% Programático em React/Tailwind**. Renderizar os dois painéis (PDF dos autos e Editor de texto) como código HTML/CSS real garante nitidez tipográfica perfeita em qualquer densidade de tela (Retina/4K), performance imbatível (zero bytes de imagens pesadas) e total responsividade para o storyboard animado.
2. **Macro-Recortes dos Pilares (Seções 04, 05 e 06):**
   - **Mesa Jurídica (Leitura de PDF):** Captura em resolução Retina (`@2x`, largura mínima de 1600px) focada no painel de visualização de autos com anotações e citações.
   - **Redator Jurídico (Editor Tiptap):** Captura em alta resolução focada no texto da minuta sendo editado com as tags de variáveis do processo.
   - **Acompanhamento de Publicações:** Captura real da timeline de intimações ou componente programático reativo em Tailwind CSS.

### 2.3. Social e Compartilhamento (OBRIGATÓRIO)
1. **Social Preview (OpenGraph / Twitter Card):**
   - Dimensões: `1200 x 630 px` (aspect ratio 1.91:1).
   - Conteúdo: Fundo marfim suave nobre, logotipo oficial no topo, o H1 institucional (*"Dos autos à minuta, com a origem das informações sempre visível"*), o badge de categoria e um vislumbre elegante do Split-Screen à direita.
   - Formato: `.png` otimizado (peso máximo: 120 kB).
