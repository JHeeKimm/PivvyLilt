import { db, storage } from "@/config/firebase/firebase";
import {
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const { postId } = params;
  try {
    const docRef = doc(db, "posts", postId);
    const docSnapshot = await getDoc(docRef);

    if (!docSnapshot.exists()) {
      return NextResponse.json(
        { error: "해당 게시물이 없습니다." },
        { status: 404 }
      );
    }
    const post = {
      ...docSnapshot.data(),
      id: docSnapshot.id,
      createdAt: docSnapshot.data().createdAt.toDate().toLocaleString(),
    };

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Error fetching post: ", error);
    return NextResponse.error();
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const { postId } = params;

  try {
    const formData = await req.formData();
    const content = formData.get("content") as string;
    const imageFile = formData.get("image") as File | null;

    // Firestore postId 문서 참조
    const postRef = doc(db, "posts", postId);
    const postSnap = await getDoc(postRef);

    if (!postSnap.exists()) {
      return NextResponse.json(
        { error: "해당하는 게시물이 없습니다." },
        { status: 404 }
      );
    }

    // 기존 데이터 가져오기
    const existindData = postSnap.data();
    let imageUrl = existindData.imageUrl || "";

    // 새 이미지 파일이 있는 경우
    if (imageFile instanceof File) {
      // 기존 이미지가 있는 경우 삭제
      if (imageUrl) {
        const oldImageRef = ref(storage, imageUrl);
        await deleteObject(oldImageRef)
          .then(() => {
            // File deleted successfully
            console.log("기존 이미지 삭제 성공");
          })
          .catch((error) => {
            console.error("Error deleting old image:", error);
          });
      }

      // 새 이미지 업로드
      const newImageRef = ref(storage, `images/${imageFile.name}`);
      await uploadBytes(newImageRef, imageFile);
      imageUrl = await getDownloadURL(newImageRef);
    }

    // Firestore 데이터 업데이트
    await updateDoc(postRef, {
      content,
      imageUrl,
      updatedAt: serverTimestamp(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "게시물 업데이트를 실패했습니다." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const { postId } = params;

  try {
    const postRef = doc(db, "posts", postId);
    const postSnap = await getDoc(postRef);

    if (!postSnap.exists()) {
      return NextResponse.json(
        { error: "해당하는 게시물이 없습니다." },
        { status: 404 }
      );
    }

    const postData = postSnap.data();
    const imageUrl = postData.imageUrl;

    // Firestore에서 게시물 삭제
    await deleteDoc(postRef);

    // Storage에서 이미지 삭제
    if (imageUrl) {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "게시물 삭제에 실패했습니다." },
      { status: 500 }
    );
  }
}
