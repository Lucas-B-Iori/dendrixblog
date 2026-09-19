import type { Metadata, Viewport } from "next";
import { Newsreader, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/seo/JsonLd";

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
  themeColor: "#FBFBFA",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Dendrix CRM | O CRM Jurídico com Inteligência Contextual",
  description: "Dos autos à minuta, com a origem das informações sempre visível. Conecte processos, prazos e clientes ao mesmo raciocínio forense.",
  metadataBase: new URL("https://dendrixcrm.com.br"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Dendrix CRM | O CRM Jurídico com Inteligência Contextual",
    description: "Dos autos à minuta, com a origem das informações sempre visível. Conecte processos, prazos e clientes ao mesmo raciocínio forense.",
    url: "https://dendrixcrm.com.br",
    siteName: "Dendrix CRM",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dendrix CRM | O CRM Jurídico com Inteligência Contextual",
    description: "Dos autos à minuta, com a origem das informações sempre visível. Conecte processos, prazos e clientes ao mesmo raciocínio forense.",
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
      className={`${newsreader.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="antialiased min-h-screen bg-[#FBFBFA] text-[#0F172A] font-sans selection:bg-[#0F2B48] selection:text-white">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
