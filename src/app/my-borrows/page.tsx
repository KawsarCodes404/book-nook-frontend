import type { Metadata } from "next";
import { connection } from "next/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { MyBorrowsList } from "@/components/MyBorrowsList";
import type { Borrow } from "@/lib/books";
import { auth } from "@/lib/auth";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

export const metadata: Metadata = {
  title: "BookNook | My Borrows",
};

export default async function MyBorrowsPage() {
  await connection();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login?callbackUrl=%2Fmy-borrows");
  }

  const token = await getTokenFromServer();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/borrows`, {
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();
  const borrows: Borrow[] = response.ok ? result : [];

  return (
    <main className="min-h-[60vh] flex-1 bg-book-page text-book-text">
      <section className="border-b border-book-border bg-book-surface px-6 py-10 text-center">
        <h1 className="font-serif text-4xl font-bold">My Borrows</h1>
        <p className="mt-2 text-sm text-book-muted">
          Books you are reading right now.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <MyBorrowsList borrows={borrows} />
      </section>
    </main>
  );
}
