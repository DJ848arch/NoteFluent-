"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import {
  parseProgress,
  PROGRESS_EVENT,
  PROGRESS_KEY,
  resetProgress,
  saveLessonScore,
  type LessonScore,
  type ProgressState,
} from "@/lib/progress";
import { lessons } from "@/lib/curriculum";

const EMPTY = "{}";

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(PROGRESS_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(PROGRESS_EVENT, onChange);
  };
}

function getSnapshot() {
  return localStorage.getItem(PROGRESS_KEY) ?? EMPTY;
}

function getServerSnapshot() {
  return EMPTY;
}

export function useProgress() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const progress = useMemo(() => parseProgress(raw), [raw]);

  const completedCount = progress.completed.filter((slug) =>
    lessons.some((lesson) => lesson.slug === slug)
  ).length;

  const nextLesson =
    lessons.find((lesson) => !progress.completed.includes(lesson.slug)) ??
    lessons[lessons.length - 1];

  const continueSlug = nextLesson.slug;

  const saveScore = useCallback(
    (slug: string, score: Omit<LessonScore, "checkedAt">) => {
      saveLessonScore(slug, score);
    },
    []
  );

  const reset = useCallback(() => {
    resetProgress();
  }, []);

  return {
    progress,
    completedCount,
    total: lessons.length,
    nextLesson,
    continueSlug,
    saveScore,
    reset,
  };
}

export function useLessonScore(slug: string): LessonScore | null {
  const { progress } = useProgress();
  return progress.scores[slug] ?? null;
}

export type { ProgressState };
