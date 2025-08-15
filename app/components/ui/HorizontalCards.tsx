"use client";
import React, { useMemo, useRef } from "react";

interface CardData {
  id: number | string;
  title: string;
  image?: string;
  subtitle?: string;
  price?: string | number;
  rating?: number;
  [key: string]: any;
}

interface HorizontalCardsProps {
  data: CardData[];
  title?: string;
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  renderCard: (item: CardData) => React.ReactNode;
  className?: string;
  dir?: "rtl" | "ltr";
  secondtitle?: string;
}

export default function HorizontalCards({
  data,
  title,
  isLoading = false,
  hasMore = false,
  onLoadMore,
  renderCard,
  className = "",
  dir = "rtl", // default RTL since your UI is Arabic
  secondtitle,
}: HorizontalCardsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll by ~90% of the visible width (feels like paging)
  const scrollAmount = useMemo(() => {
    if (!scrollRef.current) return 280;

    const width = scrollRef.current.clientWidth;

    // Mobile: scroll by 1-2 cards, Desktop: scroll by 2-3 cards
    if (width < 768) {
      // Mobile: scroll by ~80% of visible width (1-2 cards)
      return Math.floor(width * 0.85);
    } else if (width < 1024) {
      // Tablet: scroll by ~70% of visible width
      return Math.floor(width * 0.7);
    } else {
      // Desktop: scroll by ~60% of visible width (2-3 cards)
      return Math.floor(width * 0.6);
    }
  }, []); // Removed scrollRef.current?.clientWidth dependency

  const doScroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    const amount = direction === "left" ? -scrollAmount : scrollAmount;
    el.scrollBy({ left: amount, behavior: "smooth" });

    // If we're going right and near the end, trigger load more
    if (direction === "right" && hasMore && onLoadMore && !isLoading) {
      const remaining = el.scrollWidth - (el.scrollLeft + el.clientWidth);
      if (remaining < 60) onLoadMore();
    }
  };

  return (
    <div className={`w-full ${className}`} dir={dir}>
      <div className="flex  gap-1 ">
        {title && <h2 className="font-[800] text-[32px] mb-3">{title}</h2>}

        {secondtitle && (
          <h2 className="font-[800] text-[32px] text-[#BE1622]">
            {secondtitle}
          </h2>
        )}
      </div>

      <div className="relative w-full">
        <button
          type="button"
          onClick={() => doScroll(dir === "rtl" ? "left" : "right")}
          aria-label="Scroll left"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10"
        >
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <foreignObject x="-16" y="-16" width="92" height="92">
              <div
                style={{
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  clipPath: "url(#bgblur_0_6371_4320_clip_path)",
                  height: "100%",
                  width: "100%",
                }}
              />
            </foreignObject>
            <g data-figma-bg-blur-radius="16">
              <rect
                width="60"
                height="60"
                rx="30"
                fill="white"
                fillOpacity="0.1"
              />
              <path
                d="M34 38L26 30L34 22"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath
                id="bgblur_0_6371_4320_clip_path"
                transform="translate(16 16)"
              >
                <rect width="60" height="60" rx="30" />
              </clipPath>
            </defs>
          </svg>
        </button>

        {/* Right button (same SVG rotated) */}
        <button
          type="button"
          onClick={() => doScroll(dir === "rtl" ? "right" : "left")}
          aria-label="Scroll right"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10"
        >
          <svg
            className="rotate-180"
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <foreignObject x="-16" y="-16" width="92" height="92">
              <div
                style={{
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  clipPath: "url(#bgblur_0_6371_4320_clip_path)",
                  height: "100%",
                  width: "100%",
                }}
              />
            </foreignObject>
            <g data-figma-bg-blur-radius="16">
              <rect
                width="60"
                height="60"
                rx="30"
                fill="white"
                fillOpacity="0.1"
              />
              <path
                d="M34 38L26 30L34 22"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath
                id="bgblur_0_6371_4320_clip_path"
                transform="translate(16 16)"
              >
                <rect width="60" height="60" rx="30" />
              </clipPath>
            </defs>
          </svg>
        </button>

        {/* Edge fades (nice touch) */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white to-transparent dark:from-[#0B1220]"></div>
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent dark:from-[#0B1220]"></div>

        {/* Scrollable rail (scrollbar hidden) */}
        <div
          ref={scrollRef}
          className="no-scrollbar overflow-x-auto overflow-y-hidden"
          style={{ scrollSnapType: "x mandatory" }}
        >
          <div className="inline-flex gap-4 align-top whitespace-nowrap px-4 md:px-0">
            {/* Add left padding on mobile to center first card */}
            <div className="flex-shrink-0 w-0 md:w-0 md:ml-0 ml-[calc(50vw-130px)]"></div>

            {data.map((item) => (
              <div key={item.id} className="flex-shrink-0 scroll-snap-center">
                {renderCard(item)}
              </div>
            ))}

            {/* Add right padding on mobile to center last card */}
            <div className="flex-shrink-0 w-0 md:w-0 md:mr-0 mr-[calc(50vw-130px)]"></div>

            {isLoading && (
              <div className="flex-shrink-0 w-64 flex items-center justify-center scroll-snap-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  <p className="text-sm text-gray-500">Loading...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status row */}
      {hasMore !== undefined && (
        <div className="px-4 py-3 text-sm text-gray-400 text-center">
          {isLoading
            ? "جارٍ تحميل المزيد…"
            : hasMore
            ? "استخدم الأسهم للتنقل وتحميل المزيد"
            : "انتهت النتائج"}
        </div>
      )}
    </div>
  );
}
