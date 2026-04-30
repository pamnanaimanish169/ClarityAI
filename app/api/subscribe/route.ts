import { Resend } from "resend";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ALLOWED_ORIGINS = [
  "https://www.theaiclarity.com",
  "https://theaiclarity.com",
];

function getCorsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get("origin") ?? "";
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
}

const resend = new Resend(
  process.env.RESEND_API_KEY ?? process.env.NEXT_PUBLIC_RESEND_API_KEY,
);

function isDuplicateContactError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;

  const values = Object.values(error).map((value) => String(value).toLowerCase());
  const combined = values.join(" ");

  return (
    combined.includes("already") &&
    (combined.includes("exists") || combined.includes("subscribed"))
  );
}

export async function OPTIONS(request: Request) {
  return new Response(null, { status: 204, headers: getCorsHeaders(request) });
}

export async function POST(request: Request) {
  const cors = getCorsHeaders(request);
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!audienceId) {
    return Response.json(
      { error: "Missing RESEND_AUDIENCE_ID configuration." },
      { status: 500, headers: cors },
    );
  }

  try {
    const body = await request.json();
    const email = typeof body?.email === "string" ? body.email.trim() : "";

    if (!email) {
      return Response.json({ error: "Email is required." }, { status: 400, headers: cors });
    }

    if (!EMAIL_REGEX.test(email)) {
      return Response.json({ error: "Please provide a valid email address." }, { status: 400, headers: cors });
    }

    const { error } = await resend.contacts.create({
      email,
      audienceId,
      unsubscribed: false,
    });

    if (error && !isDuplicateContactError(error)) {
      return Response.json({ error: "Failed to subscribe email." }, { status: 502, headers: cors });
    }

    return Response.json({ success: true }, { headers: cors });
  } catch {
    return Response.json({ error: "Invalid request payload." }, { status: 400, headers: cors });
  }
}
