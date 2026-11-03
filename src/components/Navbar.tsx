"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
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
  const router = useRouter();
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
                className="text-book-muted transition-colors hover:text-book-accent-text"
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
                  className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-book-accent"
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
                <PopoverContent className="w-56">
                  <PopoverHeader>
                    <PopoverTitle className="break-words">
                      {user.name}
                    </PopoverTitle>
                    <PopoverDescription className="break-all">
                      {user.email}
                    </PopoverDescription>
                  </PopoverHeader>
                  <Link
                    href="/profile"
                    className="py-2 text-sm hover:underline"
                  >
                    My Profile
                  </Link>
                  <Button
                    type="button"
                    className="w-full"
                    variant="destructive"
                    onClick={handleLogout}
                  >
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
              className="shrink-0 text-book-muted transition-colors hover:text-book-accent-text"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
