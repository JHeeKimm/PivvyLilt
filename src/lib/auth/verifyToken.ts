import { adminAuth } from "@/lib/config/firebaseAdmin";

// Firebase AccessToken 검증
export async function verifyAccessToken(token: string) {
  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    return decodedToken; // 유효한 경우 디코딩된 사용자 정보 반환
  } catch (error) {
    throw new Error("Invalid or expired access token");
  }
}
