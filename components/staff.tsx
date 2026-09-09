"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { notationFontsReady } from "@/lib/notation-fonts";
import { assertStaffDrawn } from "@/lib/staff-drawn";
import type { ScoreSpec } from "@/lib/types";

type StaffProps = ScoreSpec & {
  caption?: string;
  className?: string;
};

function voiceTimeFor(spec: ScoreSpec) {
  return spec.voiceTime ?? spec.time ?? "4/4";
}

function pinSvgSize(el: HTMLDivElement, width: number, height: number) {
  const svg = el.querySelector("svg");
  if (!(svg instanceof SVGSVGElement)) return;
  svg.setAttribute("width", String(width));
  svg.setAttribute("height", String(height));
  svg.style.width = `${width}px`;
  svg.style.height = `${height}px`;
  svg.style.maxWidth = "none";
}

async function renderScore(
  el: HTMLDivElement,
  spec: ScoreSpec,
  width: number
) {
  const { Factory, Renderer, VexFlow } = await import("vexflow");
  VexFlow.setFonts("Bravura", "Academico");

  el.replaceChildren();

  const hasLabels = Boolean(spec.labels?.some(Boolean));
  const height = hasLabels ? 184 : 152;

  const renderer = new Renderer(el, Renderer.Backends.SVG);
  renderer.resize(width, height);
  const context = renderer.getContext();
  context.setFillStyle("#1c1712");
  context.setStrokeStyle("#1c1712");

  const vf = new Factory({
    renderer: { elementId: null, width, height },
  });
  vf.setContext(context);

  const staveWidth = Math.max(width - 16, 220);
  const hasNotes = Boolean(spec.notes || spec.groups?.length);

  if (!hasNotes) {
    const stave = vf.Stave({ x: 8, y: 20, width: staveWidth });
    if (spec.clef) stave.addClef(spec.clef);
    if (spec.keySignature) stave.addKeySignature(spec.keySignature);
    if (spec.time) stave.addTimeSignature(spec.time);
    vf.draw();
    pinSvgSize(el, width, height);
    return;
  }

  const clef = spec.clef ?? "treble";
  const score = vf.EasyScore();
  score.set({
    clef,
    time: voiceTimeFor(spec),
  });

  const stem = spec.stem ?? "up";
  const built = spec.groups?.length
    ? spec.groups.flatMap((group) => {
        const notes = score.notes(group.notes, {
          stem: group.stem ?? stem,
          clef,
        });
        if (group.beam) score.beam(notes);
        return notes;
      })
    : score.notes(spec.notes ?? "", { stem, clef });

  if (!spec.groups && spec.beam) {
    score.beam(built);
  }

  built.forEach((note, index) => {
    const label = spec.labels?.[index];
    if (label) {
      note.addModifier(
        vf.Annotation({
          text: label,
          vJustify: "bottom",
          font: {
            family: "Source Sans 3, ui-sans-serif, sans-serif",
            size: 13,
            weight: "600",
          },
        })
      );
    }
    if (spec.highlight?.includes(index)) {
      note.setStyle({
        fillStyle: "#8b3d2a",
        strokeStyle: "#8b3d2a",
      });
    }
  });

  const system = vf.System({
    x: 8,
    y: 10,
    width: staveWidth,
    spaceBetweenStaves: 8,
  });

  const stave = system.addStave({
    voices: [score.voice(built, { time: voiceTimeFor(spec) })],
  });

  if (spec.clef) stave.addClef(spec.clef);
  if (spec.keySignature) stave.addKeySignature(spec.keySignature);
  if (spec.time) stave.addTimeSignature(spec.time);

  vf.draw();
  pinSvgSize(el, width, height);
}

export function Staff({ caption, className, ...spec }: StaffProps) {
  const reactId = useId();
  const elementId = `staff-${reactId.replace(/:/g, "")}`;
  const wrapRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const specJson = JSON.stringify(spec);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    const wrap = wrapRef.current;
    if (!host || !wrap) return;

    const parsed = JSON.parse(specJson) as ScoreSpec;
    let cancelled = false;
    let timer = 0;

    const draw = async () => {
      if (cancelled || !host.isConnected) return;
      try {
        await notationFontsReady();
        if (cancelled || !host.isConnected) return;
        const inner = Math.floor(wrap.clientWidth - 16);
        const width = Math.max(inner > 0 ? inner : Math.floor(wrap.clientWidth) || 0, 280);
        let lastError: unknown;
        for (let attempt = 0; attempt < 4; attempt++) {
          await renderScore(host, parsed, width);
          if (cancelled || !host.isConnected) return;
          try {
            assertStaffDrawn(host, parsed);
            setFailed(false);
            return;
          } catch (error) {
            lastError = error;
            await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));
          }
        }
        throw lastError;
      } catch (error) {
        console.error("Failed to render staff", error);
        if (!cancelled) setFailed(true);
      }
    };

    const schedule = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        void draw();
      }, 40);
    };

    schedule();

    const observer = new ResizeObserver(schedule);
    observer.observe(wrap);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [specJson]);

  return (
    <figure className={cn("staff-figure my-4", className)}>
      <div
        ref={wrapRef}
        className="staff-paper relative overflow-x-auto rounded-lg px-2 py-3"
      >
        <div
          id={elementId}
          ref={hostRef}
          className={cn(
            "staff-host mx-auto min-h-[152px]",
            failed && "opacity-0"
          )}
          role="img"
          aria-hidden={failed}
          aria-label={failed ? undefined : spec.description}
        />
        {failed ? (
          <p className="staff-paper absolute inset-0 z-10 flex items-center justify-center rounded-lg px-3 py-8 text-center text-sm text-muted-foreground">
            This example could not be drawn. Refresh the page and try again.
          </p>
        ) : null}
      </div>
      {caption ? (
        <figcaption className="mt-2 px-1 text-sm leading-relaxed text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
