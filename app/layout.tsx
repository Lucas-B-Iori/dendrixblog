import type { Metadata, Viewport } from "next";
import { Newsreader, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/seo/JsonLd";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { DemoModalProvider } from "@/components/providers/DemoModalProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ScrollProgressBar } from "@/components/layout/ScrollProgressBar";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#05080C",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Dendrix CRM | O CRM Jurídico com Inteligência Contextual",
  description: "Dos autos à minuta, com a origem das informações sempre visível. Conecte processos, prazos e clientes à melhor estratégia jurídica.",
  metadataBase: new URL("https://dendrixcrm.com.br"),
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/icon-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    title: "Dendrix CRM | O CRM Jurídico com Inteligência Contextual",
    description: "Dos autos à minuta, com a origem das informações sempre visível. Conecte processos, prazos e clientes à melhor estratégia jurídica.",
    url: "https://dendrixcrm.com.br/",
    siteName: "Dendrix CRM",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "Dendrix CRM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dendrix CRM | O CRM Jurídico com Inteligência Contextual",
    description: "Dos autos à minuta, com a origem das informações sempre visível. Conecte processos, prazos e clientes à melhor estratégia jurídica.",
    images: ["/icon-512x512.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${newsreader.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} scroll-smooth dark`}
      data-theme="dark"
    >
      <body className="antialiased min-h-screen bg-[var(--surface-canvas)] text-[var(--text-primary)] font-sans selection:bg-[#0F2B48] selection:text-white transition-colors duration-300">
        <GoogleAnalytics />
        <ThemeProvider>
          <ScrollProgressBar />
          <JsonLd />
          <DemoModalProvider>{children}</DemoModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
