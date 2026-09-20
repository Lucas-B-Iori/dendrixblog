/**
 * Helper Centralizado para Google Analytics 4 (GA4)
 * Measurement ID: G-CRTQ6G6YTX
 */

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

export const GA_MEASUREMENT_ID = "G-CRTQ6G6YTX";

const isBrowser = typeof window !== "undefined";

/**
 * Evita poluição de dados de produção:
 * Em ambiente de desenvolvimento local (NODE_ENV !== "production"),
 * registra os eventos no console para depuração em vez de transmiti-los ao GA4.
 */
const isProduction = process.env.NODE_ENV === "production";

export interface BaseEventParams {
  page_location?: string;
  page_path?: string;
  [key: string]: any;
}

/**
 * Função base segura para envio de eventos GA4
 */
export function trackEvent(eventName: string, params: BaseEventParams = {}) {
  if (!isBrowser) return;

  const enrichedParams: BaseEventParams = {
    page_location: window.location.href,
    page_path: window.location.pathname,
    ...params,
  };

  if (isProduction && typeof window.gtag === "function") {
    window.gtag("event", eventName, enrichedParams);
  } else {
    console.debug(`[GA4 Dev Event] ${eventName}:`, enrichedParams);
  }
}

/**
 * 0. page_view em navegações SPA
 */
export function trackPageView(url: string) {
  if (!isBrowser) return;

  const params = {
    page_path: url,
    page_location: window.location.href,
  };

  if (isProduction && typeof window.gtag === "function") {
    window.gtag("event", "page_view", params);
  } else {
    console.debug(`[GA4 Dev Event] page_view:`, params);
  }
}

/**
 * 1. click_demo_cta
 * Disparado em qualquer clique principal em "Agendar demonstração" ou CTA equivalente
 */
export function trackDemoCtaClick(params: {
  cta_location: string;
  cta_text: string;
  source?: string;
  [key: string]: any;
}) {
  trackEvent("click_demo_cta", params);
}

/**
 * 2. view_demo_page
 * Disparado quando o usuário chega na página /demonstracao/
 */
export function trackDemoPageView(params: {
  source?: string;
  [key: string]: any;
} = {}) {
  trackEvent("view_demo_page", params);
}

/**
 * 3. click_whatsapp
 * Disparado em qualquer clique que abra o WhatsApp a partir do site
 */
export function trackWhatsAppClick(params: {
  cta_location: string;
  cta_text?: string;
  context?: string;
  [key: string]: any;
}) {
  trackEvent("click_whatsapp", params);
}

/**
 * 4. open_cal
 * Disparado quando há interação que abre ou acessa o agendamento Cal.com
 */
export function trackOpenCal(params: {
  interaction_type: "modal" | "page_embed" | "full_screen_external";
  source?: string;
  [key: string]: any;
}) {
  trackEvent("open_cal", params);
}

/**
 * 5. generate_lead
 * Disparado SOMENTE mediante confirmação real de agendamento/lead detectada
 */
export function trackGenerateLead(params: {
  source: string;
  context: string;
  booking_id?: string;
  [key: string]: any;
}) {
  trackEvent("generate_lead", params);
}

/**
 * 6. click_login
 * Disparado quando o usuário clica para acessar a plataforma / login
 */
export function trackLoginClick(params: {
  cta_location: string;
  [key: string]: any;
} = { cta_location: "navbar" }) {
  trackEvent("click_login", params);
}
