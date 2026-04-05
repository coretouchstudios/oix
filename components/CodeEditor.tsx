"use client";

import Editor from "@monaco-editor/react";

type Props = {
  code: string;
  language: string;
  onChange: (value: string) => void;
};

export default function CodeEditor({ code, language, onChange }: Props) {
  return (
    <Editor
      height="100%"
      theme="vs-dark"
      language={language}
      value={code}
      onChange={(v) => onChange(v || "")}
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        automaticLayout: true,
        scrollBeyondLastLine: false,
      }}
    />
  );
}