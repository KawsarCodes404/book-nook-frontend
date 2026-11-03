'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { BookOpen } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

const publicLinks = [
  { label: "Home", href: "/" },
  { label: "All Books", href: "/books" },
]

const privateLinks = [
  { label: "Add Book", href: "/add-book" },
  { label: "My Books", href: "/my-books" },
  { label: "My Borrows", href: "/my-borrows" },
]

export function Navbar() {
  const router = useRouter()
  const { data: session } = authClient.useSession()
  const user = session?.user
  const links = user ? [...publicLinks, ...privateLinks] : publicLinks

  const handleLogout = async () => {
    await authClient.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#26362d] bg-[#0d1711]/95 px-4 text-[#e2ece5] backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-5">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 font-serif text-xl font-bold"
        >
          <span className="flex size-9 items-center justify-center rounded-md bg-[#91cda3] text-[#102016]">
            <BookOpen className="size-5" />
          </span>
          BookNook
        </Link>

        <nav aria-label="Main navigation" className="flex max-w-[42vw] flex-1 items-center justify-start gap-4 overflow-x-auto whitespace-nowrap px-1 text-xs md:max-w-none md:justify-center md:gap-6 md:text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[#aebbb2] transition-colors hover:text-[#a2d9b2]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {user ? (
            <Popover>
              <PopoverTrigger
                aria-label="Open account menu"
                className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91cda3]"
              >
                <Avatar className="size-9">
                  <AvatarImage
                    src={user.image ?? undefined}
                    referrerPolicy="no-referrer"
                  />
                  <AvatarFallback>{user.name?.charAt(0) ?? "U"}</AvatarFallback>
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
                <Link href="/profile" className="py-2 text-sm hover:underline">
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
                className={cn(buttonVariants({ variant: "ghost" }), "text-[#dce8df]")}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={cn(
                  buttonVariants(),
                  "bg-[#91cda3] text-[#102016] hover:bg-[#a2d9b2]",
                )}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
