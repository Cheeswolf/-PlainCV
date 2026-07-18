"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { defaultResumeData } from "@/data/defaultResumeData";
import { resumeDataSchema, type ResumeData } from "@/types/resumeTypes";

const STORAGE_KEY = "plaincv-resume-data";

export function useResumeStorage() {
  const [data, setData] = useState<ResumeData>(defaultResumeData);
  const [isLoaded, setIsLoaded] = useState(false);
  const skipNextSave = useRef(false);

  useEffect(() => {
    let restoredData = defaultResumeData;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = resumeDataSchema.safeParse(JSON.parse(stored));
        if (parsed.success) restoredData = parsed.data;
        else window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    queueMicrotask(() => {
      setData(restoredData);
      setIsLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data, isLoaded]);

  const clearData = useCallback(() => {
    skipNextSave.current = true;
    window.localStorage.removeItem(STORAGE_KEY);
    setData(defaultResumeData);
  }, []);

  return { data, setData, clearData, isLoaded };
}
