// components/CategoryAccordion.tsx
"use client";
import React, { useState } from "react";

type QAItem = {
  id: string | number;
  title: string;
  content: React.ReactNode;
};

type Category = {
  id: string | number;
  name: string;
  items: QAItem[];
};

type CategoryAccordionProps = {
  categories: Category[];
  /** If true, only one item inside each category can be open at a time */
  singleOpenPerCategory?: boolean;
  className?: string;
};

export default function CategoryAccordion({
  categories,
  singleOpenPerCategory = false,
  className = "",
}: CategoryAccordionProps) {
  // Track open ids per category
  const [openByCategory, setOpenByCategory] = useState<
    Record<string | number, Array<string | number>>
  >({});

  const toggle = (catId: string | number, itemId: string | number) => {
    setOpenByCategory((prev) => {
      const current = prev[catId] ?? [];
      const isOpen = current.includes(itemId);

      if (singleOpenPerCategory) {
        return { ...prev, [catId]: isOpen ? [] : [itemId] };
      }
      return {
        ...prev,
        [catId]: isOpen ? current.filter((x) => x !== itemId) : [...current, itemId],
      };
    });
  };

  return (
    <div dir="rtl" className={`w-full max-w-[1440px] mx-auto space-y-6 ${className}`}>
      {categories.map((cat) => {
        const openIds = openByCategory[cat.id] ?? [];
        return (
          <section key={cat.id} className="space-y-3 font-[800] text-[20px] ">
            {/* Category header */}
            <h2 className="text-right font-extrabold text-[22px] ">
              {cat.name}
            </h2>

            {/* Category items */}
            <div className="space-y-5">
              {cat.items.map((item) => {
                const isOpen = openIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className="rounded-[12px] p-6 bg-[#ffffff12]  backdrop-blur-md gap-5 "
                
                  >
                    {/* Item header */}
                    <button
                      type="button"
                      onClick={() => toggle(cat.id, item.id)}
                      aria-expanded={isOpen}
                      aria-controls={`panel-${cat.id}-${item.id}`}
                      className="w-full flex items-center justify-between text-right "
                    >
                      {/* Title — Almarai ExtraBold 20px */}
                      <span className="font-[800] text-[20px] ">
                        {item.title}
                      </span>

                      {/* Arrow */}
                      <span
                        className={`shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                        aria-hidden="true"
                      >
                        <svg
                          width="18"
                          height="11"
                          viewBox="0 0 18 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 9L9 2L16 9"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>

                    {/* Content — Almarai Regular 16px */}
                    <div
                      id={`panel-${cat.id}-${item.id}`}
                      className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
                        isOpen ? "max-h-[1000px] opacity-100 mt-5" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="text-right font-normal text-[16px] text-white/85">
                        {item.content}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
