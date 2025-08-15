"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination, Keyboard, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

export type PersonCard = {
  id: number | string;
  name: string;
  title: string;
  avatar_url?: string | null;
  // you can keep other fields (bio, slug, etc.) if you want
};

interface CoverflowCarouselProps {
  items: PersonCard[];
  rtl?: boolean; // set true for Arabic if needed; auto-detects from document if omitted
  className?: string;
}

const FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='1000'>
       <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
         <stop offset='0' stop-color='%23292951'/><stop offset='1' stop-color='%23191D25'/>
       </linearGradient></defs>
       <rect width='100%' height='100%' fill='url(#g)'/>
     </svg>`
  );

export default function CoverflowCarousel({ items, rtl, className = "" }: CoverflowCarouselProps) {
  // Try to auto-detect RTL from <html dir="...">
  const isRTL =
    typeof window !== "undefined"
      ? rtl ?? document?.documentElement?.dir?.toLowerCase() === "rtl"
      : rtl ?? false;

  return (
    <div className={`w-full ${className}`} >
      <Swiper
        modules={[EffectCoverflow, Navigation, Pagination, Keyboard, A11y]}
        effect="coverflow"
        centeredSlides
        grabCursor
        loop={items.length > 3}
        slidesPerView="auto"
        keyboard={{ enabled: true }}
        navigation
        coverflowEffect={{
          rotate: 0,      // no tilt (clean “plan view”)
          stretch: 0,     // spacing handled by slide width
          depth: 160,     // perspective depth
          modifier: 1.2,  // strength
          slideShadows: false,
        }}
        breakpoints={{
          0:   { initialSlide: Math.min(2, items.length - 1) },
          640: { initialSlide: Math.min(2, items.length - 1) },
          1024:{ initialSlide: Math.min(2, items.length - 1) },
        }}
      >
        {items.map((item) => (
          <SwiperSlide
            key={item.id}
            style={{ width: "240px", height: "320px" }} // card size; adjust as needed
            className="!overflow-hidden rounded-2xl shadow-xl relative"
          >
            <div className="absolute inset-0">
              <Image
                src={item.avatar_url && item.avatar_url.trim() !== "" ? item.avatar_url : FALLBACK}
                alt={item.name}
                fill
                sizes="240px"
                className="object-cover bg-[linear-gradient(0deg,rgba(19,20,30,0)_0%,#13141E_100%)]"
                priority={false}
              />
              {/* subtle overlay for readability */}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,20,30,0)_0%,#13141E_100%)] " />
            </div>

            {/* Text overlay */}
            <div className="absolute inset-x-0 bottom-0 p-4 text-white" dir={isRTL ? "rtl" : "ltr"}>
              <div className="text-base md:text-lg font-bold leading-tight truncate">
                {item.name}
              </div>
              <div className="text-xs md:text-sm opacity-90 truncate">
                {item.title}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
