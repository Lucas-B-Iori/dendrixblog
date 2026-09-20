"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView, trackDemoPageView } from "@/lib/analytics";

export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstMount = useRef(true);

  useEffect(() => {
    // No primeiro mount, o script nativo gtag('config') já registra o page_view inicial
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    const search = searchParams?.toString();
    const url = pathname + (search ? `?${search}` : "");

    trackPageView(url);

    if (pathname === "/demonstracao" || pathname === "/demonstracao/") {
      trackDemoPageView({ source: "client_navigation" });
    }
  }, [pathname, searchParams]);

  return null;
}
