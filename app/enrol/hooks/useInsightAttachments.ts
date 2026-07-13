"use client";

import { useCallback, useEffect, useState } from "react";
import { getEnrollmentSessionHeaders } from "@/enrol/lib/enrollmentSessionClient";
import type { InsightAttachmentRecord } from "@/lib/insightsAttachments";

interface UseInsightAttachmentsOptions {
  sessionId: string | null;
}

export const useInsightAttachments = ({
  sessionId,
}: UseInsightAttachmentsOptions) => {
  const [attachments, setAttachments] = useState<InsightAttachmentRecord[]>([]);
  const [uploadingCount, setUploadingCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const loadAttachments = useCallback(async () => {
    if (!sessionId) return;
    try {
      const response = await fetch(
        `/api/enrollment-sessions/${sessionId}/attachments`,
        { headers: getEnrollmentSessionHeaders() },
      );
      if (!response.ok) return;
      const data = (await response.json()) as {
        attachments: InsightAttachmentRecord[];
      };
      setAttachments(data.attachments ?? []);
    } catch {
      // Keep existing list on transient errors
    }
  }, [sessionId]);

  useEffect(() => {
    void loadAttachments();
  }, [loadAttachments]);

  const uploadFiles = useCallback(
    async (files: FileList | File[]) => {
      if (!sessionId) {
        setError(
          "Session not ready — refresh the page or use your email link.",
        );
        return;
      }

      setError(null);
      const fileArray = Array.from(files);

      for (const file of fileArray) {
        setUploadingCount((count) => count + 1);
        try {
          const formData = new FormData();
          formData.append("file", file);
          const response = await fetch(
            `/api/enrollment-sessions/${sessionId}/attachments`,
            {
              method: "POST",
              headers: getEnrollmentSessionHeaders(),
              body: formData,
            },
          );
          if (!response.ok) {
            const data = (await response.json()) as { error?: string };
            throw new Error(data.error ?? "Upload failed");
          }
          const data = (await response.json()) as {
            attachment: InsightAttachmentRecord;
          };
          setAttachments((prev) => [...prev, data.attachment]);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Upload failed");
        } finally {
          setUploadingCount((count) => Math.max(0, count - 1));
        }
      }
    },
    [sessionId],
  );

  const handleAttachmentChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = event.target;
      if (!files?.length) return;
      void uploadFiles(files);
      event.target.value = "";
    },
    [uploadFiles],
  );

  const removeAttachment = useCallback(
    async (attachmentId: string) => {
      if (!sessionId) return;
      setError(null);
      try {
        const response = await fetch(
          `/api/enrollment-sessions/${sessionId}/attachments?id=${encodeURIComponent(attachmentId)}`,
          {
            method: "DELETE",
            headers: getEnrollmentSessionHeaders(),
          },
        );
        if (!response.ok) {
          const data = (await response.json()) as { error?: string };
          throw new Error(data.error ?? "Delete failed");
        }
        setAttachments((prev) =>
          prev.filter((item) => item.id !== attachmentId),
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "Delete failed");
      }
    },
    [sessionId],
  );

  return {
    attachments,
    uploadingCount,
    error,
    handleAttachmentChange,
    removeAttachment,
    reloadAttachments: loadAttachments,
  };
};
