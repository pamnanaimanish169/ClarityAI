"use client";

import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { searchTerms, type AiTerm } from "@/lib/sanity";

type SearchState = "idle" | "loading" | "done";

export function DefinitionSearch() {
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState<AiTerm[]>([]);
  const [state, setState] = useState<SearchState>("idle");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    const raw = searchValue.trim();

    if (!raw) {
      setResults([]);
      setState("idle");
      return;
    }

    setState("loading");

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        const matches = await searchTerms(raw);
        setResults(matches);
      } catch {
        setResults([]);
      } finally {
        setState("done");
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchValue]);

  return (
    <section className="flex flex-col w-full items-center py-20 md:py-28 relative">
      {/* Volume label */}
      <div
        className="flex items-center gap-3 mb-10 animate-fade-in"
        style={{ "--animation-delay": "0s" } as React.CSSProperties}
      >
        <div className="h-px w-10 bg-scholar-gold opacity-50" />
        <span
          className="text-scholar-gold text-xs tracking-[0.28em] uppercase"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          § Vol. I — Artificial Intelligence
        </span>
        <div className="h-px w-10 bg-scholar-gold opacity-50" />
      </div>

      {/* Main heading */}
      <div
        className="text-center mb-5 animate-fade-up opacity-0"
        style={{ "--animation-delay": "0.12s" } as React.CSSProperties}
      >
        <h1
          className="text-[clamp(2.8rem,8vw,5.5rem)] text-scholar-text leading-[0.95] tracking-tight"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 900,
          }}
        >
          AI Buzzwords,
        </h1>
        <h1
          className="text-[clamp(2.8rem,8vw,5.5rem)] text-scholar-gold leading-[0.95] tracking-tight"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 900,
            fontStyle: "italic",
          }}
        >
          Explained.
        </h1>
      </div>

      {/* Subtitle */}
      <p
        className="text-scholar-dim text-lg md:text-xl text-center max-w-lg mb-10 leading-relaxed animate-fade-up opacity-0"
        style={{
          fontFamily: "'Crimson Pro', Georgia, serif",
          fontStyle: "italic",
          "--animation-delay": "0.26s",
        } as React.CSSProperties}
      >
        Cutting through the noise — clear, authoritative definitions for the
        complex world of artificial intelligence.
      </p>

      {/* Decorative rule */}
      <div
        className="flex items-center gap-3 w-full max-w-2xl mb-12 animate-fade-in opacity-0"
        style={{ "--animation-delay": "0.36s" } as React.CSSProperties}
      >
        <div className="h-px flex-1 bg-scholar-border" />
        <div
          className="w-2 h-2 bg-scholar-gold rotate-45 flex-shrink-0"
          style={{ boxShadow: "0 0 8px var(--scholar-gold)" }}
        />
        <div className="h-px flex-1 bg-scholar-border" />
      </div>

      {/* Search panel */}
      <div
        className="w-full max-w-2xl animate-fade-up opacity-0"
        style={{ "--animation-delay": "0.44s" } as React.CSSProperties}
      >
        <div className="border border-scholar-border bg-scholar-card">
          {/* Panel header bar */}
          <div className="flex items-center gap-2 px-5 py-2.5 border-b border-scholar-border">
            <div className="w-2 h-2 rounded-full bg-scholar-border" />
            <div className="w-2 h-2 rounded-full bg-scholar-border" />
            <div className="w-2 h-2 rounded-full bg-scholar-gold opacity-60" />
            <span
              className="ml-2 text-scholar-muted text-xs tracking-[0.15em] uppercase"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              Term Lookup
            </span>
          </div>

          <div className="p-5 md:p-6 flex flex-col gap-4">
            {/* Search input */}
            <div className="relative w-full border border-scholar-border bg-scholar-bg flex items-center px-4 py-3 scholar-search-bar transition-all duration-200">
              <SearchIcon
                className="w-4 h-4 text-scholar-muted mr-3 flex-shrink-0"
                aria-hidden
              />
              <Input
                className="flex-1 bg-transparent border-none text-scholar-text placeholder:text-scholar-muted focus-visible:ring-0 focus-visible:ring-offset-0 h-auto p-0 text-sm"
                placeholder='Search a term — e.g. "Hallucination"'
                value={searchValue}
                onChange={handleOnChange}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "13px",
                }}
              />
              {state === "loading" && (
                <div className="w-3 h-3 border border-scholar-gold border-t-transparent rounded-full animate-spin ml-2 flex-shrink-0" />
              )}
            </div>

            {/* Results */}
            {searchValue.trim().length > 0 && state !== "loading" && (
              <div className="max-h-72 overflow-y-auto space-y-1 pr-1">
                {results.length === 0 ? (
                  <p
                    className="text-scholar-muted text-xs py-3 pl-1"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    — No matching terms found.
                  </p>
                ) : (
                  results.map((term) => (
                    <article
                      key={term._id}
                      onClick={() => router.push(`/term/${term.slug.current}`)}
                      className="border-l-2 border-scholar-border pl-4 py-2.5 pr-2 scholar-card-hover cursor-pointer transition-all duration-150 group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p
                          className="text-scholar-gold-bright text-xs font-bold uppercase tracking-wider group-hover:text-scholar-gold transition-colors"
                          style={{ fontFamily: "'Space Mono', monospace" }}
                        >
                          {term.title}
                        </p>
                        {term.category && (
                          <span
                            className="text-scholar-muted text-xs flex-shrink-0"
                            style={{ fontFamily: "'Space Mono', monospace" }}
                          >
                            {term.category.replace(/-/g, " ")}
                          </span>
                        )}
                      </div>
                      <p
                        className="text-scholar-dim text-sm mt-0.5 leading-relaxed line-clamp-2"
                        style={{
                          fontFamily: "'Crimson Pro', Georgia, serif",
                          fontStyle: "italic",
                        }}
                      >
                        {term.description}
                      </p>
                    </article>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
