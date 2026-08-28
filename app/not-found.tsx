import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-start px-4 py-20">
      <h1 className="font-heading text-3xl font-medium tracking-tight">
        That page is not on the stand
      </h1>
      <p className="mt-3 text-muted-foreground">
        The path is eight lessons. If a link broke, go back to the list.
      </p>
      <Link
        href="/lessons"
        className={cn(buttonVariants({ size: "lg" }), "mt-6 h-10 px-4")}
      >
        All lessons
      </Link>
    </div>
  );
}
