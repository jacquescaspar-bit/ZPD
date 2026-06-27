import { type NextRequest, NextResponse } from "next/server";
import { SUPPORT_EMAIL } from "@/lib/constants";
import { EmailService } from "@/lib/email";
import { checkRateLimit } from "@/lib/webhookSecurity";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactPayload {
  name?: string;
  email?: string;
  message?: string;
  company?: string;
  role?: string;
}

const getClientIp = (request: NextRequest): string =>
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
  request.headers.get("x-real-ip") ??
  "unknown";

export async function POST(request: NextRequest) {
  const clientIp = getClientIp(request);

  if (!checkRateLimit(`contact:${clientIp}`)) {
    return NextResponse.json(
      { error: "Too many messages. Please try again in a minute." },
      { status: 429 },
    );
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (body.company?.trim()) {
    return NextResponse.json({ success: true });
  }

  if (!name || name.length > 100) {
    return NextResponse.json(
      { error: "Please enter your name (max 100 characters)." },
      { status: 400 },
    );
  }

  if (!email || !EMAIL_PATTERN.test(email) || email.length > 254) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (!message || message.length < 10 || message.length > 5000) {
    return NextResponse.json(
      { error: "Please enter a message between 10 and 5000 characters." },
      { status: 400 },
    );
  }

  const sendgridKey = process.env.SENDGRID_API_KEY;
  if (
    !sendgridKey ||
    sendgridKey.includes("your_sendgrid_api_key") ||
    !sendgridKey.startsWith("SG.")
  ) {
    console.error(
      "Contact form submitted but SENDGRID_API_KEY is not configured.",
    );
    return NextResponse.json(
      {
        error:
          "Email is not configured yet. Please use grow@zpdlearning.com directly.",
      },
      { status: 503 },
    );
  }

  const recipient = process.env.ADMIN_EMAIL ?? SUPPORT_EMAIL;
  const escapedName = name.replace(
    /[<>&]/g,
    (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[char] ?? char,
  );
  const escapedEmail = email.replace(
    /[<>&]/g,
    (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[char] ?? char,
  );
  const escapedMessage = message
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>");

  const isTutorInterest = body.role?.trim() === "tutor";
  const subjectPrefix = isTutorInterest ? "Tutor interest" : "Contact form";

  const sent = await EmailService.sendEmail({
    to: recipient,
    replyTo: email,
    subject: `${subjectPrefix}: ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #4F46E5;">New contact form message</h1>
        <p><strong>Name:</strong> ${escapedName}</p>
        <p><strong>Email:</strong> ${escapedEmail}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f8fafc; padding: 16px; border-radius: 8px; line-height: 1.6;">
          ${escapedMessage}
        </div>
        ${isTutorInterest ? "<p><strong>Type:</strong> Tutor interest</p>" : ""}
        <p style="color: #64748b; font-size: 12px; margin-top: 24px;">
          Sent from zpdlearning.com/contact${isTutorInterest ? "?role=tutor" : ""}
        </p>
      </div>
    `,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });

  if (!sent) {
    return NextResponse.json(
      {
        error:
          "We could not send your message. Please try again or email grow@zpdlearning.com.",
      },
      { status: 500 },
    );
  }

  await EmailService.sendEmail({
    to: email,
    subject: "We received your message - ZPD Learning",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #4F46E5;">Thanks for contacting ZPD Learning</h1>
        <p>Hi ${escapedName},</p>
        <p>We've received your message and will get back to you within 2–3 business days.</p>
        <p>If your enquiry is urgent, reply to this email or contact us at grow@zpdlearning.com.</p>
        <p>The ZPD Learning Team</p>
      </div>
    `,
  });

  return NextResponse.json({ success: true });
}
