"use client";

import { useMemo } from "react";
import CoverflowCarousel from "../ui/CoverflowCarousel";
import LoadingCards from "../ui/LoadingCards";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function Trainers() {
    const {
        data,
        status,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
      } = useInfiniteQuery({
        queryKey: ["trainers"],
        queryFn: ({ pageParam = 1 }) => 
            fetch(`/api/trainers?page=${pageParam}&per_page=10`).then(res => res.json()),
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
    
        const trainers:any[] = useMemo(() => {
        return (data?.pages ?? []).flatMap((p) => p.data.data || []);
      }, [data]);
    
      if (status === "pending") return <LoadingCards />;
      if (status === "error") return <div>Error: {(error as Error).message}</div>;
    return (
        <div>
            <div className="flex items-center justify-between mx-10  md:mx-20  " dir="rtl">
            <div className="text-[20px] md:text-[32px] font-[700] " dir="rtl">نخبة من مدربي <span className="text-[#BE1622]">الوطن العربي</span></div>
             <div className="flex items-center gap-2.5 text-[18px] md:text-[24px] font-[700] text-white">
                المزيد
                <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 18L2 10L10 2" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

</div>

            </div>
            <CoverflowCarousel items={trainers} rtl={true} className="mt-10 md:mt-0" />
            <div className="font-[400] text-[16px] text-white/60 text-center my-7.75">هل تريد الإنضمام إلى منصة تدرب التعليمية كمدرب؟</div>
       <div className="flex items-center justify-center">

         <button className="bg-[#FFFFFF]/10 w-[220px] h-[48px] text-white rounded-[16px] px-[20px] py-[12px] font-[700] text-[16px] text-center flex items-center justify-center gap-2"><svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 14.3999L2 8.3999L8 2.3999" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
قدم كمدرب الآن</button>
       </div>
        </div>
    )
}