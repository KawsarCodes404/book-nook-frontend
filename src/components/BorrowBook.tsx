"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { authClient } from "@/lib/auth-client"
import { getTokenFromClient } from "@/lib/getTokenFromClient"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast, Toaster } from "@/components/ui/toast"

type BorrowBookProps = {
  bookId: string
  bookTitle: string
  availableCopies: number
}

export function BorrowBook({
  bookId,
  bookTitle,
  availableCopies,
}: BorrowBookProps) {
  const router = useRouter()
  const { data: session } = authClient.useSession()

  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleBorrow = async () => {
    if (!session?.user) {
      const callbackUrl = `/books/${bookId}`
      router.push(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`)
      return
    }

    setIsSubmitting(true)
    setMessage("")

    try {
      const token = await getTokenFromClient()

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/borrows`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookId }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Could not borrow this book.")
      }

      setOpen(false)
      setMessage(result.message || "Book borrowed. Return it within 7 days.")

      toast.add({
        type: "success",
        title: "Book borrowed",
        description: "Return it within 7 days.",
      })

      router.refresh()
    } catch (error) {
      const errorText =
        error instanceof Error ? error.message : "Could not borrow this book."

      setMessage(errorText)

      toast.add({
        type: "error",
        title: "Borrow failed",
        description: errorText,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Toaster />

      <Button
        disabled={availableCopies < 1}
        onClick={() => setOpen(true)}
        className="bg-[#91cda3] text-[#102016] hover:bg-[#a2d9b2] disabled:opacity-60"
      >
        {availableCopies < 1 ? "Not Available" : "Borrow This Book"}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border border-[#34453b] bg-[#142019] text-[#e5eee8]">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">
              Borrow “{bookTitle}”
            </DialogTitle>
            <DialogDescription className="text-[#9eaba2]">
              You can keep this book for 7 days.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3 text-sm">
            <p>
              <span className="text-[#9eaba2]">User name</span>
              <br />
              {session?.user.name}
            </p>
            <p>
              <span className="text-[#9eaba2]">User email</span>
              <br />
              {session?.user.email}
            </p>
          </div>

          {message && (
            <p role="alert" className="text-sm text-red-300">
              {message}
            </p>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={isSubmitting}
              onClick={handleBorrow}
              className="bg-[#91cda3] text-[#102016] hover:bg-[#a2d9b2]"
            >
              {isSubmitting ? "Borrowing…" : "Confirm Borrow"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
