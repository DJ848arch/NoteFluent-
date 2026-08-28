import type { Lesson } from "@/lib/types";

export const trebleNotes: Lesson = {
  slug: "treble-notes",
  number: 2,
  title: "Note names on the treble staff",
  summary:
    "The musical alphabet, the FACE spaces, the line names, and a G landmark you can actually use.",
  minutes: 14,
  objectives: [
    "Use the musical alphabet A–G, then wrap back to A",
    "Name the four treble spaces and five treble lines",
    "Read notes on the treble staff by landmark plus alphabet, not by guessing",
  ],
  blocks: [
    {
      type: "p",
      text: "Pitch names are the first seven letters of the alphabet: A B C D E F G. After G you go back to A. Each line or space is the next letter. Walk one step up the staff, you get the next letter. Walk one step down, you get the previous letter.",
    },
    {
      type: "heading",
      text: "Start from a landmark, then walk",
    },
    {
      type: "p",
      text: "You already have a landmark from lesson 1: the second line is G. The space just above that G is A. The line above that is B. The space below G is F. You do not need a poem to do this. You need the alphabet and one solid reference point.",
    },
    {
      type: "score",
      spec: {
        clef: "treble",
        notes: "G4/q, A4, B4, C5",
        voiceTime: "4/4",
        labels: ["G", "A", "B", "C"],
        description:
          "Four quarter notes stepping up from G on the second line: G, A, B, C.",
      },
      caption:
        "From the G line, step up through the next space, line, and space: G, A, B, C.",
    },
    {
      type: "heading",
      text: "Spaces spell FACE",
    },
    {
      type: "p",
      text: "Bottom space to top space on the treble staff: F, A, C, E. That happens to be a word, which is useful. It is not magic. It is just the alphabet sitting in the gaps.",
    },
    {
      type: "score",
      spec: {
        clef: "treble",
        notes: "F4/q, A4, C5, E5",
        voiceTime: "4/4",
        labels: ["F", "A", "C", "E"],
        description:
          "The four treble-clef space notes from bottom to top: F, A, C, E.",
      },
      caption: "Treble spaces, bottom to top: F A C E.",
    },
    {
      type: "heading",
      text: "Lines: E G B D F",
    },
    {
      type: "p",
      text: "Bottom line to top line: E, G, B, D, F. If a mnemonic helps you check your work, use one. Do not let it become the only way you read. On a gig, you do not have time to recite a sentence for every note. You look at G, then you look next to it.",
    },
    {
      type: "score",
      spec: {
        clef: "treble",
        notes: "E4/q, G4, B4, D5, F5",
        voiceTime: "5/4",
        labels: ["E", "G", "B", "D", "F"],
        description:
          "The five treble-clef line notes from bottom to top: E, G, B, D, F.",
      },
      caption: "Treble lines, bottom to top: E G B D F.",
    },
    {
      type: "callout",
      title: "Same letter, different octave",
      text: "The E on the bottom line and the E in the top space are both E. They are an octave apart. The letter repeats every eight letter-steps (count both ends: E–F–G–A–B–C–D–E). For now, naming the letter is the job. Which octave it is comes from where it sits.",
    },
    {
      type: "p",
      text: "A practical habit: find G or the FACE space nearest the note, then walk. After a few days of that, the common notes (G, A, B, C, D around the middle of the staff) stop feeling like a puzzle.",
    },
  ],
  quiz: [
    {
      id: "q1",
      type: "note",
      prompt: "Name this note.",
      notation: {
        clef: "treble",
        notes: "A4/w",
        voiceTime: "4/4",
        description: "Whole note A in the second space of the treble staff.",
      },
      answer: "A",
      explanation:
        "Second space from the bottom. Treble spaces are F A C E, so the second space is A. It also sits just above the G line.",
    },
    {
      id: "q2",
      type: "note",
      prompt: "Name this note.",
      notation: {
        clef: "treble",
        notes: "D5/w",
        voiceTime: "4/4",
        description: "Whole note D on the fourth line of the treble staff.",
      },
      answer: "D",
      explanation:
        "Fourth line from the bottom. Lines are E G B D F, so the fourth line is D.",
    },
    {
      id: "q3",
      type: "note",
      prompt: "Name this note.",
      notation: {
        clef: "treble",
        notes: "E4/w",
        voiceTime: "4/4",
        description: "Whole note E on the bottom line of the treble staff.",
      },
      answer: "E",
      explanation: "Bottom line of the treble staff is E.",
    },
    {
      id: "q4",
      type: "note",
      prompt: "Name this note.",
      notation: {
        clef: "treble",
        notes: "C5/w",
        voiceTime: "4/4",
        description: "Whole note C in the third space of the treble staff.",
      },
      answer: "C",
      explanation:
        "Third space. FACE: F, A, C, E. The third space is C — often called middle-of-the-staff C, an octave above middle C.",
    },
    {
      id: "q5",
      type: "choice",
      prompt: "The four treble spaces, bottom to top, spell which word?",
      options: ["CAGE", "FACE", "BACE", "GAFF"],
      answer: 1,
      explanation: "F A C E. Bottom space is F; top space is E.",
    },
    {
      id: "q6",
      type: "note",
      prompt: "Name this note.",
      notation: {
        clef: "treble",
        notes: "F5/w",
        voiceTime: "4/4",
        description: "Whole note F on the top line of the treble staff.",
      },
      answer: "F",
      explanation: "Top line of the treble staff is F.",
    },
  ],
};
