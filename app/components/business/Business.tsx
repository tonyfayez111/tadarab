import React from "react"; 
import Image from "next/image";
import tadarabbusiness from "@/public/images/tadarabbusiness.png"
import merged from "@/public/images/merged.png"
export default function Tadarabbusiness() {
    return (
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-20 relative justify-center items-center" dir="rtl">
            <Image src={merged} alt="journey" className="w-full h-full object-contain" />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-6 px-2 sm:px-3 md:px-0">
                    <div className="w-full grid grid-cols-1 place-items-center md:place-items-start gap-2 sm:gap-2.5 md:gap-4.75 pr-2 sm:pr-3 md:pr-20">
                    
                <Image src={tadarabbusiness} alt="Tadarab" className="object-contain w-[160px] sm:w-[200px] md:w-[363.5941467285156px] h-[20px] sm:h-[24px] md:h-[44px]" />
                <div className="text-[16px] sm:text-[20px] md:text-[40px] font-[800] leading-tight">اكتشف عالم تدرب للأعمال</div>
                <div className="text-[12px] sm:text-[14px] md:text-[20px] font-[700] max-w-[541px] flex flex-wrap text-center md:text-right">تحديات سوق العمل لا تنتهي! طور مهارات مُوظفيك لتتناسب مع اقتصاد اليوم، اختر الخطة التدريبية التي تناسب أهداف عملك وتواصل معنا الآن.</div>
                <button className="bg-[#BE1622] w-[140px] sm:w-[160px] md:w-[210px] h-[32px] sm:h-[38px] md:h-[48px] text-[#FFFFFF] rounded-[12px] px-[10px] sm:px-[12px] md:px-[20px] py-[6px] sm:py-[8px] md:py-[12px] font-[700] text-[11px] sm:text-[13px] md:text-[16px] text-center flex items-center justify-center gap-2">
              
أعرف المزيد
<svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 14L2 8L8 2" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
                </button>
            </div>
                
                </div>
        </div>
    )
}