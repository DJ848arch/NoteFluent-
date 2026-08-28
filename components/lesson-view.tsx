"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { LessonBlocks } from "@/components/lesson-blocks";
import { Quiz } from "@/components/quiz";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getAdjacent } from "@/lib/curriculum";
import type { Lesson } from "@/lib/types";
import { useProgress } from "@/hooks/use-progress";
import { markVisited } from "@/lib/progress";
import { useEffect } from "react";

export function LessonView({ lesson }: { lesson: Lesson }) {
  const { prev, next } = getAdjacent(lesson.slug);
  const { progress } = useProgress();
  const score = progress.scores[lesson.slug];
  const done = progress.completed.includes(lesson.slug);

  useEffect(() => {
    markVisited(lesson.slug);
  }, [lesson.slug]);

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <nav className="mb-8 text-sm">
        <Link
          href="/lessons"
          className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" aria-hidden />
          All lessons
        </Link>
      </nav>

      <header>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">Lesson {lesson.number}</Badge>
          <span className="text-sm text-muted-foreground">{lesson.minutes} min</span>
          {done ? (
            <Badge variant="secondary">
              {score
                ? `${score.correct}/${score.total} last check`
                : "Practiced"}
            </Badge>
          ) : null}
        </div>
        <h1 className="font-heading mt-4 text-3xl font-medium tracking-tight text-balance sm:text-4xl">
          {lesson.title}
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
          {lesson.summary}
        </p>
      </header>

      <section
        aria-labelledby="objectives-heading"
        className="mt-8 rounded-2xl border border-border bg-card px-5 py-5"
      >
        <h2
          id="objectives-heading"
          className="text-xs font-semibold tracking-[0.18em] text-primary uppercase"
        >
          What you&apos;ll learn
        </h2>
        <ul className="mt-3 space-y-2">
          {lesson.objectives.map((item) => (
            <li key={item} className="flex gap-2 text-[1.02rem] leading-6">
              <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-10">
        <LessonBlocks blocks={lesson.blocks} />
      </div>

      <Quiz key={lesson.slug} slug={lesson.slug} questions={lesson.quiz} />

      <nav
        className="mt-10 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between"
        aria-label="Lesson sequence"
      >
        {prev ? (
          <Link
            href={`/lessons/${prev.slug}`}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-10 px-4")}
          >
            <ArrowLeft data-icon="inline-start" />
            {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/lessons/${next.slug}`}
            className={cn(buttonVariants({ size: "lg" }), "h-10 px-4")}
          >
            Next: {next.title}
            <ArrowRight data-icon="inline-end" />
          </Link>
        ) : (
          <Link
            href="/lessons"
            className={cn(buttonVariants({ size: "lg" }), "h-10 px-4")}
          >
            Back to the path
          </Link>
        )}
      </nav>
    </article>
  );
}
