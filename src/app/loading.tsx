export default function Loading() {
  return (
    <main className="flex flex-1 items-center justify-center bg-book-page py-24 text-book-accent-text">
      <div
        role="status"
        className="flex items-center gap-3 text-sm text-book-muted"
      >
        <span className="size-5 animate-spin rounded-full border-2 border-book-border-strong border-t-[#91cda3]" />
        Loading BookNook…
      </div>
    </main>
  );
}
