// src/components/Carousel.jsx
import { useState, useEffect, useCallback } from "react";
import bannerImg1 from "../../../assets/banner/banner1.png";
import bannerImg2 from "../../../assets/banner/banner2.png";
import bannerImg3 from "../../../assets/banner/banner3.png";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { bg: bannerImg1, isPrimary: true },
  { bg: bannerImg2, isPrimary: false },
  { bg: bannerImg3, isPrimary: false },
];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  // Auto-play
  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      5000
    );
    return () => clearInterval(id);
  }, []);

  const goTo = useCallback((i) => setIndex(i), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + slides.length) % slides.length),
    []
  );
  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), []);

  return (
    <div className="relative w-full overflow-hidden">
      {/* ---------- Slides ---------- */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`
              shrink-0 w-full h-[150px] md:h-[330px] relative
              /* Mobile: contain + bottom-aligned */
              bg-contain bg-no-repeat
              /* Desktop: cover + center */
              md:bg-cover md:bg-center
            `}
            style={{
              backgroundImage: `url(${slide.bg})`,
            }}
          >
            {/* ---------- Buttons – Your Exact Layout ---------- */}
            <div
              className={`
                absolute flex flex-col sm:flex-row gap-3
                /* Mobile: centered at bottom */
                left-1/2 -translate-x-1/2 bottom-8
                /* Desktop: left side, top-140 */
                md:left-8 md:bottom-auto md:top-140 md:-translate-y-1/2 md:translate-x-0
              `}
            >
              <button className="px-6 py-3 bg-primary text-black text-xl font-bold rounded-full flex items-center gap-2 hover:bg-gray-100 transition shadow-md whitespace-nowrap">
                Track Your Parcel
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
              <button className="px-6 py-3 bg-white/80 text-black text-xl font-bold rounded-full flex items-center gap-2 hover:bg-gray-100 transition shadow-md whitespace-nowrap">
                Be A Rider
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ---------- Global Arrows ---------- */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition z-10"
        aria-label="Previous"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition z-10"
        aria-label="Next"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === index ? "bg-white" : "bg-white/50"
            } hover:bg-white`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
