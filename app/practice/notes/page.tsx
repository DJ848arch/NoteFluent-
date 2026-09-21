import type { Metadata } from "next";
import { PracticeNotes } from "@/components/practice-notes";

export const metadata: Metadata = {
  title: "Practice notes",
  description:
    "Practice reading treble and bass clef notes with immediate feedback and saved progress.",
};

export default function PracticeNotesPage() {
  return <PracticeNotes />;
}
