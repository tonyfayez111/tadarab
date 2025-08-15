import React from "react"; 
import banner from "@/public/images/hero-banner.png"
import Image from "next/image";
import wsp from "@/public/icons/wsp.svg"
export default function Banner() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 place-items-center bg-[#0D1119] gap-6 md:gap-0">
            <div className="grid grid-cols-1 place-items-center max-h-[629px] max-w-[443px] md:max-h-[150px] gap-4 md:gap-6 px-4 md:px-0">
<div className="font-[800] text-[24px] sm:text-[28px] md:text-[32px] text-center md:text-right">تحتاج مساعدة أو استفسار؟</div>
<div className="text-[14px] sm:text-[15px] md:text-[16px] font-[400] w-full text-center md:text-right text-white/85" dir="rtl">قم بالتواصل معنا عبر WhatsApp</div>
<div className="flex items-center justify-center gap-2">
<button className="flex items-center justify-center gap-2 bg-[#BE1622] w-[160px] sm:w-[180px] md:w-[193px] h-[42px] sm:h-[45px] md:h-[48px] text-[#FFFFFF] rounded-[12px] px-[20px] sm:px-[30px] md:px-[40px] py-[10px] sm:py-[11px] md:py-[12px] font-[700] text-[14px] sm:text-[15px] md:text-[16px] text-center">
<Image src={wsp} alt="wsp" className="w-[20px] sm:w-[22px] md:w-[24px] h-[20px] sm:h-[22px] md:h-[24px]" />
تواصل معنا
</button>
</div>

            </div>
            <div className="order-first md:order-last">
            <Image src={banner} alt="Tadarab" className="object-contain w-[376px] h-[405px] sm:w-[250px] md:w-[519px] sm:h-[300px] md:h-[560px]" />

            </div>
        </div>
    )
}