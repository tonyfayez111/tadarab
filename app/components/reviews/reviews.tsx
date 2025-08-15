"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

/* ---------------- Types ---------------- */
type QuoteItem = {
  id: string | number;
  type: "quote";
  quote: string;
  authorName: string;
  line1?: string;
  line2?: string;
  line3?: string;
};

type VideoItem = {
  id: string | number;
  type: "video";
  title: string;
  instructor: string;
  videoUrl: string;
  thumbnail?: string; // optional static poster
};

type Item = QuoteItem | VideoItem;

/* -------------- Mock data (unique IDs) -------------- */
const mockItems: Item[] = [
  {
    id: "q1",
    type: "quote",
    quote:
      "دورة وافية وشاملة تعلّمك على روتين يساعدك على إبقاء بيتك نظيفًا عبر خطوات بسيطة قد تغيّر نمط حياتك داخل المنزل، وتحتوي على جداول تنظّم أعمالك المنزلية.",
    authorName: "فاطمة",
    line1: "دورة أساسيات",
    line2: "التنظيف في المنزل",
    line3: "فاطمة الأنصاري",
  },
  {
    id: "v1",
    type: "video",
    title: "دورة أسراري في تربية الأبناء",
    instructor: "عقله الجاسم",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail: "/images/thumbnail.jpg",
  },
  {
    id: "q2",
    type: "quote",
    quote:
      "تعلمت طرقًا عملية لتنظيم الوقت وتجزئة المهام، مما ساعدني على إنجاز يومي بثقة وراحة.",
    authorName: "سارة",
    line1: "تنظيم الوقت",
    line2: "مهارات الإنتاجية",
    line3: "سارة العبدالله",
  },
  {
    id: "v2",
    type: "video",
    title: "أساسيات التسويق الرقمي",
    instructor: "نورة الفوزان",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    thumbnail: "/images/thumbnail.jpg",
  },
  {
    id: "q3",
    type: "quote",
    quote:
      "المحتوى واضح، والأمثلة حقيقية وسهلة التطبيق. أنصح بها لكل مبتدئ.",
    authorName: "محمد",
    line1: "مدخل إلى إدارة الأعمال",
    line2: "خطوات عملية",
    line3: "محمد العتيبي",
  },
  {
    id: "v3",
    type: "video",
    title: "تحسين العادات اليومية",
    instructor: "أمل القحطاني",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail: "/images/thumbnail.jpg",
  },
];

/* ---- Optional: capture first frame as poster (needs CORS) ---- */
function useVideoPoster(url?: string) {
  const [poster, setPoster] = useState<string | null>(null);
  useEffect(() => {
    if (!url) return;
    const v = document.createElement("video");
    v.crossOrigin = "anonymous";
    v.preload = "auto";
    v.src = url;
    const onLoaded = () => { try { v.currentTime = 0.1; } catch {} };
    const onSeeked = () => {
      const c = document.createElement("canvas");
      c.width = v.videoWidth || 640;
      c.height = v.videoHeight || 360;
      const ctx = c.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(v, 0, 0, c.width, c.height);
      try { setPoster(c.toDataURL("image/jpeg", 0.8)); } catch {}
      v.pause(); v.removeAttribute("src"); v.load();
    };
    v.addEventListener("loadeddata", onLoaded);
    v.addEventListener("seeked", onSeeked);
    return () => {
      v.removeEventListener("loadeddata", onLoaded);
      v.removeEventListener("seeked", onSeeked);
      v.removeAttribute("src"); v.load();
    };
  }, [url]);
  return poster;
}

/* ---------------- Component ---------------- */
export default function FeaturedShowcaseHorizontal({
  items = mockItems,
}: { items?: Item[] }) {
  const [playingId, setPlayingId] = useState<string | number | null>(null);

  return (
    <section dir="rtl" className="w-full">
      <div className="mx-auto max-w-6xl">
        {/* Horizontal scroller:
            - Mobile: snap center, one card centered at a time
            - Desktop: still scrollable; multiple cards visible
        */}
        <div className="overflow-x-auto no-scrollbar">
          <div
            className="
              flex gap-4
              snap-x snap-mandatory md:snap-none
              px-[calc((100vw-352px)/2)] md:px-0
            "
          >
            {items.map((item) =>
              item.type === "quote" ? (
                <QuoteCard key={item.id} item={item} />
              ) : (
                <VideoCard
                  key={item.id}
                  item={item}
                  isPlaying={playingId === item.id}
                  onPlay={() => setPlayingId(item.id)}
                />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Cards ---------------- */

function baseCardClasses(extra = "") {
  return `
    relative overflow-hidden
    rounded-[24px] border border-[#FFFFFF33]
    shadow-[0_10px_40px_rgba(0,0,0,0.45)]
    w-[352px] h-[400px] shrink-0
    snap-center snap-always
    ${extra}
  `;
}

function QuoteCard({ item }: { item: QuoteItem }) {
  return (
    <article
      className={baseCardClasses("bg-black text-white p-6 flex flex-col justify-between")}
      aria-label={`شهادة: ${item.authorName}`}
    >
      <span className="absolute top-4 left-6 text-white/30 text-3xl select-none">”</span>

      <p className="mt-6 text-[15px] leading-7 text-white/85 line-clamp-[9]">
        {`"${item.quote}"`}
      </p>

      <div className="mt-6">
        <div className="text-lg font-extrabold">{item.authorName}</div>
        {item.line1 && <div className="text-sm text-white/70">{item.line1}</div>}
        {item.line2 && <div className="text-sm text-white/70">{item.line2}</div>}
        {item.line3 && <div className="text-sm text-white/70">{item.line3}</div>}
      </div>
    </article>
  );
}

function VideoCard({
  item,
  isPlaying,
  onPlay,
}: {
  item: VideoItem;
  isPlaying: boolean;
  onPlay: () => void;
}) {
  const posterFromVideo = useVideoPoster(item.thumbnail ? undefined : item.videoUrl);
  const poster = item.thumbnail || posterFromVideo || "/images/fallback.jpg";

  return (
    <article
      className={baseCardClasses("bg-black")}
      aria-label={`فيديو: ${item.title}`}
    >
      {isPlaying ? (
        <video
          src={item.videoUrl}
          controls
          autoPlay
          playsInline
          poster={poster}
          className="w-full h-full object-cover"
        />
      ) : (
        <>
          <Image
            src={poster}
            alt={item.title}
            fill
            sizes="352px"
            className="object-cover"
          />

          {/* bottom text */}
          <div className="absolute inset-x-0 bottom-0 p-5">
            <div className="text-white text-base font-extrabold">{item.title}</div>
            <div className="text-white/80 text-sm">{item.instructor}</div>
          </div>

          {/* Play button */}
          <button
            onClick={onPlay}
            className="
              absolute inset-0 m-auto h-16 w-16 rounded-full
              flex items-center justify-center
              bg-white/90 hover:bg-white transition
            "
            aria-label="تشغيل الفيديو"
          >
            <svg viewBox="0 0 24 24" className="h-8 w-8 text-black">
              <path fill="currentColor" d="M8 5v14l11-7z" />
            </svg>
          </button>
        </>
      )}
    </article>
  );
}
