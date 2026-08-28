import type { Lesson } from "@/lib/types";

export const ledgerLines: Lesson = {
  slug: "ledger-lines",
  number: 7,
  title: "Ledger lines",
  summary:
    "Short extra lines above and below the staff, including middle C from both clefs.",
  minutes: 10,
  objectives: [
    "Name notes one and two ledger lines above or below the treble staff",
    "Read middle C from treble and from bass",
    "Keep using the alphabet instead of treating ledger notes as special cases",
  ],
  blocks: [
    {
      type: "p",
      text: "The staff is only five lines. Music is not. When a note sits above or below the staff, we draw a short extra line through it — a ledger line. It is the same grid, just extended. The alphabet does not change.",
    },
    {
      type: "heading",
      text: "Below the treble staff",
    },
    {
      type: "p",
      text: "The lowest line is E. The space under that, still with no extra line, is D. One ledger line below the staff is middle C. The space below that ledger is B. Two ledger lines down is A.",
    },
    {
      type: "score",
      spec: {
        clef: "treble",
        notes: "E4/q, D4, C4, B3, A3",
        voiceTime: "5/4",
        labels: ["E", "D", "C", "B", "A"],
        description:
          "Treble notes stepping down from the bottom line E through D, middle C, B, and A.",
      },
      caption:
        "Bottom line E, then D hanging under the staff, middle C on one ledger, B, then A on two ledgers.",
    },
    {
      type: "heading",
      text: "Above the treble staff",
    },
    {
      type: "p",
      text: "The top line is F. The space above the staff is G — no ledger needed. One ledger line above is A. The space above that ledger is B. Two ledger lines up is C.",
    },
    {
      type: "score",
      spec: {
        clef: "treble",
        notes: "F5/q, G5, A5, B5, C6",
        voiceTime: "5/4",
        labels: ["F", "G", "A", "B", "C"],
        description:
          "Treble notes stepping up from the top line F through G, A, B, and C.",
      },
      caption:
        "Top line F, G in the space above, A on one ledger, B, then C on two ledgers.",
    },
    {
      type: "heading",
      text: "Middle C from both sides",
    },
    {
      type: "p",
      text: "Treble: one ledger below the staff. Bass: one ledger above the staff. Same pitch. Piano music draws that C on whichever staff the line of notes is coming from, sometimes switching mid-phrase. If you name it C from either picture, you are right.",
    },
    {
      type: "score",
      spec: {
        clef: "treble",
        notes: "C4/w",
        voiceTime: "4/4",
        labels: ["middle C"],
        description: "Middle C on a ledger line below the treble staff.",
      },
      caption: "Treble, one ledger below: middle C.",
    },
    {
      type: "score",
      spec: {
        clef: "bass",
        notes: "C4/w",
        voiceTime: "4/4",
        labels: ["middle C"],
        description: "Middle C on a ledger line above the bass staff.",
      },
      caption: "Bass, one ledger above: the same middle C.",
    },
    {
      type: "callout",
      title: "Do not skip-count",
      text: "The usual panic is leaping to a guessed letter three ledger lines out. Slow down. Name the edge of the staff (treble top F, treble bottom E, bass top A, bass bottom G), then walk one letter per line or space, including the gaps that do not have a ledger drawn. The space between two ledger lines is a real step.",
    },
    {
      type: "p",
      text: "Two ledger lines is enough for a huge amount of melody reading. More than three and many parts will switch octave markings or clefs rather than draw a ladder. If you can name C, D, and A around the treble staff, you can read most of what this course is aiming at.",
    },
  ],
  quiz: [
    {
      id: "q1",
      type: "note",
      prompt: "Name this treble note.",
      notation: {
        clef: "treble",
        notes: "C4/w",
        voiceTime: "4/4",
        description: "Middle C on one ledger line below the treble staff.",
      },
      answer: "C",
      explanation: "One ledger line below treble is middle C.",
    },
    {
      id: "q2",
      type: "note",
      prompt: "Name this treble note.",
      notation: {
        clef: "treble",
        notes: "D4/w",
        voiceTime: "4/4",
        description: "D hanging just below the treble staff, no ledger line.",
      },
      answer: "D",
      explanation:
        "Bottom line is E. The space under it — no ledger — is D. Ledger lines are only drawn when a note needs one through its head.",
    },
    {
      id: "q3",
      type: "note",
      prompt: "Name this treble note.",
      notation: {
        clef: "treble",
        notes: "A5/w",
        voiceTime: "4/4",
        description: "A on one ledger line above the treble staff.",
      },
      answer: "A",
      explanation: "Top line F, space above is G, one ledger above is A.",
    },
    {
      id: "q4",
      type: "note",
      prompt: "Name this bass note.",
      notation: {
        clef: "bass",
        notes: "C4/w",
        voiceTime: "4/4",
        description: "Middle C on one ledger line above the bass staff.",
      },
      answer: "C",
      explanation: "One ledger above bass is middle C — same pitch as question 1.",
    },
    {
      id: "q5",
      type: "note",
      prompt: "Name this treble note.",
      notation: {
        clef: "treble",
        notes: "A3/w",
        voiceTime: "4/4",
        description: "A on two ledger lines below the treble staff.",
      },
      answer: "A",
      explanation:
        "Walk down from the bottom line: E, D, C (first ledger), B, A (second ledger).",
    },
    {
      id: "q6",
      type: "choice",
      prompt: "Which pair is the same pitch?",
      options: [
        "Treble bottom-line E and bass top-line A",
        "Treble middle-C (ledger below) and bass middle-C (ledger above)",
        "Treble top-line F and bass F on the fourth line",
        "Any note drawn with a ledger line",
      ],
      answer: 1,
      explanation:
        "Middle C is the meeting point of the two staves. The other pairs are different pitches.",
    },
  ],
};
