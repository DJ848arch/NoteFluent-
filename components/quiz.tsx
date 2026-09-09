"use client";

import { useMemo, useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Staff } from "@/components/staff";
import { cn } from "@/lib/utils";
import type { QuizQuestion } from "@/lib/types";
import { useProgress } from "@/hooks/use-progress";

const LETTERS = ["A", "B", "C", "D", "E", "F", "G"] as const;
const ACCIDENTAL_CHOICES = [
  { id: "nat", label: "♮ natural", suffix: "" },
  { id: "sharp", label: "♯ sharp", suffix: "#" },
  { id: "flat", label: "♭ flat", suffix: "b" },
] as const;

function normalizeNote(value: string) {
  const trimmed = value
    .trim()
    .replace(/♯/g, "#")
    .replace(/♭/g, "b")
    .replace(/♮/g, "");
  const letter = trimmed.charAt(0).toUpperCase();
  const rest = trimmed.slice(1).toLowerCase().replace("n", "");
  if (rest === "#" || rest === "s") return `${letter}#`;
  if (rest === "b") return `${letter}b`;
  return letter;
}

function formatNote(value: string) {
  const n = normalizeNote(value);
  if (n.endsWith("#")) return `${n[0]}♯`;
  if (n.endsWith("b")) return `${n[0]}♭`;
  return n;
}

function isCorrect(question: QuizQuestion, value: string | number | undefined) {
  if (value === undefined || value === "") return false;
  if (question.type === "choice") return value === question.answer;
  return normalizeNote(String(value)) === normalizeNote(question.answer);
}

type QuizProps = {
  slug: string;
  questions: QuizQuestion[];
};

