import { db } from "@/config/firebase/firebase";
import { authenticateUser } from "@/lib/auth/authenticateUser";
import { FOLLOWER_KEY, FOLLOWING_KEY } from "@/lib/follows/key";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

interface FollowData {
  id: string;
  followerId: string;
  followingId: string;
}

// 팔로워/팔로잉 목록 조회
export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get("type");

  const userId = await authenticateUser(req);
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    let followsQuery;

    if (type === FOLLOWER_KEY) {
      // 내 팔로워 조회 (내가 followingId인 경우)
      followsQuery = query(
        collection(db, "follows"),
        where("followingId", "==", userId)
      );
    } else if (type === FOLLOWING_KEY) {
      // 내가 팔로우한 사람 조회 (내가 followerId인 경우)
      followsQuery = query(
        collection(db, "follows"),
        where("followerId", "==", userId)
      );
    } else {
      return NextResponse.json(
        { error: "Invalid type parameter" },
        { status: 400 }
      );
    }

    // follows 컬렉션에서 팔로워/팔로잉 목록을 가져옴
    const followsSnapshot = await getDocs(followsQuery);
    const followsData: FollowData[] = followsSnapshot.docs.map(
      (doc: QueryDocumentSnapshot) => {
        const data = doc.data();
        return {
          id: doc.id,
          followerId: data.followerId,
          followingId: data.followingId,
        };
      }
    );

    // follows의 각 userId로 users 컬렉션에서 사용자 정보 가져오기
    const followUserInfos = await Promise.all(
      followsData.map(async (follow) => {
        const targetUserId =
          type === FOLLOWER_KEY ? follow.followerId : follow.followingId;
        const followUserRef = doc(db, "users", targetUserId);
        const followUserDocSnap = await getDoc(followUserRef);
        return { id: follow.id, ...followUserDocSnap.data() };
      })
    );

    return NextResponse.json({ followsList: followUserInfos });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "팔로우 목록 조회 중에 오류가 발생했습니다.",
        error,
      },
      { status: 500 }
    );
  }
}
