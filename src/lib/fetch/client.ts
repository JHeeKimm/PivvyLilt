"use client";

import Cookies from "js-cookie";
import { FetchOptions } from "./types";

export const customFetchClient = async <T>({
  method = "GET",
  endpoint,
  body = null,
}: FetchOptions): Promise<T> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const accessToken = Cookies.get("accessToken");

  const headers: HeadersInit = {
    ...(method !== "GET" && { "Content-Type": "application/json" }),
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };

  const response = await fetch(`${baseUrl}${endpoint}`, {
    method,
    ...(body && { body }),
    headers,
  });

  if (!response.ok) {
    throw new Error(
      `API 요청 실패: ${response.status}` ||
        "Unknown server-side error occurred"
    );
  }

  const data = await response.json();
  console.log("customFetchClient Client data", data);

  return data;
};
