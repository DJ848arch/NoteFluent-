"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { Staff } from "@/components/staff";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/hooks/use-progress";
import {
  NOTE_LETTERS,
  NARROW_TREBLE_PITCHES,
  PRACTICE_LEVEL_NARROW_TREBLE,
  pickNextPitch,
  type NarrowTreblePitch,
} from "@/lib/practice-notes";
import { cn } from "@/lib/utils";

type Feedback = {
  letter: string;
  correct: boolean;
};

export function PracticeNotes() {
  const { progress, recordAttempt } = useProgress();
  const [current, setCurrent] = useState<NarrowTreblePitch>(
    NARROW_TREBLE_PITCHES[0]
  );
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  function onPick(letter: string) {
    if (feedback) return;
    const correct = letter === current.letter;
    recordAttempt({
      level: PRACTICE_LEVEL_NARROW_TREBLE,
      pitch: current.pitch,
      letter,
      correct,
    });
    setFeedback({ letter, correct });
  }

  function onNext() {
    setCurrent(pickNextPitch(current.pitch));
    setFeedback(null);
  }

  const practiced = progress.practice.attempts;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
        Practice
      </p>
      <h1 className="font-heading mt-2 text-3xl font-medium tracking-tight sm:text-4xl">
        Name the note
      </h1>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
        Five naturals around the middle of the treble staff — G, A, B, C, D.
        No ledger lines, no sharps or flats. Say the letter, then the next
        note.
      </p>

      <div className="mt-8 rounded-2xl border border-border bg-card p-5 sm:p-8">
        <Staff
          clef="treble"
          notes={`${current.pitch}/w`}
          voiceTime="4/4"
          description={current.description}
        />

        <p className="mt-2 text-sm text-muted-foreground">
          What letter is this?
        </p>

        <div
          className="mt-4 flex flex-wrap gap-2"
          role="group"
          aria-label="Note name"
        >
          {NOTE_LETTERS.map((letter) => {
            const selected = feedback?.letter === letter;
            const isAnswer = feedback !== null && letter === current.letter;

            return (
              <Button
                key={letter}
                type="button"
                variant={selected || isAnswer ? "default" : "outline"}
                aria-pressed={selected}
                disabled={feedback !== null}
                onClick={() => onPick(letter)}
                className={cn(
                  "h-10 w-10 px-0 text-base",
                  feedback && selected && !feedback.correct && "border-dashed"
                )}
              >
                {letter}
              </Button>
            );
          })}
        </div>

        <div
          className="mt-5 min-h-[3.25rem]"
          role="status"
          aria-live="polite"
        >
          {feedback ? (
            <p
              className={cn(
                "flex items-start gap-2 rounded-lg border px-3 py-2.5 text-sm leading-relaxed",
                feedback.correct
                  ? "border-foreground/25 bg-foreground/5"
                  : "border-dashed border-foreground/40 bg-transparent"
              )}
            >
              {feedback.correct ? (
                <Check className="mt-0.5 size-4 shrink-0" aria-hidden />
              ) : (
                <X className="mt-0.5 size-4 shrink-0" aria-hidden />
              )}
              <span>
                <span className="font-semibold">
                  {feedback.correct ? "Correct. " : "Not quite. "}
                </span>
                {feedback.correct
                  ? "That is the letter."
                  : `This one is ${current.letter}.`}
              </span>
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Choose a letter. You will know right away if it is right.
            </p>
          )}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            size="lg"
            onClick={onNext}
            disabled={!feedback}
            className="h-10 px-4"
          >
            Next note
          </Button>
          <p className="text-sm text-muted-foreground tabular-nums">
            {practiced === 0
              ? "Progress stays in this browser."
              : `${progress.practice.correct} of ${practiced} correct`}
          </p>
        </div>
      </div>
    </div>
  );
}
