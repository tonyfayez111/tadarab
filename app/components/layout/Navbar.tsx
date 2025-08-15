"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Dropdown from "../ui/Dropdown";
import Sale from "../ui/Sale";
import { learningCategories } from "@/app/lib/data/dropDownOptions";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
  const searchPopupRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const toggleSearchPopup = () => {
    setIsSearchPopupOpen(!isSearchPopupOpen);
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchPopupRef.current &&
        !searchPopupRef.current.contains(event.target as Node)
      ) {
        setIsSearchPopupOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="sticky top-0 left-0 right-0 z-50 bg-[#00040D]">
      <Sale status={true} discount={80} />

      {/* Mobile Navbar */}
      <div className="grid w-full grid-cols-3 md:grid-cols-[auto_1fr_auto] items-center gap-3 px-5 py-3 md:hidden">
        {/* Left Side (Cart and Search) */}
        <div className="flex items-center gap-3">
          <Image src="/icons/cart.svg" alt="cart" width={24} height={24} />
          <button onClick={toggleSearchPopup}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>

        {/* Center (Logo) */}
        <div className="flex justify-center">
          <button
            onClick={() => router.push("/")}
            className="hover:opacity-80 transition-opacity duration-300 w-[88px] h-[20px]"
          >
            <Image src="/icons/logo.svg" alt="logo" width={88} height={20} />
          </button>
        </div>

        {/* Right Side (Menu Toggle) */}
        <div className="flex justify-end">
          <button onClick={toggleSideMenu} className="text-white">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="20"
                height="2"
                transform="matrix(-1 0 0 1 22 5)"
                fill="white"
              />
              <rect
                width="20"
                height="2"
                transform="matrix(-1 0 0 1 22 11)"
                fill="white"
              />
              <rect
                width="12"
                height="2"
                transform="matrix(-1 0 0 1 22 17)"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Search Popup */}
      {isSearchPopupOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0E16]/90 flex items-center justify-center md:hidden">
          <div
            ref={searchPopupRef}
            className="bg-[#191D25] rounded-[20px] w-[90%] max-w-[500px] p-6 shadow-lg"
          >
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="ماذا تريد ان تتعلم اليوم؟"
                className="w-full rounded-[12px] bg-[#272A32] py-3 pr-10 pl-4 text-sm text-[#B0B0BA] focus:outline-none focus:ring-2 focus:ring-[#BE1622]"
                dir="rtl"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                />
              </svg>
            </div>

            {/* Filter Options */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  المجال
                </label>
                <Dropdown
                  options={learningCategories}
                  dir="rtl"
                  placeholder="اختر المجال"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  مستوى الدورة
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["مبتدئ", "متوسط", "متقدم"].map((level) => (
                    <button
                      key={level}
                      className="bg-[#272A32] text-white py-2 rounded-[10px] text-sm hover:bg-[#BE1622] transition-colors"
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  نوع الدورة
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["مجانية", "مدفوعة"].map((type) => (
                    <button
                      key={type}
                      className="bg-[#272A32] text-white py-2 rounded-[10px] text-sm hover:bg-[#BE1622] transition-colors"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={toggleSearchPopup}
                className="w-full bg-[#BE1622] text-white py-3 rounded-[12px] mt-4 hover:bg-[#991622] transition-colors"
              >
                بحث
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Side Menu for Mobile */}
      {isSideMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0E16] md:hidden">
          <div className="flex flex-col h-full">
            {/* Close Button */}
            <div className="flex justify-end p-5">
              <button onClick={toggleSideMenu} className="text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Search */}
            <div className="px-5 mb-5 lg:">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="ماذا تريد ان تتعلم اليوم؟"
                  className="w-full rounded-[12px] bg-[#191D25] py-2 pr-10 pl-4 text-sm text-[#B0B0BA]"
                  dir="rtl"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                  />
                </svg>
              </div>
            </div>

            {/* Learning Categories Dropdown */}
            <div className="px-5 mb-5 flex justify-end">
              <Dropdown options={learningCategories} dir="rtl" />
            </div>

            {/* Menu Items */}
            <div className="flex flex-col space-y-4 px-5">
              <button
                onClick={() => router.push("/login")}
                className="bg-[#191D25] text-white px-5 py-3 rounded-md font-[700] hover:bg-[#242A33] transition-colors duration-300"
              >
                تسجيل الدخول
              </button>

              <button className="bg-[#292951] text-white px-5 py-3 rounded-[12px] font-[700] items-center gap-2 justify-center flex hover:bg-[#353580] transition-colors duration-300">
                تدريب بلا حدود
                <Image
                  src="/icons/stars.svg"
                  alt="stars"
                  width={24}
                  height={24}
                />
              </button>

              <button className="text-white hover:text-gray-300 transition-colors duration-300 py-3">
                تدريب للأعمال
              </button>

              <button className="text-white hover:text-gray-300 transition-colors duration-300 py-3">
                أنضم كمدرب
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Navbar */}
      <div className="hidden md:grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 px-5 py-3">
        <div className="flex items-center gap-3">
          <Image src="/icons/cart.svg" alt="cart" width={24} height={24} />

          <div className="grid grid-flow-col auto-cols-max items-center gap-3">
            <button
              onClick={() => router.push("/login")}
              className="bg-[#191D25] text-white px-5 py-3 rounded-md font-[700] hover:bg-[#242A33] transition-colors duration-300"
            >
              تسجيل الدخول
            </button>

            <button className="bg-[#292951] text-white px-5 py-3 rounded-[12px] font-[700] items-center gap-2 justify-center flex hover:bg-[#353580] transition-colors duration-300">
              تدريب بلا حدود
              <Image
                src="/icons/stars.svg"
                alt="stars"
                width={24}
                height={24}
              />
            </button>

            <button className="text-white hover:text-gray-300 transition-colors duration-300">
              تدريب للأعمال
            </button>

            <button className="text-white hover:text-gray-300 transition-colors duration-300">
              أنضم كمدرب
            </button>
          </div>
        </div>

        {/* Desktop Search Popup (similar to mobile, can be customized separately if needed) */}
        {isSearchPopupOpen && (
          <div className="fixed inset-0 z-50 bg-[#0A0E16]/90 flex items-center justify-center">
            <div
              ref={searchPopupRef}
              className="bg-[#191D25] rounded-[20px] w-[90%] max-w-[500px] p-6 shadow-lg"
            >
              {/* Same content as mobile search popup */}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="ماذا تريد ان تتعلم اليوم؟"
                  className="w-full rounded-[12px] bg-[#272A32] py-3 pr-10 pl-4 text-sm text-[#B0B0BA] focus:outline-none focus:ring-2 focus:ring-[#BE1622]"
                  dir="rtl"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                  />
                </svg>
              </div>

              {/* Filter Options */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    المجال
                  </label>
                  <Dropdown
                    options={learningCategories}
                    dir="rtl"
                    placeholder="اختر المجال"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    مستوى الدورة
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["مبتدئ", "متوسط", "متقدم"].map((level) => (
                      <button
                        key={level}
                        className="bg-[#272A32] text-white py-2 rounded-[10px] text-sm hover:bg-[#BE1622] transition-colors"
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    نوع الدورة
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {["مجانية", "مدفوعة"].map((type) => (
                      <button
                        key={type}
                        className="bg-[#272A32] text-white py-2 rounded-[10px] text-sm hover:bg-[#BE1622] transition-colors"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={toggleSearchPopup}
                  className="w-full bg-[#BE1622] text-white py-3 rounded-[12px] mt-4 hover:bg-[#991622] transition-colors"
                >
                  بحث
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="relative hidden md:block w-full md:max-w-[200px] lg:max-w-[350px] xl:max-w-[592px] max-h-[40px] justify-self-center">
          <input
            type="text"
            placeholder="ماذا تريد ان تتعلم اليوم؟"
            className="w-full rounded-[12px] bg-[#191D25] py-2 pr-10 pl-4 text-sm text-[#B0B0BA] focus:border-blue"
            dir="rtl"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
            />
          </svg>
        </div>

        <div className="flex flex-row-reverse justify-between items-center gap-3 justify-self-end md:flex-row">
          <Dropdown options={learningCategories} dir="rtl" />
          <button
            onClick={() => router.push("/")}
            className="hover:opacity-80 transition-opacity duration-300 w-[88px] h-[20px]"
          >
            <Image src="/icons/logo.svg" alt="logo" width={88} height={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
