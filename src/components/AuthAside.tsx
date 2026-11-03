import Link from "next/link";
import { ArrowRight, BookOpenCheck, Sparkles } from "lucide-react";

import { BookShareIllustration } from "@/components/BookShareIllustration";

type AuthAsideProps = {
  mode: "login" | "register";
};

export function AuthAside({ mode }: AuthAsideProps) {
  const isLogin = mode === "login";

  return (
    <section className="booknook-auth-aside relative hidden min-h-[34rem] flex-col justify-between overflow-hidden rounded-[2rem] border border-book-border bg-book-surface p-8 md:flex lg:p-10">
      <div aria-hidden="true" className="booknook-auth-orbit booknook-drift absolute -right-20 -top-20 size-72 rounded-full" />

      <div className="relative">
        <span className="inline-flex items-center gap-2 rounded-full border border-book-border bg-book-page/80 px-3 py-1.5 text-xs font-medium text-book-accent-text">
          <Sparkles className="size-3.5" />
          A little more room for stories
        </span>
        <h1 className="mt-8 max-w-md font-serif text-4xl font-bold leading-tight lg:text-5xl">
          {isLogin ? "Pick up where your next story begins." : "Make room on the shelf for another story."}
        </h1>
        <p className="mt-4 max-w-sm text-sm leading-7 text-book-muted">
          {isLogin
            ? "Sign in to find your saved shelf, borrow a good read, or pass a favourite along."
            : "Join readers nearby to discover books, share your own, and keep good stories moving."}
        </p>
      </div>

      <div className="relative mx-auto my-4 w-full max-w-sm">
        <BookShareIllustration compact />
      </div>

      <div className="relative flex items-center justify-between rounded-2xl border border-book-border bg-book-page/80 p-4">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-book-accent text-book-accent-ink">
            <BookOpenCheck className="size-5" />
          </span>
          <div>
            <p className="font-serif font-semibold">The neighbourhood shelf</p>
            <p className="mt-0.5 text-xs text-book-muted">Read something. Pass it on.</p>
          </div>
        </div>
        <Link href="/books" aria-label="Browse the book shelf" className="flex size-9 items-center justify-center rounded-full border border-book-border text-book-accent-text transition hover:bg-book-hover">
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
