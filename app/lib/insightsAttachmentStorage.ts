import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { del, get, put } from "@vercel/blob";

const LOCAL_UPLOAD_ROOT = path.join(
  process.cwd(),
  ".data",
  "uploads",
  "insights",
);

const BLOB_PATH_PREFIX = "blob:";

const isBlobStorageEnabled = (): boolean =>
  Boolean(process.env.BLOB_READ_WRITE_TOKEN) ||
  Boolean(process.env.BLOB_STORE_ID);

const toBlobPathname = (storageKey: string): string | null => {
  if (storageKey.startsWith(BLOB_PATH_PREFIX)) {
    return storageKey.slice(BLOB_PATH_PREFIX.length);
  }

  if (storageKey.includes(".blob.vercel-storage.com/")) {
    try {
      return new URL(storageKey).pathname.replace(/^\//, "");
    } catch {
      return null;
    }
  }

  return null;
};

const streamToBuffer = async (
  stream: ReadableStream<Uint8Array>,
): Promise<Buffer> => {
  const chunks: Uint8Array[] = [];
  const reader = stream.getReader();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }

  return Buffer.concat(chunks);
};

export const storeInsightAttachment = async (
  sessionId: string,
  attachmentId: string,
  filename: string,
  buffer: Buffer,
  contentType: string,
): Promise<string> => {
  const pathname = `insights/${sessionId}/${attachmentId}-${filename}`;

  if (isBlobStorageEnabled()) {
    const blob = await put(pathname, buffer, {
      access: "private",
      contentType,
      addRandomSuffix: false,
    });
    return `${BLOB_PATH_PREFIX}${blob.pathname}`;
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
  const blobPathname = toBlobPathname(storageKey);

  if (blobPathname && isBlobStorageEnabled()) {
    const result = await get(blobPathname, { access: "private" });
    if (!result || result.statusCode !== 200 || !result.stream) {
      throw new Error(`Failed to read blob: ${blobPathname}`);
    }
    return streamToBuffer(result.stream);
  }

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
  const blobPathname = toBlobPathname(storageKey);

  if (blobPathname && isBlobStorageEnabled()) {
    await del(blobPathname);
    return;
  }

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
