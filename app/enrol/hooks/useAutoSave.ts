"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type AutoSaveStatus = "idle" | "saving" | "saved" | "error";

interface UseAutoSaveOptions {
  sessionId: string;
  data: Record<string, unknown>;
  delay?: number; // milliseconds, default 2000
}

interface UseAutoSaveReturn {
  status: AutoSaveStatus;
  error: string | null;
  save: () => Promise<void>;
}

export function useAutoSave({
  sessionId,
  data,
  delay = 2000,
}: UseAutoSaveOptions): UseAutoSaveReturn {
  const [status, setStatus] = useState<AutoSaveStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastDataRef = useRef<Record<string, unknown>>(data);

  const save = useCallback(async () => {
    if (!sessionId) return;

    setStatus("saving");
    setError(null);

    try {
      const response = await fetch(`/api/enrollment-sessions/${sessionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          insightsData: data,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error ?? "Failed to save");
      }

      setStatus("saved");
      lastDataRef.current = data;

      // Reset to idle after showing "saved" for a moment
      setTimeout(() => {
        setStatus("idle");
      }, 2000);
    } catch (err) {
      console.error("Auto-save error:", err);
      setStatus("error");
      setError(err instanceof Error ? err.message : "Save failed");
    }
  }, [sessionId, data]);

  // Auto-save with debouncing
  useEffect(() => {
    // Check if data has actually changed
    const hasChanged =
      JSON.stringify(data) !== JSON.stringify(lastDataRef.current);

    if (!hasChanged) return;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for debounced save
    timeoutRef.current = setTimeout(() => {
      void save();
    }, delay);

    // Cleanup on unmount or dependency change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, delay, save]);

  // Cleanup on unmount
  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    [],
  );

  return {
    status,
    error,
    save,
  };
}
