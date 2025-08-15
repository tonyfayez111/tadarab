// components/CourseCard.tsx
"use client";
import Image from "next/image";

type ApiCourse = {
  id: number;
  title: string;
  image_url: string;
  reviews_average?: number;        // 3.85
  enrollments_count?: number;      // 1137
  learners?: number;               // sometimes present
  video_duration?: number;         // seconds, e.g. 25791
  tutor?: { id: number; name: string };
  labels?: Array<{ name?: string } | string>;
};

function toHhMm(totalSeconds?: number) {
  const s = Math.max(0, Math.floor(totalSeconds ?? 0));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return { h, m };
}

function firstLabel(labels?: ApiCourse["labels"]) {
  if (!labels || labels.length === 0) return null;
  const x = labels[0] as any;
  return typeof x === "string" ? x : (x?.name ?? null);
}

export default function CourseCard({ course }: { course: ApiCourse }) {
  const { h, m } = toHhMm(course.video_duration);
  const rating = course.reviews_average ? Number(course.reviews_average).toFixed(1) : "—";
  const learners = course.learners ?? course.enrollments_count ?? 0;
  const badge = firstLabel(course.labels); // e.g., "الأكثر مشاهدة"

  return (
    <div
      dir="rtl"
      className="min-w-[280px]  rounded-2xl bg-[#0B1220] text-white overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,.35)]"
    >
      {/* Header image with overlay */}
      <div className="relative h-44 w-full">
        <Image
          src={course.image_url}
          alt={course.title}
          fill
          className="object-cover"
          sizes="(max-width:768px) 80vw, 320px"
        />
        <div className="absolute inset-0 " />
        {/* Badge (top-right) */}
        {badge && (
          <div className="absolute top-2 left-2 rounded-full bg-white/15 px-3 py-1 text-xs backdrop-blur">
            {badge}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="px-4 pb-4 pt-3 ">
        <h3 className="text-[16px] font-[800] leading-6 line-clamp-2">{course.title}</h3>
        <p className="mt-1 text-sm text-white/70">{course.tutor?.name ?? ""}</p>

        {/* Stats row */}
        <div className="mt-3 flex items-center justify-evenly gap-4 text-[13px] text-white/80">
          <span className="inline-flex items-center gap-1">
            ★ <span className="font-semibold">{rating} {}</span>
          </span>
          <span className="inline-flex items-center gap-1 whitespace-nowrap">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_6314_9171)">
<path d="M6.98958 1.16602C5.83586 1.16602 4.70805 1.50813 3.74876 2.14911C2.78947 2.79008 2.0418 3.70113 1.60029 4.76703C1.15878 5.83293 1.04326 7.00582 1.26834 8.13737C1.49342 9.26893 2.04899 10.3083 2.8648 11.1241C3.6806 11.9399 4.72 12.4955 5.85156 12.7206C6.98311 12.9457 8.156 12.8302 9.2219 12.3886C10.2878 11.9471 11.1988 11.1995 11.8398 10.2402C12.4808 9.28089 12.8229 8.15307 12.8229 6.99935C12.8229 5.45225 12.2083 3.96852 11.1144 2.87456C10.0204 1.7806 8.53668 1.16602 6.98958 1.16602Z" fill="#B0B0BA"/>
<path d="M9.19823 8.89022L8.75494 9.44458C8.69577 9.51769 8.61 9.56432 8.51648 9.57424C8.42295 9.58416 8.32931 9.55655 8.25612 9.49748L6.77023 8.39774C6.66642 8.31464 6.58261 8.20927 6.52502 8.08941C6.46743 7.96956 6.43752 7.83829 6.4375 7.70531V4.25533C6.4375 4.1612 6.4749 4.07092 6.54146 4.00435C6.60803 3.93779 6.69831 3.90039 6.79244 3.90039H7.50233C7.59647 3.90039 7.68675 3.93779 7.75331 4.00435C7.81988 4.07092 7.85727 4.1612 7.85727 4.25533V7.44876L9.14374 8.39139C9.21709 8.45034 9.26403 8.53599 9.27424 8.62953C9.28446 8.72306 9.25712 8.81683 9.19823 8.89022Z" fill="#222336"/>
</g>
<defs>
<clipPath id="clip0_6314_9171">
<rect width="14" height="14" fill="white"/>
</clipPath>
</defs>
</svg>
  س {h} : د {m}
          </span>
          <span className="inline-flex items-center gap-1">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.5765 9.70725C6.727 9.28288 7.875 7.82075 7.875 5.25C7.875 3.80013 6.69987 2.625 5.25 2.625C3.80013 2.625 2.625 3.80013 2.625 5.25C2.625 7.82075 3.77388 9.28288 3.9235 9.70725C2.58388 9.82975 0 10.6846 0 12.25C0 12.6193 0.294 13.125 0.875 13.125H9.625C10.206 13.125 10.5 12.6193 10.5 12.25C10.5 10.6846 7.91612 9.82975 6.5765 9.70725ZM11.067 7.03412C11.2779 6.39712 12.25 4.61387 12.25 3.5C12.25 2.05013 11.074 0.875 9.625 0.875C8.89 0.875 8.22587 1.17775 7.74988 1.66425C8.88125 2.457 9.625 3.76775 9.625 5.25C9.625 6.58087 9.36512 7.68163 9.06063 8.5295C9.73875 8.79813 10.3968 9.16212 10.9384 9.625H13.125C13.6307 9.625 14 9.22863 14 8.75C14 7.64925 11.8807 7.18462 11.067 7.03412Z" fill="#B0B0BA"/>
</svg>
 {learners.toLocaleString("ar-EG")}   &nbsp;&nbsp;
 متعلم
          </span>
    
          {/* lessons count example if you have it: */}
          {/* <span className="inline-flex items-center gap-1"> 🎓 {course.sections?.reduce((a,s)=>a+(s?.lessons_count||0),0)} </span> */}
        </div>

        {/* CTA */}
        <button
          className="mt-4 w-full rounded-2xl bg-white/10 py-2 text-sm font-semibold hover:bg-white/15 transition"
          type="button"
        >
          <div className=" flex gap-2 justify-center items-center">
          <span className="text-white">
          شاهد اعلان الدورة 
          </span>
          <span className="text-white">
          ▶
          </span>
          </div>
        </button>
      </div>
    </div>
  );
}
