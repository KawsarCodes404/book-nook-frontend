import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, LibraryBig } from "lucide-react";
import { BorrowBook } from "@/components/BorrowBook";
import { BookImage } from "@/components/BookImage";
import type { Book } from "@/lib/books";

async function getBook(id: string): Promise<Book | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/books/${id}`,
      { cache: "no-store" },
    );
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

export async function generateMetadata(
  props: PageProps<"/books/[id]">,
): Promise<Metadata> {
  const { id } = await props.params;
  const book = await getBook(id);
  return {
    title: book ? `BookNook | ${book.title}` : "BookNook | Book Details",
  };
}

async function BookDetailsContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await getBook(id);
  if (!book) notFound();

  return (
    <main className="relative isolate flex flex-1 items-center overflow-hidden bg-book-page px-5 py-12 text-book-text sm:px-6 lg:py-16">
      <div aria-hidden="true" className="booknook-detail-orb booknook-drift absolute -right-32 top-10 -z-10 size-[28rem] rounded-full" />
      <section className="mx-auto grid w-full max-w-6xl items-center gap-9 md:grid-cols-[minmax(280px,0.8fr)_1.2fr] md:gap-14">
        <div className="booknook-detail-cover relative mx-auto w-full max-w-md rounded-[2rem] border border-book-border bg-book-surface p-3 shadow-2xl shadow-black/10">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[1.4rem] bg-book-input">
            <BookImage
              src={book.image}
              alt={`${book.title} cover`}
              sizes="(max-width: 768px) 90vw, 40vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.025]"
              priority
            />
          </div>
          <div className="absolute -bottom-4 -right-3 flex size-14 items-center justify-center rounded-2xl border border-book-border bg-book-accent text-book-accent-ink shadow-lg sm:-right-5">
            <BookOpen className="size-6" />
          </div>
        </div>

        <div className="pt-2">
          <Link href="/books" className="mb-8 inline-flex items-center gap-2 text-sm text-book-muted transition-colors hover:text-book-accent-text">
            <ArrowLeft className="size-4" />
            Back to all books
          </Link>

          <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] text-book-accent-text">
            <LibraryBig className="size-4" />
            ON THE SHARED SHELF
          </p>
          <span className="mt-5 inline-flex rounded-full border border-book-border bg-book-surface px-3 py-1 text-xs font-medium text-book-chip-text">
            {book.category}
          </span>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            {book.title}
          </h1>
          <p className="mt-3 text-book-muted">by {book.author}</p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-book-copy">{book.description}</p>

          <div className="mt-8 grid gap-3 rounded-2xl border border-book-border bg-book-surface p-5 sm:grid-cols-[1.3fr_0.7fr]">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-book-muted">Shared by</p>
              <p className="mt-2 font-medium">{book.ownerName}</p>
              <p className="mt-1 break-all text-sm text-book-muted">{book.ownerEmail}</p>
            </div>
            <div className="rounded-xl bg-book-page px-4 py-3 sm:text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-book-muted">Copies ready</p>
              <p className="mt-1 font-serif text-2xl font-bold text-book-accent-text">{book.availableCopies}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <BorrowBook
              bookId={book._id}
              bookTitle={book.title}
              availableCopies={book.availableCopies}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function BookDetailsLoading() {
  return (
    <main className="flex flex-1 items-center justify-center bg-book-page px-5 py-16 text-book-muted">
      <div
        role="status"
        className="w-full max-w-5xl animate-pulse rounded-[2rem] border border-book-border bg-book-surface p-10 text-center"
      >
        Opening the book…
      </div>
    </main>
  );
}

export default function BookDetailsPage(props: PageProps<"/books/[id]">) {
  return (
    <Suspense fallback={<BookDetailsLoading />}>
      <BookDetailsContent params={props.params} />
    </Suspense>
  );
}
