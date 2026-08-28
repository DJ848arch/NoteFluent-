import type { Lesson } from "@/lib/types";

export const accidentals: Lesson = {
  slug: "accidentals",
  number: 6,
  title: "Accidentals and a first key signature",
  summary:
    "Sharps, flats, and naturals in a bar, then the one-sharp and one-flat key signatures you will see constantly.",
  minutes: 14,
  objectives: [
    "Name a note with a sharp, flat, or natural",
    "Know that an accidental lasts through the bar",
    "Read a G-major (one sharp) and F-major (one flat) key signature",
  ],
  blocks: [
    {
      type: "p",
      text: "The seven letters are not the whole pitch story. Between most letters there is a half step you can name with a sharp or a flat. The sign in front of the notehead is an accidental. It changes that note without changing the letter you started from.",
    },
    {
      type: "heading",
      text: "Three signs",
    },
    {
      type: "list",
      items: [
        "Sharp (♯) raises the note by a half step. F becomes F♯.",
        "Flat (♭) lowers the note by a half step. B becomes B♭.",
        "Natural (♮) cancels a sharp or flat and returns the note to its unaltered letter.",
      ],
    },
    {
      type: "score",
      spec: {
        clef: "treble",
        notes: "F#4/q, F4, Bb4, Bn4",
        voiceTime: "4/4",
        labels: ["F♯", "F", "B♭", "B♮"],
        description:
          "F sharp, F natural, B flat, and B natural as four quarter notes.",
      },
      caption:
        "Same staff positions, different signs. The letter comes from the line or space; the accidental is printed to the left of the head.",
    },
    {
      type: "heading",
      text: "It lasts until the bar line",
    },
    {
      type: "p",
      text: "If you sharp an F, every later F on that same staff at that same octave stays sharp until the next bar line. You do not reprint the sharp each time (some parts do anyway, as a courtesy). A bar line clears it. The next bar’s F is plain unless the key signature or a new accidental says otherwise.",
    },
    {
      type: "score",
      spec: {
        clef: "treble",
        time: "4/4",
        notes: "F#4/q, G4, F4, A4",
        voiceTime: "4/4",
        labels: ["F♯", "G", "F♯", "A"],
        highlight: [0, 2],
        description:
          "F sharp, G, F (still sharp from the earlier accidental), and A.",
      },
      caption:
        "The third note is still F♯. The accidental on beat 1 covers later Fs in this bar. G and A are untouched.",
    },
    {
      type: "heading",
      text: "Key signature: the standing order",
    },
    {
      type: "p",
      text: "A key signature sits between the clef and the time signature. It is a standing order for the whole piece (or until a new key signature is printed). The two you should be able to read immediately:",
    },
    {
      type: "list",
      items: [
        "One sharp — on F — is G major (or E minor). Every F is F♯ unless a natural shows up.",
        "One flat — on B — is F major (or D minor). Every B is B♭ unless a natural shows up.",
      ],
    },
    {
      type: "score",
      spec: {
        clef: "treble",
        keySignature: "G",
        time: "4/4",
        notes: "G4/q, A4, B4, F5",
        voiceTime: "4/4",
        labels: ["G", "A", "B", "F♯"],
        description:
          "A G major key signature (one sharp) and four quarter notes: G, A, B, and F sharp.",
      },
      caption:
        "G major: one sharp, sitting on F. The last note is on the F line, so it is F♯ even though no extra sharp is printed next to it.",
    },
    {
      type: "score",
      spec: {
        clef: "treble",
        keySignature: "F",
        time: "4/4",
        notes: "F4/q, G4, A4, Bb4",
        voiceTime: "4/4",
        labels: ["F", "G", "A", "B♭"],
        description:
          "An F major key signature (one flat) and four quarter notes: F, G, A, and B flat.",
      },
      caption:
        "F major: one flat, sitting on B. The last note is in the B space, so it is B♭.",
    },
    {
      type: "p",
      text: "A natural in a sharp key is a real event. If the key signature has F♯ and you see a natural on F, that note is F♮ for the rest of the bar. Next bar, the key signature takes over again and F is sharp unless marked.",
    },
    {
      type: "score",
      spec: {
        clef: "treble",
        keySignature: "G",
        time: "4/4",
        notes: "F5/q, Fn5, G5, E5",
        voiceTime: "4/4",
        labels: ["F♯", "F♮", "G", "E"],
        description:
          "In G major, F (sharp from the key), F natural, G, and E.",
      },
      caption:
        "Beat 1 is F♯ from the key signature. Beat 2 is F♮ because of the natural. That natural holds for later Fs in the same bar; here there aren’t any.",
    },
    {
      type: "callout",
      title: "Read the header of the staff first",
      text: "Clef, key signature, time signature — left to right, every system. If you skip the key signature you will play every F or B wrong for the entire chart. That is not a small error. Look left before you look at bar 1.",
    },
  ],
  quiz: [
    {
      id: "q1",
      type: "note",
      prompt: "Name this note, including the accidental.",
      notation: {
        clef: "treble",
        notes: "F#4/w",
        voiceTime: "4/4",
        description: "Whole note F sharp on the bottom space of the treble staff.",
      },
      answer: "F#",
      accidentals: true,
      explanation: "Bottom space is F. The sharp raises it to F♯.",
    },
    {
      id: "q2",
      type: "note",
      prompt: "Name this note, including the accidental.",
      notation: {
        clef: "treble",
        notes: "Bb4/w",
        voiceTime: "4/4",
        description: "Whole note B flat on the middle line of the treble staff.",
      },
      answer: "Bb",
      accidentals: true,
      explanation: "Middle line is B. The flat lowers it to B♭.",
    },
    {
      id: "q3",
      type: "choice",
      prompt: "The third note has no extra sharp printed. What is it?",
      notation: {
        clef: "treble",
        time: "4/4",
        notes: "C#5/q, D5, C5, E5",
        voiceTime: "4/4",
        highlight: [2],
        description:
          "C sharp, D, C (still sharp), and E. The third note is highlighted.",
      },
      options: ["C natural", "C♯ — the bar’s accidental still applies", "D", "C♭"],
      answer: 1,
      explanation:
        "A C♯ on beat 1 covers later Cs in that bar at that octave. Beat 3 is still C♯.",
    },
    {
      id: "q4",
      type: "choice",
      prompt: "This key signature has one sharp. What happens to F?",
      notation: {
        clef: "treble",
        keySignature: "G",
        time: "4/4",
        notes: "F5/w",
        voiceTime: "4/4",
        description: "G major key signature and a whole note F on the top line.",
      },
      options: [
        "F is F♮ unless a sharp is printed next to the note",
        "Every F is F♯ unless a natural (or flat) says otherwise",
        "Only the top-line F is sharp",
        "The sharp applies to G, not F",
      ],
      answer: 1,
      explanation:
        "The sharp in the key signature is written on F. It applies to every F on the staff, any octave, until cancelled.",
    },
    {
      id: "q5",
      type: "note",
      prompt: "Key of F major (one flat). Name the last note.",
      notation: {
        clef: "treble",
        keySignature: "F",
        time: "4/4",
        notes: "F4/q, G4, A4, Bb4",
        voiceTime: "4/4",
        highlight: [3],
        description:
          "F major key signature and four notes, with the last note (B) highlighted.",
      },
      answer: "Bb",
      accidentals: true,
      explanation:
        "The key signature flats every B. The last note sits on the B line, so it is B♭.",
    },
    {
      id: "q6",
      type: "choice",
      prompt: "Key of G major. What is the second note?",
      notation: {
        clef: "treble",
        keySignature: "G",
        time: "4/4",
        notes: "G4/q, Fn4, G4, A4",
        voiceTime: "4/4",
        highlight: [1],
        description:
          "In G major: G, F natural, G, A. The second note is highlighted.",
      },
      options: ["F♯, from the key signature", "F♮, because of the natural", "E", "G♭"],
      answer: 1,
      explanation:
        "The natural cancels the key signature for F in this bar. Second note is F♮.",
    },
  ],
};
