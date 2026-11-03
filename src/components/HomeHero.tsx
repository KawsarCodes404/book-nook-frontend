"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Autoplay, EffectFade, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/effect-fade"
import "swiper/css/pagination"

const slides = [
  {
    eyebrow: "BOOKNOOK",
    title: "Your neighbourhood library, online",
    text: "Find a book that someone nearby already loved, and borrow it for a week.",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=2200&q=85",
  },
  {
    eyebrow: "PASS IT ON",
    title: "Share the books on your shelf",
    text: "Add the books you have finished. Let other readers enjoy them too.",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=2200&q=85",
  },
  {
    eyebrow: "A GOOD BOOK TRAVELS",
    title: "Borrow, read, return. Repeat.",
    text: "Seven days for every book. Return it with one click when you are done.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=2200&q=85",
  },
]

export function HomeHero() {
  return (
    <section className="relative isolate min-h-[470px] overflow-hidden border-b border-[#29372f]">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        autoplay={{ delay: 6500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="booknook-hero-swiper absolute inset-0 -z-20 !h-full"
        aria-label="BookNook featured books"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.eyebrow}>
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${slide.image}')` }}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#07100c]/95 via-[#07100c]/65 to-[#07100c]/25" />

            <div className="relative mx-auto flex min-h-[470px] max-w-7xl items-center px-6 py-16 lg:px-8">
              <div className="max-w-xl">
                <p className="mb-4 text-xs font-semibold tracking-[0.22em] text-[#a2d9b2]">
                  {slide.eyebrow}
                </p>

                <h1 className="font-serif text-5xl font-bold leading-tight sm:text-6xl">
                  {slide.title}
                </h1>

                <p className="mt-5 max-w-md text-base leading-7 text-[#d1d9d3]">
                  {slide.text}
                </p>

                <Link
                  href="/books"
                  className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#91cda3] px-5 py-3 text-sm font-semibold text-[#102016] transition hover:bg-[#a2d9b2]"
                >
                  Browse Books
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
