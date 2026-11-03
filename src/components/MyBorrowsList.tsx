"use client";

import { useState } from "react";
import Link from "next/link";

import { BookImage } from "@/components/BookImage";
import { BookShareIllustration } from "@/components/BookShareIllustration";
import type { Borrow } from "@/lib/books";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "@/components/ui/toast";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function MyBorrowsList({
  borrows: initialBorrows,
}: {
  borrows: Borrow[];
}) {
  const [borrows, setBorrows] = useState(initialBorrows);
  const [returningId, setReturningId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const handleReturn = async (borrow: Borrow) => {
    setReturningId(borrow._id);
    setMessage("");

    try {
      const token = await getTokenFromClient();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/borrows/${borrow._id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not return this book.");
      }

      setBorrows((currentBorrows) =>
        currentBorrows.filter((item) => item._id !== borrow._id),
      );
      setMessage("Book returned. Thank you!");

      toast.add({
        type: "success",
        title: "Book returned",
        description: "Thank you for returning this book.",
      });
    } catch (error) {
      const errorText =
        error instanceof Error ? error.message : "Could not return this book.";

      setMessage(errorText);

      toast.add({
        type: "error",
        title: "Could not return book",
        description: errorText,
      });
    } finally {
      setReturningId(null);
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

      {borrows.length === 0 ? (
        <div className="booknook-empty-state rounded-2xl border border-dashed border-book-border-strong bg-book-surface px-6 py-10 text-center sm:px-10">
          <BookShareIllustration compact />
          <h2 className="mt-4 font-serif text-2xl font-semibold">
            A good read is waiting for you.
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-book-muted">
            Your borrowed shelf is empty. Find a book nearby and bring home a
            new story.
          </p>
          <Link
            href="/books"
            className="booknook-action mt-5 inline-flex rounded-full bg-book-accent px-5 py-3 text-sm font-semibold text-book-accent-ink"
          >
            Browse books
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-book-border">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-book-surface text-book-muted">
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
                <tr key={borrow._id} className="border-t border-book-border">
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
                      {returningId === borrow._id
                        ? "Returning…"
                        : "Return Book"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
