# BookNook

BookNook is a small online library where readers can share books from their shelves, borrow books from other readers, and return them after reading.

**Live site:** Add the deployed URL here after deployment.

## Features

- Browse and search the shared book shelf by title, author, and category.
- See the newest books and browse featured sections from the home page.
- Register or log in with email and password, or continue with Google.
- Add, edit, and remove books from your own shelf.
- Borrow available books for seven days and return them from My Borrows.
- See remaining copies and avoid borrowing the same book twice at once.
- Protected routes and API requests use Better Auth sessions and JWT verification.
- Responsive dark library interface built with Next.js, TypeScript, and shadcn/ui.

## Stack

- Next.js App Router, React, TypeScript, Tailwind CSS, and shadcn/ui
- Better Auth with the MongoDB adapter and Google OAuth
- Express, MongoDB, and `jose` for the BookNook API

## Run locally

1. Copy `.env.example` to `.env` and add your MongoDB URI, Better Auth secret, Google OAuth credentials, and ImgBB API key.
2. Start the API from `book-nook-backend` with `node index.js`.
3. Start this app with `npm run dev`.
4. Open `http://localhost:3000`.

The Google OAuth credentials must use `http://localhost:3000/api/auth/callback/google` as the development redirect URI. For deployment, update `BETTER_AUTH_URL`, the API `CLIENT_URL`, `NEXT_PUBLIC_API_URL`, and the provider's authorized redirect URI to your deployed domains.
