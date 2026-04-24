"use client";

import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 text-scholar-muted hover:text-scholar-gold transition-colors text-xs tracking-[0.12em] uppercase"
      style={{ fontFamily: "'Space Mono', monospace" }}
    >
      <ArrowLeftIcon className="w-3.5 h-3.5" />
      Back
    </button>
  );
}
