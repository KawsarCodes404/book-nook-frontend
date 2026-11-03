import Link from "next/link";
import { ArrowRight, BookMarked } from "lucide-react";

import { BookImage } from "@/components/BookImage";
import type { Book } from "@/lib/books";

type BookCardProps = {
  book: Book;
  priority?: boolean;
};

function getDisplayText(value: string | undefined, fallback: string) {
  const text = value?.trim();

  // Avoid showing malformed placeholder text from an incomplete book record.
  if (!text || /^\[[^\]]*\[[^\]]*$/.test(text)) {
    return fallback;
  }

  return text;
}

export function BookCard({ book, priority = false }: BookCardProps) {
  const title = getDisplayText(book.title, "Book title unavailable");
  const author = getDisplayText(book.author, "Author unavailable");
  const availableCopies = Number.isFinite(book.availableCopies)
    ? book.availableCopies
    : 0;

  return (
    <article className="booknook-book-card group flex h-full flex-col overflow-hidden rounded-2xl border border-book-border bg-book-surface shadow-sm shadow-black/5">
      <div className="booknook-cover relative aspect-[3/4] overflow-hidden bg-book-input">
        <BookImage
          src={book.image}
          alt={`${title} cover`}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 42vw, 260px"
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          showFallbackLabel
        />

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/75 via-black/30 to-transparent px-4 pb-4 pt-12">
          <span className="rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
            {book.category || "Uncategorized"}
          </span>

          <span className="shrink-0 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#302027] shadow-sm">
            {availableCopies > 0
              ? `${availableCopies} available`
              : "All borrowed"}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.13em] text-book-accent-text">
          <BookMarked className="size-3.5" aria-hidden="true" />
          <span>On the community shelf</span>
        </div>

        <h2 className="mt-3 line-clamp-2 min-h-[3.5rem] font-serif text-lg font-semibold leading-7 text-book-text">
          {title}
        </h2>

        <p className="mt-1 truncate text-sm text-book-muted">by {author}</p>

        <Link
          href={`/books/${book._id}`}
          className="booknook-action group/action mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-book-accent px-4 py-3 text-sm font-semibold text-book-accent-ink hover:bg-book-accent-hover"
        >
          View book details
          <ArrowRight className="size-4 transition-transform duration-300 group-hover/action:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
