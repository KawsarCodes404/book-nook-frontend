"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const passwordRequirements = [
  {
    label: "At least 6 characters",
    test: (value: string) => value.length >= 6,
  },
  {
    label: "One uppercase letter",
    test: (value: string) => /[A-Z]/.test(value),
  },
  {
    label: "One lowercase letter",
    test: (value: string) => /[a-z]/.test(value),
  },
]

function getSafeCallbackUrl() {
  const callbackUrl = new URLSearchParams(window.location.search).get("callbackUrl")

  if (callbackUrl?.startsWith("/") && !callbackUrl.startsWith("//")) {
    return callbackUrl
  }

  return "/"
}

export default function RegisterPage() {
  const router = useRouter()

  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage("")

    const invalidRequirement = passwordRequirements.find(
      ({ test }) => !test(password),
    )

    if (invalidRequirement) {
      setErrorMessage(
        "Password must be at least 6 characters and include uppercase and lowercase letters.",
      )
      return
    }

    const formData = new FormData(event.currentTarget)

    const { error } = await authClient.signUp.email({
      name: String(formData.get("name")),
      email: String(formData.get("email")),
      image: String(formData.get("image")) || undefined,
      password,
    })

    if (error) {
      setErrorMessage(error.message ?? "Registration failed. Please try again.")
      return
    }

    const callbackUrl = getSafeCallbackUrl()
    router.replace(
      `/login?registered=1&callbackUrl=${encodeURIComponent(callbackUrl)}`,
    )
  }

  const handleGoogleSignIn = async () => {
    setErrorMessage("")

    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
      errorCallbackURL: "/register",
    })

    if (error) {
      setErrorMessage(error.message ?? "Google sign in failed. Please try again.")
    }
  }

  return (
    <main className="flex flex-1 items-center justify-center bg-[#0b130f] px-4 py-12 text-[#e5eee8]">
      <Card className="w-full max-w-md border border-[#29372f] bg-[#142019] text-[#e5eee8]">
        <CardHeader className="text-center">
          <CardTitle className="font-serif text-3xl">
            Create your account
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRegister}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  className="border-[#34453b] bg-[#1c2a22] text-white"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="border-[#34453b] bg-[#1c2a22] text-white"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="image">Photo URL</FieldLabel>
                <Input
                  id="image"
                  name="image"
                  type="url"
                  autoComplete="url"
                  placeholder="https://example.com/photo.jpg"
                  required
                  className="border-[#34453b] bg-[#1c2a22] text-white"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="border-[#34453b] bg-[#1c2a22] text-white"
                />

                <ul className="mt-1 space-y-1 text-xs text-[#aab6ae]">
                  {passwordRequirements.map(({ label, test }) => (
                    <li
                      key={label}
                      className={test(password) ? "text-[#91cda3]" : ""}
                    >
                      {test(password) ? "✓" : "•"} {label}
                    </li>
                  ))}
                </ul>
              </Field>

              {errorMessage && (
                <p role="alert" className="text-sm text-red-300">
                  {errorMessage}
                </p>
              )}

              <Button
                type="submit"
                className="w-full bg-[#91cda3] text-[#102016] hover:bg-[#a2d9b2]"
              >
                Register
              </Button>

              <FieldSeparator className="text-[#99a79e] [&_[data-slot=field-separator-content]]:bg-[#142019]">
                OR
              </FieldSeparator>

              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignIn}
                className="w-full border-[#34453b] bg-[#1c2a22] text-[#e5eee8] hover:bg-[#26372c]"
              >
                Continue with Google
              </Button>

              <FieldDescription className="text-center text-[#aab6ae]">
                Already registered?{" "}
                <Link href="/login" className="text-[#91c5a5] hover:underline">
                  Login
                </Link>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
