import type { Lesson } from "@/lib/types";

export const staffAndClefs: Lesson = {
  slug: "staff-and-clefs",
  number: 1,
  title: "The staff and the two clefs",
  summary:
    "Five lines, four spaces, and the two signs that turn those lines into pitches.",
  minutes: 10,
  objectives: [
    "Count lines and spaces from the bottom of the staff",
    "Recognize treble (G) and bass (F) clefs",
    "Know which line each clef pins to a letter name",
  ],
  blocks: [
    {
      type: "p",
      text: "Reading music starts with a grid. The staff is five parallel lines with four spaces between them. Notes sit on a line or in a space. That is the whole coordinate system. Everything else — clefs, rhythm, accidentals — is extra information written onto that grid.",
    },
    {
      type: "heading",
      text: "Count from the bottom",
    },
    {
      type: "p",
      text: "Line 1 is the lowest line. Space 1 is the lowest space, the gap sitting on top of line 1. Players who grew up counting from the top get lost the first time someone says “third line.” Bottom-up is the convention, and it matches how we talk about pitch: lower on the page is lower in sound.",
    },
    {
      type: "score",
      spec: {
        clef: "treble",
        description: "Empty treble staff with five lines.",
      },
      caption:
        "A five-line staff with a treble clef. No notes yet — just the grid.",
    },
    {
      type: "heading",
      text: "A clef assigns letters to the grid",
    },
    {
      type: "p",
      text: "Without a clef, “second line” is only a location. A clef names that location. The two clefs you will see constantly are treble and bass. Learn them as maps, not as decoration.",
    },
    {
      type: "heading",
      text: "Treble clef is a G clef",
    },
    {
      type: "p",
      text: "The treble clef is a stylized letter G. The inner curl wraps around the second line from the bottom. That line is G — specifically the G above middle C. Guitar, violin, flute, saxophone, and most sung melodies live here. On piano, it is usually the right-hand staff.",
    },
    {
      type: "score",
      spec: {
        clef: "treble",
        notes: "G4/w",
        voiceTime: "4/4",
        labels: ["G"],
        highlight: [0],
        description: "Whole note G on the second line of the treble staff.",
      },
      caption:
        "The note sitting on the second line is G. The clef is drawn so its curl circles that line.",
    },
    {
      type: "heading",
      text: "Bass clef is an F clef",
    },
    {
      type: "p",
      text: "The bass clef is a stylized F. The two dots sit on either side of the fourth line from the bottom. That line is F — the F below middle C. Bass, cello, trombone, and the piano left hand spend most of their time here.",
    },
    {
      type: "score",
      spec: {
        clef: "bass",
        notes: "F3/w",
        voiceTime: "4/4",
        labels: ["F"],
        highlight: [0],
        description: "Whole note F on the fourth line of the bass staff.",
      },
      caption:
        "The two dots of the bass clef straddle the F line. The note on that line is F.",
    },
    {
      type: "callout",
      title: "You do not need both at once",
      text: "A lot of parts use only one clef. Learn treble thoroughly, then bass. The grand staff — treble stacked on bass, joined by a brace — is how piano music is usually printed. Middle C lives on a ledger line between those two staves. Ledger lines come later in this path.",
    },
    {
      type: "p",
      text: "When you open a new part, the first useful question is: which clef is this? That single mark tells you which letter-name map to load. The notes themselves are next.",
    },
  ],
  quiz: [
    {
      id: "q1",
      type: "choice",
      prompt: "How many lines are on a standard staff?",
      options: ["Four", "Five", "Six", "Seven"],
      answer: 1,
      explanation:
        "Five lines, four spaces. Extra short lines above or below (ledger lines) are added only when a note needs them.",
    },
    {
      id: "q2",
      type: "choice",
      prompt:
        "When you count staff lines, where do you start?",
      options: [
        "From the top line, moving down",
        "From the middle line, outward",
        "From the bottom line, moving up",
        "From whichever line the clef touches",
      ],
      answer: 2,
      explanation:
        "Line 1 is the lowest line. Space 1 is the lowest space. Bottom-up matches low-to-high pitch.",
    },
    {
      id: "q3",
      type: "choice",
      prompt: "Which line does the treble clef mark as G?",
      notation: {
        clef: "treble",
        notes: "G4/w",
        voiceTime: "4/4",
        description: "Treble staff with a whole note on the second line.",
      },
      options: [
        "The bottom line",
        "The second line from the bottom",
        "The middle line",
        "The top line",
      ],
      answer: 1,
      explanation:
        "The curl of the treble clef wraps around the second line. That line is G.",
    },
    {
      id: "q4",
      type: "choice",
      prompt: "Which line do the bass-clef dots mark as F?",
      notation: {
        clef: "bass",
        notes: "F3/w",
        voiceTime: "4/4",
        description: "Bass staff with a whole note on the fourth line.",
      },
      options: [
        "The second line from the bottom",
        "The third line (middle)",
        "The fourth line from the bottom",
        "The top line",
      ],
      answer: 2,
      explanation:
        "The two dots straddle the fourth line from the bottom. That line is F below middle C.",
    },
    {
      id: "q5",
      type: "note",
      prompt:
        "This note sits on the line the treble clef names. What letter is it?",
      notation: {
        clef: "treble",
        notes: "G4/w",
        voiceTime: "4/4",
        description: "Whole note on the second line of the treble staff.",
      },
      answer: "G",
      explanation:
        "Second line, treble clef: G. If you remember only one treble landmark, make it this one.",
    },
  ],
};
