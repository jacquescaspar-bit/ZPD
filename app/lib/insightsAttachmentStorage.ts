import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { put, del } from "@vercel/blob";

const LOCAL_UPLOAD_ROOT = path.join(
  process.cwd(),
  ".data",
  "uploads",
  "insights",
);

const isBlobStorageEnabled = (): boolean =>
  Boolean(process.env.BLOB_READ_WRITE_TOKEN);

export const storeInsightAttachment = async (
  sessionId: string,
  attachmentId: string,
  filename: string,
  buffer: Buffer,
  contentType: string,
): Promise<string> => {
  const storageKey = `insights/${sessionId}/${attachmentId}-${filename}`;

  if (isBlobStorageEnabled()) {
    const blob = await put(storageKey, buffer, {
      access: "public",
      contentType,
      addRandomSuffix: false,
    });
    return blob.url;
  }

  const dir = path.join(LOCAL_UPLOAD_ROOT, sessionId);
  await mkdir(dir, { recursive: true });
  const filePath = path.join(dir, `${attachmentId}-${filename}`);
  await writeFile(filePath, buffer);
  return filePath;
};

export const readInsightAttachment = async (
  storageKey: string,
): Promise<Buffer> => {
  if (storageKey.startsWith("http://") || storageKey.startsWith("https://")) {
    const response = await fetch(storageKey);
    if (!response.ok) {
      throw new Error(`Failed to fetch attachment: ${response.status}`);
    }
    return Buffer.from(await response.arrayBuffer());
  }

  return readFile(storageKey);
};

export const deleteInsightAttachment = async (
  storageKey: string,
): Promise<void> => {
  if (storageKey.startsWith("http://") || storageKey.startsWith("https://")) {
    if (isBlobStorageEnabled()) {
      await del(storageKey);
    }
    return;
  }

  try {
    await unlink(storageKey);
  } catch {
    // File may already be gone
  }
};
