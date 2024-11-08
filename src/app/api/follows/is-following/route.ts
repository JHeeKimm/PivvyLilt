import { db } from "@/config/firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const followerId = req.nextUrl.searchParams.get("followerId");
  const followingId = req.nextUrl.searchParams.get("followingId");

  if (!followerId || !followingId) {
    return NextResponse.json(
      { error: "followerId와 followingId가 필요합니다." },
      { status: 400 }
    );
  }

  try {
    // followerId가 followingId를 팔로우하고 있는지 확인
    const followsQuery = query(
      collection(db, "follows"),
      where("followerId", "==", followerId),
      where("followingId", "==", followingId)
    );

    const followsSnapshot = await getDocs(followsQuery);
    const isFollowing = !followsSnapshot.empty; // 팔로우 관계가 있으면 true

    return NextResponse.json({ isFollowing });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "팔로우 상태 조회 중에 오류가 발생했습니다.",
        error,
      },
      { status: 500 }
    );
  }
}
