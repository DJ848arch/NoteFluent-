# NoteFluent

A sequenced web course for reading sheet music — from a blank staff to a simple treble-clef melody with rhythm. Written for complete beginners through early intermediate players, in the voice of a working musician rather than a textbook.

Notation is drawn with [VexFlow](https://www.vexflow.com/), not fake CSS noteheads.

## The path

1. The staff and the two clefs
2. Note names on the treble staff
3. Note names on the bass staff
4. Note values and rests
5. Time signatures (4/4, 3/4, 2/4, 6/8)
6. Accidentals and a first key signature
7. Ledger lines
8. Put it together — read an eight-bar melody

Each lesson has a short “try it” check at the end. Progress is stored in `localStorage` in this browser. No account.

## Practice

`/practice` (also `/practice/notes`) is a separate reading-fluency drill — not more lessons. One whole note on a real VexFlow treble staff; name the letter; immediate feedback; next note.

Pitch set (narrow treble, no ledger lines or accidentals): **G4, A4, B4, C5, D5**.

### Progress storage

- Current key: `as-written-progress-v2` (`version: 2`). Lessons (`completed`, `scores`, `lastSlug`) stay intact.
- Legacy key: `as-written-progress-v1` is still read on load so existing lesson completions migrate.
- Practice fields: `attempts`, `correct`, `accuracy`, `currentLevel` (`treble-narrow`), `session`, `personalBest` (accuracy after 10+ attempts, best session correct count), and a 30-item `recent` window for a later “You’re improving” view. No streaks or coins.

## Run locally

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43127](http://127.0.0.1:43127).

```bash
npm run build
npm start
```

runs the production server on the same port.

## Stack

Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui, VexFlow 5.
