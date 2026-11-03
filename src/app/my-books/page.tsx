import type { Metadata } from "next"
import { connection } from "next/server"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { MyBooksManager } from "@/components/MyBooksManager"
import type { Book } from "@/lib/books"
import { auth } from "@/lib/auth"
import { getTokenFromServer } from "@/lib/getTokenFromServer"

export const metadata: Metadata = {
  title: "BookNook | My Books",
}

export default async function MyBooksPage() {
  await connection()

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    redirect("/login?callbackUrl=%2Fmy-books")
  }

  const token = await getTokenFromServer()

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`,
    },
  })

  const result = await response.json()

  const books: Book[] = response.ok
    ? result.filter((book: Book) => book.ownerEmail === session.user.email)
    : []

  return (
    <main className="min-h-[60vh] flex-1 bg-[#0b130f] text-[#e5eee8]">
      <section className="border-b border-[#29372f] bg-[#142019] px-6 py-10 text-center">
        <h1 className="font-serif text-4xl font-bold">My Books</h1>
        <p className="mt-2 text-sm text-[#9eaba2]">
          Books you added to the library.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <MyBooksManager books={books} />
      </section>
    </main>
  )
}
