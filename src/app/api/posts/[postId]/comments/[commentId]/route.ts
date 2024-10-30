import { db } from "@/lib/config/firebase";
import { doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { commentId: string } }
) {
  const { commentId } = params;
  const data = await req.json();
  const comment = data.comment?.trim();

  console.log("PATCH comment", comment);

  if (!comment) {
    return NextResponse.json({ error: "Comment is required" }, { status: 400 });
  }
  try {
    const commentRef = doc(db, "comments", commentId);
    await updateDoc(commentRef, {
      comment,
      updatedAt: serverTimestamp(),
    });

    return NextResponse.json({ commentId, comment });
  } catch (error) {
    console.error("Error updating document:", error);
    return NextResponse.json(
      { error: "Failed to update comment" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { commentId: string } }
) {
  const { commentId } = params;
  const commentRef = doc(db, "comments", commentId);
  await deleteDoc(commentRef);

  return NextResponse.json({ success: true });
}
