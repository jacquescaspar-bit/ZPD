export interface InsightAttachmentRecord {
  id: string;
  filename: string;
  size: number;
  contentType: string;
  storageKey: string;
  uploadedAt: string;
}

export const MAX_INSIGHT_ATTACHMENTS = 10;
export const MAX_INSIGHT_ATTACHMENT_BYTES = 10 * 1024 * 1024;

export const ALLOWED_INSIGHT_ATTACHMENT_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
]);

export const getInsightsAttachmentManifest = (
  insightsData: Record<string, unknown> | null | undefined,
): InsightAttachmentRecord[] => {
  const manifest = insightsData?.attachmentManifest;
  if (!Array.isArray(manifest)) return [];
  return manifest.filter(
    (item): item is InsightAttachmentRecord =>
      typeof item === "object" &&
      item !== null &&
      typeof (item as InsightAttachmentRecord).id === "string" &&
      typeof (item as InsightAttachmentRecord).filename === "string",
  );
};

export const mergeInsightsData = (
  existing: Record<string, unknown> | null | undefined,
  patch: Record<string, unknown>,
): Record<string, unknown> => ({
  ...(existing ?? {}),
  ...patch,
});
