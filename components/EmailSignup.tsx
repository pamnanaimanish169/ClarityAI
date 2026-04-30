"use client";

import { FormEvent, useState } from "react";

type SubmitState = "default" | "loading" | "success" | "error";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EmailSignup() {
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
      const response = await fetch(`${base}/api/subscribe/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        setState("error");
        setErrorMessage(
          typeof data?.error === "string" ? data.error : "Something went wrong. Please try again.",
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
    <section className="mx-auto mt-10 mb-14 w-full max-w-2xl border border-[#F59E0B] bg-[#0F172A] px-5 py-5 sm:px-6">
      <p
        className="mb-2 text-xs uppercase tracking-[0.18em] text-[#F59E0B]"
        style={{ fontFamily: "'Space Mono', monospace" }}
      >
        Weekly AI term drop
      </p>
      <p className="mb-4 text-sm text-[#F8F5EE]" style={{ fontFamily: "'Space Mono', monospace" }}>
        Get one clear AI term explanation in your inbox every week.
      </p>

      {state === "success" ? (
        <p
          className="border border-[#F59E0B] bg-[#0F172A] px-4 py-3 text-sm text-[#F8F5EE]"
          style={{ fontFamily: "'Space Mono', monospace", borderRadius: 0 }}
        >
          You&apos;re in. First term drops next week.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (state === "error") {
                setState("default");
                setErrorMessage("");
              }
            }}
            placeholder="your@email.com"
            className="h-11 flex-1 border border-[#F59E0B] bg-[#0F172A] px-4 text-sm text-[#F8F5EE] placeholder:text-[#F8F5EE]/60 focus:outline-none"
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
            {state === "loading" ? "SUBSCRIBING..." : "SUBSCRIBE"}
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
  );
}
