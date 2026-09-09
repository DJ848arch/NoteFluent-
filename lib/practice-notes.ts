/**
 * Narrow treble pitch set for Practice Mode (M2).
 *
 * Start small: five naturals around the center of the treble staff.
 * No ledger lines, accidentals, bass clef, mixed clefs, or rhythm values.
 *
 *   G4  second line  — the G landmark from lesson 1
 *   A4  second space
 *   B4  middle line
 *   C5  third space
 *   D5  fourth line
 *
 * Lesson 2 already names these as the common middle-of-staff notes.
 */
export const NARROW_TREBLE_PITCHES = [
  {
    pitch: "G4",
    letter: "G",
    description: "Whole note G on the second line of the treble staff.",
  },
  {
    pitch: "A4",
    letter: "A",
    description: "Whole note A in the second space of the treble staff.",
  },
  {
    pitch: "B4",
    letter: "B",
    description: "Whole note B on the middle line of the treble staff.",
  },
  {
    pitch: "C5",
    letter: "C",
    description: "Whole note C in the third space of the treble staff.",
  },
  {
    pitch: "D5",
    letter: "D",
    description: "Whole note D on the fourth line of the treble staff.",
  },
] as const;

export type NarrowTreblePitch = (typeof NARROW_TREBLE_PITCHES)[number];

export const PRACTICE_LEVEL_NARROW_TREBLE = "treble-narrow";

export const NOTE_LETTERS = ["A", "B", "C", "D", "E", "F", "G"] as const;

export function pickNextPitch(excludePitch?: string): NarrowTreblePitch {
  const pool = excludePitch
    ? NARROW_TREBLE_PITCHES.filter((item) => item.pitch !== excludePitch)
    : NARROW_TREBLE_PITCHES;
  const index = Math.floor(Math.random() * pool.length);
  return pool[index] ?? NARROW_TREBLE_PITCHES[0];
}
