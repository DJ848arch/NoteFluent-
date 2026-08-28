export type Clef = "treble" | "bass";

export type NoteGroup = {
  notes: string;
  beam?: boolean;
  stem?: "up" | "down";
};

export type ScoreSpec = {
  clef?: Clef;
  /** Printed time signature. Omit to hide it. */
  time?: string;
  /** Printed key signature, e.g. "G" or "F". */
  keySignature?: string;
  /** EasyScore note string. Ignored when `groups` is set. */
  notes?: string;
  groups?: NoteGroup[];
  beam?: boolean;
  stem?: "up" | "down";
  /** Labels under each note, by index. */
  labels?: Array<string | null>;
  /**
   * Voice length for VexFlow. Must match the written durations
   * (e.g. one quarter note → "1/4"). Defaults to `time` or "4/4".
   */
  voiceTime?: string;
  highlight?: number[];
  /** Screen-reader description of the example. */
  description: string;
};

export type ContentBlock =
  | { type: "heading"; text: string }
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; title: string; text: string }
  | { type: "score"; spec: ScoreSpec; caption?: string };

export type ChoiceQuestion = {
  id: string;
  type: "choice";
  prompt: string;
  notation?: ScoreSpec;
  options: string[];
  answer: number;
  explanation: string;
};

export type NoteQuestion = {
  id: string;
  type: "note";
  prompt: string;
  notation?: ScoreSpec;
  /** Letter name, optional accidental: "G", "F#", "Bb". */
  answer: string;
  accidentals?: boolean;
  explanation: string;
};

export type QuizQuestion = ChoiceQuestion | NoteQuestion;

export type Lesson = {
  slug: string;
  number: number;
  title: string;
  summary: string;
  minutes: number;
  objectives: string[];
  blocks: ContentBlock[];
  quiz: QuizQuestion[];
};
