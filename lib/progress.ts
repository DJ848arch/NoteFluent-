export const PROGRESS_KEY = "as-written-progress-v1";
export const PROGRESS_EVENT = "as-written-progress";

export type LessonScore = {
  correct: number;
  total: number;
  answers: Record<string, string | number>;
  checkedAt: number;
};

export type ProgressState = {
  version: 1;
  completed: string[];
  scores: Record<string, LessonScore>;
  lastSlug: string | null;
};

export const emptyProgress = (): ProgressState => ({
  version: 1,
  completed: [],
  scores: {},
  lastSlug: null,
});

export function parseProgress(raw: string | null): ProgressState {
  if (!raw) return emptyProgress();
  try {
    const data = JSON.parse(raw) as Partial<ProgressState>;
    if (data.version !== 1) return emptyProgress();
    return {
      version: 1,
      completed: Array.isArray(data.completed) ? data.completed : [],
      scores:
        data.scores && typeof data.scores === "object" ? data.scores : {},
      lastSlug: data.lastSlug ?? null,
    };
  } catch {
    return emptyProgress();
  }
}

export function readProgress(): ProgressState {
  if (typeof window === "undefined") return emptyProgress();
  return parseProgress(localStorage.getItem(PROGRESS_KEY));
}

export function writeProgress(next: ProgressState) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(PROGRESS_EVENT));
}

export function markVisited(slug: string) {
  const current = readProgress();
  if (current.lastSlug === slug) return;
  writeProgress({ ...current, lastSlug: slug });
}

export function saveLessonScore(
  slug: string,
  score: Omit<LessonScore, "checkedAt">
) {
  const current = readProgress();
  const completed = current.completed.includes(slug)
    ? current.completed
    : [...current.completed, slug];
  writeProgress({
    ...current,
    lastSlug: slug,
    completed,
    scores: {
      ...current.scores,
      [slug]: { ...score, checkedAt: Date.now() },
    },
  });
}

export function resetProgress() {
  writeProgress(emptyProgress());
}
