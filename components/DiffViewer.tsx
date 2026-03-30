"use client";

import { diffLines } from "diff";

type Props = {
  oldCode: string;
  newCode: string;
};

export default function DiffViewer({ oldCode, newCode }: Props) {
  const diff = diffLines(oldCode || "", newCode || "");

  return (
    <div className="font-mono text-sm border border-white/10 rounded overflow-hidden">
      {diff.map((part, i) => {
        const bg = part.added
          ? "bg-green-500/10"
          : part.removed
          ? "bg-red-500/10"
          : "bg-transparent";

        const prefix = part.added
          ? "+"
          : part.removed
          ? "-"
          : " ";

        return (
          <div
            key={i}
            className={`whitespace-pre-wrap px-3 py-1 ${bg}`}
          >
            <span className="opacity-50 mr-2">{prefix}</span>
            {part.value}
          </div>
        );
      })}
    </div>
  );
}