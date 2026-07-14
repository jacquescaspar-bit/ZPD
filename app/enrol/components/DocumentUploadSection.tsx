"use client";

import React, { useRef, useState } from "react";
import type { InsightAttachmentRecord } from "@/lib/insightsAttachments";

interface DragDropAreaProps {
  onFilesSelected: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const DragDropArea: React.FC<DragDropAreaProps> = ({
  onFilesSelected,
  disabled = false,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) return;

    const { files } = e.dataTransfer;
    if (files.length > 0) {
      const syntheticEvent = {
        target: { files },
      } as React.ChangeEvent<HTMLInputElement>;
      onFilesSelected(syntheticEvent);
    }
  };

  const handleClick = () => {
    if (!disabled) fileInputRef.current?.click();
  };

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
        disabled
          ? "cursor-not-allowed opacity-60 border-gray-300 dark:border-gray-600"
          : `cursor-pointer ${
              isDragOver
                ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
                : "border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
            }`
      }`}
      onClick={handleClick}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center space-y-4">
        <svg
          className={`w-12 h-12 ${
            isDragOver ? "text-blue-500" : "text-gray-400"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
          />
        </svg>
        <div>
          <p className="text-lg font-medium text-gray-900 dark:text-white mb-1">
            {disabled
              ? "Uploading…"
              : isDragOver
                ? "Drop files here"
                : "Drag & drop files here"}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            or{" "}
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              click to browse
            </span>
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            Supports PDF, DOC, DOCX, JPG, JPEG, PNG, PPT, PPTX · Saved
            automatically
          </p>
        </div>
      </div>
      <input
        ref={fileInputRef}
        multiple
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.ppt,.pptx"
        className="hidden"
        disabled={disabled}
        type="file"
        onChange={onFilesSelected}
      />
    </div>
  );
};

interface DocumentUploadSectionProps {
  attachments: InsightAttachmentRecord[];
  uploadingCount?: number;
  uploadError?: string | null;
  handleAttachmentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeAttachment: (attachmentId: string) => void;
}

const DocumentUploadSection: React.FC<DocumentUploadSectionProps> = ({
  attachments,
  uploadingCount = 0,
  uploadError,
  handleAttachmentChange,
  removeAttachment,
}) => (
  <div className="space-y-3 flex-1">
    <DragDropArea
      disabled={uploadingCount > 0}
      onFilesSelected={handleAttachmentChange}
    />
    {uploadError ? (
      <p className="text-sm text-red-600 dark:text-red-400">{uploadError}</p>
    ) : null}
    {uploadingCount > 0 ? (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Saving {uploadingCount} file{uploadingCount === 1 ? "" : "s"}…
      </p>
    ) : null}
    {attachments.length > 0 && (
      <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
        {attachments.map((file) => (
          <li
            key={file.id}
            className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-lg p-2"
          >
            <span className="truncate">
              {file.filename}
              <span className="ml-2 text-xs text-blue-600 dark:text-blue-400">
                Saved
              </span>
            </span>
            <button
              className="text-red-500 hover:text-red-700 ml-2"
              type="button"
              onClick={() => {
                void removeAttachment(file.id);
              }}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default DocumentUploadSection;
