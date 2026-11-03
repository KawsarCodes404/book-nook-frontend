"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, BookOpen, PenLine } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

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
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=2200&q=85",
  },
];

export function HomeHero() {
  const [activeSlide, setActiveSlide] = useState(1);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative isolate min-h-[560px] overflow-hidden border-b border-book-border sm:min-h-[620px]">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={
          shouldReduceMotion
            ? false
            : { delay: 6500, disableOnInteraction: false, pauseOnMouseEnter: true }
        }
        pagination={{ clickable: true }}
        speed={shouldReduceMotion ? 0 : 850}
        onSlideChange={(swiper) => setActiveSlide(swiper.realIndex + 1)}
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

            <div className="absolute inset-0 bg-gradient-to-r from-book-hero/95 via-book-hero/75 to-book-hero/40" />
            <div className="booknook-drift absolute -right-20 top-10 size-80 rounded-full bg-book-accent/25 blur-3xl" />
            <motion.div
              aria-hidden="true"
              className="booknook-hero-blob pointer-events-none absolute right-[20%] top-[8%] z-0 hidden sm:block"
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.88, rotate: -10 }}
              animate={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0.9, scale: 1, rotate: 0 }
              }
              transition={{ duration: shouldReduceMotion ? 0 : 1.1, ease: "easeOut" }}
            >
              <svg viewBox="0 0 520 440" className="size-full" fill="none">
                <path
                  d="M259 24c53 3 73 42 105 65 39 28 102 32 119 77 18 47-22 85-45 123-24 41-31 94-78 113-47 19-90-13-136-20-51-8-112 8-145-31-33-40-11-95-15-145-4-48-34-102-7-142 28-41 93-30 139-39 25-5 42-3 63-1Z"
                  fill="#c95f43"
                  fillOpacity=".68"
                />
                <path
                  d="M203 92c45-25 82-15 113 8 36 27 51 52 94 55 35 2 63 21 69 48 7 32-19 57-42 80-20 20-40 47-71 45-34-1-50-31-82-36-35-5-73 14-99-7-28-22-20-58-13-91 6-30 1-83 31-102Z"
                  fill="#e8a27b"
                  fillOpacity=".32"
                />
                <path
                  d="M133 321c62-37 103-87 159-77 48 8 80 55 136 25"
                  stroke="#fff1df"
                  strokeOpacity=".74"
                  strokeWidth="1.5"
                />
                <path
                  d="M84 272c75-69 121 65 198-2 48-42 79-112 151-91"
                  stroke="#ffe0c4"
                  strokeOpacity=".95"
                  strokeWidth="2"
                  strokeDasharray="5 10"
                />
                <circle cx="400" cy="115" r="5" fill="#ffe0c4" />
                <circle cx="115" cy="160" r="3" fill="#ffe0c4" />
              </svg>
            </motion.div>

            <div className="relative mx-auto flex min-h-[560px] max-w-7xl items-center justify-between gap-8 px-6 pb-24 pt-16 text-book-hero-text sm:min-h-[620px] lg:px-8">
              <div className="relative z-10 booknook-rise-in max-w-2xl">
                <p className="mb-4 text-xs font-semibold tracking-[0.22em] text-book-hero-accent">
                  {slide.eyebrow}
                </p>

                <h1 className="max-w-2xl font-serif text-5xl font-bold leading-[1.06] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
                  {slide.title}
                </h1>

                <p className="mt-6 max-w-lg text-base leading-7 text-book-hero-copy sm:text-lg">
                  {slide.text}
                </p>

                <Link
                  href="/books"
                  className="booknook-action group relative mt-8 inline-flex items-center gap-3 rounded-full bg-book-accent px-6 py-3.5 text-sm font-semibold text-book-accent-ink shadow-lg shadow-black/20 hover:bg-book-accent-hover"
                >
                  <span className="relative z-10">Browse Books</span>
                  <ArrowRight className="relative size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <aside className="booknook-float pointer-events-none absolute right-[max(calc((100vw-80rem)/2+3rem),2rem)] top-24 bottom-20 z-10 my-auto hidden h-fit w-64 rounded-[1.75rem] border border-white/20 bg-[#241e27]/90 p-5 text-book-hero-text shadow-2xl shadow-black/30 backdrop-blur-xl md:block lg:w-72 lg:p-6">
        <div className="absolute -right-3 -top-3 flex size-11 items-center justify-center rounded-full border border-white/25 bg-book-accent text-book-accent-ink shadow-lg">
          <PenLine className="booknook-pen-icon size-5" />
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-book-hero-accent">
          <BookOpen className="size-4" />
          The shared shelf
        </div>
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
          animate={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 1, y: 0, scale: 1 }
          }
          transition={{ duration: shouldReduceMotion ? 0 : 0.7, delay: 0.2, ease: "easeOut" }}
          className="mt-8 flex h-40 items-end justify-center gap-2 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/15 to-white/5 px-5 pb-5"
        >
          <span className="h-24 w-9 rounded-t-md border-l-4 border-white/20 bg-[#b86d58] shadow-md" />
          <span className="h-32 w-10 rounded-t-md border-l-4 border-white/20 bg-[#d1a66f] shadow-md" />
          <span className="h-28 w-9 rounded-t-md border-l-4 border-white/20 bg-[#596982] shadow-md" />
          <span className="h-36 w-11 rounded-t-md border-l-4 border-white/20 bg-[#eee1cf] shadow-md" />
          <span className="h-[6.5rem] w-8 rounded-t-md border-l-4 border-white/20 bg-[#6b536d] shadow-md" />
        </motion.div>
        <div className="mt-5 flex items-end justify-between gap-3">
          <div>
            <p className="font-serif text-lg font-semibold">Stories travel.</p>
            <p className="mt-1 text-xs text-book-hero-copy">Pass a good read along.</p>
          </div>
          <span className="rounded-full border border-white/20 px-2.5 py-1 text-[10px] tracking-widest text-book-hero-accent">
            {String(activeSlide).padStart(2, "0")} / 03
          </span>
        </div>
      </aside>
    </section>
  );
}
