"use client";

import Cookies from "js-cookie";
import { FetchOptions } from "./types";

export const customClientRequest = async <T>({
  method = "GET",
  endpoint,
  body = null,
}: FetchOptions): Promise<T> => {
  const accessToken = Cookies.get("accessToken");

  // 기본 헤더 설정 (Access Token 포함)
  const headers: HeadersInit = {
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };

  // JSON 요청인 경우 Content-Type을 추가
  if (body && !(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(endpoint, {
    method,
    headers,
    ...(body && {
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),
  });

  if (!response.ok) {
    console.error("response", response);
    throw new Error(
      `API 요청 실패: ${response.status}` ||
        "Unknown server-side error occurred"
    );
  }

  const data = await response.json();
  console.log("customClientRequest Client data", data);

  return data;
};
