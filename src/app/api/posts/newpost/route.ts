import { NextRequest, NextResponse } from "next/server";
import { db, storage } from "@/lib/config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const userId = formData.get("userId") as string;
    const imageFile = formData.get("image") as File;

    if (!title || !content) {
      return NextResponse.json(
        { error: "제목과 내용은 필수입니다." },
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
      title,
      content,
      imageUrl,
      userId,
      createdAt: new Date().toLocaleString(),
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
