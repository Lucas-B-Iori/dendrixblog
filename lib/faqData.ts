export interface FaqItemData {
  question: string;
  answerText: string;
}

export const FAQ_DATA: FaqItemData[] = [
  {
    question: "O Dendrix substitui o advogado ou redige peças sem intervenção humana?",
    answerText:
      "Não. O Dendrix é uma ferramenta de suporte. Ele localiza informações nos autos, indica as páginas pertinentes e fornece uma base textual estruturada para a peça. O raciocínio jurídico, a estratégia processual e a revisão final são indelegáveis e pertencem ao advogado.",
  },
  {
    question: "Como o sistema lida com autos digitalizados antigos ou escaneados?",
    answerText:
      "O sistema conta com pipeline de OCR (Reconhecimento Óptico de Caracteres). Documentos em PDF que não possuem texto nativo selecionável são processados para identificação de caracteres, permitindo a leitura e a referência de páginas mesmo em peças digitalizadas legadas.",
  },
  {
    question: "Quais medidas são adotadas para a segurança e privacidade dos dados dos processos?",
    answerText:
      "A segurança é tratada por meio de camadas técnicas e contratuais: Armazenamento em nuvem em São Paulo com criptografia em trânsito (TLS 1.3) e repouso (AES-256); Processamento de IA exclusivo via APIs corporativas com vedação de retreinamento de modelos; e Governança com controles de acesso alinhados à LGPD e ao sigilo profissional.",
  },
  {
    question: "É necessário instalar algum software localmente?",
    answerText:
      "Não. O Dendrix é uma aplicação web que opera em nuvem. O acesso é feito diretamente pelo navegador em computadores conectados à internet, sem necessidade de servidores locais ou manutenção de infraestrutura de TI no escritório.",
  },
  {
    question: "O que acontece durante a demonstração de 15 minutos?",
    answerText:
      "É uma sessão prática individual via Google Meet conduzida por um especialista. Você pode acompanhar a leitura de um processo da sua própria banca (ou de um caso modelo de exemplo), observando o mapeamento dos autos e a geração assistida da minuta em tempo real.",
  },
  {
    question: "Qual é a cobertura do monitoramento de publicações?",
    answerText:
      "O monitoramento é integrado aos Diários de Justiça Eletrônicos (incluindo o DJEN e os principais diários oficiais dos tribunais estaduais e federais), cobrindo o território nacional a partir do cadastro do nome do profissional e número de inscrição na OAB.",
  },
];
