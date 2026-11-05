"use client";

import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  A11y,
} from "swiper/modules";

import { buttonVariants } from "@/components/ui/button";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    id: 1,
    label: "Welcome to BookNook",
    title: "Your next chapter starts here.",
    description:
      "Discover stories that spark your imagination. Find a favorite and make a little time for reading.",
    background: "bg-[#eef2e8]",
    coverColor: "bg-[#294f3b]",
    bookTitle: "Find Your Next Story",
    bookLabel: "A BookNook collection",
  },
  {
    id: 2,
    label: "Follow your curiosity",
    title: "Small library. Big discoveries.",
    description:
      "From fascinating science to unforgettable fiction, explore books that take you somewhere new.",
    background: "bg-[#f4ece2]",
    coverColor: "bg-[#865d42]",
    bookTitle: "A World of Discovery",
    bookLabel: "Something for every reader",
  },
  {
    id: 3,
    label: "Share the joy of reading",
    title: "Good books bring us together.",
    description:
      "Borrow a book, enjoy the journey, and return it for the next reader. Every story deserves to be shared.",
    background: "bg-[#e8eef2]",
    coverColor: "bg-[#36566b]",
    bookTitle: "Stories Worth Sharing",
    bookLabel: "Read. Return. Repeat.",
  },
];

export default function Banner() {
  return (
    <section aria-label="Discover BookNook">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, A11y]}
        slidesPerView={1}
        loop
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        className="booknook-banner"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className={`${slide.background} text-[#223a30]`}>
              <div className="mx-auto grid min-h-[560px] max-w-7xl items-center gap-10 px-12 py-16 md:grid-cols-2 md:px-16 lg:px-20">
                
                <div>
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#546b50]">
                    {slide.label}
                  </p>

                  {index === 0 ? (
                    <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                      {slide.title}
                    </h1>
                  ) : (
                    <h2 className="max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                      {slide.title}
                    </h2>
                  )}

                  <p className="mt-5 max-w-md text-sm leading-7 text-[#5d6b5d] sm:text-base">
                    {slide.description}
                  </p>

                  <Link
                    href="/books"
                    className={`${buttonVariants({
                      size: "lg",
                    })} mt-7 bg-[#294f3b] text-white hover:bg-[#203e2e]`}
                  >
                    Browse Books

                    <ArrowRight
                      className="size-4"
                      aria-hidden="true"
                    />
                  </Link>
                </div>

                <div
                  className="flex items-center justify-center py-6"
                  aria-hidden="true"
                >
                  <div className="flex size-64 items-center justify-center rounded-full bg-white/40 sm:size-80">
                    <div
                      className={`${slide.coverColor} flex h-60 w-44 -rotate-6 flex-col items-center justify-between rounded-r-lg border-l-8 border-black/15 px-5 py-6 text-center text-white shadow-2xl sm:h-72 sm:w-52`}
                    >
                      <span className="text-[10px] uppercase tracking-widest text-white/75">
                        BookNook Library
                      </span>

                      <BookOpen
                        className="size-12 text-white/80"
                        strokeWidth={1.2}
                      />

                      <p className="text-2xl font-semibold leading-tight sm:text-3xl">
                        {slide.bookTitle}
                      </p>

                      <span className="text-[10px] text-white/75">
                        {slide.bookLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}