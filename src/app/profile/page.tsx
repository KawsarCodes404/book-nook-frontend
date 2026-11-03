import type { Metadata } from "next";
import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, Library, Sparkles } from "lucide-react";

import { auth } from "@/lib/auth";
import { BookShareIllustration } from "@/components/BookShareIllustration";

export const metadata: Metadata = { title: "BookNook | My Profile" };

async function ProfileContent() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) redirect("/login?callbackUrl=%2Fprofile");

  return (
    <main className="relative isolate flex flex-1 items-center justify-center overflow-hidden bg-book-page px-5 py-12 text-book-text sm:px-6 lg:py-16">
      <div aria-hidden="true" className="booknook-detail-orb booknook-drift absolute -left-40 top-16 -z-10 size-[26rem] rounded-full" />

      <section className="booknook-profile-card relative grid w-full max-w-5xl gap-5 md:grid-cols-[0.9fr_1.1fr] lg:gap-6">
        <div className="flex flex-col items-center justify-center rounded-[2rem] border border-book-border bg-book-surface p-8 text-center shadow-xl shadow-black/10 sm:p-9 lg:p-10">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-book-border bg-book-page px-3 py-1.5 text-xs font-medium text-book-accent-text">
            <Sparkles className="size-3.5" />
            YOUR READING CORNER
          </span>
          <div className="relative flex size-28 items-center justify-center rounded-full bg-book-accent/15 p-1 ring-1 ring-book-accent/30">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt=""
                width={104}
                height={104}
                unoptimized
                className="size-26 rounded-full object-cover"
              />
            ) : (
              <span className="flex size-26 items-center justify-center rounded-full bg-book-accent font-serif text-4xl font-bold text-book-accent-ink">
                {session.user.name?.charAt(0) ?? "R"}
              </span>
            )}
            <span className="absolute bottom-1 right-0 flex size-8 items-center justify-center rounded-full border-2 border-book-surface bg-book-accent text-book-accent-ink">
              <BookOpenCheck className="size-4" />
            </span>
          </div>
          <h1 className="mt-6 max-w-full break-words font-serif text-3xl font-bold sm:text-4xl">
            {session.user.name}
          </h1>
          <p className="mt-2 max-w-full break-all text-sm text-book-muted">
            {session.user.email}
          </p>
          <p className="mt-5 max-w-sm text-sm leading-6 text-book-copy">
            Welcome to your BookNook corner. Your next favourite story might be closer than you think.
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-[2rem] border border-book-border bg-book-surface p-7 shadow-xl shadow-black/10 sm:p-9 lg:p-10">
          <BookShareIllustration compact />
          <h2 className="mt-4 text-center font-serif text-2xl font-semibold">Keep good stories moving.</h2>
          <p className="mx-auto mt-2 max-w-sm text-center text-sm leading-6 text-book-muted">
            Browse books shared by your neighbours or add one to the community shelf.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <Link href="/books" className="booknook-action inline-flex items-center justify-center gap-2 rounded-xl bg-book-accent px-4 py-3 text-sm font-semibold text-book-accent-ink">
              <Library className="size-4" />
              Browse books
            </Link>
            <Link href="/my-borrows" className="inline-flex items-center justify-center gap-2 rounded-xl border border-book-border px-4 py-3 text-sm font-semibold transition-colors hover:bg-book-hover">
              My borrows
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function ProfileLoading() {
  return (
    <main className="flex flex-1 items-center justify-center bg-book-page px-5 py-16 text-book-muted">
      <div
        role="status"
        className="w-full max-w-3xl animate-pulse rounded-[2rem] border border-book-border bg-book-surface p-10 text-center"
      >
        Loading your reading corner…
      </div>
    </main>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfileLoading />}>
      <ProfileContent />
    </Suspense>
  );
}
