# MOTION_SPEC.md — Diretrizes de Física, Animação e Estados Funcionais

> **Status:** Especificação Oficial de Motion (Etapa 4)  
> **Conformidade:** Alinhado com `AI_WEBSITE_ANTI_PATTERNS.md`, `DESIGN_SYSTEM_SPEC.md` e a skill `impeccable`.  
> **Princípio Fundamental:** **O movimento só existe se comunicar uma transformação de estado do software ou guiar a atenção do leitor para a prova.** Zero animação puramente cosmética.

---

## 1. Princípios de Física e Curvas de Aceleração (Easing)

O Dendrix utiliza curvas de aceleração de alta precisão baseadas em atrito natural (física de ferramentas de precisão), evitando acelerações elásticas (*bounce*) ou artificiais.

```css
/* Curvas Padronizadas de Easing */
--ease-entrance: cubic-bezier(0.16, 1, 0.3, 1);  /* Desaceleração suave para elementos que entram em cena */
--ease-exit:     cubic-bezier(0.7, 0, 0.84, 0);   /* Aceleração para elementos que saem da tela */
--ease-standard: cubic-bezier(0.4, 0, 0.2, 1);    /* Transição equilibrada para hovers e aberturas */
--ease-stream:   cubic-bezier(0.25, 1, 0.5, 1);   /* Ritmo orgânico de digitação e fluxo de texto */

/* Escala de Durações Funcionais */
--duration-instant:  100ms; /* Alternância de abas e estados ativos */
--duration-micro:    150ms; /* Hovers de botões, foco de inputs e tooltips */
--duration-quick:    250ms; /* Expansão de acordeão no FAQ e dropdowns */
--duration-standard: 400ms; /* Transição de cards e entrada de blocos no scroll */
--duration-flow:     800ms; /* Animação do fluxo contínuo dos autos para a minuta */
```

---

## 2. Catálogo: Movimentos Permitidos vs. Proibidos

```
┌─────────────────────────────────────────────────────────────┬─────────────────────────────────────────────────────────────┐
│ ✅ MOVIMENTOS PERMITIDOS (FUNCIONAIS)                        │ ❌ MOVIMENTOS PROIBIDOS (SLOP / DECORATIVOS)                │
├─────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────┤
│ • O grifo no PDF deslizando sobre a linha do texto.        │ • Elementos flutuando para cima e para baixo infinitamente. │
│ • O cursor de texto piscando enquanto a minuta é gerada.    │ • Efeitos de parallax vertiginosos que atrasam a rolagem.   │
│ • A tag [Fls. 47] pulsando uma única vez ao ser citada.     │ • Gradientes que ficam mudando de cor em loop.              │
│ • O acordeão do FAQ expandindo com altura fluida (250ms).   │ • Partículas, confetes ou estrelinhas digitais.             │
│ • Entrada staggered discreta (máx. 40ms de atraso por item).│ • Botões que pulam ou tremem para forçar o clique.          │
│ • Micro-elevação de card no hover (deslocamento máx. 2px).  │ • Zooms agressivos em imagens ou rotações 3D distorcidas.   │
└─────────────────────────────────────────────────────────────┴─────────────────────────────────────────────────────────────┘
```

---

## 3. Comportamento ao Scroll (Scroll-Triggered Transitions)

- **Threshold de Ativação:** Elementos só iniciam sua animação de entrada quando **15% do bloco** já estiver visível no viewport do usuário (`intersectionObserver` com `threshold: 0.15`).
- **Deslocamento Máximo:** Elementos que sobem no scroll nunca se deslocam mais de **12px verticalmente** (`translateY(12px) -> translateY(0)`). Deslocamentos longos (como 50px ou 100px) geram tontura e parecem amadores.
- **Execução Única (Once):** Animações de entrada disparam **apenas uma vez** por sessão. Se o usuário rolar para cima e para baixo, o conteúdo já permanece estável na tela.

---

## 4. Conformidade Rígida com `prefers-reduced-motion`

Usuários com sensibilidade vestibular ou que configuraram a redução de movimento no sistema operacional recebem uma experiência visual 100% estática e instantânea:

```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

* **No Hero:** Todos os estados do storyboard (grifo, tag de folha e minuta no editor) são exibidos **completamente carregados e estáticos** desde o primeiro milissegundo de renderização.
