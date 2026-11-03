"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { PenLine } from "lucide-react";

import { BookImage } from "@/components/BookImage";
import { BookShareIllustration } from "@/components/BookShareIllustration";
import type { Book } from "@/lib/books";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast, Toaster } from "@/components/ui/toast";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

export function MyBooksManager({ books: initialBooks }: { books: Book[] }) {
  const router = useRouter();

  const [books, setBooks] = useState(initialBooks);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  const [message, setMessage] = useState("");

  const handleUpdateBook = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedBook) return;

    const formData = new FormData(event.currentTarget);

    const updatedDetails = {
      title: String(formData.get("title")),
      author: String(formData.get("author")),
      category: String(formData.get("category")) as Book["category"],
      image: String(formData.get("image")),
      description: String(formData.get("description")),
      totalCopies: Number(formData.get("totalCopies")),
    };

    try {
      const token = await getTokenFromClient();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/books/${selectedBook._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedDetails),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not update this book.");
      }

      const borrowedCopies =
        selectedBook.totalCopies - selectedBook.availableCopies;

      setBooks((currentBooks) =>
        currentBooks.map((book) =>
          book._id === selectedBook._id
            ? {
                ...book,
                ...updatedDetails,
                availableCopies: updatedDetails.totalCopies - borrowedCopies,
              }
            : book,
        ),
      );
      setSelectedBook(null);
      setMessage("Book details updated.");

      toast.add({
        type: "success",
        title: "Book updated",
        description: "Your changes have been saved.",
      });
    } catch (error) {
      const errorText =
        error instanceof Error ? error.message : "Could not update this book.";

      setMessage(errorText);

      toast.add({
        type: "error",
        title: "Update failed",
        description: errorText,
      });
    }
  };

  const handleDeleteBook = async () => {
    if (!bookToDelete) return;

    try {
      const token = await getTokenFromClient();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/books/${bookToDelete._id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not delete this book.");
      }

      setBooks((currentBooks) =>
        currentBooks.filter((book) => book._id !== bookToDelete._id),
      );
      setMessage("Book removed from your shelf.");

      toast.add({
        type: "success",
        title: "Book removed",
        description: "The book was removed from your shelf.",
      });
    } catch (error) {
      const errorText =
        error instanceof Error ? error.message : "Could not delete this book.";

      setMessage(errorText);

      toast.add({
        type: "error",
        title: "Delete failed",
        description: errorText,
      });
    } finally {
      setBookToDelete(null);
    }
  };

  return (
    <>
      <Toaster />

      {message && (
        <p
          role="status"
          className="mb-4 rounded-md border border-book-border-strong bg-book-surface px-4 py-3 text-sm"
        >
          {message}
        </p>
      )}

      {books.length === 0 ? (
        <div className="booknook-empty-state rounded-2xl border border-dashed border-book-border-strong bg-book-surface px-6 py-10 text-center sm:px-10">
          <BookShareIllustration compact />
          <h2 className="mt-4 font-serif text-2xl font-semibold">
            Your shelf is ready for a story.
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-book-muted">
            Add a book you have enjoyed and let another reader discover it.
          </p>
          <Button
            className="booknook-action mt-5 bg-book-accent text-book-accent-ink"
            onClick={() => router.push("/add-book")}
          >
            <PenLine aria-hidden="true" className="booknook-pen-icon mr-2 size-4" />
            Add your first book
          </Button>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-book-border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-book-surface text-book-muted">
              <tr>
                <th className="p-3">Book</th>
                <th className="p-3">Category</th>
                <th className="p-3">Copies</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {books.map((book) => (
                <tr key={book._id} className="border-t border-book-border">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="relative size-12 shrink-0 overflow-hidden rounded">
                        <BookImage
                          src={book.image}
                          alt=""
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{book.title}</p>
                        <p className="text-xs text-book-muted">{book.author}</p>
                      </div>
                    </div>
                  </td>

                  <td className="p-3">{book.category}</td>
                  <td className="p-3">
                    {book.availableCopies} / {book.totalCopies}
                  </td>

                  <td className="p-3">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedBook(book)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setBookToDelete(book)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog
        open={Boolean(selectedBook)}
        onOpenChange={(open) => {
          if (!open) setSelectedBook(null);
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto border border-book-border-strong bg-book-surface text-book-text sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">Edit Book</DialogTitle>
            <DialogDescription className="text-book-muted">
              Update the details shown on the library shelf.
            </DialogDescription>
          </DialogHeader>

          {selectedBook && (
            <form
              id="edit-book-form"
              onSubmit={handleUpdateBook}
              className="grid gap-4"
            >
              <div className="grid gap-2">
                <Label htmlFor="title">Book Title</Label>
                <Input
                  id="title"
                  name="title"
                  required
                  defaultValue={selectedBook.title}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="author">Author Name</Label>
                <Input
                  id="author"
                  name="author"
                  required
                  defaultValue={selectedBook.author}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  name="category"
                  defaultValue={selectedBook.category}
                  className="h-9 rounded-md border bg-background px-3"
                >
                  {categories.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="image">Book Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  type="url"
                  required
                  defaultValue={selectedBook.image}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  required
                  defaultValue={selectedBook.description}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="totalCopies">Total Copies</Label>
                <Input
                  id="totalCopies"
                  name="totalCopies"
                  type="number"
                  min="1"
                  required
                  defaultValue={selectedBook.totalCopies}
                />
              </div>
            </form>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setSelectedBook(null)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="edit-book-form"
              className="bg-book-accent text-book-accent-ink"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={Boolean(bookToDelete)}
        onOpenChange={(open) => {
          if (!open) setBookToDelete(null);
        }}
      >
        <AlertDialogContent className="border border-book-border-strong bg-book-surface text-book-text">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this book?</AlertDialogTitle>
            <AlertDialogDescription className="text-book-muted">
              “{bookToDelete?.title}” will be removed from the library.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteBook}
              className="bg-red-700 text-book-text hover:bg-red-600"
            >
              Delete Book
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
