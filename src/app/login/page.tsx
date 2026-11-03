"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle, LoaderCircle } from "lucide-react";

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

function GoogleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" className="size-4">
      <path
        fill="#4285F4"
        d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.7c3.9-3.6 6-8.8 6-15Z"
      />
      <path
        fill="#34A853"
        d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.7-5.1c-1.8 1.2-4 1.9-6.8 1.9-5.2 0-9.6-3.5-11.2-8.2H5.9v5.2A20 20 0 0 0 24 44Z"
      />
      <path
        fill="#FBBC05"
        d="M12.8 27.8a12 12 0 0 1 0-7.6V15H5.9a20 20 0 0 0 0 18Z"
      />
      <path
        fill="#EA4335"
        d="M24 12c3 0 5.7 1 7.8 3.1l5.9-5.9C34.1 6 29.5 4 24 4A20 20 0 0 0 5.9 15l6.9 5.2C14.4 15.5 18.8 12 24 12Z"
      />
    </svg>
  );
}

function getSafeCallbackUrl() {
  const callbackUrl = new URLSearchParams(window.location.search).get(
    "callbackUrl",
  );

  if (callbackUrl?.startsWith("/") && !callbackUrl.startsWith("//")) {
    return callbackUrl;
  }

  return "/";
}

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [hideQueryMessage, setHideQueryMessage] = useState(false);

  const oauthError = searchParams.get("error");
  const queryMessage =
    oauthError === "account_not_linked"
      ? "This email already has a BookNook password account. Sign in with your email and password first."
      : oauthError
        ? "Google sign in could not be completed. Please try again."
        : searchParams.get("registered") === "1"
          ? "Your account is ready. Sign in to open your shelf."
          : "";
  const visibleMessage = errorMessage || (hideQueryMessage ? "" : queryMessage);

  const handleEmailLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHideQueryMessage(true);
    setErrorMessage("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const callbackUrl = getSafeCallbackUrl();

    const { error } = await authClient.signIn.email({
      email: String(formData.get("email")),
      password: String(formData.get("password")),
      callbackURL: callbackUrl,
    });

    if (error) {
      setErrorMessage(
        error.message ?? "Sign in failed. Please check your details.",
      );
      setIsSubmitting(false);
      return;
    }

    router.replace(callbackUrl);
    router.refresh();
  };

  const handleGoogleSignIn = async () => {
    setHideQueryMessage(true);
    setErrorMessage("");
    setIsGoogleLoading(true);

    const callbackUrl = getSafeCallbackUrl();
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: callbackUrl,
      errorCallbackURL: `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`,
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
        <AuthAside mode="login" />

        <Card className="booknook-form-shell booknook-rise-in mx-auto w-full max-w-md border border-book-border bg-book-surface text-book-text shadow-2xl shadow-black/10 md:max-w-none">
        <CardHeader className="pb-6 text-center">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-book-accent-text">WELCOME BACK</p>
          <CardTitle className="font-serif text-3xl">Login</CardTitle>
          <p className="text-sm text-book-muted">Your next good read is waiting.</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleEmailLogin}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  className="border-book-border-strong bg-book-input text-book-text"
                />
              </Field>

              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <span className="text-xs text-book-accent-text">
                    Forgot Password?
                  </span>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="border-book-border-strong bg-book-input text-book-text"
                />
              </Field>

              {visibleMessage && (
                <p role="status" className={`flex items-start gap-2 rounded-lg border px-3 py-2.5 text-sm ${visibleMessage.startsWith("Your account") ? "border-book-border bg-book-page text-book-accent-text" : "border-red-900/30 bg-red-950/20 text-red-700 dark:text-red-300"}`}>
                  <AlertCircle className="mt-0.5 size-4 shrink-0" />
                  {visibleMessage}
                </p>
              )}

              <Button
                type="submit"
                disabled={isSubmitting || isGoogleLoading}
                className="w-full bg-book-accent text-book-accent-ink hover:bg-book-accent-hover"
              >
                {isSubmitting ? <><LoaderCircle className="animate-spin" /> Signing in…</> : "Login"}
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
                <GoogleIcon />
                {isGoogleLoading ? "Connecting to Google…" : "Continue with Google"}
              </Button>

              <FieldDescription className="pt-2 text-center text-book-muted">
                New here?{" "}
                <Link
                  className="text-book-accent-text hover:underline"
                  href="/register"
                  onClick={(event) => {
                    const callbackUrl = getSafeCallbackUrl();

                    if (callbackUrl !== "/") {
                      event.preventDefault();
                      router.push(
                        `/register?callbackUrl=${encodeURIComponent(callbackUrl)}`,
                      );
                    }
                  }}
                >
                  Register
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

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <main className="flex flex-1 items-center justify-center bg-book-page px-4 py-12 text-book-muted">
          Preparing your sign in…
        </main>
      }
    >
      <SignInForm />
    </Suspense>
  );
}
