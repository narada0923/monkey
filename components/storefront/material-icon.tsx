import { CSSProperties } from "react";

import { cn } from "@/lib/utils";

type MaterialIconProps = {
  className?: string;
  filled?: boolean;
  name: string;
  style?: CSSProperties;
};

export function MaterialIcon({
  className,
  filled = false,
  name,
  style,
}: MaterialIconProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("material-symbols-outlined", className)}
      style={{
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
        ...style,
      }}
    >
      {name}
    </span>
  );
}
