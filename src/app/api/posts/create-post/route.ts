import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { processAndUploadImage } from "@/utils/image/processAndUploadImage";

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
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      imageUrl = await processAndUploadImage(buffer, imageFile.name, "images");
    }

    await addDoc(collection(db, "posts"), {
      content,
      imageUrl,
      userId,
      createdAt: serverTimestamp(),
      commentsCount: 0,
      likesCount: 0,
    });

    return NextResponse.json({ status: 200, message: "게시물 추가 완료" });
  } catch (error) {
    console.error("Error adding post:", error);
    return NextResponse.json(
      { error: "게시글 추가에 실패했습니다." },
      { status: 500 }
    );
  }
}
