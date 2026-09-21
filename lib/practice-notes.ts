export const PRACTICE_LEVELS = [
  {
    id: "treble-narrow",
    label: "Treble warm-up",
    shortLabel: "Warm-up",
    clef: "treble",
    description: "Five notes in the middle of the treble staff.",
    detail: "G4–D5 · no ledger lines",
    pitches: [
      { pitch: "G4", letter: "G", description: "G on the second line of the treble staff." },
      { pitch: "A4", letter: "A", description: "A in the second space of the treble staff." },
      { pitch: "B4", letter: "B", description: "B on the middle line of the treble staff." },
      { pitch: "C5", letter: "C", description: "C in the third space of the treble staff." },
      { pitch: "D5", letter: "D", description: "D on the fourth line of the treble staff." },
    ],
  },
  {
    id: "treble-full",
    label: "Full treble staff",
    shortLabel: "Treble",
    clef: "treble",
    description: "Every natural note on the treble staff, line and space.",
    detail: "E4–F5 · nine notes",
    pitches: [
      { pitch: "E4", letter: "E", description: "E on the bottom line of the treble staff." },
      { pitch: "F4", letter: "F", description: "F in the first space of the treble staff." },
      { pitch: "G4", letter: "G", description: "G on the second line of the treble staff." },
      { pitch: "A4", letter: "A", description: "A in the second space of the treble staff." },
      { pitch: "B4", letter: "B", description: "B on the middle line of the treble staff." },
      { pitch: "C5", letter: "C", description: "C in the third space of the treble staff." },
      { pitch: "D5", letter: "D", description: "D on the fourth line of the treble staff." },
      { pitch: "E5", letter: "E", description: "E in the top space of the treble staff." },
      { pitch: "F5", letter: "F", description: "F on the top line of the treble staff." },
    ],
  },
  {
    id: "bass-full",
    label: "Full bass staff",
    shortLabel: "Bass",
    clef: "bass",
    description: "Every natural note on the bass staff, line and space.",
    detail: "G2–A3 · nine notes",
    pitches: [
      { pitch: "G2", letter: "G", description: "G on the bottom line of the bass staff." },
      { pitch: "A2", letter: "A", description: "A in the first space of the bass staff." },
      { pitch: "B2", letter: "B", description: "B on the second line of the bass staff." },
      { pitch: "C3", letter: "C", description: "C in the second space of the bass staff." },
      { pitch: "D3", letter: "D", description: "D on the middle line of the bass staff." },
      { pitch: "E3", letter: "E", description: "E in the third space of the bass staff." },
      { pitch: "F3", letter: "F", description: "F on the fourth line of the bass staff." },
      { pitch: "G3", letter: "G", description: "G in the top space of the bass staff." },
      { pitch: "A3", letter: "A", description: "A on the top line of the bass staff." },
    ],
  },
] as const;

export type PracticeLevel = (typeof PRACTICE_LEVELS)[number];
export type PracticeLevelId = PracticeLevel["id"];
export type PracticePitch = PracticeLevel["pitches"][number];

export const PRACTICE_LEVEL_NARROW_TREBLE: PracticeLevelId = "treble-narrow";
export const NOTE_LETTERS = ["A", "B", "C", "D", "E", "F", "G"] as const;

export function getPracticeLevel(id: PracticeLevelId): PracticeLevel {
  return PRACTICE_LEVELS.find((level) => level.id === id) ?? PRACTICE_LEVELS[0];
}

export function isPracticeLevelId(value: unknown): value is PracticeLevelId {
  return PRACTICE_LEVELS.some((level) => level.id === value);
}

export function pickNextPitch(level: PracticeLevel, excludePitch?: string): PracticePitch {
  const pool = level.pitches.filter((item) => item.pitch !== excludePitch);
  const available = pool.length > 0 ? pool : level.pitches;
  return available[Math.floor(Math.random() * available.length)] ?? level.pitches[0];
}
