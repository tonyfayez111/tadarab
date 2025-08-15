import React from "react"; 
import world from "@/public/images/world.png"
import Image from "next/image";

const worldData = [
    {
        id: 1,
       learner : "300,000",
       hours : "+4",
       courses : "+1100",
       trainers : "+600",
       years : "+10",

    },
]
export default function World() {
    return (
        <div className="flex flex-col gap-4 sm:gap-6 md:gap-20 relative justify-center items-center w-full">
            <Image src={world} alt="world" className="w-full h-full object-contain color-white max-w-[1040px]" />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-6 px-2 sm:px-3 md:px-0">
                <div className="w-full flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-6">
                    {worldData.map((item) => (
                        <div key={item.id} className="flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-6 w-full">
                            <div className="text-[18px] sm:text-[20px] md:text-[40px] font-[800] text-center leading-tight">
                            أكثر من
                            </div>
                            <div className="text-[28px] sm:text-[32px] md:text-[60px] font-[800] text-center text-[#BE1622] leading-tight">متعلم{item.learner}</div>
                            <div className="text-[18px] sm:text-[20px] md:text-[40px] font-[800] text-center leading-tight">
                            في الوطن العربي
                            </div>
                            <div className="text-[12px] sm:text-[13px] md:text-[16px] font-[400] text-center w-full text-white/60 leading-relaxed px-2 sm:px-3 md:px-0">منصة تدرب الرائدة في مجال التدريب في الخليج والوطن العربي منذ أكثر من 10 سنوات في مجال التعلم من بعد </div>
                             <div className="grid grid-cols-2 md:grid-cols-4 justify-between items-between gap-2 sm:gap-3 md:gap-6 w-full px-2 sm:px-3 md:px-0" dir="rtl">
                             <div className="text-[14px] sm:text-[15px] md:text-[20px] font-[700] text-center grid grid-cols-1 gap-1.5 sm:gap-2 md:gap-2.75"><span className="text-[#BE1622] text-[18px] sm:text-[20px] md:text-[32px]">{item.hours}&nbsp;ألاف</span> ساعة تدريبية</div>
                            <div className="text-[14px] sm:text-[15px] md:text-[20px] font-[700] text-center grid grid-cols-1 gap-1.5 sm:gap-2 md:gap-2.75"><span className="text-[#BE1622] text-[18px] sm:text-[20px] md:text-[32px]">{item.courses}</span> دورة تدريبية</div>
                            <div className="text-[14px] sm:text-[15px] md:text-[20px] font-[700] text-center grid grid-cols-1 gap-1.5 sm:gap-2 md:gap-2.75"><span className="text-[#BE1622] text-[18px] sm:text-[20px] md:text-[32px]">{item.trainers}</span>خبير و مدرب</div>
                            <div className="text-[14px] sm:text-[15px] md:text-[20px] font-[700] text-center grid grid-cols-1 gap-1.5 sm:gap-2 md:gap-2.75"><span className="text-[#BE1622] text-[18px] sm:text-[20px] md:text-[32px]">{item.years}</span>  سنوات خبرة</div>
                             </div>
                         
                        </div>
                    ))}
            </div>
               
                </div>
        </div>
    )
}