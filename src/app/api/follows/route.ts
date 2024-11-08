import { db } from "@/config/firebase/firebase";
import { FOLLOWER_KEY, FOLLOWING_KEY } from "@/lib/follows/key";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  runTransaction,
  where,
} from "firebase/firestore";
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

interface FollowData {
  id: string;
  followerId: string;
  followingId: string;
}

// 팔로워/팔로잉 목록 조회
export async function GET(req: NextRequest) {
  const userId = req.headers.get("user-id");
  const type = req.nextUrl.searchParams.get("type");

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
    const followsData: FollowData[] = followsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as FollowData[];

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
