import type { Lesson } from "@/lib/types";
import { accidentals } from "./lessons/accidentals";
import { bassNotes } from "./lessons/bass-notes";
import { ledgerLines } from "./lessons/ledger-lines";
import { noteValues } from "./lessons/note-values";
import { putItTogether } from "./lessons/put-it-together";
import { staffAndClefs } from "./lessons/staff-and-clefs";
import { timeSignatures } from "./lessons/time-signatures";
import { trebleNotes } from "./lessons/treble-notes";

export const lessons: Lesson[] = [
  staffAndClefs,
  trebleNotes,
  bassNotes,
  noteValues,
  timeSignatures,
  accidentals,
  ledgerLines,
  putItTogether,
];

export function getLesson(slug: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.slug === slug);
}

export function getLessonIndex(slug: string): number {
  return lessons.findIndex((lesson) => lesson.slug === slug);
}

export function getAdjacent(slug: string): {
  prev: Lesson | null;
  next: Lesson | null;
} {
  const index = getLessonIndex(slug);
  if (index < 0) return { prev: null, next: null };
  return {
    prev: lessons[index - 1] ?? null,
    next: lessons[index + 1] ?? null,
  };
}
