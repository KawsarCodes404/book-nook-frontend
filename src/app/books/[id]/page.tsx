import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { BorrowBook } from "@/components/BorrowBook"
import { BookImage } from "@/components/BookImage"
import type { Book } from "@/lib/books"

async function getBook(id: string): Promise<Book | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`, { cache: "no-store" })
    if (!response.ok) return null
    return await response.json()
  } catch {
    return null
  }
}

export async function generateMetadata(props: PageProps<"/books/[id]">): Promise<Metadata> {
  const { id } = await props.params
  const book = await getBook(id)
  return { title: book ? `BookNook | ${book.title}` : "BookNook | Book Details" }
}

export default async function BookDetailsPage(props: PageProps<"/books/[id]">) {
  const { id } = await props.params
  const book = await getBook(id)
  if (!book) notFound()

  return (
    <main className="flex flex-1 items-center bg-[#0b130f] px-6 py-12 text-[#e5eee8]">
      <section className="mx-auto grid w-full max-w-6xl items-start gap-8 md:grid-cols-[minmax(280px,0.8fr)_1.2fr] md:gap-10">
        <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-lg border border-[#29372f] bg-[#142019]">
          <BookImage
            src={book.image}
            alt={`${book.title} cover`}
            sizes="(max-width: 768px) 90vw, 40vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="pt-2">
          <span className="rounded bg-[#1c2a22] px-3 py-1 text-xs text-[#b5c2b9]">{book.category}</span>
          <h1 className="mt-4 font-serif text-4xl font-bold md:text-5xl">{book.title}</h1>
          <p className="mt-3 text-[#9eaba2]">by {book.author}</p>
          <p className="mt-6 leading-7 text-[#d1d9d3]">{book.description}</p>
          <div className="mt-7 grid gap-4 rounded-lg border border-[#29372f] bg-[#142019] p-5 sm:grid-cols-2">
            <div><p className="text-xs text-[#9eaba2]">Added by</p><p className="mt-1 font-medium">{book.ownerName}</p><p className="text-sm text-[#9eaba2]">{book.ownerEmail}</p></div>
            <div><p className="text-xs text-[#9eaba2]">Copies left</p><p className="mt-1 font-medium">{book.availableCopies}</p></div>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3"><BorrowBook bookId={book._id} bookTitle={book.title} availableCopies={book.availableCopies} /><Link href="/books" className="rounded-md px-3 py-2 text-sm text-[#a2d9b2] hover:underline">Back to all books</Link></div>
        </div>
      </section>
    </main>
  )
}
