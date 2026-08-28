import type { Lesson } from "@/lib/types";

export const putItTogether: Lesson = {
  slug: "put-it-together",
  number: 8,
  title: "Put it together",
  summary:
    "Read a short original melody: G major, 4/4, mixed rhythms, a rest, a natural, and ledger notes.",
  minutes: 16,
  objectives: [
    "Scan clef, key, and time before naming notes",
    "Name pitches and values in a real eight-bar line",
    "Catch an accidental that cancels the key signature",
  ],
  blocks: [
    {
      type: "p",
      text: "This is the job. A line of music, not a drill. Before you name anything, read the left edge of the staff: treble clef, one sharp (G major — Fs are F♯), 4/4. Then work bar by bar. Pitch and duration both count.",
    },
    {
      type: "p",
      text: "The tune is original to this course. Eight bars. I would read it the way I read a chart: left-edge first, then bar 1 as a group, then keep going. Do not stop on every notehead the first time through if you can see the shape of the bar.",
    },
    {
      type: "heading",
      text: "Bars 1–2",
    },
    {
      type: "score",
      spec: {
        clef: "treble",
        keySignature: "G",
        time: "4/4",
        notes: "G4/q, B4, D5, B4",
        voiceTime: "4/4",
        description: "Bar 1: quarter notes G, B, D, B in G major.",
      },
      caption: "Bar 1. Four quarters: G, B, D, B. Arpeggio outline from G.",
    },
    {
      type: "score",
      spec: {
        clef: "treble",
        keySignature: "G",
        time: "4/4",
        notes: "A4/q, C5, B4, A4",
        voiceTime: "4/4",
        description: "Bar 2: quarter notes A, C, B, A.",
      },
      caption: "Bar 2. A, C, B, A. C is C♮ — G major has F♯, not C♯.",
    },
    {
      type: "heading",
      text: "Bars 3–4",
    },
    {
      type: "score",
      spec: {
        clef: "treble",
        keySignature: "G",
        time: "4/4",
        notes: "G4/h, D4/q, E4",
        voiceTime: "4/4",
        description: "Bar 3: half note G, then quarter D below the staff, then E.",
      },
      caption:
        "Bar 3. Half-note G (beats 1–2), then D hanging under the staff, then E on the bottom line.",
    },
    {
      type: "score",
      spec: {
        clef: "treble",
        keySignature: "G",
        time: "4/4",
        notes: "D4/q, G4/h, B4/q/r",
        voiceTime: "4/4",
        description: "Bar 4: quarter D, half note G, quarter rest.",
      },
      caption: "Bar 4. D, half-note G, quarter rest on beat 4. 1 + 2 + 1 = 4.",
    },
    {
      type: "heading",
      text: "Bars 5–6",
    },
    {
      type: "score",
      spec: {
        clef: "treble",
        keySignature: "G",
        time: "4/4",
        groups: [
          { notes: "E5/8, D5", beam: true },
          { notes: "C5/8, B4", beam: true },
          { notes: "A4/q, G4/q" },
        ],
        voiceTime: "4/4",
        description:
          "Bar 5: eighths E D on beat 1, C B on beat 2, then quarter A and quarter G.",
      },
      caption:
        "Bar 5. Four eighths (beats 1 and 2) then two quarters. Beams group those eighths by the beat: two plus two, not one beam of four.",
    },
    {
      type: "score",
      spec: {
        clef: "treble",
        keySignature: "G",
        time: "4/4",
        notes: "F5/q, Fn4, G4/h",
        voiceTime: "4/4",
        labels: ["F♯", "F♮", "G"],
        description:
          "Bar 6: F sharp from the key, F natural marked, then a half-note G.",
      },
      caption:
        "Bar 6. Beat 1 is top-line F — F♯ from the key signature. Beat 2 prints a natural: F♮ below. Then G for two beats.",
    },
    {
      type: "heading",
      text: "Bars 7–8",
    },
    {
      type: "score",
      spec: {
        clef: "treble",
        keySignature: "G",
        time: "4/4",
        groups: [
          { notes: "C5/q, D5/q" },
          { notes: "E5/8, G5", beam: true },
          { notes: "A5/q" },
        ],
        voiceTime: "4/4",
        description:
          "Bar 7: quarters C and D, eighths E and G, quarter A on a ledger line.",
      },
      caption:
        "Bar 7. C, D, two eighths (E G), then A on the ledger line above the staff. 1 + 1 + ½ + ½ + 1 = 4.",
    },
    {
      type: "score",
      spec: {
        clef: "treble",
        keySignature: "G",
        time: "4/4",
        notes: "D5/q, B4, G4/h",
        voiceTime: "4/4",
        description: "Bar 8: quarter D, quarter B, half note G.",
      },
      caption: "Bar 8. D, B, half-note G. Lands where bar 1 started.",
    },
    {
      type: "callout",
      title: "A reading order that works",
      text: "Clef. Key. Time. Then the first downbeat. Then the rest of the bar as a sum of values. If a bar does not add up in your head, you misread a duration — not a letter. Check stems, beams, and dots before you check pitch a second time.",
    },
    {
      type: "p",
      text: "If you can answer the questions below from the staves above, you can read a simple treble melody with rhythm. That was the path. Keep reading real parts — hymns, folk lead sheets, a piano right hand — with the same left-edge scan.",
    },
  ],
  quiz: [
    {
      id: "q1",
      type: "choice",
      prompt: "Before bar 1, the left edge of this piece tells you:",
      notation: {
        clef: "treble",
        keySignature: "G",
        time: "4/4",
        notes: "G4/w",
        voiceTime: "4/4",
        description: "Treble clef, G major key signature, 4/4, whole note G.",
      },
      options: [
        "Bass clef, no sharps, 3/4",
        "Treble clef, F♯ in the key, 4/4",
        "Treble clef, B♭ in the key, 6/8",
        "Treble clef, no key signature, 2/4",
      ],
      answer: 1,
      explanation:
        "Treble G-clef, one sharp on F (G major / E minor), 4/4. Always read those three before the first note.",
    },
    {
      id: "q2",
      type: "choice",
      prompt: "Bar 1, four quarter notes. Which sequence is it?",
      notation: {
        clef: "treble",
        keySignature: "G",
        time: "4/4",
        notes: "G4/q, B4, D5, B4",
        voiceTime: "4/4",
        description: "Bar 1 of the melody: G B D B.",
      },
      options: ["G A B C", "G B D B", "E G B D", "G B D F♯"],
      answer: 1,
      explanation:
        "Second line G, middle line B, fourth line D, middle line B again. Not an F — that would be the top line.",
    },
    {
      id: "q3",
      type: "note",
      prompt: "Bar 3, beat 3: the note hanging just under the staff. Name it.",
      notation: {
        clef: "treble",
        keySignature: "G",
        time: "4/4",
        notes: "G4/h, D4/q, E4",
        voiceTime: "4/4",
        highlight: [1],
        description: "Bar 3 with the D below the staff highlighted.",
      },
      answer: "D",
      explanation:
        "Bottom line is E. The space under the staff with no ledger line is D.",
    },
    {
      id: "q4",
      type: "choice",
      prompt: "Bar 4 ends with a rest. How long is that rest?",
      notation: {
        clef: "treble",
        keySignature: "G",
        time: "4/4",
        notes: "D4/q, G4/h, B4/q/r",
        voiceTime: "4/4",
        highlight: [2],
        description: "Bar 4 with the quarter rest highlighted.",
      },
      options: [
        "A whole rest (four beats)",
        "A half rest (two beats)",
        "A quarter rest (one beat)",
        "An eighth rest (half a beat)",
      ],
      answer: 2,
      explanation:
        "Quarter rest on beat 4. The first three beats are already used: D (1) + G half (2) = 3, plus 1 = 4.",
    },
    {
      id: "q5",
      type: "choice",
      prompt: "Bar 6, beat 1 is top-line F. In this key, that pitch is:",
      notation: {
        clef: "treble",
        keySignature: "G",
        time: "4/4",
        notes: "F5/q, Fn4, G4/h",
        voiceTime: "4/4",
        highlight: [0],
        description: "Bar 6 with the first F highlighted.",
      },
      options: ["F♮", "F♯", "F♭", "G"],
      answer: 1,
      explanation:
        "G major’s key signature sharps every F. No natural on beat 1, so it is F♯.",
    },
    {
      id: "q6",
      type: "choice",
      prompt: "Bar 6, beat 2 prints a natural on F. That note is:",
      notation: {
        clef: "treble",
        keySignature: "G",
        time: "4/4",
        notes: "F5/q, Fn4, G4/h",
        voiceTime: "4/4",
        highlight: [1],
        description: "Bar 6 with the F natural highlighted.",
      },
      options: [
        "Still F♯ — key signatures beat accidentals",
        "F♮ for the rest of this bar",
        "F♮ for the rest of the piece",
        "E, because naturals lower a note",
      ],
      answer: 1,
      explanation:
        "A natural cancels the key signature for that letter until the bar line. Next bar, F is sharp again.",
    },
    {
      id: "q7",
      type: "note",
      prompt: "Bar 7, last note: one ledger line above the treble staff. Name it.",
      notation: {
        clef: "treble",
        keySignature: "G",
        time: "4/4",
        groups: [
          { notes: "C5/q, D5/q" },
          { notes: "E5/8, G5", beam: true },
          { notes: "A5/q" },
        ],
        voiceTime: "4/4",
        highlight: [4],
        description: "Bar 7 with the high A on a ledger line highlighted.",
      },
      answer: "A",
      explanation: "Top line F, space G, one ledger A.",
    },
    {
      id: "q8",
      type: "choice",
      prompt: "Bar 5 has four eighths plus two quarters. Does it add up in 4/4?",
      notation: {
        clef: "treble",
        keySignature: "G",
        time: "4/4",
        groups: [
          { notes: "E5/8, D5", beam: true },
          { notes: "C5/8, B4", beam: true },
          { notes: "A4/q, G4/q" },
        ],
        voiceTime: "4/4",
        description: "Bar 5 of the melody, eighths beamed in two groups of two.",
      },
      options: [
        "Yes: four eighths = 2 beats, two quarters = 2 beats",
        "No: eight noteheads means 8/4",
        "No: eighths do not count in 4/4",
        "Yes, but only because of the key signature",
      ],
      answer: 0,
      explanation:
        "Four eighths = two beats. Two quarters = two beats. Four beats. Count values, not noteheads.",
    },
  ],
};
