import fs from "fs";
import path from "path";

export interface Author {
  name: string;
  role: string;
  avatar?: string;
}

export interface BlogPostMeta {
  title: string;
  slug: string;
  description: string;
  date: string;
  author: Author;
  category: string;
  categorySlug: string;
  tags: string[];
  readingTime: string;
  featured?: boolean;
  coverImage?: string;
}

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface BlogPost extends BlogPostMeta {
  contentHtml: string;
  toc: TocItem[];
  rawMarkdown: string;
}

const BLOG_CONTENT_DIR = path.join(process.cwd(), "content", "blog");

/**
 * Utilitário de parsing de Frontmatter simples e sem dependências externas.
 */
function parseFrontmatter(raw: string): { data: Record<string, any>; content: string } {
  const lines = raw.split(/\r?\n/);
  if (lines[0]?.trim() !== "---") {
    return { data: {}, content: raw };
  }

  const endIdx = lines.slice(1).findIndex((line) => line.trim() === "---");
  if (endIdx === -1) {
    return { data: {}, content: raw };
  }

  const frontmatterLines = lines.slice(1, endIdx + 1);
  const content = lines.slice(endIdx + 2).join("\n");
  const data: Record<string, any> = {};

  let currentKey = "";
  let isInsideAuthor = false;
  const authorData: Record<string, string> = {};

  for (const line of frontmatterLines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    // Subcampo de autor (ex: name: ..., role: ...)
    if (isInsideAuthor && line.startsWith("  ")) {
      const colonIdx = trimmed.indexOf(":");
      if (colonIdx !== -1) {
        const subKey = trimmed.slice(0, colonIdx).trim();
        let subVal = trimmed.slice(colonIdx + 1).trim();
        subVal = subVal.replace(/^["'](.*)["']$/, "$1");
        authorData[subKey] = subVal;
      }
      continue;
    } else {
      isInsideAuthor = false;
    }

    const colonIdx = trimmed.indexOf(":");
    if (colonIdx === -1) continue;

    const key = trimmed.slice(0, colonIdx).trim();
    let val = trimmed.slice(colonIdx + 1).trim();

    if (key === "author") {
      isInsideAuthor = true;
      continue;
    }

    // Array (ex: tags: ["a", "b"])
    if (val.startsWith("[") && val.endsWith("]")) {
      const items = val
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["'](.*)["']$/, "$1"))
        .filter(Boolean);
      data[key] = items;
      continue;
    }

    // Booleano
    if (val === "true") {
      data[key] = true;
      continue;
    }
    if (val === "false") {
      data[key] = false;
      continue;
    }

    // String
    data[key] = val.replace(/^["'](.*)["']$/, "$1");
  }

  if (Object.keys(authorData).length > 0) {
    data.author = authorData;
  }

  return { data, content };
}

/**
 * Converte títulos Markdown em Slugs limpos para o Table of Contents.
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Extrai o sumário (TOC) a partir dos H2 e H3 do Markdown.
 */
function extractToc(markdown: string): TocItem[] {
  const toc: TocItem[] = [];
  const lines = markdown.split(/\r?\n/);

  for (const line of lines) {
    const h2Match = line.match(/^##\s+(.+)$/);
    const h3Match = line.match(/^###\s+(.+)$/);

    if (h2Match) {
      const text = h2Match[1].replace(/[*_`]/g, "").trim();
      toc.push({ id: slugify(text), text, level: 2 });
    } else if (h3Match) {
      const text = h3Match[1].replace(/[*_`]/g, "").trim();
      toc.push({ id: slugify(text), text, level: 3 });
    }
  }

  return toc;
}

/**
 * Converte Markdown simples para HTML com estilização nativa Tailwind V5.2.
 */
function renderMarkdownToHtml(markdown: string): string {
  const lines = markdown.split(/\r?\n/);
  const htmlParts: string[] = [];
  let inList = false;
  let inNumberedList = false;
  let inBlockquote = false;
  let blockquoteBuffer: string[] = [];

  let inTable = false;
  let tableBuffer: string[] = [];

  const flushList = () => {
    if (inList) {
      htmlParts.push("</ul>");
      inList = false;
    }
    if (inNumberedList) {
      htmlParts.push("</ol>");
      inNumberedList = false;
    }
  };

  const flushTable = () => {
    if (inTable && tableBuffer.length >= 2) {
      const headerRow = tableBuffer[0]
        .split("|")
        .slice(1, -1)
        .map((c) => c.trim());
      // tableBuffer[1] is separator (e.g. |---|---|)
      const dataRows = tableBuffer.slice(2).map((row) =>
        row
          .split("|")
          .slice(1, -1)
          .map((c) => c.trim())
      );

      let tableHtml = '<div class="my-8 overflow-x-auto rounded-2xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#0A121A]/80 shadow-lg">';
      tableHtml += '<table class="w-full text-left text-sm border-collapse">';
      tableHtml += '<thead><tr class="border-b border-slate-200 dark:border-white/10 bg-slate-50/90 dark:bg-white/[0.04]">';
      headerRow.forEach((h) => {
        tableHtml += `<th class="py-3.5 px-4 font-semibold text-slate-900 dark:text-white font-mono text-xs uppercase tracking-wider">${formatInline(h)}</th>`;
      });
      tableHtml += '</tr></thead>';
      tableHtml += '<tbody class="divide-y divide-slate-100 dark:divide-white/[0.04] font-sans">';
      dataRows.forEach((cols) => {
        tableHtml += '<tr class="hover:bg-emerald-500/[0.03] dark:hover:bg-white/[0.02] transition-colors">';
        cols.forEach((cell, idx) => {
          const isFirstCol = idx === 0;
          tableHtml += `<td class="py-3.5 px-4 ${isFirstCol ? 'font-semibold text-slate-900 dark:text-white font-mono text-xs' : 'text-slate-700 dark:text-slate-300 text-sm'}">${formatInline(cell)}</td>`;
        });
        tableHtml += '</tr>';
      });
      tableHtml += '</tbody></table></div>';

      htmlParts.push(tableHtml);
      inTable = false;
      tableBuffer = [];
    } else if (inTable) {
      inTable = false;
      tableBuffer = [];
    }
  };

  const flushBlockquote = () => {
    if (inBlockquote) {
      const quoteText = blockquoteBuffer.join(" ");
      
      // Checagem de callout types: [!DADO], [!ALERTA], [!INSIGHT]
      if (quoteText.startsWith("[!DADO]")) {
        const cleanContent = quoteText.replace(/^\[!DADO\]\s*/, "");
        htmlParts.push(
          `<div class="my-6 p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-slate-800 dark:text-emerald-100 text-sm sm:text-base leading-relaxed shadow-sm flex items-start gap-3.5">
            <div class="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">📊</div>
            <div>
              <div class="font-mono text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">Evidência Fática & Métricas</div>
              <div class="text-slate-700 dark:text-slate-200">${cleanContent}</div>
            </div>
          </div>`
        );
      } else if (quoteText.startsWith("[!ALERTA]")) {
        const cleanContent = quoteText.replace(/^\[!ALERTA\]\s*/, "");
        htmlParts.push(
          `<div class="my-6 p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-slate-800 dark:text-amber-100 text-sm sm:text-base leading-relaxed shadow-sm flex items-start gap-3.5">
            <div class="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs">⚠️</div>
            <div>
              <div class="font-mono text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1">Atenção Jurisprudencial / Risco</div>
              <div class="text-slate-700 dark:text-slate-200">${cleanContent}</div>
            </div>
          </div>`
        );
      } else if (quoteText.startsWith("[!INSIGHT]")) {
        const cleanContent = quoteText.replace(/^\[!INSIGHT\]\s*/, "");
        htmlParts.push(
          `<div class="my-6 p-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-slate-800 dark:text-cyan-100 text-sm sm:text-base leading-relaxed shadow-sm flex items-start gap-3.5">
            <div class="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-xs">💡</div>
            <div>
              <div class="font-mono text-xs font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 mb-1">Diretriz Prática Forense</div>
              <div class="text-slate-700 dark:text-slate-200">${cleanContent}</div>
            </div>
          </div>`
        );
      } else {
        htmlParts.push(
          `<blockquote class="my-6 p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-emerald-950/20 border-l-4 border-emerald-500 text-slate-700 dark:text-slate-300 italic text-sm sm:text-base leading-relaxed shadow-xs">${quoteText}</blockquote>`
        );
      }

      inBlockquote = false;
      blockquoteBuffer = [];
    }
  };

  const formatInline = (text: string): string => {
    return text
      // Badges de folha dos autos [Fls. 89 - Laudo Pericial]
      .replace(
        /\[Fls\.\s*([^\]]+)\]/g,
        '<span class="inline-flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-semibold font-mono">Fls. $1</span>'
      )
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900 dark:text-white">$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      // Inline Code
      .replace(
        /`([^`]+)`/g,
        '<code class="font-mono text-xs px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/[0.08] text-emerald-700 dark:text-emerald-400 border border-slate-200 dark:border-white/10">$1</code>'
      )
      // Links
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" class="text-emerald-600 dark:text-emerald-400 underline underline-offset-4 decoration-emerald-500/40 hover:decoration-emerald-500 transition-colors font-medium">$1</a>'
      );
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Linha vazia
    if (!trimmed) {
      flushList();
      flushBlockquote();
      flushTable();
      continue;
    }

    // Markdown Table detection: starts and ends with |
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      flushList();
      flushBlockquote();
      inTable = true;
      tableBuffer.push(trimmed);
      continue;
    } else if (inTable) {
      flushTable();
    }

    // Markdown Image detection: ![alt](src)
    const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      flushList();
      flushBlockquote();
      flushTable();
      const altText = imgMatch[1];
      const imgSrc = imgMatch[2];
      htmlParts.push(
        `<figure class="my-8 overflow-hidden rounded-2xl border border-slate-200/90 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] shadow-xl">
          <img src="${imgSrc}" alt="${altText}" class="w-full h-auto object-cover rounded-t-2xl max-h-[500px]" loading="lazy" />
          ${
            altText
              ? `<figcaption class="px-4 py-3 text-xs text-center text-slate-500 dark:text-slate-400 border-t border-slate-200/60 dark:border-white/5 font-mono flex items-center justify-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                  ${formatInline(altText)}
                </figcaption>`
              : ""
          }
        </figure>`
      );
      continue;
    }

    // Headings H2
    if (trimmed.startsWith("## ")) {
      flushList();
      flushBlockquote();
      flushTable();
      const text = trimmed.slice(3).trim();
      const id = slugify(text);
      htmlParts.push(
        `<h2 id="${id}" class="scroll-mt-24 text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white tracking-tight mt-10 mb-4 pt-4 border-t border-slate-200/60 dark:border-white/[0.08] first:border-0 first:pt-0">${formatInline(
          text
        )}</h2>`
      );
      continue;
    }

    // Headings H3
    if (trimmed.startsWith("### ")) {
      flushList();
      flushBlockquote();
      flushTable();
      const text = trimmed.slice(4).trim();
      const id = slugify(text);
      htmlParts.push(
        `<h3 id="${id}" class="scroll-mt-24 text-lg sm:text-xl font-serif font-semibold text-slate-900 dark:text-white tracking-tight mt-8 mb-3">${formatInline(
          text
        )}</h3>`
      );
      continue;
    }

    // Blockquote
    if (trimmed.startsWith("> ")) {
      flushList();
      flushTable();
      inBlockquote = true;
      blockquoteBuffer.push(formatInline(trimmed.slice(2).trim()));
      continue;
    } else {
      flushBlockquote();
    }

    // Unordered List
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      if (!inList) {
        flushList();
        flushTable();
        htmlParts.push('<ul class="my-4 space-y-2 text-slate-700 dark:text-slate-300 text-sm sm:text-base pl-5 list-disc marker:text-emerald-500">');
        inList = true;
      }
      const itemContent = formatInline(trimmed.slice(2).trim());
      htmlParts.push(`<li class="leading-relaxed">${itemContent}</li>`);
      continue;
    }

    // Numbered List
    const numberedMatch = trimmed.match(/^(\d+)\.\s+(.+)$/);
    if (numberedMatch) {
      if (!inNumberedList) {
        flushList();
        flushTable();
        htmlParts.push('<ol class="my-4 space-y-2 text-slate-700 dark:text-slate-300 text-sm sm:text-base pl-5 list-decimal marker:text-emerald-500 font-mono text-xs sm:text-sm">');
        inNumberedList = true;
      }
      const itemContent = formatInline(numberedMatch[2].trim());
      htmlParts.push(`<li class="leading-relaxed font-sans text-sm sm:text-base">${itemContent}</li>`);
      continue;
    }

    flushList();
    flushTable();

    // Divisor Horizontal (---)
    if (trimmed === "---" || trimmed === "***") {
      htmlParts.push('<hr class="my-8 border-slate-200 dark:border-white/10" />');
      continue;
    }

    // Parágrafo Normal
    htmlParts.push(
      `<p class="text-base sm:text-[17px] text-slate-700 dark:text-slate-300 leading-relaxed sm:leading-loose mb-5">${formatInline(
        trimmed
      )}</p>`
    );
  }

  flushList();
  flushBlockquote();
  flushTable();

  return htmlParts.join("\n");
}

/**
 * Retorna todos os posts do blog ordenados por data decrescente.
 */
export async function getAllPosts(): Promise<BlogPostMeta[]> {
  if (!fs.existsSync(BLOG_CONTENT_DIR)) {
    return [];
  }

  const fileNames = fs.readdirSync(BLOG_CONTENT_DIR).filter((file) => file.endsWith(".md"));

  const posts: BlogPostMeta[] = [];

  for (const fileName of fileNames) {
    const fullPath = path.join(BLOG_CONTENT_DIR, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = parseFrontmatter(fileContents);

    if (data.title && data.slug) {
      posts.push({
        title: data.title,
        slug: data.slug,
        description: data.description || "",
        date: data.date || "2026-09-19",
        author: data.author || { name: "Lucas Iori", role: "Fundador Dendrix & Estrategista de Operações Jurídicas" },
        category: data.category || "Geral",
        categorySlug: data.categorySlug || "geral",
        tags: data.tags || [],
        readingTime: data.readingTime || "5 min",
        featured: Boolean(data.featured),
        coverImage: data.coverImage,
      });
    }
  }

  return posts.sort((a, b) => (new Date(b.date).getTime() || 0) - (new Date(a.date).getTime() || 0));
}

/**
 * Retorna um artigo específico completo pelo seu slug.
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!fs.existsSync(BLOG_CONTENT_DIR)) {
    return null;
  }

  const fileNames = fs.readdirSync(BLOG_CONTENT_DIR).filter((file) => file.endsWith(".md"));

  for (const fileName of fileNames) {
    const fullPath = path.join(BLOG_CONTENT_DIR, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = parseFrontmatter(fileContents);

    if (data.slug === slug) {
      const toc = extractToc(content);
      const contentHtml = renderMarkdownToHtml(content);

      return {
        title: data.title,
        slug: data.slug,
        description: data.description || "",
        date: data.date || "2026-09-19",
        author: data.author || { name: "Lucas Iori", role: "Fundador Dendrix & Estrategista de Operações Jurídicas" },
        category: data.category || "Geral",
        categorySlug: data.categorySlug || "geral",
        tags: data.tags || [],
        readingTime: data.readingTime || "5 min",
        featured: Boolean(data.featured),
        coverImage: data.coverImage,
        contentHtml,
        toc,
        rawMarkdown: content,
      };
    }
  }

  return null;
}

/**
 * Retorna artigos relacionados excluindo o artigo atual.
 */
export async function getRelatedPosts(currentSlug: string, categorySlug: string, limit = 2): Promise<BlogPostMeta[]> {
  const all = await getAllPosts();
  return all
    .filter((post) => post.slug !== currentSlug)
    .sort((a, b) => {
      // Prioriza mesma categoria
      if (a.categorySlug === categorySlug && b.categorySlug !== categorySlug) return -1;
      if (b.categorySlug === categorySlug && a.categorySlug !== categorySlug) return 1;
      return 0;
    })
    .slice(0, limit);
}
