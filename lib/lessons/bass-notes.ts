import type { Lesson } from "@/lib/types";

export const bassNotes: Lesson = {
  slug: "bass-notes",
  number: 3,
  title: "Note names on the bass staff",
  summary:
    "A second map for the same alphabet, with F as the landmark and middle C as the bridge to treble.",
  minutes: 12,
  objectives: [
    "Name bass-clef lines and spaces from the bottom",
    "Use the F line as a landmark",
    "See that middle C is the same pitch from either clef",
  ],
  blocks: [
    {
      type: "p",
      text: "Bass clef uses the same seven letters. The grid is just shifted. If you try to read bass with your treble map, every note will be wrong by a third — a very common and very avoidable mistake. Load the bass map on purpose.",
    },
    {
      type: "heading",
      text: "Landmark: the F line",
    },
    {
      type: "p",
      text: "Fourth line from the bottom is F. The space above that F is G. The top line is A. The space below F is E. Walk the alphabet from F the same way you walked from G in treble.",
    },
    {
      type: "score",
      spec: {
        clef: "bass",
        notes: "F3/q, G3, A3, B3",
        voiceTime: "4/4",
        labels: ["F", "G", "A", "B"],
        description:
          "Four quarter notes in bass clef stepping up from F on the fourth line: F, G, A, B.",
      },
      caption: "From the F line: F, then G (top space), A (top line), B (above the staff).",
    },
    {
      type: "heading",
      text: "Bass spaces: A C E G",
    },
    {
      type: "p",
      text: "Bottom space to top space: A, C, E, G. Some people remember “all cows eat grass.” Use it if it helps you check; do not depend on it in time.",
    },
    {
      type: "score",
      spec: {
        clef: "bass",
        notes: "A2/q, C3, E3, G3",
        voiceTime: "4/4",
        labels: ["A", "C", "E", "G"],
        description:
          "The four bass-clef space notes from bottom to top: A, C, E, G.",
      },
      caption: "Bass spaces, bottom to top: A C E G.",
    },
    {
      type: "heading",
      text: "Bass lines: G B D F A",
    },
    {
      type: "score",
      spec: {
        clef: "bass",
        notes: "G2/q, B2, D3, F3, A3",
        voiceTime: "5/4",
        labels: ["G", "B", "D", "F", "A"],
        description:
          "The five bass-clef line notes from bottom to top: G, B, D, F, A.",
      },
      caption: "Bass lines, bottom to top: G B D F A. The F is the one the clef is pointing at.",
    },
    {
      type: "heading",
      text: "Middle C is the hinge",
    },
    {
      type: "p",
      text: "One ledger line above the bass staff is middle C. One ledger line below the treble staff is the same middle C. The two staves are not two different universes. They meet at C. You will use ledger lines properly in a later lesson; for now, treat this C as a bridge between the maps you already have.",
    },
    {
      type: "score",
      spec: {
        clef: "bass",
        notes: "C4/w",
        voiceTime: "4/4",
        labels: ["C"],
        description: "Middle C on a ledger line above the bass staff.",
      },
      caption: "Bass clef, one ledger line above the staff: middle C.",
    },
    {
      type: "callout",
      title: "A working check",
      text: "If a bass note looks like it should be a treble G, pause. Ask which clef is printed. Then find F or the nearest ACEG space and walk. The extra second is cheaper than playing the wrong pitch for a whole chorus.",
    },
  ],
  quiz: [
    {
      id: "q1",
      type: "note",
      prompt: "Name this note.",
      notation: {
        clef: "bass",
        notes: "F3/w",
        voiceTime: "4/4",
        description: "Whole note F on the fourth line of the bass staff.",
      },
      answer: "F",
      explanation: "Fourth line, bass clef: F. Same landmark as the dots on the clef.",
    },
    {
      id: "q2",
      type: "note",
      prompt: "Name this note.",
      notation: {
        clef: "bass",
        notes: "C3/w",
        voiceTime: "4/4",
        description: "Whole note C in the second space of the bass staff.",
      },
      answer: "C",
      explanation: "Second space. Bass spaces are A C E G, so the second space is C.",
    },
    {
      id: "q3",
      type: "note",
      prompt: "Name this note.",
      notation: {
        clef: "bass",
        notes: "G2/w",
        voiceTime: "4/4",
        description: "Whole note G on the bottom line of the bass staff.",
      },
      answer: "G",
      explanation: "Bottom line of the bass staff is G.",
    },
    {
      id: "q4",
      type: "note",
      prompt: "Name this note.",
      notation: {
        clef: "bass",
        notes: "A3/w",
        voiceTime: "4/4",
        description: "Whole note A on the top line of the bass staff.",
      },
      answer: "A",
      explanation: "Top line of the bass staff is A.",
    },
    {
      id: "q5",
      type: "choice",
      prompt: "The four bass spaces, bottom to top, are:",
      options: ["F A C E", "A C E G", "G B D F", "E G B D"],
      answer: 1,
      explanation: "A C E G. FACE is treble spaces. Mixing those two lists is the usual mix-up.",
    },
    {
      id: "q6",
      type: "note",
      prompt: "This sits on a ledger line above the bass staff. Name it.",
      notation: {
        clef: "bass",
        notes: "C4/w",
        voiceTime: "4/4",
        description: "Middle C on one ledger line above the bass staff.",
      },
      answer: "C",
      explanation:
        "One ledger line above bass is middle C — the same pitch as one ledger line below treble.",
    },
  ],
};
