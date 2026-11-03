import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { MyBorrowsList } from "@/components/MyBorrowsList";
import { PageHeading } from "@/components/PageHeading";
import type { Borrow } from "@/lib/books";
import { auth } from "@/lib/auth";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

export const metadata: Metadata = {
  title: "BookNook | My Borrows",
};

async function MyBorrowsContent() {
  await connection();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login?callbackUrl=%2Fmy-borrows");
  }

  const token = await getTokenFromServer();

  let borrows: Borrow[] = [];

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/borrows`, {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const result = await response.json();
      borrows = Array.isArray(result) ? result : [];
    }
  } catch {
    borrows = [];
  }

  return <MyBorrowsList borrows={borrows} />;
}

function MyBorrowsLoading() {
  return (
    <div
      role="status"
      className="rounded-2xl border border-dashed border-book-border-strong bg-book-surface px-6 py-12 text-center text-book-muted"
    >
      Loading your borrowed books…
    </div>
  );
}

export default function MyBorrowsPage() {

  return (
    <main className="min-h-[60vh] flex-1 bg-book-page text-book-text">
      <PageHeading
        eyebrow="CURRENTLY READING"
        title="My Borrows"
        description="Your borrowed stories, with return dates all in one place."
      />

      <section className="mx-auto max-w-6xl px-6 py-10">
        <Suspense fallback={<MyBorrowsLoading />}>
          <MyBorrowsContent />
        </Suspense>
      </section>
    </main>
  );
}
