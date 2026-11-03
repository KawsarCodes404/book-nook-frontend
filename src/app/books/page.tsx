import type { Metadata } from "next";
import { Suspense } from "react";

import { BookGrid } from "@/components/BookGrid";
import { PageHeading } from "@/components/PageHeading";
import type { Book } from "@/lib/books";

export const metadata: Metadata = {
  title: "BookNook | All Books",
  description: "Explore every book on the BookNook shelf.",
};

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

async function getBooks(): Promise<Book[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
      cache: "no-store",
    });

    if (!response.ok) return [];

    return response.json();
  } catch {
    return [];
  }
}

async function BooksResults({
  searchParams,
}: {
  searchParams: PageProps<"/books">["searchParams"];
}) {
  const [params, books] = await Promise.all([searchParams, getBooks()]);
  const requestedCategory = params.category;
  const initialCategory =
    typeof requestedCategory === "string" &&
    categories.includes(requestedCategory)
      ? requestedCategory
      : "all";

  return books.length === 0 ? (
    <p className="rounded-lg border border-dashed border-book-border-strong p-10 text-center text-book-muted">
      No books are on the shelf yet. Check back soon.
    </p>
  ) : (
    <BookGrid books={books} details initialCategory={initialCategory} />
  );
}

function BooksLoading() {
  return (
    <div
      aria-live="polite"
      className="rounded-lg border border-dashed border-book-border-strong p-10 text-center text-book-muted"
    >
      Loading the shelf…
    </div>
  );
}

export default function BooksPage(props: PageProps<"/books">) {
  return (
    <main className="min-h-[60vh] flex-1 bg-book-page text-book-text">
      <PageHeading
        eyebrow="THE COMMUNITY SHELF"
        title="All Books"
        description="Find a story worth sharing, from the shelves of readers nearby."
      />

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <Suspense fallback={<BooksLoading />}>
          <BooksResults searchParams={props.searchParams} />
        </Suspense>
      </section>
    </main>
  );
}
