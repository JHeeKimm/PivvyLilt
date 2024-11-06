import { NextRequest, NextResponse } from "next/server";
import { db, storage } from "@/config/firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const content = formData.get("content") as string;
    const userId = formData.get("userId") as string;
    const imageFile = formData.get("image") as File;

    if (!content) {
      return NextResponse.json(
        { error: "내용은 필수입니다." },
        { status: 400 }
      );
    }
    let imageUrl = "";
    if (imageFile) {
      const storageRef = ref(storage, `images/${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(storageRef);
    }
    await addDoc(collection(db, "posts"), {
      content,
      imageUrl,
      userId,
      createdAt: serverTimestamp(),
      commentsCount: 0,
      likesCount: 0,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error adding post:", error);
    return NextResponse.json(
      { error: "게시글 추가에 실패했습니다." },
      { status: 500 }
    );
  }
}
