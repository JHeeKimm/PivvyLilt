import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/firebase/firebase";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const { postId } = params;
  const searchParams = req.nextUrl.searchParams;
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 2;

  if (!postId)
    return NextResponse.json({ error: "postId is required" }, { status: 400 });

  try {
    // postId를 사용하여 해당 게시물의 댓글 페이징 처리
    const commentsRef = collection(db, "comments");
    const q = query(
      commentsRef,
      where("postId", "==", postId),
      orderBy("createdAt", "desc")
    );

    const commentSnap = await getDocs(q);
    const comments = commentSnap.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      createdAt: doc.data().createdAt.toDate().toLocaleString(),
    }));

    // 페이징
    const totalCount = comments.length;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedComments = comments.slice(startIndex, endIndex);

    const hasNextPage = endIndex < totalCount;
    const nextPage = hasNextPage ? page + 1 : null;

    return NextResponse.json({
      totalCount,
      comments: paginatedComments,
      hasNextPage,
      nextPage,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const { comment, postId, userId } = await req.json();

  if (!comment || !postId || !userId) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const commentsRef = collection(db, "comments");
  const newComment = {
    comment,
    postId,
    userId,
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(commentsRef, newComment);
  return NextResponse.json({ id: docRef.id, ...newComment });
}
