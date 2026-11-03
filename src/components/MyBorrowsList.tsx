"use client"

import { useState } from "react"

import { BookImage } from "@/components/BookImage"
import type { Borrow } from "@/lib/books"
import { getTokenFromClient } from "@/lib/getTokenFromClient"
import { Button } from "@/components/ui/button"
import { toast, Toaster } from "@/components/ui/toast"

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value))
}

export function MyBorrowsList({ borrows: initialBorrows }: { borrows: Borrow[] }) {
  const [borrows, setBorrows] = useState(initialBorrows)
  const [returningId, setReturningId] = useState<string | null>(null)
  const [message, setMessage] = useState("")

  const handleReturn = async (borrow: Borrow) => {
    setReturningId(borrow._id)
    setMessage("")

    try {
      const token = await getTokenFromClient()

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/borrows/${borrow._id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Could not return this book.")
      }

      setBorrows((currentBorrows) =>
        currentBorrows.filter((item) => item._id !== borrow._id),
      )
      setMessage("Book returned. Thank you!")

      toast.add({
        type: "success",
        title: "Book returned",
        description: "Thank you for returning this book.",
      })
    } catch (error) {
      const errorText =
        error instanceof Error ? error.message : "Could not return this book."

      setMessage(errorText)

      toast.add({
        type: "error",
        title: "Could not return book",
        description: errorText,
      })
    } finally {
      setReturningId(null)
    }
  }

  return (
    <>
      <Toaster />

      {message && (
        <p
          role="status"
          className="mb-4 rounded-md border border-[#34453b] bg-[#142019] px-4 py-3 text-sm"
        >
          {message}
        </p>
      )}

      {borrows.length === 0 ? (
        <p className="rounded-lg border border-dashed border-[#34453b] p-12 text-center text-[#9eaba2]">
          You have no borrowed books right now.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[#29372f]">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-[#142019] text-[#9eaba2]">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Title</th>
                <th className="p-3">Borrow Date</th>
                <th className="p-3">Return Date</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {borrows.map((borrow) => (
                <tr key={borrow._id} className="border-t border-[#29372f]">
                  <td className="p-3">
                    <div className="relative size-12 overflow-hidden rounded">
                      <BookImage
                        src={borrow.bookImage}
                        alt=""
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="p-3 font-medium">{borrow.bookTitle}</td>
                  <td className="p-3">{formatDate(borrow.borrowDate)}</td>
                  <td className="p-3">{formatDate(borrow.returnDate)}</td>
                  <td className="p-3 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={returningId === borrow._id}
                      onClick={() => void handleReturn(borrow)}
                    >
                      {returningId === borrow._id ? "Returning…" : "Return Book"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
