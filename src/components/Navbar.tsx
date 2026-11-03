"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, BookOpen, LogOut, UserRound } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const publicLinks = [
  { label: "Home", href: "/" },
  { label: "All Books", href: "/books" },
];

const privateLinks = [
  { label: "Add Book", href: "/add-book" },
  { label: "My Books", href: "/my-books" },
  { label: "My Borrows", href: "/my-borrows" },
];

export function Navbar() {
  return (
    <Suspense fallback={<NavbarFallback />}>
      <NavbarContent />
    </Suspense>
  );
}

function NavbarFallback() {
  return (
    <header className="sticky top-0 z-50 border-b border-book-border bg-book-header/95 px-4 text-book-text shadow-sm shadow-black/5 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-serif text-lg font-bold sm:text-xl"
        >
          <span className="flex size-9 items-center justify-center rounded-md bg-book-accent text-book-accent-ink">
            <BookOpen className="size-5" />
          </span>
          BookNook
        </Link>
      </div>
    </header>
  );
}

function NavbarContent() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const links = user ? [...publicLinks, ...privateLinks] : publicLinks;

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-book-border bg-book-header/95 px-4 text-book-text shadow-sm shadow-black/5 backdrop-blur">
      <div className="mx-auto max-w-7xl">
        <div className="flex min-h-16 items-center justify-between gap-3 sm:gap-5">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 font-serif text-lg font-bold sm:text-xl"
          >
            <span className="flex size-9 items-center justify-center rounded-md bg-book-accent text-book-accent-ink shadow-sm shadow-book-accent/20">
              <BookOpen className="size-5" />
            </span>
            BookNook
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden flex-1 items-center justify-center gap-6 px-1 text-sm lg:flex"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={`border-b py-1 transition-colors hover:text-book-accent-text ${pathname === link.href ? "border-book-accent font-semibold text-book-accent-text" : "border-transparent text-book-muted"}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <ThemeToggle />
            {user ? (
              <Popover>
                <PopoverTrigger
                  aria-label="Open account menu"
                  className="rounded-full transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-book-accent focus-visible:ring-offset-2 focus-visible:ring-offset-book-header"
                >
                  <Avatar className="size-9">
                    <AvatarImage
                      src={user.image ?? undefined}
                      referrerPolicy="no-referrer"
                    />
                    <AvatarFallback>
                      {user.name?.charAt(0) ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent
                  align="end"
                  sideOffset={12}
                  className="w-[min(20rem,calc(100vw-1.5rem))] gap-2 rounded-2xl border border-book-border bg-book-surface p-2.5 text-book-text shadow-xl shadow-black/15"
                >
                  <div className="rounded-xl border border-book-border bg-book-page p-3.5">
                    <div className="mb-3 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-book-accent-text">
                      <span className="size-1.5 rounded-full bg-book-accent" />
                      Signed in to BookNook
                    </div>

                    <div className="flex min-w-0 items-center gap-3">
                      <Avatar className="size-11 shrink-0 ring-2 ring-book-accent/25 ring-offset-2 ring-offset-book-page">
                        <AvatarImage
                          src={user.image ?? undefined}
                          referrerPolicy="no-referrer"
                        />
                        <AvatarFallback className="bg-book-accent text-book-accent-ink">
                          {user.name?.charAt(0) ?? "U"}
                        </AvatarFallback>
                      </Avatar>

                      <div className="min-w-0">
                        <p className="break-words text-sm font-semibold leading-5">
                          {user.name || "BookNook reader"}
                        </p>
                        <p className="mt-0.5 break-all text-xs leading-4 text-book-muted">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/profile"
                    className="group flex items-center justify-between rounded-xl border border-transparent px-3 py-3 text-sm font-medium transition-colors hover:border-book-border hover:bg-book-page"
                  >
                    <span className="flex items-center gap-2.5">
                      <UserRound className="size-4 text-book-accent-text" />
                      My Profile
                    </span>
                    <ArrowUpRight className="size-4 text-book-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>

                  <div className="h-px bg-book-border" />

                  <Button
                    type="button"
                    className="h-10 w-full justify-start gap-2.5 rounded-xl px-3 text-red-600 hover:bg-red-500/10 hover:text-red-600 dark:text-red-300 dark:hover:text-red-300"
                    variant="ghost"
                    onClick={handleLogout}
                  >
                    <LogOut className="size-4" />
                    Logout
                  </Button>
                </PopoverContent>
              </Popover>
            ) : (
              <>
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "text-book-text",
                  )}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className={cn(
                    buttonVariants(),
                    "bg-book-accent text-book-accent-ink hover:bg-book-accent-hover",
                  )}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        <nav
          aria-label="Mobile navigation"
          className="flex gap-6 overflow-x-auto border-t border-book-border py-3 text-sm lg:hidden"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className={`shrink-0 border-b py-1 transition-colors hover:text-book-accent-text ${pathname === link.href ? "border-book-accent font-semibold text-book-accent-text" : "border-transparent text-book-muted"}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
