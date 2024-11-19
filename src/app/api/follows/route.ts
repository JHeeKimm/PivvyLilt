import { db } from "@/config/firebase/firebase";
import { authenticateUser } from "@/lib/auth/authenticateUser";
import { doc, getDoc, increment, runTransaction } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

// 팔로우
export async function POST(req: NextRequest) {
  const { followerId, followingId } = await req.json();
  try {
    const followsRef = doc(db, `follows/${followerId}_${followingId}`);
    const followerDoc = doc(db, `users/${followerId}`);
    const followingDoc = doc(db, `users/${followingId}`);

    await runTransaction(db, async (transaction) => {
      // 팔로우 관계 저장
      transaction.set(followsRef, {
        followerId,
        followingId,
      });
      // followingsCount, followersCount 1 증가
      transaction.update(followerDoc, { followingsCount: increment(1) });
      transaction.update(followingDoc, { followersCount: increment(1) });
    });

    return NextResponse.json({ success: true, message: "팔로우 성공!" });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "팔로우 중에 오류가 발생했습니다.",
        error,
      },
      { status: 500 }
    );
  }
}

// 언팔로우
export async function DELETE(req: NextRequest) {
  const { followerId, followingId } = await req.json();
  const followsRef = doc(db, `follows/${followerId}_${followingId}`);
  const followerDoc = doc(db, `users/${followerId}`);
  const followingDoc = doc(db, `users/${followingId}`);

  try {
    await runTransaction(db, async (transaction) => {
      // 팔로우 관계 삭제
      transaction.delete(followsRef);

      // followingsCount, followersCount 1 증가
      transaction.update(followerDoc, { followingsCount: increment(-1) });
      transaction.update(followingDoc, { followersCount: increment(-1) });
    });

    return NextResponse.json({ success: true, message: "언팔로우 성공" });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "언팔로우 중에 오류가 발생했습니다.",
        error,
      },
      { status: 500 }
    );
  }
}

// 팔로워/팔로잉 수 가져오기
export async function GET(req: NextRequest) {
  const userId = await authenticateUser(req);
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      return new NextResponse("User not found", { status: 404 });
    }

    const data = userDoc.data();
    const followersCount = data.followersCount || 0;
    const followingsCount = data.followingsCount || 0;

    return NextResponse.json({
      status: 200,
      data: { followersCount, followingsCount },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "팔로우 수를 가져오는 중 오류가 발생했습니다.", details: error },
      { status: 500 }
    );
  }
}
