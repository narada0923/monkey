import { cn } from "@/lib/utils";

type StatCardProps = {
  label: string;
  value: string;
  description?: string;
  tone?: "default" | "accent" | "success";
};

export function StatCard({
  label,
  value,
  description,
  tone = "default",
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-[2rem] border border-outline-variant/10 bg-surface-container-low p-6 shadow-sm",
        tone === "accent" && "bg-primary/5",
        tone === "success" && "bg-green-50",
      )}
    >
      <p className="font-label text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">
        {label}
      </p>
      <p className="mt-4 text-3xl font-extrabold tracking-tight text-on-surface">
        {value}
      </p>
      {description ? (
        <p className="mt-2 text-sm leading-6 text-on-surface-variant">
          {description}
        </p>
      ) : null}
    </div>
  );
}
