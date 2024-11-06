import { db } from "@/config/firebase/firebase";
import {
  doc,
  increment,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

// 좋아요 추가
export async function POST(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const { userId } = await req.json();
  const { postId } = params;
  console.log("like post userId===", userId, "postId====", postId);
  try {
    const likeRef = doc(db, "likes", `${postId}_${userId}`);
    const postRef = doc(db, "posts", postId);

    // 트랜잭션을 사용하여 여러 작업을 일괄적으로 수행
    await runTransaction(db, async (transaction) => {
      // 좋아요 문서가 이미 존재하는지 확인
      const likeDoc = await transaction.get(likeRef);
      // 좋아요 문서가 없으면
      console.log("likeDoc.exists()", likeDoc.exists());
      if (!likeDoc.exists()) {
        console.log("추가 로직");
        // 좋아요 추가
        transaction.set(likeRef, {
          postId,
          userId,
          createdAt: serverTimestamp(),
        });
        // 게시물의 likesCount 1 증가
        transaction.update(postRef, { likesCount: increment(1) });
      }
    });

    return NextResponse.json({ success: true, message: "좋아요 추가 성공!" });
  } catch (error) {
    console.error("좋아요 추가 중에 오류 발생:", error);
    return NextResponse.json(
      {
        success: false,
        message: "좋아요 추가 중에 오류가 발생했습니다.",
        error,
      },
      { status: 500 }
    );
  }
}
