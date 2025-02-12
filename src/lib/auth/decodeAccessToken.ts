import { Base64 } from "js-base64";

export function decodeAccessToken(accessToken: string): string | null {
  try {
    const payload = accessToken.split(".")[1];
    if (!payload) return null;

    const decodedPayload = JSON.parse(Base64.decode(payload));

    return decodedPayload.user_id; // Firebase 토큰 userId값 반환
  } catch (error) {
    console.error("Token decoding failed:", error);
    return null;
  }
}
