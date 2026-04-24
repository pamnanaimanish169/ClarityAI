import { BookmarkIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";

const featuredTerms = [
  {
    slug: "prompt",
    title: "Prompt",
    pos: "noun",
    number: "01",
    description:
      "The instruction or question you give to an AI model to get a response. Your prompt is literally everything the AI has to work with.",
  },
  {
    slug: "token",
    title: "Token",
    pos: "noun",
    number: "02",
    description:
      "The small chunks of text an AI reads and processes — roughly a word or part of a word. Every model has a limit on how many tokens it can handle at once.",
  },
  {
    slug: "llm",
    title: "LLM",
    pos: "noun · abbr.",
    number: "03",
    description:
      "Large Language Model — an AI trained on massive amounts of text to understand and generate human language. The engine behind ChatGPT, Claude, and Gemini.",
  },
  {
    slug: "hallucination",
    title: "Hallucination",
    pos: "noun",
    number: "04",
    description:
      "When an AI confidently states something that is factually wrong or completely made up. A fundamental property of how language models work.",
  },
  {
    slug: "ai-agent",
    title: "AI Agent",
    pos: "noun",
    number: "05",
    description:
      "An AI that can take actions, make decisions, and complete multi-step tasks on its own — not just answer questions.",
  },
];

export function FeaturedTerms() {
  return (
    <section className="w-full relative pb-12">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px flex-1 bg-scholar-border" />
        <span
          className="text-scholar-muted text-xs tracking-[0.22em] uppercase flex-shrink-0"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          Featured Entries
        </span>
        <div className="h-px flex-1 bg-scholar-border" />
      </div>

      {/* Card grid */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-scholar-border border border-scholar-border">
        {featuredTerms.map((term, index) => (
          <Link
            key={term.slug}
            href={`/term/${term.slug}`}
            className="bg-scholar-card p-5 md:p-6 flex flex-col gap-3 group hover:bg-scholar-raised transition-colors duration-200 animate-fade-up opacity-0"
            style={
              { "--animation-delay": `${0.05 * index}s` } as React.CSSProperties
            }
          >
            {/* Entry number + bookmark */}
            <div className="flex items-start justify-between">
              <span
                className="text-scholar-muted text-xs tabular-nums"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {term.number}
              </span>
              <BookmarkIcon className="w-4 h-4 text-scholar-muted group-hover:text-scholar-gold transition-colors duration-200" />
            </div>

            {/* Term title */}
            <div>
              <h3
                className="text-scholar-text text-xl leading-snug group-hover:text-scholar-gold transition-colors duration-200"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 700,
                }}
              >
                {term.title}
              </h3>
              <p
                className="text-scholar-muted text-xs mt-0.5 tracking-wider"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {term.pos}
              </p>
            </div>

            {/* Amber rule — expands on hover */}
            <div className="w-8 h-px bg-scholar-gold opacity-40 group-hover:opacity-100 group-hover:w-full transition-all duration-300" />

            {/* Description */}
            <p
              className="text-scholar-dim text-base leading-relaxed flex-1"
              style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
            >
              {term.description}
            </p>

            {/* Read more */}
            <div className="flex items-center gap-1.5 text-scholar-muted group-hover:text-scholar-gold transition-colors duration-200 mt-1">
              <span
                className="text-xs tracking-[0.12em] uppercase"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                Read entry
              </span>
              <ArrowRightIcon className="w-3 h-3" />
            </div>
          </Link>
        ))}

        {/* "Add your own" placeholder card */}
        <div className="bg-scholar-card p-5 md:p-6 flex flex-col items-center justify-center gap-3 border-t border-scholar-border md:border-t-0 min-h-[200px] opacity-50 hover:opacity-100 transition-opacity duration-200 cursor-pointer group">
          <div className="w-8 h-8 border border-dashed border-scholar-border group-hover:border-scholar-gold flex items-center justify-center transition-colors">
            <span className="text-scholar-muted text-lg group-hover:text-scholar-gold leading-none">
              +
            </span>
          </div>
          <p
            className="text-scholar-muted text-xs tracking-[0.15em] uppercase text-center group-hover:text-scholar-dim transition-colors"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            More terms coming soon
          </p>
        </div>
      </div>
    </section>
  );
}
