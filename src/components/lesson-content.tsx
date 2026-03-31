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
      return <strong key={i} className="font-semibold text-ocean-900">{part.slice(2, -2)}</strong>;
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
      elements.push(<hr key={i} className="my-8 border-gray-200" />);
      i++;
      continue;
    }

    // Section header ##
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="mt-10 mb-4 text-xl font-display font-bold text-ocean-900 first:mt-0">
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    // Subsection header ###
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="mt-8 mb-3 text-base font-display font-bold text-ocean-800">
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
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-gray-100">
            <Image src={url} alt={caption} fill className="object-cover" />
          </div>
          {caption && (
            <figcaption className="mt-2 text-center text-xs text-gray-400 italic">
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
        tip: { icon: Lightbulb, bg: "bg-green-50", border: "border-green-200", text: "text-green-800", label: "Pro Tip" },
        warning: { icon: AlertTriangle, bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-800", label: "Warning" },
        important: { icon: Info, bg: "bg-sky-50", border: "border-sky-200", text: "text-sky-800", label: "Important" },
        key: { icon: Star, bg: "bg-ocean-50", border: "border-ocean-200", text: "text-ocean-800", label: "Key Takeaway" },
      };
      const c = configs[type as keyof typeof configs];
      const Icon = c.icon;

      elements.push(
        <div key={`callout-${i}`} className={`my-6 rounded-xl ${c.bg} border ${c.border} p-5`}>
          <div className="flex items-center gap-2 mb-2">
            <Icon className={`h-4 w-4 ${c.text}`} />
            <span className={`text-xs font-bold uppercase tracking-wider ${c.text}`}>{c.label}</span>
          </div>
          <div className={`text-sm ${c.text} leading-relaxed space-y-2`}>
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
            <li key={j} className="flex items-start gap-2.5 text-sm text-gray-700 leading-relaxed">
              <CheckCircle className="h-4 w-4 text-ocean-500 mt-0.5 flex-shrink-0" />
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
            <li key={j} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ocean-100 text-xs font-bold text-ocean-700 flex-shrink-0 mt-0">
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
        <p key={`p-${i}`} className="my-4 text-sm text-gray-700 leading-[1.85]">
          {parseInline(paraLines.join(" "))}
        </p>
      );
    }
  }

  return <div className="lesson-content">{elements}</div>;
}
