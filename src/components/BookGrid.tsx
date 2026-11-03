"use client";

import Link from "next/link";
import { useState } from "react";

import { BookImage } from "@/components/BookImage";
import { ScrollReveal } from "@/components/ScrollReveal";
import type { Book } from "@/lib/books";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

type BookGridProps = {
  books: Book[];
  details?: boolean;
  initialCategory?: string;
};

export function BookGrid({
  books,
  details = false,
  initialCategory = "all",
}: BookGridProps) {
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState("");

  const visibleBooks = books.filter((book) => {
    const matchesCategory = category === "all" || book.category === category;
    const matchesSearch = `${book.title} ${book.author}`
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {details && (
        <div className="mb-6 grid gap-3 sm:grid-cols-[1fr_220px]">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by title or author"
            className="h-11 rounded-md border border-book-border-strong bg-book-surface px-4 text-sm outline-none focus:border-book-accent"
          />

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="h-11 rounded-md border border-book-border-strong bg-book-surface px-4 text-sm outline-none focus:border-book-accent"
          >
            <option value="all">All categories</option>
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      )}

      {visibleBooks.length === 0 ? (
        <p className="rounded-lg border border-dashed border-book-border-strong p-10 text-center text-book-muted">
          No books found. Try a different search.
        </p>
      ) : (
        <div
          className={
            visibleBooks.length <= 3
              ? "flex flex-wrap justify-center gap-5"
              : "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          }
        >
          {visibleBooks.map((book, index) => (
            <ScrollReveal
              key={book._id}
              delay={Math.min(index % 5, 4) * 0.04}
              className={visibleBooks.length <= 3 ? "w-full max-w-[250px]" : ""}
            >
              <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-book-border bg-book-surface shadow-sm shadow-black/5 transition duration-300 hover:-translate-y-1 hover:border-book-border-hover hover:shadow-lg">
                <div className="relative aspect-[3/4] bg-book-input">
                  <BookImage
                    src={book.image}
                    alt={`${book.title} cover`}
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 28vw, 20vw"
                    priority={index === 0}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-3">
                  <span className="rounded bg-book-input px-2 py-1 text-[10px] text-book-chip-text">
                    {book.category}
                  </span>

                  <h2 className="mt-2 line-clamp-2 min-h-10 font-serif text-sm font-semibold">
                    {book.title}
                  </h2>
                  <p className="mt-1 truncate text-xs text-book-muted">
                    by {book.author}
                  </p>
                  <p className="mt-2 text-xs text-book-muted">
                    {book.availableCopies} available
                  </p>

                  <Link
                    href={`/books/${book._id}`}
                    className="booknook-action mt-auto flex w-full justify-center rounded-md bg-book-accent px-2 py-2 text-xs font-semibold text-book-accent-ink hover:bg-book-accent-hover"
                  >
                    View Details
                  </Link>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      )}
    </>
  );
}
