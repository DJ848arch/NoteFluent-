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
