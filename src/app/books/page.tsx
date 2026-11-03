import type { Metadata } from "next"
import { BookGrid } from "@/components/BookGrid"
import type { Book } from "@/lib/books"

export const metadata: Metadata = { title: "BookNook | All Books", description: "Explore every book on the BookNook shelf." }

async function getBooks(): Promise<Book[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, { cache: "no-store" })
    if (!response.ok) return []
    return await response.json()
  } catch {
    return []
  }
}

export default async function BooksPage(props: PageProps<"/books">) {
  const searchParams = await props.searchParams
  const requestedCategory = searchParams.category
  const initialCategory = typeof requestedCategory === "string" && ["Fiction", "Science", "History", "Kids", "Others"].includes(requestedCategory)
    ? requestedCategory
    : "all"
  const books = await getBooks()
  return (
    <main className="min-h-[60vh] flex-1 bg-[#0b130f] text-[#e5eee8]">
      <section className="border-b border-[#29372f] bg-[#142019] px-6 py-10 text-center">
        <h1 className="font-serif text-4xl font-bold">All Books</h1>
        <p className="mt-2 text-sm text-[#9eaba2]">Every book on the BookNook shelf.</p>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        {books.length === 0 ? <p className="rounded-lg border border-dashed border-[#34453b] p-10 text-center text-[#9eaba2]">No books are on the shelf yet. Check back soon.</p> : <BookGrid books={books} details initialCategory={initialCategory} />}
      </section>
    </main>
  )
}
