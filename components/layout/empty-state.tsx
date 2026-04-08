import Link from "next/link";

import { MaterialIcon } from "@/components/storefront/material-icon";

type EmptyStateProps = {
  icon: string;
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
};

export function EmptyState({
  icon,
  title,
  description,
  actionHref,
  actionLabel,
}: EmptyStateProps) {
  return (
    <div className="rounded-[2rem] border border-dashed border-outline-variant/40 bg-surface-container-lowest p-10 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        <MaterialIcon className="text-3xl" name={icon} />
      </div>
      <h2 className="mt-5 text-2xl font-bold text-on-surface">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl leading-7 text-on-surface-variant">
        {description}
      </p>
      {actionHref && actionLabel ? (
        <Link
          className="mt-8 inline-flex rounded-full bg-primary px-8 py-4 font-bold text-white transition-opacity hover:opacity-90"
          href={actionHref}
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
