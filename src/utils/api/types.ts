export interface FetchOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  endpoint: string;
  body?: BodyInit | null; // BodyInit: fetch 요청에 사용할 수 있는 유효한 body 타입
}
