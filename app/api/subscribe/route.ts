import { Resend } from "resend";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "https://www.theaiclarity.com",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

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

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(request: Request) {
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!audienceId) {
    return Response.json(
      { error: "Missing RESEND_AUDIENCE_ID configuration." },
      { status: 500, headers: CORS_HEADERS },
    );
  }

  try {
    const body = await request.json();
    const email = typeof body?.email === "string" ? body.email.trim() : "";

    if (!email) {
      return Response.json({ error: "Email is required." }, { status: 400, headers: CORS_HEADERS });
    }

    if (!EMAIL_REGEX.test(email)) {
      return Response.json({ error: "Please provide a valid email address." }, { status: 400, headers: CORS_HEADERS });
    }
    const { error } = await resend.contacts.create({
      email,
      audienceId,
      unsubscribed: false,
    });

    if (error && !isDuplicateContactError(error)) {
      return Response.json({ error: "Failed to subscribe email." }, { status: 502, headers: CORS_HEADERS });
    }

    return Response.json({ success: true }, { headers: CORS_HEADERS });
  } catch {
    return Response.json({ error: "Invalid request payload." }, { status: 400, headers: CORS_HEADERS });
  }
}
