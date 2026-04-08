import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageIntroProps = {
  title: string;
  description: string;
  eyebrow?: string;
  actions?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function PageIntro({
  title,
  description,
  eyebrow,
  actions,
  align = "left",
  className,
}: PageIntroProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        align === "center" && "items-center text-center md:flex-col md:items-center",
        className,
      )}
    >
      <div className={cn("space-y-3", align === "center" && "max-w-3xl")}>
        {eyebrow ? (
          <p className="font-label text-xs font-bold uppercase tracking-[0.24em] text-primary">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-4xl font-extrabold tracking-tight text-on-surface md:text-5xl">
          {title}
        </h1>
        <p className="max-w-2xl text-base leading-7 text-on-surface-variant md:text-lg">
          {description}
        </p>
      </div>

      {actions ? <div className="shrink-0">{actions}</div> : null}
    </div>
  );
}
