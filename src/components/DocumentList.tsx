import type { MachineDocument } from "@/data/types";
import { Download } from "lucide-react";

function normalizeDocument(doc: MachineDocument): MachineDocument {
  if (doc.availability === "available" && !doc.url) {
    return { ...doc, availability: "on_request" };
  }
  return doc;
}

export function DocumentList({ documents }: { documents: MachineDocument[] }) {
  const list = documents.map(normalizeDocument);

  return (
    <ul className="divide-y divide-line-soft rounded-none border border-line">
      {list.map((doc) => (
        <li
          key={`${doc.type}-${doc.title}`}
          className="flex flex-wrap items-center justify-between gap-3 px-3 py-3.5 text-sm sm:px-4"
        >
          <span className="text-ink-soft">{doc.title}</span>
          {doc.availability === "available" && doc.url ? (
            <a
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-mark hover:underline"
            >
              <Download className="h-3.5 w-3.5" />
              Скачать PDF
            </a>
          ) : (
            <span className="shrink-0 text-[10px] uppercase tracking-[0.12em] text-ink-faint sm:text-xs">
              По запросу
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
