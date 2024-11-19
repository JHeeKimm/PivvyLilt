import { db } from "@/config/firebase/firebase";
import { authenticateUser } from "@/lib/auth/authenticateUser";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 4;

  const userId = await authenticateUser(req);
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    // 사용자가 작성한 게시물만 조회
    const postsRef = collection(db, "posts");
    const userPostsQuery = query(postsRef, where("userId", "==", userId));
    const postSnapshots = await getDocs(userPostsQuery);

    const posts = postSnapshots.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      createdAt: doc.data().createdAt.toDate().toLocaleString(),
    }));

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
    console.error("Error fetching user posts: ", error);
    return NextResponse.json(
      { error: "사용자 게시물 페치에 실패했습니다." },
      { status: 500 }
    );
  }
}
