import Link from "next/link";
import { ArrowUpRight, BookOpen, Mail, MapPin, Phone } from "lucide-react";
import { BookShareIllustration } from "@/components/BookShareIllustration";

const socialLinks = [
  { label: "X", href: "https://x.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Instagram", href: "https://instagram.com" },
];

export default function Footer() {
  return (
    <footer className="booknook-footer relative overflow-hidden border-t border-book-border bg-book-surface text-book-text">
      <div
        aria-hidden="true"
        className="booknook-footer-glow pointer-events-none absolute -right-24 -top-36 size-96 rounded-full"
      />

      <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-12 sm:px-8 sm:pt-16">
        <div className="mb-10 flex flex-col justify-between gap-5 border-b border-book-border pb-8 sm:mb-12 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-book-accent-text">
              Pass a good story along
            </p>
            <h2 className="font-serif text-2xl font-bold leading-tight sm:text-3xl">
              There&apos;s always room for one more book.
            </h2>
          </div>

          <Link
            href="/books"
            className="booknook-footer-link group inline-flex w-fit items-center gap-2 rounded-full border border-book-border-strong bg-book-page px-5 py-3 text-sm font-semibold text-book-text transition-colors hover:border-book-accent hover:text-book-accent-text"
          >
            Browse the shelf
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1.25fr_0.7fr_1fr] lg:gap-10">
          <div>
            <Link
              href="/"
              className="mb-4 inline-flex items-center gap-2 font-serif text-xl font-bold"
            >
              <span className="flex size-9 items-center justify-center rounded-lg bg-book-accent text-book-accent-ink shadow-sm shadow-book-accent/20">
                <BookOpen className="size-5" />
              </span>
              BookNook
            </Link>

            <p className="max-w-xs text-sm leading-6 text-book-muted">
              A small neighbourhood library on the web. Share the books on your
              shelf and borrow the ones you have been meaning to read.
            </p>
          </div>

          <div className="booknook-footer-scene relative flex min-h-40 items-center justify-center overflow-hidden rounded-2xl border border-book-border bg-book-page/70 px-4 pt-3">
            <span className="absolute left-5 top-4 rounded-full border border-book-border bg-book-surface/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-book-accent-text">
              A little book magic
            </span>
            <BookShareIllustration compact />
            <span className="booknook-footer-spark booknook-footer-spark-one" aria-hidden="true" />
            <span className="booknook-footer-spark booknook-footer-spark-two" aria-hidden="true" />
          </div>

          <div>
            <h3 className="mb-4 font-serif text-base font-semibold">Explore</h3>
            <ul className="space-y-3 text-sm text-book-muted">
              <li><Link className="transition-colors hover:text-book-accent-text" href="/">Home</Link></li>
              <li><Link className="transition-colors hover:text-book-accent-text" href="/books">All Books</Link></li>
              <li><Link className="transition-colors hover:text-book-accent-text" href="/login">Join the nook</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-base font-semibold">Say hello</h3>
            <ul className="space-y-3 text-sm text-book-muted">
              <li>
                <a
                  className="inline-flex items-center gap-2 transition-colors hover:text-book-accent-text"
                  href="mailto:hello@booknook.app"
                >
                  <Mail className="size-4 shrink-0" />
                  hello@booknook.app
                </a>
              </li>
              <li>
                <a
                  className="inline-flex items-center gap-2 transition-colors hover:text-book-accent-text"
                  href="tel:+8801700000000"
                >
                  <Phone className="size-4 shrink-0" />
                  +880 1700 000 000
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <MapPin className="size-4 shrink-0" />
                12 Reading Lane, Dhaka
              </li>
            </ul>

            <div className="mt-5 flex items-center gap-2">
              {socialLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="flex size-9 items-center justify-center rounded-full border border-book-border bg-book-page text-book-muted transition-all duration-200 hover:-translate-y-1 hover:border-book-accent hover:bg-book-accent hover:text-book-accent-ink"
                >
                  {label === "X" ? (
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="currentColor">
                      <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l7.3-8.4L1.8 2h6.5l4.5 6.8L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20Z" />
                    </svg>
                  ) : label === "Facebook" ? (
                    <span aria-hidden="true" className="text-sm font-bold">f</span>
                  ) : (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="size-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-book-border pt-5 text-center text-xs text-book-subtle sm:flex-row sm:text-left">
          <p>© 2026 BookNook. All rights reserved.</p>
          <p>Made for readers, shared with care.</p>
        </div>
      </div>
    </footer>
  );
}
