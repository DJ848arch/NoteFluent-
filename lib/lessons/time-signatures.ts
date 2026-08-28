import type { Lesson } from "@/lib/types";

export const timeSignatures: Lesson = {
  slug: "time-signatures",
  number: 5,
  title: "Time signatures",
  summary:
    "4/4, 3/4, 2/4, and 6/8: what the numbers mean, how a bar must add up, and how 6/8 is felt in two.",
  minutes: 14,
  objectives: [
    "Read the two numbers of a time signature",
    "Count bars in 4/4, 3/4, and 2/4",
    "See 6/8 as two groups of three eighths",
  ],
  blocks: [
    {
      type: "p",
      text: "A time signature sits right after the clef (and after a key signature, when there is one). It is not a fraction you compute. It is a pair of instructions: how the bar is built, and which note value you are treating as the beat.",
    },
    {
      type: "heading",
      text: "The two numbers",
    },
    {
      type: "list",
      items: [
        "The top number tells you how many beats (or how many of the bottom-value notes) fill a bar",
        "The bottom number tells you which note value is being counted: 4 means quarter note, 8 means eighth note, 2 means half note",
      ],
    },
    {
      type: "p",
      text: "So 4/4 means four quarter-note beats per bar. 3/4 means three quarter-note beats. 2/4 means two. 6/8 means six eighth notes — usually grouped as two beats, each beat made of three eighths.",
    },
    {
      type: "heading",
      text: "4/4 — common time",
    },
    {
      type: "p",
      text: "Most pop, rock, and a huge amount of rehearsal charts are in 4/4. You count 1 2 3 4. A capital C where the time signature goes is an old shorthand for 4/4 (“common time”). Each bar must add up to four quarter-note beats, using any mix of notes and rests that totals four.",
    },
    {
      type: "score",
      spec: {
        clef: "treble",
        time: "4/4",
        notes: "G4/q, A4, B4, C5",
        voiceTime: "4/4",
        labels: ["1", "2", "3", "4"],
        description: "Four quarter notes in 4/4, one per beat.",
      },
      caption: "4/4. Four quarter notes, one on each beat.",
    },
    {
      type: "heading",
      text: "3/4",
    },
    {
      type: "p",
      text: "Three quarter beats. Waltzes live here, and so do a lot of hymns and folk tunes. Count 1 2 3, with weight on 1. A dotted half note fills the whole bar. So does a half plus a quarter.",
    },
    {
      type: "score",
      spec: {
        clef: "treble",
        time: "3/4",
        notes: "G4/h, D5/q",
        voiceTime: "3/4",
        labels: ["1  2", "3"],
        description: "A half note and a quarter note in 3/4.",
      },
      caption: "3/4. Half note (beats 1–2) plus quarter (beat 3).",
    },
    {
      type: "heading",
      text: "2/4",
    },
    {
      type: "p",
      text: "Two quarter beats. Marches, polkas, and some fast charts. Count 1 2. The bars look short on the page because they are short.",
    },
    {
      type: "score",
      spec: {
        clef: "treble",
        time: "2/4",
        groups: [{ notes: "G4/8, B4, D5, B4", beam: true }],
        voiceTime: "2/4",
        description: "Four eighth notes in 2/4.",
      },
      caption: "2/4. Four eighths fill the bar: two on beat 1, two on beat 2.",
    },
    {
      type: "heading",
      text: "6/8 is not “six ones”",
    },
    {
      type: "p",
      text: "On paper, 6/8 is six eighth notes. In practice you usually feel two big beats, each split into three: 1-la-li, 2-la-li. That is why the eighths are beamed in two groups of three, not as a row of six, and not as three groups of two (that grouping would look like 3/4).",
    },
    {
      type: "score",
      spec: {
        clef: "treble",
        time: "6/8",
        groups: [
          { notes: "G4/8, A4, B4", beam: true },
          { notes: "C5/8, D5, E5", beam: true },
        ],
        voiceTime: "6/8",
        description:
          "Six eighth notes in 6/8, beamed in two groups of three.",
      },
      caption:
        "6/8. Two beams of three. Beat 1 is the first group; beat 2 is the second.",
    },
    {
      type: "p",
      text: "A dotted quarter in 6/8 lasts one of those big beats — three eighths. Two dotted quarters fill the bar. If you only remember one thing about 6/8: look for groups of three.",
    },
    {
      type: "score",
      spec: {
        clef: "treble",
        time: "6/8",
        notes: "G4/q., D5/q.",
        voiceTime: "6/8",
        labels: ["beat 1", "beat 2"],
        description: "Two dotted quarter notes in 6/8.",
      },
      caption: "Two dotted quarters in 6/8. Each one is a full dotted-beat.",
    },
    {
      type: "callout",
      title: "Bar lines are a checksum",
      text: "The bar line is not decoration. Everything between two bar lines must add up to the time signature. If you are lost in a part, find the bar line, count the values in that bar, and start again on the next 1. That habit will save more gigs than any mnemonic.",
    },
  ],
  quiz: [
    {
      id: "q1",
      type: "choice",
      prompt: "In a time signature, the bottom 4 means:",
      options: [
        "There are four lines on the staff",
        "The quarter note gets the beat",
        "Play four times through the chart",
        "The piece is in four sharps",
      ],
      answer: 1,
      explanation:
        "Bottom number 4 = quarter note is the beat unit. Bottom 8 = eighth note. Bottom 2 = half note.",
    },
    {
      id: "q2",
      type: "choice",
      prompt: "What time signature is this?",
      notation: {
        clef: "treble",
        time: "3/4",
        notes: "G4/q, B4, D5",
        voiceTime: "3/4",
        description: "Three quarter notes after a 3/4 time signature.",
      },
      options: ["4/4", "3/4", "2/4", "6/8"],
      answer: 1,
      explanation: "Top 3, bottom 4: three quarter-note beats per bar.",
    },
    {
      id: "q3",
      type: "choice",
      prompt: "This 4/4 bar — does it add up?",
      notation: {
        clef: "treble",
        time: "4/4",
        notes: "G4/h, A4/q, B4/q",
        voiceTime: "4/4",
        description: "Half note plus two quarter notes in 4/4.",
      },
      options: [
        "Yes: 2 + 1 + 1 = 4",
        "No: a half note already fills the bar",
        "No: there are only three notes, so it is 3/4",
        "Yes, but only in 3/4",
      ],
      answer: 0,
      explanation:
        "Count values, not how many noteheads. Half (2) + quarter (1) + quarter (1) = 4.",
    },
    {
      id: "q4",
      type: "choice",
      prompt: "This 4/4 bar does not add up. What is wrong?",
      notation: {
        clef: "treble",
        time: "4/4",
        notes: "G4/q, A4, B4",
        voiceTime: "3/4",
        description: "Only three quarter notes written in a 4/4 bar.",
      },
      options: [
        "Nothing — three notes can fill 4/4",
        "It totals three beats; 4/4 needs four",
        "Quarter notes are illegal in 4/4",
        "The stems are on the wrong side",
      ],
      answer: 1,
      explanation:
        "Three quarters = three beats. A 4/4 bar still needs one more beat of note or rest.",
    },
    {
      id: "q5",
      type: "choice",
      prompt: "In 6/8, eighth notes are usually grouped as:",
      notation: {
        clef: "treble",
        time: "6/8",
        groups: [
          { notes: "G4/8, B4, D5", beam: true },
          { notes: "C5/8, A4, G4", beam: true },
        ],
        voiceTime: "6/8",
        description: "Eighth notes in 6/8 beamed in two groups of three.",
      },
      options: [
        "Three groups of two (like 3/4)",
        "Two groups of three",
        "One beam of all six",
        "Six separate flagged notes, never beamed",
      ],
      answer: 1,
      explanation:
        "Two groups of three. That is the visual for two dotted-quarter beats. Groups of two would look like 3/4.",
    },
    {
      id: "q6",
      type: "choice",
      prompt: "How many dotted-quarter beats fill a bar of 6/8?",
      options: ["One", "Two", "Three", "Six"],
      answer: 1,
      explanation:
        "Each dotted quarter = three eighths. Two of them = six eighths = one bar of 6/8.",
    },
  ],
};
