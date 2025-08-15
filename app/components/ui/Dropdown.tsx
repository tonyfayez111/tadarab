"use client";

import React, { useEffect, useRef, useState } from "react";

type Item = {
  label: string;
  value?: string;
  children?: Item[];
  title?: string;
};

interface DropdownProps {
  options: Item[];
  footerLabel?: string;
  onFooterClick?: () => void;
  placeholder?: string;
  dir?: "rtl" | "ltr";
  widthClass?: string; // e.g., "w-64" | "w-80"
  title?: string;
}

export default function Dropdown({
  options,
  footerLabel = "استكشف جميع الدورات",
  onFooterClick,
  placeholder = "استكشف الاقسام",
  title = "اقسام التعليم",
  dir = "rtl",
  widthClass = "w-72",
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [openSub, setOpenSub] = useState<string | null>(null);
  // close on outside click
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setOpenSub(null);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  // submenu direction based on dir
  const submenuSide = dir === "rtl" ? "right-full " : "left-full ml-2";
  const safeOptions = Array.isArray(options) ? options : [];

  return (
    <div ref={wrapRef} className="relative inline-block text-left" dir={dir}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={[
          "grid grid-cols-[1fr_auto] items-center gap-[2px] px-4 py-2",
          "text-white text-sm max-w-[140px]",
          widthClass,
        ].join(" ")}
      >
        <span className="truncate text-[14px] font-[700] w-max">
          {placeholder}
        </span>
        <svg
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M5 7l5 5 5-5"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </button>

      {/* Menu: grid with scrollable list + fixed footer button */}
      {open && (
        <div
          className={[
            "absolute z-50 mt-2 rounded-[12px] shadow-lg",
            "bg-[#141820]",
            widthClass,
            // Use grid to keep footer button pinned at the bottom
            "grid grid-rows-[1fr_auto]",
            dir === "rtl" ? "right-0" : "left-0",
          ].join(" ")}
        >
          <div className="h-max text-white text-[16px] font-[800] w-full flex justify-start items-center p-5">
            {title}
          </div>
          <ul className="py-1">
            {safeOptions.map((opt) => {
              const hasChildren = !!opt.children?.length;

              return (
                <li key={opt.label} className="relative pr-2">
                  {/* Row uses grid: [arrow | label] */}
                  <button
                    type="button"
                    onClick={() => {
                      if (hasChildren) {
                        setOpenSub((curr) =>
                          curr === opt.label ? null : opt.label
                        );
                      } else {
                        setSelected(opt.label);
                        setOpen(false);
                        setOpenSub(null);
                      }
                    }}
                    className={[
                      "grid items-center gap-3 w-full px-3 py-2 text-sm text-[#E7E7EC] px-2",
                      dir === "rtl"
                        ? "grid-cols-[16px_1fr]"
                        : "grid-cols-[1fr_16px]",
                      "hover:bg-[#1F2430] text-left",
                      openSub === opt.label ? "bg-[#272A32]  rounded-r-lg    " : "",
                    ].join(" ")}
                  >
                    <span className="truncate flex w-max">{opt.label}</span>
                    {/* Arrow on the LEFT (for rtl), on the RIGHT (for ltr) */}
                    {dir === "rtl" ? (
                      <span className="flex justify-end">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.5 15.833L6.66667 9.99967L12.5 4.16634"
                            stroke="#B0B0BA"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                    ) : null}

                    {/* Label */}
                    

                    {/* Arrow for LTR on the right side */}
                    {dir === "ltr" ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className={[
                            "h-4 w-4 transition-transform",
                            hasChildren ? "opacity-100" : "opacity-0",
                            openSub === opt.label ? "rotate-180" : "",
                          ].join(" ")}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          {/* pointing-right chevron */}
                          <path
                            d="M7.5 5l5 5-5 5"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                          />
                        </svg>
                      </span>
                    ) : null}
                  </button>

                  {/* Submenu (opens on click) */}
                  {hasChildren && openSub === opt.label && (
                    <div
                      className={[
                        "absolute top-[-67px] h-[370px] ",
                        "min-w-[12rem] rounded-xl  bg-[#272A32]",
                        submenuSide,
                      ].join(" ")}
                    >
                      <ul className=" overflow-auto py-1 w-max min-w-full">
                        { opt.title && (

                        <div className="text-white text-[16px] font-[800] w-full flex justify-start items-center p-5 border-b border-white/10 ">
                          {opt.title}
                        </div>
                        )}
                        {opt.children!.map((child) => (
                          <li key={child.label} >
                        
                            <button
                              type="button"
                              onClick={() => {
                                if (child.children && child.children.length > 0) {
                                  // If this child has its own children, toggle its submenu
                                  setOpenSub((curr) => 
                                    curr === child.label ? null : child.label
                                  );
                                } else {
                                  // If no children, select and close
                                  setSelected(child.label);
                                  setOpen(false);
                                  setOpenSub(null);
                                }
                              }}
                              className="grid grid-cols-[16px_1fr] items-center gap-3 w-full px-3 py-2 text-sm text-[#E7E7EC] hover:bg-[#1F2430] text-left"
                            >
                              {/* Arrow for nested children */}
                          

                              {/* Label */}
                              <span className="truncate w-max">{child.label}</span>
                            </button>

                 
                            {child.children && child.children.length > 0 && openSub === child.label && (
                              <div
                                className={[
                                  "absolute top-0 h-max", // Align with parent menu's top
                                  "min-w-[12rem] rounded-xl bg-[#272A32]",
                                  "right-full ", 
                                ].join(" ")}
                              >
                               
                                <ul className="overflow-auto py-1">
                                  {child.children.map((grandchild) => (
                                    
                                    <li key={grandchild.label} className="relative">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          if (grandchild.children && grandchild.children.length > 0) {
                                            // If this grandchild has its own children, toggle its submenu
                                            setOpenSub((curr) => 
                                              curr === grandchild.label ? null : grandchild.label
                                            );
                                          } else {
                                            // If no children, select and close
                                            setSelected(grandchild.label);
                                            setOpen(false);
                                            setOpenSub(null);
                                          }
                                        }}
                                        className="grid grid-cols-[16px_1fr] items-center gap-3 w-full px-3 py-2 text-sm text-[#E7E7EC] hover:bg-[#1F2430] text-left"
                                      >
                                        {/* Arrow for nested children */}
                                        <span className="flex items-center justify-center">
                                          {grandchild.children && grandchild.children.length > 0 ? (
                                            <svg 
                                              width="9" 
                                              height="16" 
                                              viewBox="0 0 9 16" 
                                              fill="none" 
                                              xmlns="http://www.w3.org/2000/svg"
                                              className={`h-4 w-4 ${openSub === grandchild.label ? 'rotate-90' : ''}`}
                                            >
                                              <path 
                                                d="M7.5 13.833L1.66667 7.99967L7.5 2.16634" 
                                                stroke="#B0B0BA" 
                                                strokeWidth="2.5" 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round"
                                              />
                                            </svg>
                                          ) : (
                                            <span className="h-2 w-2 rounded-full bg-[#E7E7EC]/40" />
                                          )}
                                        </span>

                                        {/* Label */}
                                        <span className="truncate">{grandchild.label}</span>
                                      </button>

                                      {/* Sub-submenu (opens on click) */}
                                      {grandchild.children && grandchild.children.length > 0 && openSub === grandchild.label && (
                                       
                                       <div
                                          className={[
                                            "absolute top-0", // Align with parent menu's top
                                            "min-w-[12rem] rounded-xl bg-[#272A32]",
                                            "right-full mr-2", // Open to the left
                                          ].join(" ")}
                                        >
                                         
                                          <ul className="overflow-auto py-1">
                                         
                                            {grandchild.children.map((greatGrandchild) => (
                                              <li key={greatGrandchild.label}>
                                           
                                                <button
                                                  type="button"
                                                  onClick={() => {
                                                    setSelected(greatGrandchild.label);
                                                    setOpen(false);
                                                    setOpenSub(null);
                                                  }}
                                                  className="grid grid-cols-[16px_1fr] items-center gap-3 w-full px-3 py-2 text-sm text-[#E7E7EC] hover:bg-[#1F2430] text-left"
                                                >
                                                  <span className="h-2 w-2 rounded-full bg-[#E7E7EC]/40" />
                                                  <span className="truncate">{greatGrandchild.label}</span>
                                                </button>
                                              </li>

                                            ))}
                                          </ul>
                                        </div>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Footer button pinned to bottom */}
          <div className="p-5">
            <button
              type="button"
              onClick={onFooterClick}
              className="w-full max-w-[295px] h-[40px] grid place-items-center rounded-[12px] bg-[#FFFFFF] text-[14px] font-[700] text-[#00040D] focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {footerLabel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
