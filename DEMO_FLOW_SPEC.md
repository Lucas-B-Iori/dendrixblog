# DEMO_FLOW_SPEC.md — Especificação do Funil de Demonstração (Cal.com + WhatsApp)

> **Status:** Especificação Oficial de Conversão (Etapa 4)  
> **Conformidade:** Alinhado com `DEC-012` (Venda Consultiva) e os princípios de CRO da skill `cro`.  
> **Arquitetura de Conversão:** O lead deve ser salvo na etapa do formulário antes de abrir o calendário, garantindo contato direto via WhatsApp mesmo em caso de abandono da seleção de horário.

---

## 1. A Jornada em 2 Etapas (Two-Step Booking Flow)

```
[CLIQUE NO CTA]: "Agendar demonstração prática"
       ↓
[ETAPA 1: QUALIFICAÇÃO RÁPIDA (Mini-Formulário de 4 Campos)]
       • Nome Completo
       • WhatsApp com DDD (com máscara automática)
       • E-mail Profissional
       • Quantidade de Advogados na Banca (Pílulas de 1 clique)
       ↓ [BOTÃO: "Continuar para Escolha de Horário"]
[CAPTURA DOS DADOS EM BACKGROUND NO CRM]
       ↓
[ETAPA 2: CALENDÁRIO CAL.COM EMBUTIDO]
       • Escolha do melhor dia e horário disponível
       • Integração automática gerando link do Google Meet
       • Dados do formulário pré-preenchidos no Cal.com via URL params
```

---

## 2. Especificação do Mini-Formulário de Qualificação

O formulário é exibido em uma janela modal limpa e elegante (ou na rota dedicada `/demonstracao`), contendo:

* **Título da Modal:** **Demonstração Prática do Dendrix (15 minutos)**
* **Subtítulo:** *Escolha o melhor horário na agenda para ver o sistema lendo um processo real ao vivo.*

### Campos e Regras de Validação:
1. **Nome Completo:**
   - Placeholder: `Dr(a). Seu Nome`
   - Validação: Mínimo de 3 caracteres, obrigatório.
2. **WhatsApp / Telefone:**
   - Placeholder: `(11) 99999-9999`
   - Máscara dinâmica: Formata automaticamente para celular com 9 dígitos. Obrigatório.
3. **E-mail Profissional:**
   - Placeholder: `voce@seuescritorio.com.br`
   - Validação: Formato de e-mail válido. Obrigatório para envio do convite do Google Meet.
4. **Tamanho do Escritório:**
   - Formato: 4 botões de seleção única (pílulas):
     - `Apenas eu (Solo)`
     - `2 a 4 advogados`
     - `5 a 8 advogados`
     - `Mais de 8 advogados`
   - Padrão pré-selecionado: `2 a 4 advogados`.

---

## 3. Integração Técnica com Cal.com

* **Tecnologia:** `@calcom/embed-react` ou embed via `iframe` responsivo carregado com `loading="lazy"`.
* **Parâmetros de URL Repassados Automaticamente:**
  ```
  https://cal.com/dendrix/demonstracao-15min?name={nome}&email={email}&guests={whatsapp}&metadata[team_size]={tamanho_banca}
  ```
* **Duração da Reunião:** 15 minutos fixos no calendário.
* **Plataforma da Call:** Google Meet (link gerado e enviado para o e-mail do advogado instantaneamente).

---

## 4. O Canal Rápido Alternativo (WhatsApp Fast-Lane)

Para advogados que estão no smartphone entre audiências e não querem navegar por um calendário de reuniões:

* **Posicionamento:** Link discreto logo abaixo do botão do formulário e botão flutuante discreto no rodapé.
* **Texto de Apoio:** *“Prefere tirar dúvidas agora ou agendar direto pelo WhatsApp?”*
* **Ação:** Abre o link `https://wa.me/55[NUMERO]?text=...` com a mensagem pré-formatada:
  > *"Olá! Estava no site do Dendrix e gostaria de agendar uma demonstração prática de 15 minutos para o meu escritório."*

---

## 5. Estados de Confirmação e Sucesso

Após a confirmação da reunião pelo Cal.com:
1. **Mensagem de Sucesso na Tela:**
   - Ícone verde de confirmação (`--status-success`).
   - Título: **Demonstração agendada com sucesso!**
   - Descrição: *"Enviamos o convite com o link do Google Meet para o seu e-mail. Caso queira adiantar um processo em PDF da sua banca para a sessão, você pode nos enviar pelo WhatsApp."*
2. **Botão de Ação Imediata:** `Adicionar ao Google Calendar / Outlook` e `Falar com a equipe no WhatsApp`.
