function parseLocaleDateString(localeDateString: string): Date | null {
  // "2024. 10. 30. 오후 4:33:26" 형태를 파싱
  const dateTimePattern =
    /(\d+)\.\s*(\d+)\.\s*(\d+)\.\s*(오전|오후)\s*(\d+):(\d+):(\d+)/;
  const match = localeDateString.match(dateTimePattern);

  if (!match) return null;

  const [, year, month, day, meridiem, hour, minute, second] = match;
  let hours = parseInt(hour, 10);

  // 오후일 경우 12시간을 더해 24시간제로 변환
  if (meridiem === "오후" && hours < 12) hours += 12;
  if (meridiem === "오전" && hours === 12) hours = 0;

  return new Date(
    parseInt(year, 10),
    parseInt(month, 10) - 1, // 월은 0부터 시작
    parseInt(day, 10),
    hours,
    parseInt(minute, 10),
    parseInt(second, 10)
  );
}

export function elapsedTime(dateString: string): string {
  if (!dateString) return "날짜 없음";

  const now = new Date();
  const date = parseLocaleDateString(dateString);

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
