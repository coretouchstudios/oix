import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";

/* ========================= META ========================= */
export const metadata: Metadata = {
  title: "OIX — AI Dev OS",
  description: "Autonomous AI Coding Workspace (Cursor x Replit Killer)",
};

/* ========================= ROOT LAYOUT ========================= */
export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-[#0b0b0f] text-white antialiased">

        {/* ========================= APP WRAPPER ========================= */}
        <div className="flex flex-col min-h-screen">

          {/* ========================= TOP BAR ========================= */}
          <header className="h-10 border-b border-white/10 flex items-center justify-between px-4 text-xs bg-black/40 backdrop-blur">

            {/* LEFT */}
            <div className="flex items-center gap-3">
              <span className="text-purple-400 font-semibold">
                ⚡ OIX DEV OS
              </span>
              <span className="text-gray-500">AI Workspace</span>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4 text-gray-400">
              <span>Multi-Agent</span>
              <span>Auto-Fix</span>
              <span>Docker</span>
            </div>
          </header>

          {/* ========================= MAIN ========================= */}
          <main className="flex-1 flex overflow-hidden">
            {children}
          </main>

          {/* ========================= STATUS BAR ========================= */}
          <footer className="h-8 border-t border-white/10 flex items-center justify-between px-4 text-xs text-gray-400 bg-black/40 backdrop-blur">

            <div className="flex items-center gap-4">
              <span>🟢 System Ready</span>
              <span>AI: Online</span>
              <span>Memory: Active</span>
            </div>

            <div className="flex items-center gap-4">
              <span>v1.0 GOD MODE</span>
            </div>
          </footer>

        </div>

        {/* ========================= PORTALS ========================= */}

        {/* Toasts */}
        <div id="toast-root" />

        {/* Modals */}
        <div id="modal-root" />

        {/* Realtime overlay */}
        <div id="realtime-root" />

      </body>
    </html>
  );
}