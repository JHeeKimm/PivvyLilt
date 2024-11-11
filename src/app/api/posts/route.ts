import { db } from "@/config/firebase/firebase";
import { authenticateUser } from "@/lib/auth/authenticateUser";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // 무한 스크롤: 서버에서 쿼리 파라미터 사용
  const searchParams = req.nextUrl.searchParams;
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 4;

  const userId = await authenticateUser(req);
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("createdAt", "desc"));
    const postsSnapshot = await getDocs(q);

    const posts = await Promise.all(
      postsSnapshot.docs.map(async (docSnap) => {
        const postData = docSnap.data();
        const postId = docSnap.id;

        // 각 게시물에 대해 `${postId}_${userId}` 형식의 좋아요 문서 확인
        const likeDocRef = doc(db, "likes", `${postId}_${userId}`);
        const likeDocSnap = await getDoc(likeDocRef);

        return {
          ...postData,
          id: postId,
          createdAt: postData.createdAt.toDate().toISOString(),
          isLikedByUser: likeDocSnap.exists(), // 문서 존재 여부로 좋아요 확인
        };
      })
    );

    // 페이징
    const totalCount = posts.length;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedPosts = posts.slice(startIndex, endIndex);

    const hasNextPage = endIndex < totalCount;
    const nextPage = hasNextPage ? page + 1 : undefined;

    return NextResponse.json({
      totalCount,
      posts: paginatedPosts,
      hasNextPage,
      nextPage,
    });
  } catch (error) {
    console.error("Error fetchin posts: ", error);
    return NextResponse.error();
  }
}
