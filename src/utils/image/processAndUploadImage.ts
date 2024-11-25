import { storage } from "@/config/firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import sharp from "sharp";

/**
 * 이미지 처리 함수
 * @param fileBuffer - 원본 파일의 Buffer 데이터
 * @param fileName - 업로드할 파일 이름
 * @param path - 저장할 Firebase Storage 경로 ("images", "profile_images")
 * @param options - 리사이징 및 품질 옵션
 * @returns - 업로드된 이미지의 URL
 */

export const processAndUploadImage = async (
  fileBuffer: Buffer,
  fileName: string,
  path: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
  } = {}
): Promise<string> => {
  const { width = 512, height = 512, quality = 80 } = options;

  try {
    // sharp로 이미지 리사이징 및 포맷 변환
    const optimizedBuffer = await sharp(fileBuffer)
      .rotate() // EXIF 데이터 기반으로 올바르게 회전
      .resize({
        width,
        height,
        fit: "inside", // 이미지를 지정된 width와 height 안에 맞추되, 원본 비율을 유지
      })
      .webp({ quality })
      .toBuffer();

    // Firebase Storage 경로 생성
    const storagePath = `${path}/${Date.now()}_${fileName}.webp`;
    const storageRef = ref(storage, storagePath);

    // Firebase Storage 업로드
    await uploadBytes(storageRef, optimizedBuffer, {
      contentType: "image/webp",
    });

    // 업로드된 이미지 URL 반환
    return getDownloadURL(storageRef);
  } catch (error) {
    console.error("Error during image processing:", error);
    throw new Error("이미지 처리 중 문제가 발생했습니다.");
  }
};
