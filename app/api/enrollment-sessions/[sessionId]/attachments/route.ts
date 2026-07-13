import { randomUUID } from "node:crypto";
import { type NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import {
  ALLOWED_INSIGHT_ATTACHMENT_TYPES,
  MAX_INSIGHT_ATTACHMENT_BYTES,
  MAX_INSIGHT_ATTACHMENTS,
  getInsightsAttachmentManifest,
  mergeInsightsData,
  type InsightAttachmentRecord,
} from "@/lib/insightsAttachments";
import {
  deleteInsightAttachment,
  storeInsightAttachment,
} from "@/lib/insightsAttachmentStorage";
import { requireEnrollmentSessionAccess } from "@/lib/enrollmentSessionAuth";

const getSession = async (sessionId: string) => {
  const result = await query(
    `
    SELECT session_id, insights_data, progress_status
    FROM enrollment_sessions
    WHERE session_id = $1 AND expires_at > NOW()
  `,
    [sessionId],
  );
  return result.rows[0] as
    | {
        session_id: string;
        insights_data: Record<string, unknown>;
        progress_status: Record<string, unknown>;
      }
    | undefined;
};

const isSubmitted = (progressStatus: Record<string, unknown> | null): boolean =>
  progressStatus?.insightsSubmitted === true;

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ sessionId: string }> },
) {
  const { sessionId } = await context.params;
  const authError = await requireEnrollmentSessionAccess(request, sessionId);
  if (authError) return authError;

  const session = await getSession(sessionId);
  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  return NextResponse.json({
    attachments: getInsightsAttachmentManifest(session.insights_data),
  });
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ sessionId: string }> },
) {
  try {
    const { sessionId } = await context.params;
    const authError = await requireEnrollmentSessionAccess(request, sessionId);
    if (authError) return authError;

    const session = await getSession(sessionId);
    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }
    if (isSubmitted(session.progress_status)) {
      return NextResponse.json(
        { error: "Insights already submitted" },
        { status: 409 },
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "file is required" }, { status: 400 });
    }

    if (!ALLOWED_INSIGHT_ATTACHMENT_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "Unsupported file type" },
        { status: 400 },
      );
    }
    if (file.size > MAX_INSIGHT_ATTACHMENT_BYTES) {
      return NextResponse.json(
        { error: "File too large (max 10MB)" },
        { status: 400 },
      );
    }

    const manifest = getInsightsAttachmentManifest(session.insights_data);
    if (manifest.length >= MAX_INSIGHT_ATTACHMENTS) {
      return NextResponse.json(
        { error: `Maximum ${MAX_INSIGHT_ATTACHMENTS} files allowed` },
        { status: 400 },
      );
    }

    const attachmentId = randomUUID();
    const buffer = Buffer.from(await file.arrayBuffer());
    const storageKey = await storeInsightAttachment(
      sessionId,
      attachmentId,
      file.name,
      buffer,
      file.type,
    );

    const record: InsightAttachmentRecord = {
      id: attachmentId,
      filename: file.name,
      size: file.size,
      contentType: file.type,
      storageKey,
      uploadedAt: new Date().toISOString(),
    };

    const nextInsightsData = mergeInsightsData(session.insights_data, {
      attachmentManifest: [...manifest, record],
    });

    await query(
      `
      UPDATE enrollment_sessions
      SET insights_data = $1, updated_at = NOW()
      WHERE session_id = $2
    `,
      [JSON.stringify(nextInsightsData), sessionId],
    );

    return NextResponse.json({ attachment: record });
  } catch (error) {
    console.error("Attachment upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload attachment" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ sessionId: string }> },
) {
  try {
    const { sessionId } = await context.params;
    const authError = await requireEnrollmentSessionAccess(request, sessionId);
    if (authError) return authError;

    const session = await getSession(sessionId);
    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }
    if (isSubmitted(session.progress_status)) {
      return NextResponse.json(
        { error: "Insights already submitted" },
        { status: 409 },
      );
    }

    const { searchParams } = new URL(request.url);
    const attachmentId = searchParams.get("id");
    if (!attachmentId) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const manifest = getInsightsAttachmentManifest(session.insights_data);
    const target = manifest.find((item) => item.id === attachmentId);
    if (!target) {
      return NextResponse.json(
        { error: "Attachment not found" },
        { status: 404 },
      );
    }

    await deleteInsightAttachment(target.storageKey);

    const nextManifest = manifest.filter((item) => item.id !== attachmentId);
    const nextInsightsData = mergeInsightsData(session.insights_data, {
      attachmentManifest: nextManifest,
    });

    await query(
      `
      UPDATE enrollment_sessions
      SET insights_data = $1, updated_at = NOW()
      WHERE session_id = $2
    `,
      [JSON.stringify(nextInsightsData), sessionId],
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Attachment delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete attachment" },
      { status: 500 },
    );
  }
}
