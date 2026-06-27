// Email service using SendGrid
import {
  PRICING,
  SITE_URL,
  SUPPORT_EMAIL,
  type PlanType,
} from "@/lib/constants";

const emailWrapper = (body: string) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6;">
    ${body}
    <p style="color: #64748b; font-size: 12px; margin-top: 32px;">ZPD Learning · ${SUPPORT_EMAIL}</p>
  </div>
`;

interface MailData {
  to: string;
  from: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  attachments?: EmailAttachment[];
}

export interface EmailAttachment {
  content: string; // base64 encoded content
  filename: string;
  type: string;
  disposition: string;
}

export interface EmailData {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  attachments?: EmailAttachment[];
}

const sendEmail = async (data: EmailData): Promise<boolean> => {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.warn("SENDGRID_API_KEY not configured, logging email instead");
      console.warn("📧 Would send email:", {
        to: data.to,
        subject: data.subject,
        html: `${data.html.substring(0, 200)}...`,
      });
      return true;
    }

    // Dynamic import to avoid issues in environments without SendGrid
    const sgMail = (await import("@sendgrid/mail")).default;
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const mailData: MailData = {
      to: data.to,
      from: process.env.FROM_EMAIL ?? SUPPORT_EMAIL,
      subject: data.subject,
      html: data.html,
      text: data.text,
      replyTo: data.replyTo,
    };

    if (data.attachments && data.attachments.length > 0) {
      mailData.attachments = data.attachments;
    }

    await sgMail.send(mailData);

    console.warn(`📧 Email sent successfully to ${data.to}: ${data.subject}`);
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
};

const sendReferralCodeEmail = async (
  email: string,
  referralCode: string,
): Promise<void> => {
  const subject = "Your ZPD Learning Referral Code";
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #059669;">Welcome to ZPD Learning!</h1>
      <p>Thank you for your enrolment. Here's your unique referral code:</p>
      <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
        <h2 style="color: #059669; font-size: 24px; margin: 0;">${referralCode}</h2>
      </div>
      <p><strong>How it works:</strong></p>
      <ul>
        <li>Share your referral code with friends and family</li>
        <li>When they use it to enroll in Essential or Intensive plans, they get $100 off</li>
        <li>You receive a new referral code to share with others</li>
        <li>This creates an endless chain of referrals!</li>
      </ul>
      <p>Each successful referral earns you $100 off your next term.</p>
      <p>Happy learning!</p>
      <p>The ZPD Learning Team</p>
    </div>
  `;

  await sendEmail({ to: email, subject, html });
};

const sendNewReferralCodeEmail = async (
  email: string,
  newReferralCode: string,
  originalCode: string,
): Promise<void> => {
  const subject = "New Referral Code Generated!";
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #059669;">🎉 New Referral Code!</h1>
      <p>Great news! Someone used your referral code <strong>${originalCode}</strong> to enrol.</p>
      <p>You've earned a new referral code to share:</p>
      <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
        <h2 style="color: #059669; font-size: 24px; margin: 0;">${newReferralCode}</h2>
      </div>
      <p>Keep sharing and keep saving!</p>
      <p>The ZPD Learning Team</p>
    </div>
  `;

  await sendEmail({ to: email, subject, html });
};

const sendEnrollmentConfirmationEmail = (
  email: string,
  parentName: string,
  planType: string,
  amountCents: number,
): Promise<boolean> => {
  const planKey = planType as PlanType;
  const planName =
    planKey in PRICING ? PRICING[planKey].name : "ZPD Learning plan";
  const amount = (amountCents / 100).toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
  });
  const isDiagnostic = planType === "trial";
  const subject = isDiagnostic
    ? "Your Diagnostic Discovery is confirmed"
    : "Your ZPD Learning enrolment is confirmed";

  const nextSteps = isDiagnostic
    ? `<p>We'll be in touch shortly about scheduling and the insights funnel before your session.</p>
       <p>After your diagnostic, you can apply the session fee toward an Essential or Intensive term plan within 30 days.</p>`
    : `<p>We'll match you with a classroom-active tutor and share your term plan before sessions begin.</p>`;

  const html = emailWrapper(`
    <h1 style="color: #4F46E5;">Thank you, ${parentName || "there"}!</h1>
    <p>Your payment is confirmed.</p>
    <div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 0;"><strong>Plan:</strong> ${planName}</p>
      <p style="margin: 8px 0 0;"><strong>Amount:</strong> ${amount} (GST included)</p>
    </div>
    ${nextSteps}
    <p>Questions? Reply to this email or contact us at ${SUPPORT_EMAIL}.</p>
  `);

  return sendEmail({ to: email, subject, html });
};

const sendAbandonedEnrollmentEmail = (
  email: string,
  resumeUrl: string,
): Promise<boolean> => {
  const subject = "Continue your ZPD Learning enrolment";
  const html = emailWrapper(`
    <h1 style="color: #4F46E5;">You were almost there</h1>
    <p>We saved your progress. When you're ready, pick up where you left off:</p>
    <p style="text-align: center; margin: 24px 0;">
      <a href="${resumeUrl}" style="background: #4F46E5; color: white; padding: 12px 24px; border-radius: 999px; text-decoration: none; font-weight: 600;">Continue enrolment</a>
    </p>
    <p>Or explore our <a href="${SITE_URL}/guides/parents-guide-to-zpd">parent's guide to ZPD</a> if you'd like more context first.</p>
  `);

  return sendEmail({ to: email, subject, html });
};

const sendPostDiagnosticFollowUpEmail = (email: string): Promise<boolean> => {
  const subject = "How did the diagnostic session go?";
  const html = emailWrapper(`
    <h1 style="color: #4F46E5;">We hope the session was useful</h1>
    <p>It's been a few days since your Diagnostic Discovery — we'd love to hear how it went.</p>
    <p>If you're ready to continue with a term plan, your diagnostic fee can be credited toward Essential or Intensive within 30 days.</p>
    <p style="text-align: center; margin: 24px 0;">
      <a href="${SITE_URL}/enrol?plan=essential" style="background: #4F46E5; color: white; padding: 12px 24px; border-radius: 999px; text-decoration: none; font-weight: 600;">View term plans</a>
    </p>
    <p>If you have feedback about the session, just reply to this email — it helps us improve.</p>
  `);

  return sendEmail({ to: email, subject, html });
};

export const EmailService = {
  sendEmail,
  sendReferralCodeEmail,
  sendNewReferralCodeEmail,
  sendEnrollmentConfirmationEmail,
  sendAbandonedEnrollmentEmail,
  sendPostDiagnosticFollowUpEmail,
};
