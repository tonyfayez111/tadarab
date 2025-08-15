import Image from "next/image";
import logo from "@/public/images/footerlogo.png";
import apple from "@/public/icons/apple.svg";
import playstore from "@/public/icons/playstore.svg";
import payments from "@/public/images/payments.png";
import Link from "next/link";
import Ellipse from "@/public/images/Ellipse.png";
import wave from "@/public/icons/wave.svg";
import wsp from "@/public/icons/wsp.svg";
import facebook from "@/public/icons/facebook.svg";
import tiktok from "@/public/icons/tiktok.svg";
import instagram from "@/public/icons/insta.svg";
import linkedin from "@/public/icons/linkedin.svg";
import youtube from "@/public/icons/youtube.svg";
import snapchat from "@/public/icons/snap.svg";

export default function Footer() {
  return (
    <div
      className="
        grid grid-cols-1 gap-8 sm:gap-6 md:gap-20 relative justify-center items-center px-4
        lg:container lg:mx-auto lg:max-w-7xl lg:px-8 lg:py-6
        lg:grid-cols-4 lg:items-start lg:gap-12
      "
      dir="rtl"
    >
      {/* عمود 1 */}
      <div className="lg:col-span-1 lg:self-start lg:pr-4">
        <Image src={logo} alt="logo" className="pb-5 lg:pb-6" />
        <div className="text-[16px] sm:text-[20px] md:text-[40px] font-[400] max-w-[258px] lg:text-[18px] lg:leading-8 lg:max-w-xs">
          منصة تدرب التعليمية للدورات الأون لاين في الوطن العربي
        </div>
        <div className="text-[16px] sm:text-[20px] md:text-[40px] font-[400] text-[#B0B0BA] pt-10 pb-5 lg:text-[16px] lg:pt-6 lg:pb-3">
          وسائل الدفع عبر تدرب
        </div>
        <div className="w-full h-full pb-10 lg:pb-6">
          <Image src={payments} alt="payments" />
        </div>
        <div className="text-[16px] sm:text-[20px] md:text-[40px] font-[400] text-[#B0B0BA] pb-2 lg:text-[16px] lg:pb-1">
          قريباً تطبيق تدرب
        </div>
        <div className="flex items-center  gap-2 lg:gap-3" dir="rtl">
          <div className="text-[16px] sm:text-[20px] md:text-[40px] font-[400] text-[#B0B0BA] pb-2 lg:text-[16px] lg:pb-0">
            على الأيفون والأندرويد
          </div>
          <Image src={apple} alt="apple" className="lg:w-[22px] lg:h-[22px]" />
          <Image src={playstore} alt="playstore" className="lg:w-[22px] lg:h-[22px]" />
        </div>
      </div>

      {/* عمودان 2 و3 */}
      <div className="grid grid-cols-2 gap-5 lg:col-span-2 lg:grid-cols-2 lg:gap-8 lg:px-4">
        <div className="flex flex-col gap-5 lg:gap-6">
          <div className="text-[14px] sm:text-[20px] md:text-[40px] font-[400] text-[#B0B0BA] pb-2 lg:text-[18px] lg:pb-1.5">
            روابط هامة
          </div>
          <ul className="flex flex-col gap-2 font-[700] text-[14px] sm:text-[20px] md:text-[40px] lg:text-[16px] lg:gap-2.5">
            <li><Link href="/">تدرب بلا حدود</Link></li>
            <li><Link href="/">الدورات التدريبية</Link></li>
            <li><Link href="/">الدورات المجانية</Link></li>
            <li><Link href="/">المدربين</Link></li>
            <li><Link href="/">المدونة</Link></li>
          </ul>
        </div>
        <div className="flex flex-col gap-5 lg:gap-6">
          <div className="text-[14px] sm:text-[20px] md:text-[40px] font-[400] text-[#B0B0BA] pb-2 lg:text-[18px] lg:pb-1.5">
            عن تدرب
          </div>
          <ul className="flex flex-col gap-2 font-[700] text-[14px] sm:text-[20px] md:text-[40px] lg:text-[16px] lg:gap-2.5">
            <li><Link href="/">انضم كمدرب</Link></li>
            <li><Link href="/">الشروط والأحكام</Link></li>
            <li><Link href="/">الشروط والأحكام للمدرب</Link></li>
            <li><Link href="/">سياسات الخصوصية</Link></li>
            <li><Link href="/">سياسة ملفات تعريف الارتباط</Link></li>
          </ul>
        </div>
      </div>

      {/* عمود 4 */}
      <div className="flex justify-center items-center lg:justify-start lg:items-start lg:col-span-1 lg:pl-4">
        <div className=" bg-white/4 rounded-[30px] w-[337px] h-[254px]  grid grid-cols-1 items-center justify-end lg:w-full lg:max-w-sm lg:h-auto lg:p-6 lg:bg-white/5 lg:backdrop-blur-md lg:border lg:border-white/10">
          <div className="px-8 grid grid-cols-1 gap-5 lg:px-0">
            <div className="flex">
              <div>
                {" "}
                <Image
                  src={Ellipse}
                  alt="Ellipse"
                  className="w-[60px] h-[60px]"
                />
              </div>
              <div className="grid gird-cols-1 gap-1">
                <div
                  className="text-[#00040D] flex flex-row text-[12px] font-[700] bg-white w-[81px] h-[28px] pt-2 pr-3 pb-2  gap-1 rounded-tl-[20px] rounded-tr-[4px] rounded-br-[20px] rounded-bl-[20px] opacity-100"
                  dir="rtl"
                >
                  أهلاً بك
                  <Image src={wave} alt="wave" className="w-[15px] h-[15px]" />
                </div>
                <div className="text-[#00040D] flex flex-row-reverse text-[12px] font-[700] bg-white min-w-[81px] h-[28px] pt-2 pr-3 pb-2 pl-3 gap-1 rounded-tl-[20px] rounded-tr-[4px] rounded-br-[20px] rounded-bl-[20px] opacity-100">
                  هل لديك سؤال؟
                </div>
              </div>
            </div>
            <div className="text-[16px] font-[400] text-white lg:text-[18px]">
              تحتاج مساعدة أو استفسار؟
            </div>
            <button className="flex gap-2 items-center justify-center bg-white/8 text-white w-[156px] h-[52px] rounded-[16px] lg:w-auto lg:h-auto lg:px-4 lg:py-3 lg:bg-white/10 lg:hover:bg-white/15">
              <Image src={wsp} alt="arrow" className="w-[15px] h-[15px]" />
              تواصل معنا{" "}
            </button>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 place-items-center gap-8.5 lg:col-span-4 lg:w-full lg:gap-6 lg:pt-6 lg:border-t lg:border-white/10 lg:grid-cols-[1fr_auto] lg:place-items-stretch pb-14 md:pb-0">
        <div className="text-[16px] font-[400] text-[#B0B0BA] lg:text-[14px] lg:self-center lg:text-right">
          جميع الحقوق محفوظة. منصة تدرب. © 2024
        </div>
        <div className="flex gap-7.5 lg:gap-5 lg:self-center">
            <Link href="/"> <Image src={facebook} alt="facebook" /></Link>
          <Link href="/"> <Image src={tiktok} alt="twitter" /></Link>
          <Link href="/"> <Image src={instagram} alt="instagram" /></Link>
          <Link href="/"> <Image src={linkedin} alt="linkedin" /></Link>
          <Link href="/"> <Image src={youtube} alt="youtube" /></Link>
          <Image src={snapchat} alt="snapchat" />
        </div>
      </div>
    </div>
  );
}
