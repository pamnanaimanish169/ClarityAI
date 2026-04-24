export function ContributeCTA() {
  return (
    <section className="w-full border border-scholar-border bg-scholar-card mb-4 relative overflow-hidden">
      {/* Decorative corner marks */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-scholar-gold opacity-40" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-scholar-gold opacity-40" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-scholar-gold opacity-40" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-scholar-gold opacity-40" />

      <div className="flex flex-col items-center gap-5 px-10 py-12 md:py-14 text-center">
        {/* Eyebrow */}
        <p
          className="text-scholar-gold text-xs tracking-[0.25em] uppercase"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          Open Contribution
        </p>

        {/* Heading */}
        <h2
          className="text-scholar-text text-2xl md:text-3xl leading-snug max-w-md"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            fontStyle: "italic",
          }}
        >
          Got a sharper definition?
        </h2>

        {/* Body */}
        <p
          className="text-scholar-dim text-base md:text-lg leading-relaxed max-w-sm"
          style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
        >
          We&apos;re always improving the record. Help make AI more
          understandable for everyone — one clear definition at a time.
        </p>

        {/* Amber rule */}
        <div className="flex items-center gap-3 w-32">
          <div className="h-px flex-1 bg-scholar-gold opacity-40" />
          <div className="w-1.5 h-1.5 bg-scholar-gold rotate-45 flex-shrink-0 opacity-60" />
          <div className="h-px flex-1 bg-scholar-gold opacity-40" />
        </div>

        {/* CTA button */}
        <button
          className="mt-1 px-8 py-3 border border-scholar-gold text-scholar-gold hover:bg-scholar-gold hover:text-scholar-bg transition-all duration-200 text-xs tracking-[0.15em] uppercase"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          Submit a Definition
        </button>
      </div>
    </section>
  );
}
