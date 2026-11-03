"use client";

import { useState } from "react";

import { BookCard } from "@/components/BookCard";
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
              ? "grid grid-cols-[repeat(auto-fit,minmax(min(100%,17rem),19rem))] justify-center gap-6 lg:gap-7"
              : "grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 xl:grid-cols-5"
          }
        >
          {visibleBooks.map((book, index) => (
            <ScrollReveal
              key={book._id}
              delay={Math.min(index % 5, 4) * 0.04}
              className="h-full"
            >
              <BookCard book={book} priority={index === 0} />
            </ScrollReveal>
          ))}
        </div>
      )}
    </>
  );
}
