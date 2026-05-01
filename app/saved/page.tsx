"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon, BookmarkIcon } from "lucide-react";
import { getBookmarks } from "@/lib/bookmarks";
import { getTermsBySlugs, type AiTerm } from "@/lib/sanity";
import { BookmarkButton } from "@/components/BookmarkButton";

export default function SavedPage() {
  const [terms, setTerms] = useState<AiTerm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const slugs = getBookmarks();
    if (!slugs.length) {
      setLoading(false);
      return;
    }
    getTermsBySlugs(slugs).then((data) => {
      setTerms(data);
      setLoading(false);
    });
  }, []);

  return (
    <div
      className="flex flex-col min-h-screen w-full bg-scholar-bg"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(232,160,48,0.055) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      {/* Header */}
      <header className="flex items-center justify-between py-5 border-b border-scholar-border w-full max-w-5xl mx-auto px-5 md:px-10">
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

        <Link
          href="/"
          className="text-scholar-muted text-xs tracking-[0.12em] uppercase hover:text-scholar-gold transition-colors duration-150"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          ← Back to glossary
        </Link>
      </header>

      {/* Main */}
      <main className="flex flex-col w-full max-w-3xl mx-auto px-5 md:px-10 py-16 md:py-24 flex-1">
        {/* Page heading */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <BookmarkIcon className="w-4 h-4 text-scholar-gold" fill="currentColor" strokeWidth={0} />
            <span
              className="text-scholar-muted text-xs tracking-[0.22em] uppercase"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              Your library
            </span>
          </div>
          <h1
            className="text-5xl md:text-6xl text-scholar-text leading-none tracking-tight"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 900,
            }}
          >
            Saved Terms
          </h1>
          <div className="flex items-center gap-3 mt-6">
            <div className="h-px w-12 bg-scholar-gold opacity-60" />
            <div
              className="w-1.5 h-1.5 bg-scholar-gold rotate-45 shrink-0"
              style={{ boxShadow: "0 0 6px var(--scholar-gold)" }}
            />
            <div className="h-px flex-1 bg-scholar-border" />
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col gap-px bg-scholar-border border border-scholar-border">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-scholar-card p-5 md:p-6 animate-pulse"
              >
                <div className="h-3 w-16 bg-scholar-border rounded-none mb-3" />
                <div className="h-6 w-48 bg-scholar-border rounded-none mb-2" />
                <div className="h-4 w-full bg-scholar-border rounded-none" />
              </div>
            ))}
          </div>
        ) : terms.length === 0 ? (
          <div className="border border-scholar-border p-10 flex flex-col items-center gap-4 text-center">
            <div className="w-10 h-10 border border-dashed border-scholar-border flex items-center justify-center">
              <BookmarkIcon className="w-5 h-5 text-scholar-muted" />
            </div>
            <p
              className="text-scholar-dim text-base leading-relaxed max-w-sm"
              style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
            >
              No saved terms yet. Browse the glossary and save terms you want to
              remember.
            </p>
            <Link
              href="/"
              className="mt-2 px-4 py-2 border border-scholar-gold text-scholar-gold text-xs tracking-[0.12em] uppercase hover:bg-scholar-gold hover:text-scholar-bg transition-all duration-150"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              Browse glossary
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-px bg-scholar-border border border-scholar-border">
            {terms.map((term) => (
              <div
                key={term._id}
                className="bg-scholar-card p-5 md:p-6 flex flex-col gap-3 hover:bg-scholar-raised transition-colors duration-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <Link href={`/term/${term.slug.current}`}>
                      <h2
                        className="text-scholar-text text-xl leading-snug hover:text-scholar-gold transition-colors duration-150"
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontWeight: 700,
                        }}
                      >
                        {term.title}
                      </h2>
                    </Link>
                    {term.category && (
                      <p
                        className="text-scholar-muted text-xs mt-0.5 tracking-wider"
                        style={{ fontFamily: "'Space Mono', monospace" }}
                      >
                        {term.category}
                      </p>
                    )}
                  </div>
                  <BookmarkButton slug={term.slug.current} />
                </div>

                <div className="w-8 h-px bg-scholar-gold opacity-40" />

                <p
                  className="text-scholar-dim text-base leading-relaxed"
                  style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                >
                  {term.description}
                </p>

                <Link
                  href={`/term/${term.slug.current}`}
                  className="flex items-center gap-1.5 text-scholar-muted hover:text-scholar-gold transition-colors duration-150 mt-1 w-fit"
                >
                  <span
                    className="text-xs tracking-[0.12em] uppercase"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    Read entry
                  </span>
                  <ArrowRightIcon className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-scholar-border py-6 px-5">
        <p
          className="text-center text-scholar-muted text-xs tracking-[0.2em] uppercase"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          © 2026 ClarityAI — All rights reserved.
        </p>
      </footer>
    </div>
  );
}
