"use client";

import { useMemo, useState } from "react";
import { Check, TrendingUp, X } from "lucide-react";
import { Staff } from "@/components/staff";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/hooks/use-progress";
import {
  getPracticeLevel,
  NOTE_LETTERS,
  pickNextPitch,
  PRACTICE_LEVELS,
  type PracticeLevelId,
  type PracticePitch,
} from "@/lib/practice-notes";
import { cn } from "@/lib/utils";

type Feedback = { letter: string; correct: boolean };

export function PracticeNotes() {
  const { progress, recordAttempt } = useProgress();
  const [levelId, setLevelId] = useState<PracticeLevelId>("treble-narrow");
  const level = getPracticeLevel(levelId);
  const [current, setCurrent] = useState<PracticePitch>(level.pitches[0]);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  function chooseLevel(nextId: PracticeLevelId) {
    const nextLevel = getPracticeLevel(nextId);
    setLevelId(nextId);
    setCurrent(pickNextPitch(nextLevel));
    setFeedback(null);
  }

  function onPick(letter: string) {
    if (feedback) return;
    const correct = letter === current.letter;
    recordAttempt({ level: levelId, pitch: current.pitch, letter, correct });
    setFeedback({ letter, correct });
  }

  function onNext() {
    setCurrent(pickNextPitch(level, current.pitch));
    setFeedback(null);
  }

  const recent = useMemo(
    () => progress.practice.recent.filter((attempt) => attempt.level === levelId),
    [levelId, progress.practice.recent]
  );
  const recentTen = recent.slice(-10);
  const recentCorrect = recentTen.filter((attempt) => attempt.correct).length;
  const levelAttempts = recent.length;
  const accuracy = progress.practice.accuracy;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
            Practice
          </p>
          <h1 className="font-heading mt-2 text-3xl font-medium tracking-tight sm:text-4xl">
            Read one note at a time
          </h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Pick a range, name the note, and get the answer immediately.
          </p>
        </div>
        <p className="text-sm text-muted-foreground tabular-nums">
          {progress.practice.attempts === 0
            ? "Your progress stays in this browser."
            : `${progress.practice.correct} of ${progress.practice.attempts} correct overall`}
        </p>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-3" aria-label="Practice range">
        {PRACTICE_LEVELS.map((option) => {
          const active = option.id === levelId;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              onClick={() => chooseLevel(option.id)}
              className={cn(
                "rounded-xl border p-4 text-left transition-colors",
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card hover:border-primary/50 hover:bg-muted/45"
              )}
            >
              <span className="block font-semibold">{option.label}</span>
              <span
                className={cn(
                  "mt-1 block text-sm",
                  active ? "text-primary-foreground/80" : "text-muted-foreground"
                )}
              >
                {option.detail}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_15rem]">
        <section className="rounded-2xl border border-border bg-card p-5 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-heading text-xl font-medium">{level.shortLabel}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{level.description}</p>
            </div>
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              {level.clef} clef
            </span>
          </div>

          <Staff
            clef={level.clef}
            notes={`${current.pitch}/w`}
            voiceTime="4/4"
            description={current.description}
          />

          <p className="text-sm font-medium">What letter is this?</p>
          <div className="mt-3 grid grid-cols-7 gap-2" role="group" aria-label="Note name">
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
                    "h-11 min-w-0 px-0 text-base",
                    feedback && selected && !feedback.correct && "border-dashed"
                  )}
                >
                  {letter}
                </Button>
              );
            })}
          </div>

          <div className="mt-5 min-h-[3.25rem]" role="status" aria-live="polite">
            {feedback ? (
              <p
                className={cn(
                  "flex items-start gap-2 rounded-lg border px-3 py-2.5 text-sm leading-relaxed",
                  feedback.correct
                    ? "border-foreground/25 bg-foreground/5"
                    : "border-dashed border-foreground/40"
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
                    ? `That is ${current.letter}.`
                    : `This one is ${current.letter}. Look at whether it sits on a line or in a space before moving on.`}
                </span>
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Use the note’s line or space first. Then count from a landmark note.
              </p>
            )}
          </div>

          <Button size="lg" onClick={onNext} disabled={!feedback} className="mt-5 h-11 px-5">
            Next note
          </Button>
        </section>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-sm font-medium">Last 10 in this range</p>
            <p className="font-heading mt-2 text-3xl font-medium tabular-nums">
              {recentTen.length === 0 ? "—" : `${recentCorrect}/${recentTen.length}`}
            </p>
            <Progress
              value={recentTen.length === 0 ? 0 : (recentCorrect / recentTen.length) * 100}
              className="mt-3"
            />
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {recentTen.length < 5
                ? "Answer five notes to establish a useful reading sample."
                : recentCorrect / recentTen.length >= 0.8
                  ? "This range is settling in. Move up when the answers feel immediate."
                  : "Stay here a little longer. Accuracy comes before speed."}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2">
              <TrendingUp className="size-4" aria-hidden />
              <p className="text-sm font-medium">Progress</p>
            </div>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Recent attempts</dt>
                <dd className="font-medium tabular-nums">{levelAttempts}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Overall accuracy</dt>
                <dd className="font-medium tabular-nums">
                  {progress.practice.attempts === 0 ? "—" : `${Math.round(accuracy * 100)}%`}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Best session</dt>
                <dd className="font-medium tabular-nums">
                  {progress.practice.personalBest.sessionCorrect}
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}
