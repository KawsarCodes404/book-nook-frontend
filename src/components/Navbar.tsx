'use client'
import { User } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { authClient } from "@/lib/auth-client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "./ui/button"

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Destinations", href: "/destinations" },
  { label: "Add Destination", href: "/add-destination", active: false },
  { label: "My Bookings", href: "/my-bookings" },
]

const authLinks = [
  { label: "Login", href: "/login" },
  { label: "Sign Up", href: "/signup", emphasis: true },
]

function Navbar({ className }: { className?: string }) {

  const { data: session } = authClient.useSession();

  const user = session?.user;

  const handleSignOut = () => {
    authClient.signOut();
  }

  return (
    <header className={cn("sticky top-0 z-50 px-2 pt-2", className)}>
      <div className="flex h-14 items-center justify-between rounded-lg bg-background px-6 shadow-sm">
        <nav className="flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "text-sm transition-colors hover:text-brand",
                link.active
                  ? "text-brand underline decoration-brand decoration-2 underline-offset-4"
                  : "text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 font-serif text-3xl font-semibold tracking-wide text-brand"
        >
          Wanderlast
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/profile"
            className="flex items-center gap-1.5 text-sm transition-colors hover:text-brand"
          >
            <User className="size-4" />
            Profile
          </Link>

          {user ? (
            <Popover>
              <PopoverTrigger
                render={<button
                  type="button"
                  aria-label="Open account menu"
                  className="inline-flex appearance-none rounded-full border-0 bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Avatar className="size-9 rounded-full">
                    <AvatarImage
                      referrerPolicy="no-referrer"
                      src={user.image ?? undefined}
                      className="rounded-full object-cover"
                    />
                    <AvatarFallback className="rounded-full">
                      {user.name?.charAt(0) ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                </button>
                }
              />

              <PopoverContent>
                <PopoverHeader>
                  <PopoverTitle>{user.name}</PopoverTitle>
                  <PopoverDescription>{user.email}</PopoverDescription>
                </PopoverHeader>

                <Button
                  type="button"
                  onClick={handleSignOut}
                  variant="destructive"
                  className="mt-3 w-full"
                >
                  Sign out
                </Button>
              </PopoverContent>
            </Popover>
          ) : (
            authLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-sm transition-colors hover:text-brand",
                  
                  link.emphasis && "font-semibold"
                )}
              >
                {link.label}
              </Link>
            ))
          )}

        </div>

      </div>
    </header>
  )
}

export { Navbar }