import { db } from "@/config/firebase/firebase";
import { doc, increment, runTransaction } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

// 좋아요 삭제
export async function DELETE(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const { userId } = await req.json();
  const { postId } = params;

  try {
    const likeRef = doc(db, "likes", `${postId}_${userId}`);
    const postRef = doc(db, "posts", postId);
    console.log("DELETE route handler likeRef", likeRef);
    console.log("DELETE route handler postRef", postRef);
    // 트랜잭션을 사용하여 여러 작업을 일괄적으로 수행
    await runTransaction(db, async (transaction) => {
      // 좋아요 문서가 이미 존재하는지 확인
      const likeDoc = await transaction.get(likeRef);
      // 좋아요 문서가 있으면
      if (likeDoc.exists()) {
        // 좋아요 삭제
        transaction.delete(likeRef);
        // 게시물의 likesCount 1 감소
        transaction.update(postRef, { likesCount: increment(-1) });
      }
    });

    return NextResponse.json({ success: true, message: "좋아요 삭제 성공!" });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "좋아요 삭제 중에 오류가 발생했습니다.",
        error,
      },
      { status: 500 }
    );
  }
}
