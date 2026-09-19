import { FAQ_DATA } from "@/lib/faqData";

export function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Dendrix CRM",
    url: "https://dendrixcrm.com.br",
    logo: "https://dendrixcrm.com.br/icon.svg",
    description:
      "CRM Jurídico com Inteligência Contextual. Conecte clientes, prazos e autos em um só ambiente.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "BR",
      addressRegion: "SP",
    },
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Dendrix CRM",
    operatingSystem: "Web Browser",
    applicationCategory: "BusinessApplication",
    description:
      "Software jurídico que conecta o contexto do processo à leitura dos autos em PDF com citação de páginas e redação assistida no mesmo ambiente.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_DATA.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answerText,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
