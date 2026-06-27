import { type NextRequest, NextResponse } from "next/server";
import { SUPPORT_EMAIL } from "@/lib/constants";
import { EmailService } from "@/lib/email";
import puppeteer from "puppeteer";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const responsesJson = formData.get("responses") as string;
    const responses = JSON.parse(responsesJson);

    // Generate PDF (optional - skip on failure)
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
          const stepNum = parseInt(stepIndex) + 1;
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

    // Prepare attachments
    const attachments = [];
    for (const [key, value] of formData.entries()) {
      if (key !== "responses" && value instanceof File) {
        const buffer = Buffer.from(await value.arrayBuffer());
        attachments.push({
          content: buffer.toString("base64"),
          filename: value.name,
          type: value.type,
          disposition: "attachment",
        });
      }
    }

    // Add PDF attachment if generated
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
    const userEmail = formData.get("email") as string | null;

    // Send email with PDF attachment
    await EmailService.sendEmail({
      to: recipient,
      subject: "New Enrolment Insights Submission",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #059669;">New Enrolment Insights Submission</h1>
          <p>A parent has completed their enrolment insights. The detailed responses are attached as a PDF.</p>
          ${attachments.length > 1 ? "<p><strong>Additional attachments:</strong> See attached files for uploaded documents.</p>" : "<p><strong>No additional attachments uploaded.</strong></p>"}
          <p>Please review this submission and proceed with tutor matching.</p>
          <p>The ZPD Learning Team</p>
        </div>
      `,
      attachments,
    });

    // Send confirmation to user if email provided
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to submit insights:", error);
    return NextResponse.json(
      { error: "Failed to submit insights" },
      { status: 500 },
    );
  }
}
