import { useCallback, useEffect, useRef } from "react";

interface InterSectionObserverProps {
  onIntersect: () => void;
  threshold?: number;
  rootMargin?: string;
  hasNextPage: boolean;
}

export default function useIntersectionObserver({
  onIntersect,
  threshold = 0.3,
  rootMargin = "100px",
  hasNextPage,
}: InterSectionObserverProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;

      // 요소가 화면에 관찰되고, 다음 페이지가 있다면 다음 페이지 fetch
      if (entry.isIntersecting && hasNextPage) {
        onIntersect();
      }
    },
    [onIntersect, hasNextPage]
  );

  useEffect(() => {
    // 관찰자 초기화
    observerRef.current = new IntersectionObserver(handleIntersect, {
      threshold, // 요소의 가시 영역 비율
      rootMargin, //뷰포트 확장 또는 축소된 영역에 요소가 들어왔을 때 트리거
    });

    // 관찰 시작
    if (triggerRef.current) {
      observerRef.current.observe(triggerRef.current);
    }

    // 모든 요소 관찰 중지
    return () => observerRef.current?.disconnect();
  }, [handleIntersect, threshold, rootMargin, hasNextPage]);

  // triggerRef 반환하여 관찰 대상 요소에 연결
  return triggerRef;
}
