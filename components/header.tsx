import Image from "next/image";
import Link from "next/link";
import { BookmarkIcon } from "lucide-react";

export function Header() {
  return (
    <header className="flex w-full items-center justify-between py-5 border-b border-scholar-border">
      <Link href="/" className="flex items-center gap-2.5">
        <Image
          src="/logo.png"
          alt="ClarityAI Logo"
          width={24}
          height={24}
          className="invert"
          style={{ opacity: 0.85 }}
        />
        <span
          className="text-scholar-text text-xl tracking-tight"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            fontStyle: "italic",
          }}
        >
          ClarityAI
        </span>
      </Link>

      <div className="flex items-center gap-4">
        <span
          className="hidden sm:block text-scholar-muted text-xs tracking-[0.15em] uppercase"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          AI Reference
        </span>

        <div className="w-px h-4 bg-scholar-border hidden sm:block" />

        <Link
          href="/saved"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs tracking-[0.12em] uppercase border border-scholar-border text-scholar-muted hover:border-scholar-gold hover:text-scholar-gold transition-all duration-150"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          <BookmarkIcon className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Saved</span>
        </Link>

        <button
          className="hidden md:block px-4 py-1.5 text-xs tracking-[0.12em] uppercase border border-scholar-gold text-scholar-gold hover:bg-scholar-gold hover:text-scholar-bg transition-all duration-200"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          Contribute
        </button>
      </div>
    </header>
  );
}
