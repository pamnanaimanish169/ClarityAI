import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeftIcon,
  BookOpenIcon,
  LightbulbIcon,
  AlertTriangleIcon,
  TagsIcon,
} from "lucide-react";
import { getTermBySlug, getAllTerms, type AiTerm } from "@/lib/sanity";
import { BackButton } from "./back-button";
import { BookmarkButton } from "@/components/BookmarkButton";

// ---------------------------------------------------------------------------
// SEO — per-term metadata generated server-side
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const term = await getTermBySlug(slug);
  if (!term) return { title: "Term not found — ClarityAI" };

  const title = term.seoTitle ?? `${term.title} — ClarityAI`;
  const description = term.seoDescription ?? term.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.theaiclarity.com/term/${term.slug.current}`,
      siteName: "ClarityAI",
      type: "article",
    },
    twitter: {
      card: "summary",
    },
  };
}

// ---------------------------------------------------------------------------
// Static params — pre-render all known terms at build time
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  const terms = await getAllTerms();
  return terms.map((t) => ({ slug: t.slug.current }));
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const CATEGORY_LABELS: Record<string, string> = {
  "core-concepts": "Core Concepts",
  "machine-learning": "Machine Learning",
  nlp: "Natural Language Processing",
  "computer-vision": "Computer Vision",
  "model-architectures": "Model Architectures",
  training: "Training & Optimization",
  ethics: "Ethics & Safety",
  other: "Other",
};

type Section = {
  icon: React.ReactNode;
  label: string;
  content: string | undefined;
};

function buildSections(term: AiTerm): Section[] {
  return [
    {
      icon: <BookOpenIcon className="w-4 h-4" />,
      label: "What it actually means",
      content: term.whatItMeans,
    },
    {
      icon: <LightbulbIcon className="w-4 h-4" />,
      label: "Real-world analogy",
      content: term.realWorldAnalogy,
    },
    {
      icon: <AlertTriangleIcon className="w-4 h-4" />,
      label: "Common misconception",
      content: term.commonMisconception,
    },
  ];
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function TermPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const term = await getTermBySlug(slug);

  if (!term) notFound();

  const sections = buildSections(term);

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

        <BackButton />
      </header>

      {/* Main content */}
      <main className="flex flex-col w-full max-w-3xl mx-auto px-5 md:px-10 py-16 md:py-24 flex-1">
        <article
          className="animate-fade-up opacity-0"
          style={{ "--animation-delay": "0s" } as React.CSSProperties}
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-10">
            <span
              className="text-scholar-muted text-xs tracking-[0.15em] uppercase"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              {term.category
                ? (CATEGORY_LABELS[term.category] ?? term.category)
                : "AI Terms"}
            </span>
            <span className="text-scholar-border text-xs">/</span>
            <span
              className="text-scholar-gold text-xs tracking-[0.15em] uppercase"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              {term.slug.current}
            </span>
          </div>

          {/* Term title + bookmark */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <h1
              className="text-[clamp(3rem,9vw,6rem)] text-scholar-text leading-none tracking-tight"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 900,
              }}
            >
              {term.title}
            </h1>
            <div className="pt-3 shrink-0">
              <BookmarkButton slug={term.slug.current} />
            </div>
          </div>

          {/* One-liner */}
          <p
            className="text-scholar-gold text-lg md:text-xl leading-snug mb-8 max-w-2xl"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            {term.description}
          </p>

          {/* Amber rule */}
          <div className="flex items-center gap-3 mb-12">
            <div className="h-px w-12 bg-scholar-gold opacity-60" />
            <div
              className="w-1.5 h-1.5 bg-scholar-gold rotate-45 shrink-0"
              style={{ boxShadow: "0 0 6px var(--scholar-gold)" }}
            />
            <div className="h-px flex-1 bg-scholar-border" />
          </div>

          {/* Content sections */}
          <div className="flex flex-col gap-8">
            {sections.map((section, i) =>
              section.content ? (
                <div
                  key={i}
                  className="border-l-2 border-scholar-border pl-6 animate-fade-up opacity-0"
                  style={
                    {
                      "--animation-delay": `${0.1 + i * 0.12}s`,
                    } as React.CSSProperties
                  }
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-scholar-gold">{section.icon}</span>
                    <span
                      className="text-scholar-muted text-xs tracking-[0.2em] uppercase"
                      style={{ fontFamily: "'Space Mono', monospace" }}
                    >
                      {section.label}
                    </span>
                  </div>
                  <p
                    className="text-scholar-text text-base md:text-lg leading-relaxed"
                    style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                  >
                    {section.content}
                  </p>
                </div>
              ) : null,
            )}
          </div>

          {/* Related terms */}
          {term.relatedTermsTags && term.relatedTermsTags.length > 0 && (
            <div
              className="mt-12 pt-8 border-t border-scholar-border animate-fade-up opacity-0"
              style={
                { "--animation-delay": "0.46s" } as React.CSSProperties
              }
            >
              <div className="flex items-center gap-2 mb-4">
                <TagsIcon className="w-4 h-4 text-scholar-gold" />
                <span
                  className="text-scholar-muted text-xs tracking-[0.2em] uppercase"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  Related terms
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {term.relatedTermsTags.map((tag) => {
                  const tagSlug = tag.toLowerCase().replace(/\s+/g, "-");
                  return (
                    <Link
                      key={tag}
                      href={`/term/${tagSlug}`}
                      className="px-3 py-1 border border-scholar-border text-scholar-dim text-xs hover:border-scholar-gold hover:text-scholar-gold transition-all duration-150"
                      style={{ fontFamily: "'Space Mono', monospace" }}
                    >
                      {tag}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </article>
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