export function Quiz({ slug, questions }: QuizProps) {
  const { progress, saveScore } = useProgress();
  const saved = progress.scores[slug];
  const [draft, setDraft] = useState<Record<string, string | number> | null>(
    null
  );
  const [checkedOverride, setCheckedOverride] = useState<boolean | null>(null);
  const [missing, setMissing] = useState(false);

  const answers = useMemo(
    () => draft ?? saved?.answers ?? {},
    [draft, saved]
  );
  const checked = checkedOverride ?? Boolean(saved);

  const result = useMemo(() => {
    if (!checked) return null;
    const correct = questions.filter((q) => isCorrect(q, answers[q.id])).length;
    return { correct, total: questions.length };
  }, [answers, checked, questions]);

  function setAnswer(id: string, value: string | number) {
    setDraft((current) => ({ ...(current ?? answers), [id]: value }));
    setMissing(false);
    if (checked) setCheckedOverride(false);
  }

  function onCheck() {
    const unanswered = questions.some(
      (q) => answers[q.id] === undefined || answers[q.id] === ""
    );
    if (unanswered) {
      setMissing(true);
      return;
    }
    const correct = questions.filter((q) => isCorrect(q, answers[q.id])).length;
    setCheckedOverride(true);
    saveScore(slug, { correct, total: questions.length, answers });
  }

  function onRetry() {
    setDraft({});
    setCheckedOverride(false);
    setMissing(false);
  }

  return (
    <section
      aria-labelledby="try-it-heading"
      className="mt-12 scroll-mt-20 rounded-2xl border border-border bg-card p-5 sm:p-8"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
            Try it
          </p>
          <h2
            id="try-it-heading"
            className="font-heading mt-1 text-2xl font-medium tracking-tight"
          >
            Check what you can see
          </h2>
        </div>
        {result ? (
          <p
            className="text-sm text-muted-foreground"
            aria-live="polite"
          >
            {result.correct} of {result.total} correct
          </p>
        ) : null}
      </div>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
        Answer every question, then check. Wrong answers stay visible with the
        right one marked — this is practice, not a gate.
      </p>

      <ol className="mt-8 space-y-10">
        {questions.map((question, index) => {
          const value = answers[question.id];
          const show = checked && value !== undefined;
          const ok = show && isCorrect(question, value);
          const wrong = show && !ok;

          return (
            <li key={question.id} className="border-t border-border pt-8 first:border-t-0 first:pt-0">
              <div className="flex items-start gap-3">
                <span className="font-heading mt-0.5 text-sm text-muted-foreground tabular-nums">
                  {index + 1}.
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-base leading-relaxed text-pretty">{question.prompt}</p>
                  {question.notation ? (
                    <Staff {...question.notation} className="mt-3" />
                  ) : null}

                  {question.type === "choice" ? (
                    <ChoiceOptions
                      question={question}
                      value={typeof value === "number" ? value : undefined}
                      checked={checked}
                      onChange={(next) => setAnswer(question.id, next)}
                    />
                  ) : (
                    <NotePicker
                      accidentals={Boolean(question.accidentals)}
                      value={typeof value === "string" ? value : ""}
                      checked={checked}
                      correctAnswer={question.answer}
                      onChange={(next) => setAnswer(question.id, next)}
                    />
                  )}

                  {show ? (
                    <p
                      className={cn(
                        "mt-4 flex items-start gap-2 rounded-lg border px-3 py-2.5 text-sm leading-relaxed",
                        ok
                          ? "border-foreground/25 bg-foreground/5"
                          : "border-dashed border-foreground/40 bg-transparent"
                      )}
                      role="status"
                    >
                      {ok ? (
                        <Check
                          className="mt-0.5 size-4 shrink-0"
                          aria-hidden
                        />
                      ) : (
                        <X className="mt-0.5 size-4 shrink-0" aria-hidden />
                      )}
                      <span>
                        <span className="font-semibold">
                          {ok ? "Correct. " : "Not quite. "}
                        </span>
                        {wrong ? (
                          <>
                            The answer is{" "}
                            <span className="font-semibold">
                              {question.type === "choice"
                                ? question.options[question.answer]
                                : formatNote(question.answer)}
                            </span>
                            .{" "}
                          </>
                        ) : null}
                        {question.explanation}
                      </span>
                    </p>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button size="lg" onClick={onCheck} className="h-10 px-4">
          Check answers
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={onRetry}
          className="h-10 px-4"
        >
          <RotateCcw data-icon="inline-start" />
          Try again
        </Button>
        {missing ? (
          <p className="text-sm text-foreground" role="alert">
            Answer every question before checking.
          </p>
        ) : null}
      </div>
    </section>
  );
}

function ChoiceOptions({
  question,
  value,
  checked,
  onChange,
}: {
  question: Extract<QuizQuestion, { type: "choice" }>;
  value: number | undefined;
  checked: boolean;
  onChange: (value: number) => void;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Answers"
      className="mt-4 grid gap-2"
    >
      {question.options.map((option, index) => {
        const selected = value === index;
        const isAnswer = index === question.answer;
        const showMark = checked && (selected || isAnswer);

        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(index)}
            onKeyDown={(event) => {
              if (event.key === " " || event.key === "Enter") {
                event.preventDefault();
                onChange(index);
              }
            }}
            className={cn(
              "flex w-full items-start gap-3 rounded-lg border px-3 py-2.5 text-left text-sm leading-snug transition-colors",
              "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
              selected
                ? "border-foreground bg-foreground/6"
                : "border-border bg-background hover:bg-muted/60",
              checked && isAnswer && "border-foreground",
              checked && selected && !isAnswer && "border-dashed"
            )}
          >
            <span
              aria-hidden
              className={cn(
                "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border text-[10px]",
                selected ? "border-foreground" : "border-muted-foreground/40"
              )}
            >
              {selected ? (
                <span className="block size-2 rounded-full bg-foreground" />
              ) : null}
            </span>
            <span className="flex-1">
              {option}
              {showMark ? (
                <span className="mt-1 block text-xs font-medium tracking-wide uppercase">
                  {isAnswer ? "Right answer" : "Your answer"}
                </span>
              ) : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function NotePicker({
  accidentals,
  value,
  checked,
  correctAnswer,
  onChange,
}: {
  accidentals: boolean;
  value: string;
  checked: boolean;
  correctAnswer: string;
  onChange: (value: string) => void;
}) {
  const [pendingAcc, setPendingAcc] = useState<"" | "#" | "b" | null>(null);
  const letter = value ? value.charAt(0).toUpperCase() : "";
  const accFromValue = value.endsWith("#") ? "#" : value.endsWith("b") ? "b" : "";
  const acc = letter ? accFromValue : (pendingAcc ?? "");
  const pressedAcc = letter ? accFromValue : pendingAcc;

  function pickLetter(next: string) {
    onChange(accidentals ? `${next}${acc}` : next);
  }

  function pickAcc(suffix: "" | "#" | "b") {
    if (!letter) {
      setPendingAcc(suffix);
      return;
    }
    onChange(`${letter}${suffix}`);
  }

  return (
    <div className="mt-4 space-y-3">
      {accidentals ? (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Accidental">
          {ACCIDENTAL_CHOICES.map((choice) => (
            <Button
              key={choice.id}
              type="button"
              size="sm"
              variant={pressedAcc === choice.suffix ? "default" : "outline"}
              aria-pressed={pressedAcc === choice.suffix}
              onClick={() => pickAcc(choice.suffix)}
              className="h-8 px-3"
            >
              {choice.label}
            </Button>
          ))}
        </div>
      ) : null}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Note name">
        {LETTERS.map((item) => {
          const selected = letter === item;
          const built = accidentals ? `${item}${acc}` : item;
          const isAnswer =
            checked &&
            normalizeNote(built) === normalizeNote(correctAnswer) &&
            selected;

          return (
            <Button
              key={item}
              type="button"
              variant={selected ? "default" : "outline"}
              aria-pressed={selected}
              onClick={() => pickLetter(item)}
              className={cn(
                "h-10 w-10 px-0 text-base",
                checked && selected && !isAnswer && "border-dashed"
              )}
            >
              {item}
              <span className="sr-only">
                {selected ? " selected" : ""}
              </span>
            </Button>
          );
        })}
      </div>
      {value ? (
        <p className="text-sm text-muted-foreground">
          Selected: <span className="font-medium text-foreground">{formatNote(value)}</span>
        </p>
      ) : (
        <p className="text-sm text-muted-foreground">Select a letter name.</p>
      )}
    </div>
  );
}
