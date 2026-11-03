"use client"

import { useState } from "react"

import { authClient } from "@/lib/auth-client"
import { getTokenFromClient } from "@/lib/getTokenFromClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast, Toaster } from "@/components/ui/toast"

const categories = ["Fiction", "Science", "History", "Kids", "Others"]

const inputClass = "border-[#34453b] bg-[#142019] text-white"

export default function AddBookPage() {
  const { data: session } = authClient.useSession()

  const [imageUrl, setImageUrl] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  const uploadBookImage = async (file: File) => {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY

    if (!apiKey) {
      setMessage(
        "Image upload needs NEXT_PUBLIC_IMGBB_API_KEY. You can paste a hosted image URL below instead.",
      )
      return
    }

    setIsUploading(true)
    setMessage("")

    try {
      const formData = new FormData()
      formData.set("image", file)

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        },
      )

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error?.message || "Image upload failed.")
      }

      setImageUrl(result.data.url)
    } catch (error) {
      const errorText =
        error instanceof Error ? error.message : "Image upload failed."

      setMessage(errorText)

      toast.add({
        type: "error",
        title: "Image upload failed",
        description: errorText,
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleAddBook = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage("")

    const form = event.currentTarget
    const formData = new FormData(form)

    setIsSubmitting(true)

    try {
      const token = await getTokenFromClient()

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.get("title"),
          author: formData.get("author"),
          category: formData.get("category"),
          image: imageUrl,
          description: formData.get("description"),
          totalCopies: formData.get("totalCopies"),
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Could not add this book.")
      }

      setMessage("Book added to the library.")

      toast.add({
        type: "success",
        title: "Book added",
        description: "Your book is now on the library shelf.",
      })

      form.reset()
      setImageUrl("")
    } catch (error) {
      const errorText =
        error instanceof Error ? error.message : "Could not add this book."

      setMessage(errorText)

      toast.add({
        type: "error",
        title: "Could not add book",
        description: errorText,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="flex-1 bg-[#0b130f] text-[#e5eee8]">
      <Toaster />

      <section className="border-b border-[#29372f] bg-[#142019] px-6 py-10 text-center">
        <h1 className="font-serif text-4xl font-bold">Add a Book</h1>
        <p className="mt-2 text-sm text-[#9eaba2]">
          Put a book from your shelf into the library.
        </p>
      </section>

      <form
        onSubmit={handleAddBook}
        className="mx-auto grid max-w-3xl gap-5 px-6 py-10 sm:grid-cols-2"
      >
        <div className="grid gap-2">
          <Label htmlFor="title">Book Title</Label>
          <Input
            id="title"
            name="title"
            required
            className={inputClass}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="author">Author Name</Label>
          <Input
            id="author"
            name="author"
            required
            className={inputClass}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            name="category"
            required
            defaultValue="Fiction"
            className="h-9 rounded-md border border-[#34453b] bg-[#142019] px-3 text-sm"
          >
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="totalCopies">Total Copies</Label>
          <Input
            id="totalCopies"
            name="totalCopies"
            type="number"
            min="1"
            defaultValue="1"
            required
            className={inputClass}
          />
        </div>

        <div className="grid gap-2 sm:col-span-2">
          <Label htmlFor="imageFile">Book Image</Label>
          <Input
            id="imageFile"
            type="file"
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files?.[0]
              if (file) void uploadBookImage(file)
            }}
            className={inputClass}
          />
          <p className="text-xs text-[#9eaba2]">
            {isUploading
              ? "Uploading image…"
              : imageUrl
                ? "Image uploaded successfully."
                : "Upload with ImgBB or paste an image URL below."}
          </p>

          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            type="url"
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            placeholder="https://example.com/book-cover.jpg"
            required
            className={inputClass}
          />
        </div>

        <div className="grid gap-2 sm:col-span-2">
          <Label htmlFor="description">Short Description</Label>
          <Textarea
            id="description"
            name="description"
            rows={4}
            required
            className={inputClass}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="userName">User Name</Label>
          <Input
            id="userName"
            value={session?.user.name ?? ""}
            readOnly
            className={inputClass}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="userEmail">User Email</Label>
          <Input
            id="userEmail"
            value={session?.user.email ?? ""}
            readOnly
            className={inputClass}
          />
        </div>

        {message && (
          <p role="alert" className="text-sm text-red-300 sm:col-span-2">
            {message}
          </p>
        )}

        <Button
          type="submit"
          disabled={isSubmitting || isUploading}
          className="bg-[#91cda3] text-[#102016] hover:bg-[#a2d9b2] sm:col-span-2"
        >
          {isSubmitting ? "Adding Book…" : "Add Book"}
        </Button>
      </form>
    </main>
  )
}
