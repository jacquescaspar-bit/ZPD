import { type NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { SUPPORT_EMAIL } from "@/lib/constants";
import { EmailService } from "@/lib/email";
import { getInsightsAttachmentManifest } from "@/lib/insightsAttachments";
import { readInsightAttachment } from "@/lib/insightsAttachmentStorage";
import puppeteer from "puppeteer";

const parseResponses = (
  responsesJson: string | null,
): Record<string, unknown> => {
  if (!responsesJson) return {};
  try {
    return JSON.parse(responsesJson) as Record<string, unknown>;
  } catch {
    return {};
  }
};

const loadSession = async (sessionId: string) => {
  const result = await query(
    `
    SELECT session_id, email, insights_data, progress_status
    FROM enrollment_sessions
    WHERE session_id = $1 AND expires_at > NOW()
  `,
    [sessionId],
  );
  return result.rows[0] as
    | {
        session_id: string;
        email: string | null;
        insights_data: Record<string, unknown>;
        progress_status: Record<string, unknown>;
      }
    | undefined;
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const sessionId = formData.get("sessionId") as string | null;
    const responsesJson = formData.get("responses") as string | null;
    const responses = parseResponses(responsesJson);

    if (sessionId) {
      const session = await loadSession(sessionId);
      if (!session) {
        return NextResponse.json(
          { error: "Session not found or expired" },
          { status: 404 },
        );
      }
      if (session.progress_status?.insightsSubmitted === true) {
        return NextResponse.json(
          { error: "Insights already submitted" },
          { status: 409 },
        );
      }
    }

    let pdfBuffer: Buffer | null = null;
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      const page = await browser.newPage();

      const responsesHtml = Object.entries(responses)
        .filter(([key]) => key !== "5")
        .map(([stepIndex, response]) => {
          const stepNum = parseInt(stepIndex, 10) + 1;
          let responseText = "";
          if (typeof response === "string") {
            responseText = response;
          } else if (Array.isArray(response)) {
            responseText = response.join(", ");
          }
          return `<div style="margin-bottom: 15px;"><strong>Step ${stepNum}:</strong><br>${responseText}</div>`;
        })
        .join("");

      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>ZPD Learning - Enrolment Insights</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
              .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
              .confidential { color: red; font-weight: bold; font-size: 18px; }
              .title { font-size: 24px; font-weight: bold; margin: 10px 0; }
              .responses { background: #f9f9f9; padding: 20px; border-radius: 8px; }
              .footer { margin-top: 30px; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="confidential">CONFIDENTIAL</div>
              <div class="title">ZPD Learning</div>
              <div>Enrolment Insights Submission</div>
              <div>Generated on: ${new Date().toLocaleDateString()}</div>
            </div>
            <div class="responses">
              ${responsesHtml}
            </div>
            <div class="footer">
              This document contains confidential information for ZPD Learning tutor matching purposes.
            </div>
          </body>
        </html>
      `;

      await page.setContent(html);
      pdfBuffer = Buffer.from(
        await page.pdf({
          format: "A4",
          printBackground: true,
          margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
        }),
      );
      await browser.close();
    } catch (pdfError) {
      console.error("PDF generation failed, proceeding without PDF:", pdfError);
    }

    const attachments: {
      content: string;
      filename: string;
      type: string;
      disposition: string;
    }[] = [];

    if (sessionId) {
      const session = await loadSession(sessionId);
      const manifest = getInsightsAttachmentManifest(session?.insights_data);
      for (const record of manifest) {
        try {
          const buffer = await readInsightAttachment(record.storageKey);
          attachments.push({
            content: buffer.toString("base64"),
            filename: record.filename,
            type: record.contentType,
            disposition: "attachment",
          });
        } catch (error) {
          console.error(`Failed to load attachment ${record.id}:`, error);
        }
      }
    } else {
      for (const [key, value] of formData.entries()) {
        if (
          key !== "responses" &&
          key !== "sessionId" &&
          value instanceof File
        ) {
          const buffer = Buffer.from(await value.arrayBuffer());
          attachments.push({
            content: buffer.toString("base64"),
            filename: value.name,
            type: value.type,
            disposition: "attachment",
          });
        }
      }
    }

    if (pdfBuffer) {
      attachments.push({
        content: pdfBuffer.toString("base64"),
        filename: "enrolment-insights.pdf",
        type: "application/pdf",
        disposition: "attachment",
      });
    }

    const recipient =
      (formData.get("testRecipient") as string) ??
      process.env.ADMIN_EMAIL ??
      SUPPORT_EMAIL;
    const userEmail =
      (formData.get("email") as string | null) ??
      (sessionId ? (await loadSession(sessionId))?.email : null) ??
      null;

    await EmailService.sendEmail({
      to: recipient,
      subject: "New Enrolment Insights Submission",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #059669;">New Enrolment Insights Submission</h1>
          <p>A parent has completed their enrolment insights. The detailed responses are attached as a PDF.</p>
          ${attachments.length > 1 ? "<p><strong>Additional attachments:</strong> See attached files for uploaded documents.</p>" : "<p><strong>No additional attachments uploaded.</strong></p>"}
          ${sessionId ? `<p><strong>Session ID:</strong> ${sessionId}</p>` : ""}
          <p>Please review this submission and proceed with tutor matching.</p>
          <p>The ZPD Learning Team</p>
        </div>
      `,
      attachments,
    });

    if (userEmail) {
      await EmailService.sendEmail({
        to: userEmail,
        subject: "Enrolment Insights Received - ZPD Learning",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #059669;">Thank you for submitting your enrolment insights!</h1>
            <p>We've received your responses and any uploaded documents.</p>
            <p>Our team will review your submission within 2-3 business days and match you with the perfect tutor.</p>
            <p>You'll receive further details shortly from grow@zpdlearning.com.</p>
            <p>The ZPD Learning Team</p>
          </div>
        `,
      });
    }

    if (sessionId) {
      await query(
        `
        UPDATE enrollment_sessions
        SET
          progress_status = COALESCE(progress_status, '{}'::jsonb) || '{"insightsSubmitted": true}'::jsonb,
          insights_data = COALESCE(insights_data, '{}'::jsonb) || $1::jsonb,
          updated_at = NOW()
        WHERE session_id = $2
      `,
        [
          JSON.stringify({
            responses,
            submittedAt: new Date().toISOString(),
          }),
          sessionId,
        ],
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to submit insights:", error);
    return NextResponse.json(
      { error: "Failed to submit insights" },
      { status: 500 },
    );
  }
}
