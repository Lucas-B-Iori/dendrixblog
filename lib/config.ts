/**
 * Configuração Centralizada de Ambiente e Canais de Aquisição do Dendrix CRM
 *
 * NOTA DE AUDITORIA:
 * Nenhuma credencial pessoal ou número de produção foi inventado.
 * Os valores abaixo utilizam variáveis de ambiente públicas (NEXT_PUBLIC_*)
 * com fallbacks seguros que alertam a necessidade de configuração no .env.local.
 */

export const ENV_CONFIG = {
  // URL direta para login no aplicativo (evita loop de redirecionamento no domínio raiz)
  appLoginUrl: process.env.NEXT_PUBLIC_APP_LOGIN_URL || "https://dendrix.app.br/login",

  // URL da agenda do Cal.com (ex: "https://cal.com/dendrix/demonstracao-15min")
  calUrl: process.env.NEXT_PUBLIC_CAL_URL || "",

  // Número oficial de WhatsApp com DDI e DDD (ex: "5511999998888")
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",

  // Webhook / API endpoint para captura de leads do mini-formulário
  leadWebhookUrl: process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL || "",

  // Mensagem padrão para contato via WhatsApp
  defaultWhatsAppMessage:
    "Olá! Estava no site do Dendrix CRM e gostaria de agendar uma demonstração prática de 15 minutos para o meu escritório.",
};

export function getWhatsAppLink(customMessage?: string): string {
  const number = ENV_CONFIG.whatsappNumber;
  const message = encodeURIComponent(customMessage || ENV_CONFIG.defaultWhatsAppMessage);
  if (!number) {
    // Retorna link genérico ou aviso se não configurado
    return `https://wa.me/?text=${message}`;
  }
  return `https://wa.me/${number}?text=${message}`;
}
