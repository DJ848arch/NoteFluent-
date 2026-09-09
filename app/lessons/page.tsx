"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { lessons } from "@/lib/curriculum";
import { useProgress } from "@/hooks/use-progress";

export default function LessonsPage() {
  const { completedCount, total, nextLesson, progress, reset } = useProgress();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
        Curriculum
      </p>
      <h1 className="font-heading mt-2 text-3xl font-medium tracking-tight sm:text-4xl">
        Eight lessons, in order
      </h1>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
        Work them in sequence if you are starting from zero. Skip ahead if you
        already own a piece of it — every lesson is open. Each one ends with a
        short written check.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <p className="text-sm text-muted-foreground tabular-nums">
          {completedCount} of {total} practiced
        </p>
        <Link
          href={`/lessons/${nextLesson.slug}`}
          className={cn(buttonVariants({ size: "lg" }), "h-10 px-4")}
        >
          {completedCount === 0 ? "Start lesson 1" : `Continue: ${nextLesson.title}`}
          <ArrowRight data-icon="inline-end" />
        </Link>
      </div>

      <ol className="mt-10 space-y-3">
        {lessons.map((lesson) => {
          const done = progress.completed.includes(lesson.slug);
          const score = progress.scores[lesson.slug];
          const isNext = nextLesson.slug === lesson.slug && completedCount < total;

          return (
            <li key={lesson.slug}>
              <Link
                href={`/lessons/${lesson.slug}`}
                className={cn(
                  "block rounded-2xl border bg-card px-5 py-4 transition-colors hover:bg-muted/40",
                  isNext ? "border-foreground/30" : "border-border"
                )}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-heading text-sm text-muted-foreground tabular-nums">
                    {String(lesson.number).padStart(2, "0")}
                  </span>
                  {done ? <Badge variant="secondary">Practiced</Badge> : null}
                  {isNext ? <Badge variant="outline">Up next</Badge> : null}
                  <span className="text-sm text-muted-foreground">
                    {lesson.minutes} min
                  </span>
                  {score ? (
                    <span className="text-sm text-muted-foreground tabular-nums">
                      Last check {score.correct}/{score.total}
                    </span>
                  ) : null}
                </div>
                <h2 className="font-heading mt-2 text-xl font-medium tracking-tight">
                  {lesson.title}
                </h2>
                <p className="mt-1 text-[1.02rem] leading-7 text-muted-foreground">
                  {lesson.summary}
                </p>
              </Link>
            </li>
          );
        })}
      </ol>

      <div className="mt-12 rounded-2xl border border-border px-5 py-5">
        <h2 className="font-heading text-lg font-medium">Reset this browser</h2>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Clears lesson checks and practice attempts stored in localStorage on
          this device.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-3 h-9 px-3"
          onClick={() => {
            if (
              window.confirm(
                "Clear all saved lesson and practice progress in this browser?"
              )
            ) {
              reset();
            }
          }}
        >
          Reset progress
        </Button>
      </div>
    </div>
  );
}
