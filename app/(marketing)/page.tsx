import Link from "next/link";

export default function Landing() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">

      <h1 className="text-5xl font-bold">OIX</h1>

      <p className="text-gray-400 mt-3">
        Autonomous Intelligence that executes your ideas.
      </p>

      <div className="flex gap-4 mt-6">
        <Link
          href="/login"
          className="px-6 py-3 bg-white text-black rounded-xl"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="px-6 py-3 bg-purple-500 rounded-xl"
        >
          Get Started
        </Link>
      </div>

    </div>
  );
}