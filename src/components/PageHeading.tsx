import type { LucideIcon } from "lucide-react";

type PageHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon?: LucideIcon;
};

export function PageHeading({ eyebrow, title, description, icon: Icon }: PageHeadingProps) {
  return (
    <section className="booknook-page-heading relative isolate overflow-hidden border-b border-book-border bg-book-surface px-6 py-10 text-center sm:py-12">
      <div aria-hidden="true" className="booknook-header-glow pointer-events-none absolute -right-20 -top-28 -z-10 size-80 rounded-full" />
      <div aria-hidden="true" className="booknook-heading-orbit pointer-events-none absolute -left-16 bottom-[-5rem] -z-10 size-48 rounded-full" />
      <p className="text-[11px] font-semibold tracking-[0.24em] text-book-accent-text">{eyebrow}</p>
      <h1 className="mt-2 inline-flex items-center justify-center gap-3 font-serif text-4xl font-bold tracking-tight sm:text-5xl">
        {title}
        {Icon && (
          <span className="flex size-10 items-center justify-center rounded-xl border border-book-border bg-book-page text-book-accent-text shadow-sm">
            <Icon className="size-5" />
          </span>
        )}
      </h1>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-book-muted sm:text-base">{description}</p>
    </section>
  );
}
