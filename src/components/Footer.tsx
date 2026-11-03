import Link from "next/link";
import { BookOpen, Mail, MapPin, Phone } from "lucide-react";

const socialLinks = [
  { label: "X", href: "https://x.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Instagram", href: "https://instagram.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-book-border bg-book-surface text-book-text">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16 lg:px-8">
        <div>
          <Link
            href="/"
            className="mb-3 inline-flex items-center gap-2 font-serif text-xl font-bold"
          >
            <span className="flex size-8 items-center justify-center rounded-md bg-book-accent text-book-accent-ink">
              <BookOpen className="size-4" />
            </span>
            BookNook
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-book-muted">
            A small neighbourhood library on the web. Share the books on your
            shelf and borrow the ones you have been meaning to read.
          </p>
        </div>

        <div>
          <h2 className="mb-3 font-serif text-base font-semibold">Contact</h2>
          <ul className="space-y-2 text-sm text-book-muted">
            <li>
              <a
                className="inline-flex items-center gap-2 hover:text-book-accent-text"
                href="mailto:hello@booknook.app"
              >
                <Mail className="size-4" />
                hello@booknook.app
              </a>
            </li>
            <li>
              <a
                className="inline-flex items-center gap-2 hover:text-book-accent-text"
                href="tel:+8801700000000"
              >
                <Phone className="size-4" />
                +880 1700 000 000
              </a>
            </li>
            <li className="inline-flex items-center gap-2">
              <MapPin className="size-4" />
              12 Reading Lane, Dhaka
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 font-serif text-base font-semibold">Follow us</h2>
          <div className="flex gap-3">
            {socialLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="flex size-8 items-center justify-center rounded-full bg-book-page text-book-text transition-colors hover:bg-book-accent hover:text-book-accent-ink"
              >
                {label === "X" ? (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="size-4"
                    fill="currentColor"
                  >
                    <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l7.3-8.4L1.8 2h6.5l4.5 6.8L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20Z" />
                  </svg>
                ) : label === "Facebook" ? (
                  <span aria-hidden="true" className="text-sm font-bold">
                    f
                  </span>
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
                    <circle
                      cx="17.5"
                      cy="6.5"
                      r=".8"
                      fill="currentColor"
                      stroke="none"
                    />
                  </svg>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-book-border px-6 py-4 text-center text-xs text-book-subtle">
        © 2026 BookNook. All rights reserved.
      </div>
    </footer>
  );
}
