import Script from "next/script";
import { Suspense } from "react";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";
import { AnalyticsTracker } from "./AnalyticsTracker";

export function GoogleAnalytics() {
  return (
    <>
      {/* Script principal da biblioteca gtag.js */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />

      {/* Script de inicialização do Google Analytics 4 */}
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
            send_page_view: true
          });
        `}
      </Script>

      {/* Observador de navegação SPA para mensuração contínua de rotas */}
      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>
    </>
  );
}
