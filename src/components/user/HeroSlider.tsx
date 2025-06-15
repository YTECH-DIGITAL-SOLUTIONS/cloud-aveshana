/** @format */

import { useState, useEffect } from "react";

interface Slide {
  image: string;
  text?: string;
  subText?: string;
  showOverlayText?: boolean;
}

interface HeroSliderProps {
  slides: Slide[];
  autoSlide?: boolean;
  interval?: number;
}

export default function HeroSlider({
  slides,
  autoSlide = true,
  interval = 5000,
}: HeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!autoSlide) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, interval);
    return () => clearInterval(timer);
  }, [autoSlide, interval, slides.length]);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-[500px] lg:h-[600px] overflow-hidden animate-fade-up">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide.image}
            alt={`Slide ${index}`}
            className="min-w-full h-[500px] lg:h-[600px] object-cover"
          />
        ))}
      </div>

      {/* Optional overlay text */}
      {slides[activeIndex].showOverlayText !== false && (
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center px-6 lg:px-24 z-10">
          {slides[activeIndex].text && (
            <h1 className="text-3xl lg:text-5xl font-bold text-white max-w-3xl mb-4 text-center drop-shadow-lg">
              {slides[activeIndex].text}
            </h1>
          )}
          {slides[activeIndex].subText && (
            <p className="text-white text-lg max-w-xl text-center drop-shadow-md">
              {slides[activeIndex].subText}
            </p>
          )}
        </div>
      )}

      {/* Navigasi */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 text-black rounded-full p-3 hover:bg-white z-20"
      >
        ◀
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 text-black rounded-full p-3 hover:bg-white z-20"
      >
        ▶
      </button>
    </div>
  );
}
