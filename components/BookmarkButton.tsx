"use client";

import { useEffect, useState } from "react";
import { BookmarkIcon } from "lucide-react";
import {
  isBookmarked,
  addBookmark,
  removeBookmark,
} from "@/lib/bookmarks";

interface BookmarkButtonProps {
  slug: string;
}

export function BookmarkButton({ slug }: BookmarkButtonProps) {
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setSaved(isBookmarked(slug));
  }, [slug]);

  function toggle() {
    if (saved) {
      removeBookmark(slug);
    } else {
      addBookmark(slug);
    }
    setSaved(!saved);
  }

  if (!mounted) {
    return (
      <button
        aria-label="Save term"
        disabled
        className="flex items-center gap-1.5 px-3 py-1.5 border border-scholar-border text-scholar-muted opacity-0"
        style={{ fontFamily: "'Space Mono', monospace" }}
      >
        <BookmarkIcon className="w-3.5 h-3.5" />
        <span className="text-xs tracking-[0.12em] uppercase">Save</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label={saved ? "Remove bookmark" : "Save term"}
      className={[
        "flex items-center gap-1.5 px-3 py-1.5 border text-xs tracking-[0.12em] uppercase transition-all duration-150",
        saved
          ? "border-scholar-gold text-scholar-gold bg-scholar-gold/10"
          : "border-scholar-border text-scholar-muted hover:border-scholar-gold hover:text-scholar-gold",
      ].join(" ")}
      style={{ fontFamily: "'Space Mono', monospace" }}
    >
      <BookmarkIcon
        className="w-3.5 h-3.5"
        fill={saved ? "currentColor" : "none"}
        strokeWidth={saved ? 0 : 1.5}
      />
      <span>{saved ? "Saved" : "Save"}</span>
    </button>
  );
}
