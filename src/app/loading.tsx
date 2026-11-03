export default function Loading() {
  return (
    <main className="flex flex-1 items-center justify-center bg-book-page py-24 text-book-accent-text">
      <div role="status" className="flex flex-col items-center gap-4 text-sm text-book-muted">
        <svg
          viewBox="0 0 64 48"
          aria-hidden="true"
          className="booknook-loading-book size-14"
          fill="none"
        >
          <path d="M8 8c9-3 17-1 24 4v29c-7-5-15-7-24-4V8Z" fill="var(--booknook-accent)" opacity=".8" />
          <path d="M56 8c-9-3-17-1-24 4v29c7-5 15-7 24-4V8Z" fill="var(--booknook-warm)" opacity=".64" />
          <path d="M32 12v29M14 16c5-1 9 0 13 2m-13 5c5-1 9 0 13 2m23-9c-5-1-9 0-13 2m13 5c-5-1-9 0-13 2" stroke="var(--booknook-page)" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span>Turning a page…</span>
      </div>
    </main>
  );
}
