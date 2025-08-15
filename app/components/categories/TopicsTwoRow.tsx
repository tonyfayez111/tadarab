"use client";

import Image from "next/image";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import LoadingCards from "../ui/LoadingCards";

interface Topic {
  id: number;
  title: string;
  parent_id: number | null;
  cover_url: string;
  color: string;
  slug: string;
  icon: string;
}

export default function TopicsTwoRow() {
  const {
    data,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["categories"],
    queryFn: ({ pageParam = 1 }) => 
        fetch(`/api/categories?page=${pageParam}&per_page=10`).then(res => res.json()),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const pagination = lastPage.pagination;
      if (pagination && pagination.current_page < pagination.last_page) {
        return pagination.current_page + 1;
      }
      return undefined;
    },
    staleTime: 0,
  });

  const topics: Topic[] = useMemo(() => {
    return (data?.pages ?? []).flatMap((p) => p.data.data || []);
  }, [data]);

  if (status === "pending") return <LoadingCards />;
  if (status === "error") return <div>Error: {(error as Error).message}</div>;

  return (
    <section dir="rtl" className="w-full grid place-items-center">
      {/* Two-row horizontal scroller */}
      <div className="overflow-x-auto px-4 pb-4 w-full">
        <h1 className="md:px-30 mb-3 text-[32px] w-full flex flex-row items-center md:items-start font-[800] text-center md:text-left">
          أقسام <span className="text-[#BE1622]">الدورات</span>
        </h1>

        <div
          className="
            grid grid-rows-1 md:grid-rows-2 grid-flow-col auto-cols-max gap-3 md:gap-4
            min-h-[96px] md:min-h-[112px]
            px-2 md:px-0
            w-full
            justify-center
          "
        >
          {topics.map((t) => (
            <TopicCard 
              key={t.id} 
              title={t.title} 
              icon={t.icon} 
              color={t.color}
              coverUrl={t.cover_url}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TopicCard({
  title,
  icon,
  color,
  coverUrl,
}: {
  title: string;
  icon: string;
  color: string;
  coverUrl: string;
}) {
  return (
    <button
      className="
        relative w-[280px] md:w-full h-[80px] md:h-[96px]
        rounded-2xl bg-[#1F232B] text-white
        flex items-center justify-evenly
        px-4 md:px-6
        shadow-lg hover:shadow-xl 
        border border-white/5
        min-w-[280px] md:min-w-0
      "
    >
      {/* Use cover_url if icon doesn't exist, fallback to icon */}
      {coverUrl ? (
        <Image
          src={coverUrl}
          alt={title}
          width={60}
          height={60}
          className="w-[60px] h-[60px] md:w-[70px] md:h-[70px] rounded-lg object-contain"
        />
      ) : (
        <Image
          src={`/icons/${icon}.svg`}
          alt={icon}
          width={60}
          height={60}
          className="w-[60px] h-[60px] md:w-[70px] md:h-[70px]"
        />
      )}

      <span className="text-base md:text-lg font-extrabold text-center">{title}</span>
      
      <span
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          boxShadow: `0 0 80px 12px ${color}33 inset`,
        }}
      />
    </button>
  );
}