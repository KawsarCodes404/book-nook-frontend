export type Book = {
  _id: string
  title: string
  author: string
  category: "Fiction" | "Science" | "History" | "Kids" | "Others"
  image: string
  description: string
  totalCopies: number
  availableCopies: number
  ownerName: string
  ownerEmail: string
  addedAt: string
}

export type Borrow = {
  _id: string
  bookId: string
  bookTitle: string
  bookImage: string
  userEmail: string
  borrowDate: string
  returnDate: string
  status: "borrowed" | "returned"
}
