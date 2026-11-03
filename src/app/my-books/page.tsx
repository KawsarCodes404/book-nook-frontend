import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { MyBooksManager } from "@/components/MyBooksManager";
import { PageHeading } from "@/components/PageHeading";
import type { Book } from "@/lib/books";
import { auth } from "@/lib/auth";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

export const metadata: Metadata = {
  title: "BookNook | My Books",
};

async function MyBooksContent() {
  await connection();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login?callbackUrl=%2Fmy-books");
  }

  const token = await getTokenFromServer();

  let books: Book[] = [];

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const result = await response.json();

      if (Array.isArray(result)) {
        books = result.filter(
          (book: Book) => book.ownerEmail === session.user.email,
        );
      }
    }
  } catch {
    books = [];
  }

  return <MyBooksManager books={books} />;
}

function MyBooksLoading() {
  return (
    <div
      role="status"
      className="rounded-2xl border border-dashed border-book-border-strong bg-book-surface px-6 py-12 text-center text-book-muted"
    >
      Opening your shelf…
    </div>
  );
}

export default function MyBooksPage() {

  return (
    <main className="min-h-[60vh] flex-1 bg-book-page text-book-text">
      <PageHeading
        eyebrow="YOUR CONTRIBUTION"
        title="My Books"
        description="Keep an eye on the books you have shared with the neighbourhood."
      />

      <section className="mx-auto max-w-6xl px-6 py-10">
        <Suspense fallback={<MyBooksLoading />}>
          <MyBooksContent />
        </Suspense>
      </section>
    </main>
  );
}
