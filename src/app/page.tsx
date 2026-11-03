import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Compass,
  HeartHandshake,
  LibraryBig,
} from "lucide-react";

import { HomeHero } from "@/components/HomeHero";
import { BookImage } from "@/components/BookImage";
import { ScrollReveal } from "@/components/ScrollReveal";
import type { Book } from "@/lib/books";

export const metadata = {
  title: "BookNook | Home",
  description:
    "Find, share, and borrow books with readers in your neighbourhood.",
};

async function getLatestBooks(): Promise<Book[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/books?limit=6`,
      { cache: "no-store" },
    );

    if (!response.ok) return [];

    return response.json();
  } catch {
    return [];
  }
}

export default async function Home() {
  const latestBooks = await getLatestBooks();

  const borrowingSteps = [
    {
      icon: Compass,
      step: "Step 1",
      title: "Find a book",
      text: "Browse the shelf and open any book you like.",
    },
    {
      icon: BookOpen,
      step: "Step 2",
      title: "Borrow it",
      text: "Confirm the borrow. The book is yours for 7 days.",
    },
    {
      icon: HeartHandshake,
      step: "Step 3",
      title: "Return it",
      text: "Done reading? Return it from My Borrows in one click.",
    },
  ];

  const topCategories = [
    { name: "Fiction", text: "Novels and short stories" },
    { name: "Science", text: "How the world works" },
    { name: "History", text: "Stories from the past" },
    { name: "Kids", text: "Picture books and more" },
  ];

  return (
    <main className="flex-1 bg-book-page text-book-text">
      <HomeHero />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-9 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-book-accent-text">
            FRESH ON THE SHELF
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold">New Arrivals</h2>
          <p className="mt-2 text-sm text-book-muted">
            The latest books added by our readers.
          </p>
        </div>

        {latestBooks.length === 0 ? (
          <p className="rounded-lg border border-dashed border-book-border-strong p-10 text-center text-book-muted">
            The shelf is waiting for its first books. Be the first to add one.
          </p>
        ) : (
          <div
            className={
              latestBooks.length <= 3
                ? "flex flex-wrap justify-center gap-5"
                : "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6"
            }
          >
            {latestBooks.map((book, index) => (
              <ScrollReveal
                key={book._id}
                delay={index * 0.06}
                className={
                  latestBooks.length <= 3 ? "w-full max-w-[250px]" : ""
                }
              >
                <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-book-border bg-book-surface shadow-sm shadow-black/5 transition duration-300 hover:-translate-y-1 hover:border-book-border-hover hover:shadow-lg">
                  <div className="relative aspect-[3/4] bg-book-input">
                    <BookImage
                      src={book.image}
                      alt={`${book.title} cover`}
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 28vw, 16vw"
                      priority={index === 0}
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-3">
                    <span className="rounded bg-book-input px-2 py-1 text-[10px] text-book-chip-text">
                      {book.category}
                    </span>
                    <h3 className="mt-2 line-clamp-2 min-h-10 font-serif text-sm font-semibold">
                      {book.title}
                    </h3>
                    <p className="mt-1 truncate text-xs text-book-muted">
                      by {book.author}
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

        <div className="mt-8 text-center">
          <Link
            href="/books"
            className="booknook-action inline-flex items-center gap-2 rounded-md border border-book-border-strong px-4 py-2 text-sm hover:bg-book-surface"
          >
            See All Books
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <section className="border-y border-book-border bg-book-surface px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 text-center">
            <h2 className="font-serif text-3xl font-bold">
              How Borrowing Works
            </h2>
            <p className="mt-2 text-sm text-book-muted">
              Three steps. No library card needed.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {borrowingSteps.map(({ icon: Icon, step, title, text }) => (
              <ScrollReveal key={step} delay={0.08}>
                <article className="h-full rounded-xl border border-book-border bg-book-deep p-7 text-center transition duration-300 hover:-translate-y-1 hover:border-book-border-hover">
                  <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-book-accent text-book-accent-ink">
                    <Icon className="size-5" />
                  </span>
                  <p className="mt-4 text-xs font-semibold text-book-warm">
                    {step}
                  </p>
                  <h3 className="mt-1 font-serif text-xl font-semibold">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-book-muted">{text}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-9 text-center">
          <h2 className="font-serif text-3xl font-bold">Top Categories</h2>
          <p className="mt-2 text-sm text-book-muted">
            Pick a shelf and start reading.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {topCategories.map((category) => (
            <ScrollReveal key={category.name} delay={0.05}>
              <Link
                href={`/books?category=${category.name}`}
                className="block rounded-xl border border-book-border bg-book-surface p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-book-accent hover:shadow-md"
              >
                <LibraryBig className="mx-auto size-6 text-book-accent-text" />
                <h3 className="mt-3 font-serif text-lg font-semibold">
                  {category.name}
                </h3>
                <p className="mt-1 text-xs text-book-muted">{category.text}</p>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </main>
  );
}
