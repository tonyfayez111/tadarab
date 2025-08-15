import React from "react"; 
import journey from "@/public/images/journey.png"
import Image from "next/image";
import Tadarab from "@/public/images/Tadarab.png"
export default function Journey() {
    return (
        <div className="flex flex-col gap-4 sm:gap-6 md:gap-20 relative mx-2 sm:mx-4 md:mx-23 justify-center items-center">
            <Image src={journey} alt="journey" className="w-full h-full object-contain bg-[#25D5AB]/18 rounded-[20px]" />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-6 px-2 sm:px-3 md:px-0">
                <div className="max-w-[487.5941467285156px] flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-6">
                    
                <div className="text-[16px] sm:text-[18px] md:text-[32px] font-[700] text-center leading-tight px-1 sm:px-2">ابدأ رحلة التعلم مع</div>
                <Image src={Tadarab} alt="Tadarab" className="object-contain w-[160px] sm:w-[200px] md:w-[363.5941467285156px] h-[20px] sm:h-[24px] md:h-[44px]" />
                <div className="text-[12px] sm:text-[14px] md:text-[20px] font-[400] text-center leading-relaxed px-2 sm:px-4 md:px-2">تعلم مع أكثر من 1000 دورة تدريبية في مختلف المجالات باشتراك واحد فقط</div>
            </div>
                <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-6 pt-3 sm:pt-4 md:pt-10.5">
                    <div className="text-[11px] sm:text-[13px] md:text-[16px] font-[400] text-center px-2 sm:px-4">اشتراكات بتبدأ من 10.000 د.ك شهرياً</div>
                    <button className="bg-[#60D2B4] w-[180px] sm:w-[220px] md:w-[295px] h-[36px] sm:h-[40px] md:h-[50px] text-[#00040D] rounded-[12px] px-[6px] sm:px-[8px] md:py-[16px] py-[8px] sm:py-[10px] font-[700] text-[12px] sm:text-[13px] md:text-[16px] text-center">أشترك الآن</button>
                      </div>
                </div>
        </div>
    )
}