/** Inspect a VexFlow SVG so a staff cannot silently look empty. */

const PUA = /[\uE000-\uF8FF]/;
const TREBLE_CLEF = "\uE050";

function glyphBoxOk(root: Element): boolean {
  const nodes = [
    ...(root.matches("text") ? [root] : []),
    ...root.querySelectorAll("text"),
  ];
  for (const node of nodes) {
    if (!PUA.test(node.textContent ?? "")) continue;
    try {
      const box = (node as SVGGraphicsElement).getBBox();
      if (box.width >= 3 && box.height >= 6) return true;
    } catch {
      // Not in the live SVG tree yet.
    }
  }
  return false;
}

function staveLineCount(svg: SVGSVGElement): number {
  const stave = svg.querySelector(".vf-stave");
  if (!stave) return 0;
  return stave.querySelectorAll("path").length;
}

/**
 * After VexFlow draw (including a font-load redraw):
 * - examples with notes/rests need a visible clef plus a notehead or rest
 * - the lesson-1 blank staff needs five lines and a treble clef, and no notes
 */
export function assertStaffDrawn(
  host: HTMLElement,
  spec: { notes?: string; groups?: unknown[]; clef?: string }
): void {
  const svg = host.querySelector("svg");
  if (!(svg instanceof SVGSVGElement)) {
    throw new Error("Staff SVG missing");
  }

  const expectsNotes = Boolean(spec.notes?.trim() || spec.groups?.length);
  const clef = svg.querySelector(".vf-clef");
  if (!clef || !glyphBoxOk(clef)) {
    throw new Error("Clef glyph missing");
  }

  if (staveLineCount(svg) < 5) {
    throw new Error("Staff lines missing");
  }

  const noteheads = [...svg.querySelectorAll(".vf-notehead")];
  const stavenotes = [...svg.querySelectorAll(".vf-stavenote")];

  if (expectsNotes) {
    const hasNoteOrRest =
      noteheads.some(glyphBoxOk) || stavenotes.some(glyphBoxOk);
    if (!hasNoteOrRest) {
      throw new Error("Note or rest glyph missing");
    }
    return;
  }

  if (spec.clef !== "treble" || !clef.textContent?.includes(TREBLE_CLEF)) {
    throw new Error("Blank staff needs a treble clef");
  }
  if (noteheads.length > 0) {
    throw new Error("Blank staff must not have notes");
  }
}
