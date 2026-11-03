"use client";

import Image from "next/image";
import { BookOpen } from "lucide-react";
import { useState } from "react";

type BookImageProps = {
  src: string;
  alt: string;
  className: string;
  sizes?: string;
  priority?: boolean;
  showFallbackLabel?: boolean;
};

function canOptimizeImage(src: string) {
  try {
    const hostname = new URL(src).hostname

    return hostname === "i.ibb.co" || hostname === "lh3.googleusercontent.com"
  } catch {
    return false
  }
}

export function BookImage({
  src,
  alt,
  className,
  sizes,
  priority = false,
  showFallbackLabel = false,
}: BookImageProps) {
  const [failedSrc, setFailedSrc] = useState("");

  if (!src || failedSrc === src) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_75%_15%,rgba(232,162,123,0.36),transparent_36%),linear-gradient(145deg,var(--booknook-deep),var(--booknook-surface))] px-3 text-center">
        <span className="booknook-cover-mark flex size-[min(5rem,45%)] items-center justify-center rounded-[1.25rem] border border-book-border-strong/70 bg-book-surface/75 text-book-accent-text shadow-lg shadow-black/10">
          <BookOpen className="size-1/2" strokeWidth={1.35} />
        </span>
        {showFallbackLabel && (
          <>
            <span className="mt-5 font-serif text-lg font-semibold text-book-text">
              BookNook
            </span>
            <span className="mt-1 text-xs text-book-muted">
              Cover unavailable
            </span>
          </>
        )}
        <span aria-hidden="true" className="booknook-cover-orbit absolute -bottom-16 -right-12 size-48 rounded-full border border-book-accent/20" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={!canOptimizeImage(src)}
      className={className}
      onError={() => setFailedSrc(src)}
    />
  );
}
