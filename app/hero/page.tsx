import React from "react";
import Image from "next/image";
import leftHero from "@/public/images/leftHero.png";
import rightHero from "@/public/images/rightHero.png";
import Dropdown from "../components/ui/Dropdown";

export default function Hero() {
  return (
    <div className="relative min-h-[656px] w-full overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full md:w-[60%] h-full md:h-[676px] md:ml-5">
          <Image
            src={leftHero}
            alt="Left Hero Background"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="opacity-50"
          />
        </div>
        <div className="absolute top-0 right-0 w-0 md:w-[35%] h-0 md:h-[676px] hidden md:block">
          <Image
            src={rightHero}
            alt="Right Hero Background"
            layout="fill"
            objectFit="contain"
            quality={100}
          />
        </div>
        <div className="relative z-10 grid place-items-center px-4 h-full md:h-[656px] bg-[linear-gradient(360deg,black,#000000de,#00000000,#00000000,#00000000,#00000000)]">
        <div className="bg-transparent gap-4 w-full max-w-[569px] md:h-[657px] flex flex-col justify-center items-center text-center px-4 md:px-0 bg-[linear-gradient(274deg,#00000000,#00000000,#000000,black_40%,#000000,transparent)]">
          <div className="font-[800] text-[40px] md:text-[80px] bg-[linear-gradient(135deg,#FFFFFF_0%,#71717A_100%),linear-gradient(0deg,rgba(0,0,0,0),rgba(0,0,0,0))] bg-clip-text text-transparent [direction:rtl]">
            30 يومًا
          </div>
          <div className="font-[700] text-[28px] md:text-[48px] bg-[linear-gradient(135deg,#FFFFFF_0%,white_100%),linear-gradient(0deg,rgba(0,0,0,0),rgba(0,0,0,0))] bg-clip-text text-transparent [direction:rtl] text-center">
            كافية لتحقيق أهدافك
          </div>

          <div className="font-[400] text-[16px] md:text-[18px] text-[#FFFFFF] max-h-[60px] max-w-[433px] text-center opacity-80 mb-4">
            منصة تدرب الرائدة في مجال التدريب في الخليج و الوطن العربي منذ أكثر
            من 10 سنوات في مجال التعلم عن بعد
          </div>
          <div className="flex justify-center items-center gap-2">
            <button className='bg-[#BE1622] text-[#FFFFFF] font-[700] text-[16px] px-4 py-2 rounded-[10px] w-[209px] h-[56px] flex justify-center items-center gap-2'>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 3.75L2.25 9M2.25 9L7.5 14.25M2.25 9L15.75 9" stroke="#F9FAFB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>ابدأ التعلم الآن</div>
            </button>
          </div>
        </div>
      </div>
      </div>

      {/* Centered Content */}
     
    </div>
  );
}
