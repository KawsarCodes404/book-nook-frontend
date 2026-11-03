import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-book-page px-6 py-24 text-center text-book-text">
      <p className="text-sm font-semibold tracking-[0.2em] text-book-accent-text">
        404 · PAGE NOT FOUND
      </p>
      <h1 className="mt-4 font-serif text-4xl font-bold">
        This page is off the shelf.
      </h1>
      <p className="mt-3 max-w-md text-sm text-book-muted">
        We couldn’t find what you were looking for. Let’s get you back to the
        library.
      </p>
      <Link
        href="/"
        className="mt-7 rounded-md bg-book-accent px-5 py-3 text-sm font-semibold text-book-accent-ink hover:bg-book-accent-hover"
      >
        Back to Home
      </Link>
    </main>
  );
}
