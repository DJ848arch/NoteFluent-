import { PRACTICE_LEVEL_NARROW_TREBLE } from "@/lib/practice-notes";

/** M1 lesson-only store. Still read on load so completions are not lost. */
export const LEGACY_PROGRESS_KEY = "as-written-progress-v1";
/** Current store: lessons plus practice stats. */
export const PROGRESS_KEY = "as-written-progress-v2";
export const PROGRESS_EVENT = "as-written-progress";

const RECENT_CAP = 30;
const SESSION_GAP_MS = 30 * 60 * 1000;
const PERSONAL_BEST_ACCURACY_FLOOR = 10;

export type LessonScore = {
  correct: number;
  total: number;
  answers: Record<string, string | number>;
  checkedAt: number;
};

export type PracticeLevelId = typeof PRACTICE_LEVEL_NARROW_TREBLE;

export type PracticeAttemptRecord = {
  at: number;
  level: PracticeLevelId;
  pitch: string;
  letter: string;
  correct: boolean;
};

export type PracticeSession = {
  startedAt: number;
  attempts: number;
  correct: number;
};

export type PracticePersonalBest = {
  /** Best accuracy after at least 10 attempts. 0 until that floor. */
  accuracy: number;
  /** Most correct answers in a single practice session. */
  sessionCorrect: number;
};

export type PracticeState = {
  currentLevel: PracticeLevelId;
  attempts: number;
  correct: number;
  accuracy: number;
  lastAttemptAt: number | null;
  personalBest: PracticePersonalBest;
  session: PracticeSession | null;
  /** Last 30 attempts — hook for a later “You’re improving” view. */
  recent: PracticeAttemptRecord[];
};

export type ProgressState = {
  version: 2;
  completed: string[];
  scores: Record<string, LessonScore>;
  lastSlug: string | null;
  practice: PracticeState;
};

export const emptyPractice = (): PracticeState => ({
  currentLevel: PRACTICE_LEVEL_NARROW_TREBLE,
  attempts: 0,
  correct: 0,
  accuracy: 0,
  lastAttemptAt: null,
  personalBest: { accuracy: 0, sessionCorrect: 0 },
  session: null,
  recent: [],
});

export const emptyProgress = (): ProgressState => ({
  version: 2,
  completed: [],
  scores: {},
  lastSlug: null,
  practice: emptyPractice(),
});

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asCompleted(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function asScores(value: unknown): Record<string, LessonScore> {
  return isRecord(value) ? (value as Record<string, LessonScore>) : {};
}

function asFiniteNumber(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function parsePractice(value: unknown): PracticeState {
  const base = emptyPractice();
  if (!isRecord(value)) return base;

  const attempts = Math.max(0, Math.floor(asFiniteNumber(value.attempts)));
  const correct = Math.max(
    0,
    Math.min(attempts, Math.floor(asFiniteNumber(value.correct)))
  );
  const accuracy =
    attempts > 0
      ? asFiniteNumber(value.accuracy, correct / attempts)
      : 0;

  const personalBest = isRecord(value.personalBest)
    ? {
        accuracy: Math.min(
          1,
          Math.max(0, asFiniteNumber(value.personalBest.accuracy))
        ),
        sessionCorrect: Math.max(
          0,
          Math.floor(asFiniteNumber(value.personalBest.sessionCorrect))
        ),
      }
    : base.personalBest;

  const session = isRecord(value.session)
    ? {
        startedAt: Math.floor(asFiniteNumber(value.session.startedAt, Date.now())),
        attempts: Math.max(0, Math.floor(asFiniteNumber(value.session.attempts))),
        correct: Math.max(0, Math.floor(asFiniteNumber(value.session.correct))),
      }
    : null;

  const recent = Array.isArray(value.recent)
    ? value.recent
        .filter(isRecord)
        .map((item): PracticeAttemptRecord => ({
          at: Math.floor(asFiniteNumber(item.at, Date.now())),
          level: PRACTICE_LEVEL_NARROW_TREBLE,
          pitch: typeof item.pitch === "string" ? item.pitch : "",
          letter: typeof item.letter === "string" ? item.letter : "",
          correct: Boolean(item.correct),
        }))
        .slice(-RECENT_CAP)
    : [];

  return {
    currentLevel: PRACTICE_LEVEL_NARROW_TREBLE,
    attempts,
    correct,
    accuracy,
    lastAttemptAt:
      typeof value.lastAttemptAt === "number" && Number.isFinite(value.lastAttemptAt)
        ? value.lastAttemptAt
        : null,
    personalBest,
    session,
    recent,
  };
}

export function parseProgress(raw: string | null): ProgressState {
  if (!raw) return emptyProgress();
  try {
    const data = JSON.parse(raw) as unknown;
    if (!isRecord(data)) return emptyProgress();

    const version = data.version;
    if (version !== 1 && version !== 2) return emptyProgress();

    return {
      version: 2,
      completed: asCompleted(data.completed),
      scores: asScores(data.scores),
      lastSlug: typeof data.lastSlug === "string" ? data.lastSlug : null,
      practice: version === 2 ? parsePractice(data.practice) : emptyPractice(),
    };
  } catch {
    return emptyProgress();
  }
}

export function readProgress(): ProgressState {
  if (typeof window === "undefined") return emptyProgress();
  const current = localStorage.getItem(PROGRESS_KEY);
  if (current) return parseProgress(current);
  return parseProgress(localStorage.getItem(LEGACY_PROGRESS_KEY));
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

export function recordPracticeAttempt(input: {
  level: PracticeLevelId;
  pitch: string;
  letter: string;
  correct: boolean;
}) {
  const current = readProgress();
  const now = Date.now();
  const attempts = current.practice.attempts + 1;
  const correct = current.practice.correct + (input.correct ? 1 : 0);
  const accuracy = correct / attempts;

  const priorSession = current.practice.session;
  const continueSession =
    priorSession !== null &&
    current.practice.lastAttemptAt !== null &&
    now - current.practice.lastAttemptAt <= SESSION_GAP_MS;

  const session: PracticeSession = continueSession
    ? {
        startedAt: priorSession.startedAt,
        attempts: priorSession.attempts + 1,
        correct: priorSession.correct + (input.correct ? 1 : 0),
      }
    : {
        startedAt: now,
        attempts: 1,
        correct: input.correct ? 1 : 0,
      };

  const personalBestAccuracy =
    attempts >= PERSONAL_BEST_ACCURACY_FLOOR
      ? Math.max(current.practice.personalBest.accuracy, accuracy)
      : current.practice.personalBest.accuracy;

  const record: PracticeAttemptRecord = {
    at: now,
    level: input.level,
    pitch: input.pitch,
    letter: input.letter,
    correct: input.correct,
  };

  writeProgress({
    ...current,
    practice: {
      ...current.practice,
      currentLevel: input.level,
      attempts,
      correct,
      accuracy,
      lastAttemptAt: now,
      personalBest: {
        accuracy: personalBestAccuracy,
        sessionCorrect: Math.max(
          current.practice.personalBest.sessionCorrect,
          session.correct
        ),
      },
      session,
      recent: [...current.practice.recent, record].slice(-RECENT_CAP),
    },
  });
}

export function resetProgress() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(LEGACY_PROGRESS_KEY);
  }
  writeProgress(emptyProgress());
}
