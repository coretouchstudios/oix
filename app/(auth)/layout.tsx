import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0c] text-white relative overflow-hidden">
      
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-blue-600/20 blur-3xl" />

      {/* CARD */}
      <div className="relative w-full max-w-md p-8 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-xl animate-fade-in">
        
        {/* LOGO / TITLE */}
        <div className="mb-6 text-center">
          <Link href="/" className="text-2xl font-semibold cursor-pointer">
            OIX
          </Link>

          <p className="text-white/40 text-sm">
            Secure access to your workspace
          </p>
        </div>

        {/* PAGE CONTENT */}
        {children}
      </div>
    </div>
  );
}