"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/components/ui/card";

import slide1 from "../../images/hero-slide/slide1.jpg";
import slide2 from "../../images/hero-slide/slide2.jpg";
import slide3 from "../../images/hero-slide/slide3.png";
import slide4 from "../../images/hero-slide/slide4.png";
import slide5 from "../../images/hero-slide/slide5.png";

const images = [slide1, slide2, slide3, slide4, slide5].map((im) => (im as any).src ?? im as unknown as string);

export function CarouselPlugin() {
  const [index, setIndex] = React.useState(0);
  const length = images.length;

  React.useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % length);
    }, 2500);
    return () => clearInterval(id);
  }, [length]);

  return (
    <div className="w-full">
      <div className="relative mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-lg">
          <div className="flex transition-transform duration-700" style={{ transform: `translateX(-${index * 100}%)` }}>
            {images.map((src, i) => (
              <div key={i} className="min-w-full flex-shrink-0">
                <div className="w-full h-64 md:h-96 overflow-hidden">
                  <img src={src} alt={`slide-${i + 1}`} className="w-full h-full object-cover block" loading="lazy" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 w-8 rounded-full transition-colors ${i === index ? "bg-foreground" : "bg-muted"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CarouselPlugin;
