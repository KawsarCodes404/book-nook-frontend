import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";

import { auth } from "@/lib/auth";

export const metadata: Metadata = { title: "BookNook | My Profile" };

// A profile needs the signed-in user's cookie, so this page cannot be instant.
export const instant = false;

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) redirect("/login?callbackUrl=%2Fprofile");

  return (
    <main className="flex flex-1 items-start justify-center bg-book-page px-6 py-16 text-book-text">
      <section className="w-full max-w-md rounded-xl border border-book-border bg-book-surface p-8 text-center">
        {session.user.image && (
          <Image
            src={session.user.image}
            alt=""
            width={80}
            height={80}
            unoptimized
            className="mx-auto size-20 rounded-full object-cover"
          />
        )}
        <h1 className="mt-5 font-serif text-3xl font-bold">
          {session.user.name}
        </h1>
        <p className="mt-2 break-all text-sm text-book-muted">
          {session.user.email}
        </p>
        <p className="mt-6 text-xs text-book-muted">
          Welcome to your BookNook profile.
        </p>
      </section>
    </main>
  );
}
