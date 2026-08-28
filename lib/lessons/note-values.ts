import type { Lesson } from "@/lib/types";

export const noteValues: Lesson = {
  slug: "note-values",
  number: 4,
  title: "Note values and rests",
  summary:
    "How long a note lasts, how rests mark silence, and how dots stretch a value by half.",
  minutes: 14,
  objectives: [
    "Recognize whole, half, quarter, eighth, and sixteenth notes",
    "Match each note value to its rest",
    "Know what a dot does to duration",
  ],
  blocks: [
    {
      type: "p",
      text: "The vertical position of a note is its pitch. The shape of the note is how long it lasts. Those two jobs are independent. The same G can be a whole note or a sixteenth. Reading means you track both.",
    },
    {
      type: "heading",
      text: "The usual values, in 4/4",
    },
    {
      type: "p",
      text: "Until we change the time signature, treat a quarter note as one beat. Then the family is simple arithmetic:",
    },
    {
      type: "list",
      items: [
        "Whole note — empty oval, no stem — lasts four beats",
        "Half note — empty oval with a stem — lasts two beats",
        "Quarter note — filled oval with a stem — lasts one beat",
        "Eighth note — filled oval, stem, one flag (or a beam) — lasts half a beat",
        "Sixteenth note — two flags (or two beams) — lasts a quarter of a beat",
      ],
    },
    {
      type: "score",
      spec: {
        clef: "treble",
        notes: "G4/w",
        voiceTime: "4/4",
        labels: ["4 beats"],
        description: "A whole note G lasting four beats.",
      },
      caption: "Whole note. Hollow head, no stem. Holds for a full 4/4 bar.",
    },
    {
      type: "score",
      spec: {
        clef: "treble",
        notes: "G4/h, G4/h",
        voiceTime: "4/4",
        labels: ["2", "2"],
        description: "Two half notes, each lasting two beats.",
      },
      caption: "Half notes. Hollow heads with stems. Two of them fill a 4/4 bar.",
    },
    {
      type: "score",
      spec: {
        clef: "treble",
        notes: "G4/q, G4, G4, G4",
        voiceTime: "4/4",
        labels: ["1", "1", "1", "1"],
        description: "Four quarter notes, each lasting one beat.",
      },
      caption: "Quarter notes. Filled heads with stems. Four to a 4/4 bar.",
    },
    {
      type: "score",
      spec: {
        clef: "treble",
        groups: [{ notes: "G4/8, A4, B4, C5, D5, E5, F5, G5", beam: true }],
        voiceTime: "4/4",
        description: "Eight beamed eighth notes filling one bar of 4/4.",
      },
      caption:
        "Eighth notes. In groups they are beamed instead of flagged, which makes the beats easier to see. Eight of them fill a 4/4 bar.",
    },
    {
      type: "score",
      spec: {
        clef: "treble",
        time: "4/4",
        groups: [
          { notes: "G4/16, A4, B4, C5", beam: true },
          { notes: "D5/16, E5, F5, G5", beam: true },
          { notes: "A5/8, G5", beam: true },
          { notes: "F5/q" },
        ],
        voiceTime: "4/4",
        description:
          "Four sixteenth notes on beat 1, four sixteenths on beat 2, two eighths on beat 3, and a quarter on beat 4.",
      },
      caption:
        "Sixteenth notes. Two beams, four to a beat. Beats 1 and 2 are sixteenths; beat 3 is two eighths; beat 4 is a quarter.",
    },
    {
      type: "heading",
      text: "Rests are written silence",
    },
    {
      type: "p",
      text: "A rest is not a missing note. It is an instruction to wait for a specific length of time. Each note value has a matching rest. The two that get confused are the whole rest and the half rest: they are the same rectangle. The whole rest hangs from the fourth line. The half rest sits on the third line. Hanging is longer. Sitting is shorter.",
    },
    {
      type: "score",
      spec: {
        clef: "treble",
        notes: "B4/w/r",
        voiceTime: "4/4",
        labels: ["whole rest"],
        description: "A whole rest hanging from the fourth line.",
      },
      caption: "Whole rest: hangs from the line. Four beats of silence in 4/4.",
    },
    {
      type: "score",
      spec: {
        clef: "treble",
        notes: "B4/h/r, G4/h",
        voiceTime: "4/4",
        labels: ["half rest", "half note"],
        description: "A half rest followed by a half note.",
      },
      caption: "Half rest sits on the line. Two beats of silence, then two beats of sound.",
    },
    {
      type: "score",
      spec: {
        clef: "treble",
        notes: "G4/q, B4/q/r, G4/q, B4/q/r",
        voiceTime: "4/4",
        labels: ["play", "rest", "play", "rest"],
        description:
          "Quarter note, quarter rest, quarter note, quarter rest.",
      },
      caption: "Quarter rests look like a squiggle. Count them the same way you count quarter notes.",
    },
    {
      type: "heading",
      text: "A dot adds half",
    },
    {
      type: "p",
      text: "A dot after a note (or rest) adds half of that value. A dotted half note is 2 + 1 = 3 beats. A dotted quarter is 1 + ½ = 1½ beats. Dotted quarters are everywhere in 4/4 ballads and in 6/8. You will count them on purpose in the next lesson.",
    },
    {
      type: "score",
      spec: {
        clef: "treble",
        notes: "G4/h., G4/q",
        voiceTime: "4/4",
        labels: ["3 beats", "1 beat"],
        description: "A dotted half note lasting three beats, then a quarter note.",
      },
      caption: "Dotted half plus quarter fills a 4/4 bar: 3 + 1.",
    },
    {
      type: "callout",
      title: "Beams show the beat",
      text: "Flags on single eighths are correct. Beams that group eighths into beats are kinder to the reader. When you write, beam by the beat. When you read, let the beams tell you where beat 1, 2, 3, and 4 sit.",
    },
  ],
  quiz: [
    {
      id: "q1",
      type: "choice",
      prompt: "In 4/4, how many beats does this note last?",
      notation: {
        clef: "treble",
        notes: "C5/h",
        voiceTime: "2/4",
        description: "A half note C.",
      },
      options: ["1", "2", "3", "4"],
      answer: 1,
      explanation: "Half note: hollow head with a stem. Two beats in 4/4.",
    },
    {
      id: "q2",
      type: "choice",
      prompt: "Which rest matches a whole note in 4/4?",
      notation: {
        clef: "treble",
        notes: "B4/w/r",
        voiceTime: "4/4",
        description: "A whole rest.",
      },
      options: [
        "The one sitting on the third line (half rest)",
        "The one hanging from the fourth line (whole rest)",
        "The squiggle (quarter rest)",
        "The 7-shaped flag (eighth rest)",
      ],
      answer: 1,
      explanation:
        "Whole rest hangs. Half rest sits. If you remember one visual: hanging is the longer silence.",
    },
    {
      id: "q3",
      type: "choice",
      prompt: "How many eighth notes equal one half note?",
      notation: {
        clef: "treble",
        groups: [{ notes: "G4/8, A4, B4, C5", beam: true }],
        voiceTime: "2/4",
        description: "Four beamed eighth notes.",
      },
      options: ["Two", "Three", "Four", "Eight"],
      answer: 2,
      explanation:
        "An eighth is half a quarter. A half note is two quarters, so four eighths. 4 × ½ beat = 2 beats.",
    },
    {
      id: "q4",
      type: "choice",
      prompt: "How many beats does a dotted half note last in 4/4?",
      notation: {
        clef: "treble",
        notes: "G4/h.",
        voiceTime: "3/4",
        description: "A dotted half note G.",
      },
      options: ["2", "2½", "3", "4"],
      answer: 2,
      explanation: "A dot adds half of the original value. Half note = 2, plus 1, equals 3.",
    },
    {
      id: "q5",
      type: "choice",
      prompt: "This bar is in 4/4. Does it add up?",
      notation: {
        clef: "treble",
        time: "4/4",
        notes: "G4/q, B4/q/r, G4/h",
        voiceTime: "4/4",
        description:
          "Quarter note, quarter rest, and a half note in 4/4.",
      },
      options: [
        "Yes — 1 + 1 + 2 = 4",
        "No — the rest does not count toward the bar",
        "No — a half note is four beats",
        "Yes, but only if you ignore the rest",
      ],
      answer: 0,
      explanation:
        "Rests take time. Quarter + quarter rest + half = 1 + 1 + 2 = 4. The bar is complete.",
    },
  ],
};
