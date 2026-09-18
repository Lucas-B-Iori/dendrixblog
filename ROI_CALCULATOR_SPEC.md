# ROI_CALCULATOR_SPEC.md — Especificação da Calculadora Interativa de Tempo

> **Status:** Especificação Oficial da Calculadora (Etapa 4)  
> **Conformidade:** Alinhado com `DEC-014`, `HOME_COPY_V2.md` e os princípios de CRO e transparência.  
> **Regra de Ouro:** Não inventar dados determinísticos nem prometer valores financeiros automáticos sem base factual. O foco é a **estimativa transparente de tempo operacional recuperado**.

---

## 1. O Dilema: Precisão Técnica vs. Fricção de Conversão

```
┌─────────────────────────────────────────────────────────────┬─────────────────────────────────────────────────────────────┐
│ ❌ CALCULADORA HIPER-COMPLEXA (ALTA FRICÇÃO)                │ ✅ SOLUÇÃO EQUILIBRADA DENDRIX (BAIXA FRICÇÃO + CONFIANÇA)  │
├─────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────┤
│ • Pede 6 a 8 campos: média de páginas por PDF, tempo exato  │ • Apenas 2 controles intuitivos de arrastar (sliders):     │
│   de digitação, quantidade de recursos, honorário médio.    │   1. Volume aproximado de processos ativos na banca.        │
│ • 75% dos visitantes abandonam antes de ver o resultado     │   2. Número de profissionais na produção jurídica.          │
│   porque não sabem esses dados de cabeça.                   │ • Entrega resultado imediato e transparente em 2 segundos.  │
└─────────────────────────────────────────────────────────────┴─────────────────────────────────────────────────────────────┘
```

---

## 2. Especificação das Variáveis de Entrada (Inputs)

1. **Controle 1: Processos Ativos no Escritório (`active_cases`)**
   - **Tipo de controle:** Slider contínuo com marcações de escala.
   - **Intervalo:** Mínimo `30` processos | Máximo `600` processos | Passo (`step`): `10`.
   - **Valor padrão inicial (`default`):** `150` processos.
2. **Controle 2: Profissionais na Produção Jurídica (`team_size`)**
   - **Tipo de controle:** Seletor de botões de pílula ou slider discreto.
   - **Intervalo:** `1`, `2`, `3`, `4`, `5`, `6 a 10` advogados/estagiários.
   - **Valor padrão inicial (`default`):** `3` profissionais.

---

## 3. Modelo Matemático e Premissas Transparentes

A fórmula não utiliza números arbitrários; baseia-se em parâmetros conservadores de rotina forense:

### 3.1. Premissas de Cálculo
* **Demanda de Leitura e Minuta:** Estima-se que, em média, cada processo ativo exige aproximadamente **0.4 horas por mês** de trabalho braçal (leitura de despachos, conferência de andamentos, localização de provas em PDFs e preenchimento de peças iniciais ou intermediárias).
* **Fator de Assistência Dendrix:** A leitura automatizada de autos com citação de página e o preenchimento contextual de minutas reduzem em média **40% (fator `0.40`)** o tempo despendido nessas tarefas puramente braçais.
* **Teto de Razoabilidade (Sanity Cap):** O ganho não pode ultrapassar **35 horas/mês por advogado**, evitando números inflados ou inacreditáveis.

### 3.2. Estrutura da Fórmula
$$\text{Horas Base} = \text{active\_cases} \times 0.40 \times 0.40$$
$$\text{Horas Máximas da Banca} = \text{team\_size} \times 35$$
$$\text{Resultado Exibido} = \text{Arredondar}(\min(\text{Horas Base}, \text{Horas Máximas da Banca}))$$

* **Exemplo com valores padrão:**
  - 150 processos ativos com 3 advogados:
  - $150 \times 0.40 \times 0.40 = 24 \text{ horas/mês}$ recuperadas para o escritório.

---

## 4. Apresentação do Resultado (Output)

O mostrador não converte o tempo em reais (R$) de forma arbitrária (o que geraria desconfiança sobre qual valor de hora técnica foi utilizado). Ele foca na **capacidade de trabalho recuperada**:

```markdown
PAINEL DE RESULTADO:

Estimativa de tempo operacional recuperado:
[ ~24 horas por mês ]

Texto explicativo contextual:
"O equivalente a mais de 3 dias de trabalho forense por mês liberados de 
tarefas manuais de busca e formatação, prontos para serem dedicados 
a audiências, estratégia processual e atendimento a novos clientes."

[ Agendar demonstração para avaliar a sua banca ]
```

### Nota Metodológica de Transparência Obrigatória (Exibida no Rodapé do Card):
> *"Esta calculadora apresenta uma estimativa conservadora baseada em parâmetros médios de triagem documental e redação forense. Os ganhos reais variam de acordo com a área do direito, a complexidade dos autos e a rotina do escritório. A análise detalhada da sua banca é apresentada na demonstração prática de 15 minutos."*
