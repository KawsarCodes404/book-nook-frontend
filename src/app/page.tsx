import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  Compass,
  HeartHandshake,
  LibraryBig,
} from "lucide-react"

import { HomeHero } from "@/components/HomeHero"
import { BookImage } from "@/components/BookImage"
import type { Book } from "@/lib/books"

export const metadata = {
  title: "BookNook | Home",
  description: "Find, share, and borrow books with readers in your neighbourhood.",
}

async function getLatestBooks(): Promise<Book[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/books?limit=6`,
      { cache: "no-store" },
    )

    if (!response.ok) return []

    return response.json()
  } catch {
    return []
  }
}

export default async function Home() {
  const latestBooks = await getLatestBooks()

  const borrowingSteps = [
    {
      icon: Compass,
      step: "Step 1",
      title: "Find a book",
      text: "Browse the shelf and open any book you like.",
    },
    {
      icon: BookOpen,
      step: "Step 2",
      title: "Borrow it",
      text: "Confirm the borrow. The book is yours for 7 days.",
    },
    {
      icon: HeartHandshake,
      step: "Step 3",
      title: "Return it",
      text: "Done reading? Return it from My Borrows in one click.",
    },
  ]

  const topCategories = [
    { name: "Fiction", text: "Novels and short stories" },
    { name: "Science", text: "How the world works" },
    { name: "History", text: "Stories from the past" },
    { name: "Kids", text: "Picture books and more" },
  ]

  return (
    <main className="flex-1 bg-[#0b130f] text-[#e5eee8]">
      <HomeHero />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-9 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#a2d9b2]">
            FRESH ON THE SHELF
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold">New Arrivals</h2>
          <p className="mt-2 text-sm text-[#9eaba2]">
            The latest books added by our readers.
          </p>
        </div>

        {latestBooks.length === 0 ? (
          <p className="rounded-lg border border-dashed border-[#34453b] p-10 text-center text-[#9eaba2]">
            The shelf is waiting for its first books. Be the first to add one.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {latestBooks.map((book) => (
              <article
                key={book._id}
                className="overflow-hidden rounded-lg border border-[#29372f] bg-[#142019] transition duration-200 hover:-translate-y-1 hover:border-[#557560]"
              >
                <div className="relative aspect-[3/4] bg-[#1c2a22]">
                  <BookImage
                    src={book.image}
                    alt={`${book.title} cover`}
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 28vw, 16vw"
                    className="object-cover"
                  />
                </div>

                <div className="p-3">
                  <span className="rounded bg-[#1c2a22] px-2 py-1 text-[10px] text-[#b5c2b9]">
                    {book.category}
                  </span>
                  <h3 className="mt-2 truncate font-serif text-sm font-semibold">
                    {book.title}
                  </h3>
                  <p className="mt-1 truncate text-xs text-[#9eaba2]">
                    by {book.author}
                  </p>

                  <Link
                    href={`/books/${book._id}`}
                    className="mt-3 flex w-full justify-center rounded-md bg-[#91cda3] px-2 py-2 text-xs font-semibold text-[#102016] hover:bg-[#a2d9b2]"
                  >
                    View Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 rounded-md border border-[#34453b] px-4 py-2 text-sm hover:bg-[#142019]"
          >
            See All Books
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <section className="border-y border-[#29372f] bg-[#142019] px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 text-center">
            <h2 className="font-serif text-3xl font-bold">
              How Borrowing Works
            </h2>
            <p className="mt-2 text-sm text-[#9eaba2]">
              Three steps. No library card needed.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {borrowingSteps.map(({ icon: Icon, step, title, text }) => (
              <article
                key={step}
                className="rounded-lg border border-[#29372f] bg-[#101a14] p-7 text-center"
              >
                <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#91cda3] text-[#102016]">
                  <Icon className="size-5" />
                </span>
                <p className="mt-4 text-xs font-semibold text-[#d59b83]">
                  {step}
                </p>
                <h3 className="mt-1 font-serif text-xl font-semibold">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-[#9eaba2]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-9 text-center">
          <h2 className="font-serif text-3xl font-bold">Top Categories</h2>
          <p className="mt-2 text-sm text-[#9eaba2]">
            Pick a shelf and start reading.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {topCategories.map((category) => (
            <Link
              key={category.name}
              href={`/books?category=${category.name}`}
              className="rounded-lg border border-[#29372f] bg-[#142019] p-6 text-center transition hover:border-[#91cda3]"
            >
              <LibraryBig className="mx-auto size-6 text-[#a2d9b2]" />
              <h3 className="mt-3 font-serif text-lg font-semibold">
                {category.name}
              </h3>
              <p className="mt-1 text-xs text-[#9eaba2]">{category.text}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
