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
      return process.env.NODE_ENV === "development";
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

const sendReferralCodeEmail = (
  email: string,
  referralCode: string,
): Promise<boolean> => {
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
        <li>Share this code with friends and family — you can't use your own code at checkout</li>
        <li>When someone enrolls in Essential or Intensive with your code, they get $100 off that invoice</li>
        <li>You receive a personal $100 reward code for your next Essential or Intensive term</li>
        <li>You'll also get a fresh referral code to keep sharing</li>
      </ul>
      <p>Only one discount applies per invoice (up to $100).</p>
      <p>Happy learning!</p>
      <p>The ZPD Learning Team</p>
    </div>
  `;

  return sendEmail({ to: email, subject, html });
};

const sendNewReferralCodeEmail = (
  email: string,
  rewardPromoCode: string,
  newReferralCode: string,
  originalCode: string,
): Promise<boolean> => {
  const subject = "Your $100 referral reward is ready!";
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #059669;">Someone used your referral code!</h1>
      <p>Great news — a friend enrolled with your code <strong>${originalCode}</strong>.</p>
      <p><strong>Your personal $100 reward</strong> (use at your next Essential or Intensive checkout):</p>
      <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
        <h2 style="color: #059669; font-size: 24px; margin: 0;">${rewardPromoCode}</h2>
      </div>
      <p>This reward is linked to <strong>${email}</strong> and can be used once.</p>
      <p><strong>Your new code to share:</strong></p>
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
        <h2 style="color: #059669; font-size: 24px; margin: 0;">${newReferralCode}</h2>
      </div>
      <p>Keep sharing ZPD Learning — each successful referral earns another $100 personal reward.</p>
      <p>The ZPD Learning Team</p>
    </div>
  `;

  return sendEmail({ to: email, subject, html });
};

const onboardingCta = (url: string, label: string) => `
  <p style="text-align: center; margin: 24px 0;">
    <a href="${url}" style="background: #4F46E5; color: white; padding: 12px 24px; border-radius: 999px; text-decoration: none; font-weight: 600;">${label}</a>
  </p>
`;

const onboardingImportanceCopy = `
  <p>Your onboarding questionnaire helps us understand your child as a learner — goals, strengths, teacher perspectives, and scheduling preferences. It is how we match the right tutor and shape sessions around your family.</p>
  <p style="color: #64748b; font-size: 14px;">Your answers and uploaded documents save automatically. No rush — we prioritise thorough responses over fast ones.</p>
`;

const sendEnrollmentConfirmationEmail = (
  email: string,
  parentName: string,
  planType: string,
  amountCents: number,
  onboardingUrl?: string,
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

  const planNextSteps = isDiagnostic
    ? `<p>After your diagnostic, you can apply the session fee toward an Essential or Intensive term plan within 30 days.</p>`
    : `<p>Once onboarding is complete, we'll match you with a classroom-active tutor and share your term plan before sessions begin.</p>`;

  const onboardingBlock = onboardingUrl
    ? `${onboardingImportanceCopy}
       ${onboardingCta(onboardingUrl, "Complete your onboarding")}
       <p>You can leave and return anytime using the link above.</p>`
    : `<p>We'll be in touch shortly about completing your onboarding questionnaire.</p>`;

  const html = emailWrapper(`
    <h1 style="color: #4F46E5;">Thank you, ${parentName || "there"}!</h1>
    <p>Your payment is confirmed.</p>
    <div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 0;"><strong>Plan:</strong> ${planName}</p>
      <p style="margin: 8px 0 0;"><strong>Amount:</strong> ${amount} (GST included)</p>
    </div>
    ${onboardingBlock}
    ${planNextSteps}
    <p>Questions? Reply to this email or contact us at ${SUPPORT_EMAIL}.</p>
  `);

  return sendEmail({ to: email, subject, html });
};

const sendInsightsResumeEmail = (
  email: string,
  resumeUrl: string,
): Promise<boolean> => {
  const subject = "Your onboarding responses are saved";
  const html = emailWrapper(`
    <h1 style="color: #4F46E5;">Pick up where you left off</h1>
    <p>Your responses have been saved. When you're ready, continue your onboarding:</p>
    ${onboardingCta(resumeUrl, "Resume your onboarding")}
    ${onboardingImportanceCopy}
    <p>If you have questions, reply to this email or contact us at ${SUPPORT_EMAIL}.</p>
  `);

  return sendEmail({ to: email, subject, html });
};

const sendInsightsReminderEmail = (
  email: string,
  resumeUrl: string,
): Promise<boolean> => {
  const subject = "A gentle reminder to complete your onboarding";
  const html = emailWrapper(`
    <h1 style="color: #4F46E5;">We're ready when you are</h1>
    <p>It's been a few days since your enrolment — your saved responses are still waiting whenever you'd like to finish.</p>
    ${onboardingCta(resumeUrl, "Resume your onboarding")}
    ${onboardingImportanceCopy}
    <p>Need help? Reply to this email or contact us at ${SUPPORT_EMAIL}.</p>
  `);

  return sendEmail({ to: email, subject, html });
};

const sendInsightsEscalationEmail = (
  parentEmail: string,
  sessionId: string,
  resumeUrl: string,
  parentName?: string,
): Promise<boolean> => {
  const subject = `Onboarding incomplete: ${parentEmail}`;
  const html = emailWrapper(`
    <h1 style="color: #4F46E5;">Insights onboarding not completed</h1>
    <p>A parent paid but has not submitted their onboarding questionnaire after 3 days.</p>
    <ul>
      <li><strong>Parent:</strong> ${parentName ?? "Unknown"}</li>
      <li><strong>Email:</strong> ${parentEmail}</li>
      <li><strong>Session:</strong> ${sessionId}</li>
    </ul>
    <p><a href="${resumeUrl}">View their saved onboarding session</a></p>
  `);

  return sendEmail({ to: SUPPORT_EMAIL, subject, html });
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
  sendInsightsResumeEmail,
  sendInsightsReminderEmail,
  sendInsightsEscalationEmail,
  sendAbandonedEnrollmentEmail,
  sendPostDiagnosticFollowUpEmail,
};
