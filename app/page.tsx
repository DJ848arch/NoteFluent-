"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Staff } from "@/components/staff";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { lessons } from "@/lib/curriculum";
import { useProgress } from "@/hooks/use-progress";

export default function HomePage() {
  const { completedCount, total, continueSlug, nextLesson, progress } =
    useProgress();
  const started = completedCount > 0 || Boolean(progress.lastSlug);
  const continueLesson =
    lessons.find((lesson) => lesson.slug === continueSlug) ?? lessons[0];

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
      <section className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            Reading, not theory class
          </p>
          <h1 className="font-heading mt-3 text-4xl font-medium tracking-tight text-balance sm:text-5xl">
            Learn to read what&apos;s on the page.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-pretty">
            I&apos;m Daniel. I read charts for a living. This is a straight path
            from a blank staff to a simple treble melody with rhythm — the
            same scan I use when a part lands on the stand and the count-in is
            already happening.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={started ? `/lessons/${continueLesson.slug}` : "/lessons/staff-and-clefs"}
              className={cn(buttonVariants({ size: "lg" }), "h-11 px-5")}
            >
              {started ? "Continue" : "Start with the staff"}
              <ArrowRight data-icon="inline-end" />
            </Link>
            <Link
              href="/lessons"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 px-5"
              )}
            >
              See the path
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            {completedCount === 0
              ? `${total} lessons. Progress is saved in this browser.`
              : `${completedCount} of ${total} lessons practiced. Next up: ${nextLesson.title}.`}
          </p>
        </div>
        <div>
          <Staff
            clef="treble"
            keySignature="G"
            time="4/4"
            notes="G4/q, B4, D5, B4"
            voiceTime="4/4"
            description="A bar of four quarter notes in G major: G, B, D, B."
            caption="You will be able to name these notes, their lengths, and why the F line would be sharp if it showed up."
          />
        </div>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-heading text-xl font-medium">What this is</h2>
          <ul className="mt-4 space-y-2 text-[1.02rem] leading-7">
            <li>Staff, clefs, and letter names in treble then bass</li>
            <li>Note values, rests, and four time signatures</li>
            <li>Accidentals, G major / F major key signatures, ledger lines</li>
            <li>A short melody that uses all of it</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-heading text-xl font-medium">What this is not</h2>
          <ul className="mt-4 space-y-2 text-[1.02rem] leading-7">
            <li>Ear training, harmony, or how to compose</li>
            <li>An instrument method — bring your own axe</li>
            <li>A history of notation or a conservatory syllabus</li>
            <li>A substitute for sitting with real parts after lesson 8</li>
          </ul>
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-heading text-2xl font-medium tracking-tight">
            The path
          </h2>
          <Link
            href="/lessons"
            className="text-sm font-medium text-primary hover:underline"
          >
            Open all lessons
          </Link>
        </div>
        <ol className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
          {lessons.map((lesson) => {
            const done = progress.completed.includes(lesson.slug);
            const score = progress.scores[lesson.slug];
            return (
              <li key={lesson.slug}>
                <Link
                  href={`/lessons/${lesson.slug}`}
                  className="flex flex-col gap-1 px-5 py-4 transition-colors hover:bg-muted/50 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-heading w-6 text-sm text-muted-foreground tabular-nums">
                      {String(lesson.number).padStart(2, "0")}
                    </span>
                    <span className="font-medium">{lesson.title}</span>
                  </span>
                  <span className="pl-9 text-sm text-muted-foreground sm:pl-0">
                    {done && score
                      ? `${score.correct}/${score.total} · ${lesson.minutes} min`
                      : `${lesson.minutes} min`}
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
