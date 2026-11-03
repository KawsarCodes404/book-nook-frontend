import Link from "next/link";
import { Suspense } from "react";
import {
  ArrowRight,
  Atom,
  BookOpen,
  Compass,
  HeartHandshake,
  Landmark,
  Smile,
} from "lucide-react";

import { HomeHero } from "@/components/HomeHero";
import { BookCard } from "@/components/BookCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { BookShareIllustration } from "@/components/BookShareIllustration";
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

async function NewArrivals() {
  const latestBooks = await getLatestBooks();

  return (
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
        <div className="booknook-empty-state rounded-2xl border border-dashed border-book-border-strong bg-book-surface px-6 py-10 text-center">
          <BookShareIllustration compact />
          <p className="mt-4 font-serif text-xl font-semibold">
            The first story starts with you.
          </p>
          <p className="mt-2 text-sm text-book-muted">
            Add a book to give this neighbourhood shelf its first title.
          </p>
        </div>
      ) : (
        <div
          className={
            latestBooks.length <= 3
              ? "grid grid-cols-[repeat(auto-fit,minmax(min(100%,17rem),19rem))] justify-center gap-6 lg:gap-7"
              : "grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-6 xl:grid-cols-4"
          }
        >
          {latestBooks.map((book, index) => (
            <ScrollReveal
              key={book._id}
              delay={Math.min(index, 4) * 0.06}
              className="h-full"
            >
              <BookCard book={book} priority={index === 0} />
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
  );
}

function NewArrivalsLoading() {
  return (
    <section className="mx-auto min-h-[38rem] max-w-7xl px-6 py-16 lg:px-8">
      <div className="mb-9 text-center">
        <h2 className="font-serif text-3xl font-bold">New Arrivals</h2>
        <p role="status" className="mt-2 text-sm text-book-muted">
          Finding the latest books for the shelf…
        </p>
      </div>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className="aspect-[3/5] animate-pulse rounded-2xl border border-book-border bg-book-surface"
          />
        ))}
      </div>
    </section>
  );
}

export default function Home() {

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
    { name: "Fiction", text: "Novels and short stories", icon: BookOpen },
    { name: "Science", text: "How the world works", icon: Atom },
    { name: "History", text: "Stories from the past", icon: Landmark },
    { name: "Kids", text: "Picture books and more", icon: Smile },
  ];

  return (
    <main className="flex-1 bg-book-page text-book-text">
      <HomeHero />
      <Suspense fallback={<NewArrivalsLoading />}>
        <NewArrivals />
      </Suspense>

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

      <section className="booknook-community-band relative isolate overflow-hidden border-b border-book-border px-6 py-16 lg:px-8">
        <div className="booknook-community-orb booknook-drift" aria-hidden="true" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <ScrollReveal>
            <p className="text-xs font-semibold tracking-[0.2em] text-book-accent-text">
              GOOD STORIES KEEP MOVING
            </p>
            <h2 className="mt-3 max-w-xl font-serif text-3xl font-bold leading-tight sm:text-4xl">
              Your next favourite book might be just around the corner.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-book-muted sm:text-base">
              Discover what your neighbours are reading, then pass a story on
              when you are ready. Every shared book makes the shelf a little
              more local.
            </p>
            <Link
              href="/books"
              className="booknook-action group mt-7 inline-flex items-center gap-2 rounded-full bg-book-accent px-5 py-3 text-sm font-semibold text-book-accent-ink"
            >
              Explore the shelf
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </ScrollReveal>

          <BookShareIllustration />
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
          {topCategories.map(({ name, text, icon: Icon }) => (
            <ScrollReveal key={name} delay={0.05}>
              <Link
                href={`/books?category=${name}`}
                className="booknook-category-card group block rounded-2xl border border-book-border bg-book-surface p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-book-accent hover:shadow-lg"
              >
                <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-book-deep text-book-accent-text transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:scale-110">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-3 font-serif text-lg font-semibold">
                  {name}
                </h3>
                <p className="mt-1 text-xs text-book-muted">{text}</p>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </main>
  );
}
