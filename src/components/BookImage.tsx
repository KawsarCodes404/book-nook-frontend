import Image from "next/image"

type BookImageProps = {
  src: string
  alt: string
  className: string
  sizes?: string
  priority?: boolean
}

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
}: BookImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={!canOptimizeImage(src)}
      className={className}
    />
  )
}
