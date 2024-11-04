import { db } from "@/lib/config/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // 무한 스크롤: 서버에서 쿼리 파라미터 사용
  const searchParams = req.nextUrl.searchParams;
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 4;

  try {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("createdAt", "desc"));
    const postsSnapshot = await getDocs(q);

    const posts = postsSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      createdAt: doc.data().createdAt.toDate().toISOString(),
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
    console.error("Error fetchin posts: ", error);
    return NextResponse.error();
  }
}
