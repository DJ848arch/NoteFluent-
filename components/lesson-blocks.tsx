import { Staff } from "@/components/staff";
import type { ContentBlock } from "@/lib/types";

export function LessonBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="lesson-prose">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return (
              <h2
                key={index}
                className="font-heading mt-10 mb-3 text-xl font-medium tracking-tight sm:text-2xl"
              >
                {block.text}
              </h2>
            );
          case "p":
            return (
              <p
                key={index}
                className="mb-4 text-[1.05rem] leading-7 text-pretty"
              >
                {block.text}
              </p>
            );
          case "list":
            return (
              <ul key={index} className="mb-4 list-disc space-y-2 pl-5 text-[1.05rem] leading-7">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "callout":
            return (
              <aside
                key={index}
                className="my-6 rounded-xl border border-border bg-accent/60 px-4 py-4 sm:px-5"
              >
                <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
                  {block.title}
                </p>
                <p className="mt-2 text-[1.02rem] leading-7 text-pretty">{block.text}</p>
              </aside>
            );
          case "score":
            return (
              <Staff
                key={index}
                {...block.spec}
                caption={block.caption}
              />
            );
        }
      })}
    </div>
  );
}
