import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dendrix CRM | Gestão Inteligente",
  description: "Plataforma de gestão e CRM para impulsionar suas vendas e relacionamentos.",
  metadataBase: new URL("https://dendrixcrm.com.br"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
