"use client";

import { motion, useReducedMotion } from "framer-motion";

type BookShareIllustrationProps = {
  compact?: boolean;
};

export function BookShareIllustration({
  compact = false,
}: BookShareIllustrationProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={`booknook-people-scene ${compact ? "booknook-people-scene-compact" : ""}`}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
      <svg viewBox="0 0 520 380" fill="none" className="size-full">
        <ellipse cx="260" cy="330" rx="204" ry="24" fill="currentColor" opacity=".08" />
        <path d="M80 100c18-44 65-67 109-49 34 14 45 48 28 75-14 22-49 28-79 22-30-6-67-19-58-48Z" fill="#f0d4b8" />
        <path d="M380 55c37-24 83-12 99 20 17 33-8 65-37 77-29 13-73 8-88-19-15-28-4-60 26-78Z" fill="#d8e7de" />
        <path d="M108 289c5-61 29-101 76-101 46 0 68 40 72 101l-8 35H99l9-35Z" fill="#c95f43" />
        <path d="M114 205c-7-36 11-66 41-68 34-2 50 24 43 53-6 24-22 38-43 39-19 0-36-9-41-24Z" fill="#9b614a" />
        <path d="M109 205c-2-46 20-77 54-75 27 1 43 21 42 47-10-13-21-20-35-23-7 20-31 33-61 32v19Z" fill="#30232c" />
        <path d="M125 322h55l18 23h-82l9-23Z" fill="#6d4d43" />
        <path d="M267 289c5-61 29-101 76-101 46 0 68 40 72 101l-8 35H258l9-35Z" fill="#465d86" />
        <path d="M273 205c-7-36 11-66 41-68 34-2 50 24 43 53-6 24-22 38-43 39-19 0-36-9-41-24Z" fill="#cf9875" />
        <path d="M270 205c-2-46 20-77 54-75 27 1 43 21 42 47-10-13-21-20-35-23-7 20-31 33-61 32v19Z" fill="#29233b" />
        <path d="M284 322h55l18 23h-82l9-23Z" fill="#59483f" />
        <g className="booknook-illustration-book">
          <path d="m179 219 78-19c10-2 19 5 19 15v74l-79 19c-10 2-19-5-19-15v-74Z" fill="#fff6e9" stroke="#cdb4a1" strokeWidth="3" />
          <path d="m276 215 78 19v74l-78-19v-74Z" fill="#f3e4d4" stroke="#cdb4a1" strokeWidth="3" />
          <path d="m276 215-79 19m79-19v74m-64-52 46-11m-46 26 46-11m29-1 43 11m-43 4 43 11" stroke="#c95f43" strokeWidth="4" strokeLinecap="round" opacity=".75" />
        </g>
        <path d="M222 170c17-25 49-31 75-17" stroke="#c95f43" strokeWidth="3" strokeDasharray="4 9" strokeLinecap="round" />
        <path d="m291 143 11 8-13 5" stroke="#c95f43" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M88 145h17m-8-8v16m332 34h17m-8-8v16" stroke="#bd765e" strokeWidth="3" strokeLinecap="round" />
        <path d="m416 109 4 8 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1 4-8Z" fill="#d99a62" />
      </svg>
    </motion.div>
  );
}
