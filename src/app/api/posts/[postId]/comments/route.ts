import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/config/firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const { postId } = params;

  if (!postId)
    return NextResponse.json({ error: "postId is required" }, { status: 400 });

  const commentsRef = collection(db, "comments");
  const q = query(commentsRef, where("postId", "==", postId));
  const commentSnap = await getDocs(q);
  const comments = commentSnap.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
    createdAt: doc.data().createdAt.toDate().toLocaleString(),
  }));

  return NextResponse.json(comments);
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
