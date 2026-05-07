"use client";

import { FormEvent, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

type SubmitState = "default" | "loading" | "success" | "error";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FEATURES = [
  {
    title: "Sync Bookmarks",
    description: "Save terms across every device. Never lose your reading list.",
  },
  {
    title: "Weekly Digest",
    description: "One AI term explained every week, straight to your inbox.",
  },
  {
    title: "Full Term Archive PDF",
    description:
      "Download the entire ClarityAI glossary as a beautifully formatted PDF.",
  },
];

export default function ProPage() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SubmitState>("default");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !EMAIL_REGEX.test(trimmedEmail)) {
      setState("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setState("loading");
    setErrorMessage("");

    try {
      const base = process.env.NEXT_PUBLIC_API_URL ?? "";
      const response = await fetch(`${base}/api/pro-waitlist/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        setState("error");
        setErrorMessage(
          typeof data?.error === "string"
            ? data.error
            : "Something went wrong. Please try again.",
        );
        return;
      }

      setState("success");
      setEmail("");
    } catch {
      setState("error");
      setErrorMessage("Network error. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#0F172A]">
      <div className="flex flex-col w-full max-w-5xl mx-auto px-5 md:px-10">
        <Header />

        {/* HERO */}
        <section className="mt-16 mb-14 max-w-2xl">
          <p
            className="mb-3 text-xs uppercase tracking-[0.22em] text-[#F59E0B]"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            Coming Soon
          </p>
          <h1
            className="mb-4 text-5xl sm:text-6xl text-[#F8F5EE] leading-[1.05]"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 900,
            }}
          >
            ClarityAI Pro
          </h1>
          <p
            className="text-xl text-[#F8F5EE]/80 leading-relaxed"
            style={{
              fontFamily: "'Crimson Pro', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            Everything you need to actually understand AI — not just use it.
          </p>
        </section>

        {/* FEATURES */}
        <section className="mb-14 max-w-2xl">
          <div className="flex flex-col gap-0 border border-[#F59E0B]">
            {FEATURES.map((feature, index) => (
              <div
                key={feature.title}
                className={`px-6 py-5 ${index < FEATURES.length - 1 ? "border-b border-[#F59E0B]" : ""}`}
              >
                <p
                  className="mb-1 text-sm uppercase tracking-[0.14em] text-[#F59E0B]"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  {feature.title}
                </p>
                <p
                  className="text-base text-[#F8F5EE]/75"
                  style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.8rem" }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* PRICING */}
        <section className="mb-14 max-w-2xl">
          <p
            className="text-2xl text-[#F8F5EE] mb-2"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 900,
            }}
          >
            Founding member price:{" "}
            <span className="text-[#F59E0B]">₹99/month</span>
          </p>
          <p
            className="text-xs text-[#F8F5EE]/55 tracking-[0.1em]"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            First 50 members lock this price forever. Regular price will be
            ₹199/month.
          </p>
        </section>

        {/* WAITLIST FORM */}
        <section className="mb-14 max-w-2xl border border-[#F59E0B] bg-[#0F172A] px-5 py-6 sm:px-6">
          <p
            className="mb-2 text-xs uppercase tracking-[0.18em] text-[#F59E0B]"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            Join the waitlist
          </p>
          <p
            className="mb-5 text-sm text-[#F8F5EE]/70"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            Be first to know when Pro launches.
          </p>

          {state === "success" ? (
            <p
              className="text-base text-[#F8F5EE] leading-relaxed"
              style={{
                fontFamily: "'Crimson Pro', Georgia, serif",
                fontStyle: "italic",
              }}
            >
              You&apos;re on the list. We&apos;ll email you the moment Pro
              launches.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (state === "error") {
                    setState("default");
                    setErrorMessage("");
                  }
                }}
                placeholder="your@email.com"
                className="h-11 flex-1 border border-[#F59E0B] bg-[#0F172A] px-4 text-sm text-[#F8F5EE] placeholder:text-[#F8F5EE]/50 focus:outline-none disabled:opacity-60"
                style={{ fontFamily: "'Space Mono', monospace", borderRadius: 0 }}
                disabled={state === "loading"}
                aria-label="Email address"
              />
              <button
                type="submit"
                className="h-11 cursor-pointer border border-[#F59E0B] bg-[#F59E0B] px-6 text-xs uppercase tracking-[0.14em] text-[#0F172A] focus:outline-none disabled:cursor-not-allowed disabled:opacity-75"
                style={{ fontFamily: "'Space Mono', monospace", borderRadius: 0 }}
                disabled={state === "loading"}
              >
                {state === "loading" ? "JOINING..." : "JOIN WAITLIST"}
              </button>
            </form>
          )}

          {state === "error" && errorMessage && (
            <p
              className="mt-2 text-xs text-[#F59E0B]"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              {errorMessage}
            </p>
          )}
        </section>

        {/* FOOTER NOTE */}
        <p
          className="mb-16 max-w-2xl text-xs text-[#F8F5EE]/40 tracking-[0.1em]"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          No payment required to join the waitlist. We&apos;ll email you when
          Pro is ready.
        </p>
      </div>

      <Footer />
    </div>
  );
}
