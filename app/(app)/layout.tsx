"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const router = useRouter();

  const nav = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Projects", href: "/projects" },
    { name: "Security", href: "/security" },
  ];

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <div className="flex h-screen bg-[#0a0a0c] text-white">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-white/10 p-4 space-y-6">
        <Link href="/" className="text-xl font-semibold cursor-pointer">
          OIX
        </Link>

        <nav className="space-y-2">
          {nav.map((item) => {
            const active = path === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-lg transition ${
                  active
                    ? "bg-white/10"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        {/* TOP BAR */}
        <header className="h-14 border-b border-white/10 flex items-center justify-between px-6">
          <div className="text-sm text-white/60">{path}</div>

          <button
            onClick={handleLogout}
            className="text-sm text-red-400 hover:text-red-300"
          >
            Logout
          </button>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}