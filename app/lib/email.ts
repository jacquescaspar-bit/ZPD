// Email service using SendGrid

export interface EmailData {
  to: string;
  subject: string;
  html: string;
  text?: string;
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

    await sgMail.send({
      to: data.to,
      from: process.env.FROM_EMAIL ?? "noreply@zpd-tutoring.com",
      subject: data.subject,
      html: data.html,
      text: data.text,
    });

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
  const subject = "Your ZPD Tutoring Referral Code";
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #059669;">Welcome to ZPD Tutoring!</h1>
      <p>Thank you for your enrollment. Here's your unique referral code:</p>
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
      <p>The ZPD Tutoring Team</p>
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
      <p>Great news! Someone used your referral code <strong>${originalCode}</strong> to enroll.</p>
      <p>You've earned a new referral code to share:</p>
      <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
        <h2 style="color: #059669; font-size: 24px; margin: 0;">${newReferralCode}</h2>
      </div>
      <p>Keep sharing and keep saving!</p>
      <p>The ZPD Tutoring Team</p>
    </div>
  `;

  await sendEmail({ to: email, subject, html });
};

export const EmailService = {
  sendEmail,
  sendReferralCodeEmail,
  sendNewReferralCodeEmail,
};
