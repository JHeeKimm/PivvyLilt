export function elapsedTime(dateString: string): string {
  if (!dateString) return "날짜 없음";

  const now = new Date();
  const date = new Date(dateString);

  if (!date) return "유효하지 않은 날짜";

  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

  if (diffInMinutes < 1) return "방금 전";
  if (diffInMinutes < 60) return `${diffInMinutes}분 전`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}시간 전`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}일 전`;

  // 일주일 이상 경과 시 YYYY-MM-DD 형식 반환
  return date.toLocaleDateString();
}
