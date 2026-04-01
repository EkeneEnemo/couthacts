"use client";

import Image from "next/image";
import { AlertTriangle, Lightbulb, Info, CheckCircle, Star } from "lucide-react";

/**
 * Rich lesson content renderer.
 *
 * Supports:
 *   ## Section Header
 *   ### Subsection Header
 *   ![Caption](url)          — full-width image with caption
 *   :::tip ... :::           — green tip callout
 *   :::warning ... :::       — amber warning callout
 *   :::important ... :::     — blue important callout
 *   :::key ... :::           — key takeaway (dark)
 *   - bullet list items
 *   1. numbered list items
 *   **bold text**
 *   ---                      — horizontal divider
 *   Regular paragraphs
 */

interface LessonContentProps {
  content: string;
}

function parseInline(text: string) {
  // Handle **bold**
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-[#1D1D1F]">{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

export function LessonContent({ content }: LessonContentProps) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Empty line — skip
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Horizontal divider
    if (line.trim() === "---") {
      elements.push(<hr key={i} className="my-8 border-[#E8E8ED]" />);
      i++;
      continue;
    }

    // Section header ##
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="mt-10 mb-4 text-xl font-display font-bold tracking-tight text-[#1D1D1F] first:mt-0">
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    // Subsection header ###
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="mt-8 mb-3 text-base font-display font-bold tracking-tight text-[#1D1D1F]">
          {line.slice(4)}
        </h3>
      );
      i++;
      continue;
    }

    // Image ![Caption](url)
    const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      const [, caption, url] = imgMatch;
      elements.push(
        <figure key={i} className="my-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-[#F5F5F7]">
            <Image src={url} alt={caption} fill className="object-cover" />
          </div>
          {caption && (
            <figcaption className="mt-2 text-center text-[11px] text-[#86868B] italic">
              {caption}
            </figcaption>
          )}
        </figure>
      );
      i++;
      continue;
    }

    // Callout blocks :::type ... :::
    const calloutMatch = line.match(/^:::(tip|warning|important|key)\s*$/);
    if (calloutMatch) {
      const type = calloutMatch[1];
      const calloutLines: string[] = [];
      i++;
      while (i < lines.length && lines[i].trim() !== ":::") {
        calloutLines.push(lines[i]);
        i++;
      }
      i++; // skip closing :::

      const configs = {
        tip: { icon: Lightbulb, bg: "bg-[#EEFBF1]", border: "border-[#34C759]/20", text: "text-[#34C759]", bodyText: "text-[#1D1D1F]", label: "Pro Tip" },
        warning: { icon: AlertTriangle, bg: "bg-[#FFF3E0]", border: "border-[#FF9500]/20", text: "text-[#FF9500]", bodyText: "text-[#1D1D1F]", label: "Warning" },
        important: { icon: Info, bg: "bg-[#007AFF]/5", border: "border-[#007AFF]/20", text: "text-[#007AFF]", bodyText: "text-[#1D1D1F]", label: "Important" },
        key: { icon: Star, bg: "bg-[#F5F5F7]", border: "border-[#E8E8ED]", text: "text-[#1D1D1F]", bodyText: "text-[#6E6E73]", label: "Key Takeaway" },
      };
      const c = configs[type as keyof typeof configs];
      const Icon = c.icon;

      elements.push(
        <div key={`callout-${i}`} className={`my-6 rounded-2xl ${c.bg} border ${c.border} p-5`}>
          <div className="flex items-center gap-2 mb-2">
            <Icon className={`h-4 w-4 ${c.text}`} />
            <span className={`text-[11px] font-bold uppercase tracking-[0.1em] ${c.text}`}>{c.label}</span>
          </div>
          <div className={`text-[14px] ${c.bodyText} leading-relaxed space-y-2`}>
            {calloutLines.filter(l => l.trim()).map((l, j) => (
              <p key={j}>{parseInline(l)}</p>
            ))}
          </div>
        </div>
      );
      continue;
    }

    // Bullet list
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="my-4 space-y-2 ml-1">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-2.5 text-[14px] text-[#6E6E73] leading-relaxed">
              <CheckCircle className="h-4 w-4 text-[#007AFF] mt-0.5 flex-shrink-0" />
              <span>{parseInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ""));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="my-4 space-y-3 ml-1">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-[14px] text-[#6E6E73] leading-relaxed">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#007AFF]/10 text-[11px] font-bold text-[#007AFF] flex-shrink-0 mt-0">
                {j + 1}
              </span>
              <span className="pt-0.5">{parseInline(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Regular paragraph — collect consecutive non-empty, non-special lines
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("## ") &&
      !lines[i].startsWith("### ") &&
      !lines[i].startsWith("![") &&
      !lines[i].startsWith(":::") &&
      !lines[i].startsWith("- ") &&
      !/^\d+\.\s/.test(lines[i]) &&
      lines[i].trim() !== "---"
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      elements.push(
        <p key={`p-${i}`} className="my-4 text-[14px] text-[#6E6E73] leading-[1.85]">
          {parseInline(paraLines.join(" "))}
        </p>
      );
    }
  }

  return <div className="lesson-content">{elements}</div>;
}
