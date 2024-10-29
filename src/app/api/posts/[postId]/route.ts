import { db, storage } from "@/lib/config/firebase";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export async function GET(
  req: Request,
  { params }: { params: { postId: string } }
) {
  const { postId } = params;
  try {
    const docRef = doc(db, "posts", postId);
    const docSnapshot = await getDoc(docRef);

    if (!docSnapshot.exists()) {
      return Response.json(
        { error: "해당 게시물이 없습니다." },
        { status: 404 }
      );
    }
    const post = {
      id: docSnapshot.id,
      ...docSnapshot.data(),
    };
    return Response.json({ post });
  } catch (error) {
    console.error("Error fetching post: ", error);
    return Response.error();
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { postId: string } }
) {
  const { postId } = params;

  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const imageFile = formData.get("image") as File | null;

    // Firestore postId 문서 참조
    const postRef = doc(db, "posts", postId);
    const postSnap = await getDoc(postRef);

    if (!postSnap.exists()) {
      return Response.json(
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
      title,
      content,
      imageUrl,
      updatedAt: new Date().toLocaleString(),
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error updating post:", error);
    return Response.json(
      { error: "게시물 업데이트를 실패했습니다." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { postId: string } }
) {
  const { postId } = params;

  try {
    const postRef = doc(db, "posts", postId);
    const postSnap = await getDoc(postRef);

    if (!postSnap.exists()) {
      return Response.json(
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
    return Response.json({ success: true });
  } catch (error) {
    console.error("Error deleting post:", error);
    return Response.json(
      { error: "게시물 삭제에 실패했습니다." },
      { status: 500 }
    );
  }
}
