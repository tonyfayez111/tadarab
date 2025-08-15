"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface AutoSliderProps {
  items: {
    image: string;
    content: string;
    name: string;
  }[];
  interval?: number;
  soon?: boolean;
}

export default function AutoSlider({ items, interval = 3000, soon }: AutoSliderProps) {
  const [index, setIndex] = useState(0);

  // Guard against empty items array
  if (!items || items.length === 0) {
    return <div>No items to display</div>;
  }

  // Auto shift with time
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, interval);
    return () => clearInterval(timer);
  }, [items.length, interval]);

  // Ensure index is within bounds
  const currentItem = items[index] || items[0];

  return (
    <div className="flex flex-col items-center w-full">
      {/* Mobile: Stacked layout, Desktop: Side-by-side */}
      <div className="flex flex-col md:flex-row flex-1 w-full max-h-[522px] justify-between">
        {/* Image container */}
        <div className="relative flex-1 max-h-[300px] md:max-h-[522px] w-full md:max-w-[706px] rounded-xl overflow-hidden shadow-lg">
          <Image
            src={currentItem.image}
            alt="slider"
            width={1000}
            height={522}
            className="w-full h-full object-contain"
            priority
          />
          {/* Black fade from all sides */}
          <div className="absolute inset-0 bg-[linear-gradient(274deg,#000000,#000000,#00000000,#00000000_40%,#00000000,#000000)] pointer-events-none" />
        </div>
        
        {/* Content container */}
        <div className="flex flex-col justify-center max-w-full md:max-w-[410px] flex-wrap px-4 md:px-0 md:mr-[113px] mt-4 md:mt-0">
          <div className="flex flex-col gap-2 items-center md:items-end w-full max-w-full md:max-w-[410px]">
            {currentItem.soon && (
              <button className="bg-[#FFFFFF] text-[#000000] text-[14px] md:text-[18px] rounded-[8px] w-[50px] md:w-[60px] h-[28px] md:h-[32px] font-[700] py-1 md:py-2 px-2 md:px-3 flex items-center justify-center mb-2 md:mb-4">
                قريباً
              </button>
            )}
            <div className="text-[#FFFFFF] text-[24px] md:text-[48px] font-[700] mb-4 md:mb-9 text-center md:text-right" dir="rtl">
              {currentItem.content}
            </div>
            <div className="text-[#FFFFFF] text-[18px] md:text-[30px] font-[400] text-center md:text-right">
              {currentItem.name}
            </div>
          </div>
        </div>
      </div>

      {/* Dashes - centered on mobile */}
      <div className="flex gap-2 mt-4 justify-center  w-full pt-4 pb-41">
        {items.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1 w-6 rounded-full cursor-pointer transition-all duration-300 ${
              i === index ? "bg-[#FFFFFF] w-16 md:w-20 " : "bg-[#FFFFFF33] w-16 md:w-20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}