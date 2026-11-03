"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { AuthAside } from "@/components/AuthAside";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

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
];

function getSafeCallbackUrl() {
  const callbackUrl = new URLSearchParams(window.location.search).get(
    "callbackUrl",
  );

  if (callbackUrl?.startsWith("/") && !callbackUrl.startsWith("//")) {
    return callbackUrl;
  }

  return "/";
}

export default function RegisterPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    const invalidRequirement = passwordRequirements.find(
      ({ test }) => !test(password),
    );

    if (invalidRequirement) {
      setErrorMessage(
        "Password must be at least 6 characters and include uppercase and lowercase letters.",
      );
      return;
    }

    const formData = new FormData(event.currentTarget);
    setIsSubmitting(true);

    const { error } = await authClient.signUp.email({
      name: String(formData.get("name")),
      email: String(formData.get("email")),
      image: String(formData.get("image")) || undefined,
      password,
    });

    if (error) {
      setErrorMessage(
        error.message ?? "Registration failed. Please try again.",
      );
      setIsSubmitting(false);
      return;
    }

    const callbackUrl = getSafeCallbackUrl();
    router.replace(
      `/login?registered=1&callbackUrl=${encodeURIComponent(callbackUrl)}`,
    );
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage("");
    setIsGoogleLoading(true);

    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
      errorCallbackURL: "/register",
    });

    if (error) {
      setErrorMessage(
        error.message ?? "Google sign in failed. Please try again.",
      );
      setIsGoogleLoading(false);
    }
  };

  return (
    <main className="flex flex-1 items-center justify-center bg-book-page px-4 py-10 text-book-text sm:px-6 lg:py-14">
      <div className="grid w-full max-w-5xl items-center gap-6 md:grid-cols-[1fr_0.9fr] lg:gap-10">
        <AuthAside mode="register" />

        <Card className="booknook-form-shell booknook-rise-in mx-auto w-full max-w-md border border-book-border bg-book-surface text-book-text md:max-w-none">
        <CardHeader className="text-center">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-book-accent-text">JOIN THE SHELF</p>
          <CardTitle className="font-serif text-3xl">
            Create your account
          </CardTitle>
          <p className="text-sm text-book-muted">A community of readers is a page away.</p>
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
                  className="border-book-border-strong bg-book-input text-book-text"
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
                  className="border-book-border-strong bg-book-input text-book-text"
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
                  className="border-book-border-strong bg-book-input text-book-text"
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
                  className="border-book-border-strong bg-book-input text-book-text"
                />

                <ul className="mt-1 space-y-1 text-xs text-book-muted">
                  {passwordRequirements.map(({ label, test }) => (
                    <li
                      key={label}
                      className={test(password) ? "text-book-accent-text" : ""}
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
                disabled={isSubmitting || isGoogleLoading}
                className="w-full bg-book-accent text-book-accent-ink hover:bg-book-accent-hover"
              >
                {isSubmitting ? <><LoaderCircle className="animate-spin" /> Creating account…</> : "Register"}
              </Button>

              <FieldSeparator className="text-book-muted [&_[data-slot=field-separator-content]]:bg-book-surface">
                OR
              </FieldSeparator>

              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting || isGoogleLoading}
                onClick={handleGoogleSignIn}
                className="booknook-action w-full border-book-border-strong bg-book-input text-book-text hover:bg-book-hover"
              >
                <span aria-hidden="true" className="font-bold text-blue-500">G</span>
                {isGoogleLoading ? "Connecting to Google…" : "Continue with Google"}
              </Button>

              <FieldDescription className="text-center text-book-muted">
                Already registered?{" "}
                <Link
                  href="/login"
                  className="text-book-accent-text hover:underline"
                >
                  Login
                </Link>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
        </Card>
      </div>
    </main>
  );
}
