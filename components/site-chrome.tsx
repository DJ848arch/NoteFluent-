"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useProgress } from "@/hooks/use-progress";

export function SiteHeader() {
  const pathname = usePathname();
  const { completedCount, total } = useProgress();

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="staff-rule" aria-hidden />
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-heading text-lg font-medium tracking-tight">
            NoteFluent
          </span>
          <span className="hidden text-sm text-muted-foreground sm:inline">
            a reading path
          </span>
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-3">
          <Link
            href="/lessons"
            className={cn(
              "rounded-md px-2.5 py-1.5 text-sm font-medium",
              pathname.startsWith("/lessons")
                ? "bg-foreground/8 text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Lessons
          </Link>
          <p
            className="rounded-md px-2 py-1 text-xs text-muted-foreground tabular-nums sm:text-sm"
            aria-label={`${completedCount} of ${total} lessons practiced`}
          >
            {completedCount}/{total}
          </p>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-1 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>NoteFluent — learn to read the notes on the page.</p>
        <p>Progress stays in this browser. No account.</p>
      </div>
    </footer>
  );
}
