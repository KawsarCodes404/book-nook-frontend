"use client"

import Link from "next/link"
import { useState } from "react"

import { BookImage } from "@/components/BookImage"
import type { Book } from "@/lib/books"

const categories = ["Fiction", "Science", "History", "Kids", "Others"]

type BookGridProps = {
  books: Book[]
  details?: boolean
  initialCategory?: string
}

export function BookGrid({
  books,
  details = false,
  initialCategory = "all",
}: BookGridProps) {
  const [category, setCategory] = useState(initialCategory)
  const [search, setSearch] = useState("")

  const visibleBooks = books.filter((book) => {
    const matchesCategory = category === "all" || book.category === category
    const matchesSearch = `${book.title} ${book.author}`
      .toLowerCase()
      .includes(search.toLowerCase())

    return matchesCategory && matchesSearch
  })

  return (
    <>
      {details && (
        <div className="mb-6 grid gap-3 sm:grid-cols-[1fr_220px]">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by title or author"
            className="h-11 rounded-md border border-[#34453b] bg-[#142019] px-4 text-sm outline-none focus:border-[#91cda3]"
          />

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="h-11 rounded-md border border-[#34453b] bg-[#142019] px-4 text-sm outline-none focus:border-[#91cda3]"
          >
            <option value="all">All categories</option>
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      )}

      {visibleBooks.length === 0 ? (
        <p className="rounded-lg border border-dashed border-[#34453b] p-10 text-center text-[#9eaba2]">
          No books found. Try a different search.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {visibleBooks.map((book) => (
            <article
              key={book._id}
              className="overflow-hidden rounded-lg border border-[#29372f] bg-[#142019] transition duration-200 hover:-translate-y-1 hover:border-[#557560]"
            >
              <div className="relative aspect-[3/4] bg-[#1c2a22]">
                <BookImage
                  src={book.image}
                  alt={`${book.title} cover`}
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 28vw, 20vw"
                  className="object-cover"
                />
              </div>

              <div className="p-3">
                <span className="rounded bg-[#1c2a22] px-2 py-1 text-[10px] text-[#b5c2b9]">
                  {book.category}
                </span>

                <h2 className="mt-2 truncate font-serif text-sm font-semibold">
                  {book.title}
                </h2>
                <p className="mt-1 truncate text-xs text-[#9eaba2]">
                  by {book.author}
                </p>
                <p className="mt-2 text-xs text-[#9eaba2]">
                  {book.availableCopies} available
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
    </>
  )
}
