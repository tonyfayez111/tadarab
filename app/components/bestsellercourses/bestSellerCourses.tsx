"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import HorizontalCards from "../ui/HorizontalCards";
import CourseCard from "../ui/CourseCard";
import LoadingCards from "../ui/LoadingCards";

interface Course {
  id: number;
  title: string;
  instructor: string;
  price: number;
  image: string;
  rating: number;
}

export default function BestSellerCourses() {
  const {
    data,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["bestseller"],
    queryFn: ({ pageParam = 1 }) =>
      fetch(`/api/bestseller?page=${pageParam}&per_page=10`).then((res) =>
        res.json()
      ),
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

  const courses: Course[] = useMemo(() => {
    return (data?.pages ?? []).flatMap((p) => p.data?.data || []);
  }, [data]);

  if (status === "pending") return <LoadingCards />;
  if (status === "error") return <div>Error: {(error as Error).message}</div>;
  return (
    <HorizontalCards
      data={courses}
      title="الدورات"
      secondtitle="الأكثر مبيعاً"
      isLoading={isFetchingNextPage}
      hasMore={hasNextPage}
      onLoadMore={fetchNextPage}
      renderCard={(course) => (
        <CourseCard key={course.id} course={course as any} />
      )}
    />
  );
}
