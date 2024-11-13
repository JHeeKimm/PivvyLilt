"use server";

import { cookies } from "next/headers";
import { FetchOptions } from "./types";

export const customServerRequest = async <T>({
  endpoint,
}: FetchOptions): Promise<T> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const accessToken = cookies().get("accessToken")?.value;

  const headers: HeadersInit = {
    // 조건부로 객체 속성을 추가하기 위해 스프레드 연산자를 사용하여 객체를 확장
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };

  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error(
      `API 요청 실패: ${response.status}` ||
        "Unknown server-side error occurred"
    );
  }

  const data = await response.json();

  return data;
};
