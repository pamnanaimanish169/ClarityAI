import { Resend } from "resend";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

export async function POST(request: Request) {
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!audienceId) {
    return Response.json(
      { error: "Missing RESEND_AUDIENCE_ID configuration." },
      { status: 500 },
    );
  }

  try {
    const body = await request.json();
    const email = typeof body?.email === "string" ? body.email.trim() : "";

    if (!email) {
      return Response.json({ error: "Email is required." }, { status: 400 });
    }

    if (!EMAIL_REGEX.test(email)) {
      return Response.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    const { error } = await resend.contacts.create({
      email,
      audienceId,
      unsubscribed: false,
    });

    if (error && !isDuplicateContactError(error)) {
      return Response.json({ error: "Failed to subscribe email." }, { status: 502 });
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Invalid request payload." }, { status: 400 });
  }
}
