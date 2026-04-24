import Link from "next/link";

export default function TermNotFound() {
  return (
    <div
      className="flex flex-col min-h-screen w-full bg-scholar-bg items-center justify-center gap-6 text-center px-5"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(232,160,48,0.055) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <p
        className="text-scholar-muted text-xs tracking-[0.2em] uppercase"
        style={{ fontFamily: "'Space Mono', monospace" }}
      >
        — Term not found —
      </p>
      <Link
        href="/"
        className="text-scholar-gold text-xs border border-scholar-gold px-5 py-2 hover:bg-scholar-gold hover:text-scholar-bg transition-all"
        style={{ fontFamily: "'Space Mono', monospace", letterSpacing: "0.1em" }}
      >
        Back to dictionary
      </Link>
    </div>
  );
}
