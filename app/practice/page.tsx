import type { Metadata } from "next";
import { PracticeNotes } from "@/components/practice-notes";

export const metadata: Metadata = {
  title: "Practice",
  description:
    "Name notes on a narrow treble range. Immediate feedback, then the next note.",
};

export default function PracticePage() {
  return <PracticeNotes />;
}
