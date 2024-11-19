import { db, storage } from "@/config/firebase/firebase";
import { authenticateUser } from "@/lib/auth/authenticateUser";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { nickname: string } }
) {
  const nickname = decodeURIComponent(params.nickname);

  if (!nickname) {
    return NextResponse.json(
      { error: "Nickname is required" },
      { status: 400 }
    );
  }
  try {
    // Firestore에서 nickname을 필드로 조회하는 쿼리
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("nickname", "==", nickname));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const userData = querySnapshot.docs[0].data();
    return NextResponse.json(
      {
        nickname: userData.nickname,
        bio: userData.bio,
        profileImage: userData.profileImage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to fetch user data:", error);

    return NextResponse.json(
      { error: "사용자 정보 페치에 실패했습니다." },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { nickname: string } }
) {
  const userId = await authenticateUser(req);
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const nickname = decodeURIComponent(params.nickname);

  if (!nickname) {
    return NextResponse.json(
      { error: "Nickname is required" },
      { status: 400 }
    );
  }

  try {
    const formData = await req.formData();
    const bio = formData.get("bio") as string;
    const imageFile = formData.get("profileImage") as File | null | "";

    // nickname을 필드로 Firestore에서 사용자 문서 조회
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("nickname", "==", nickname));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json(
        { error: "해당하는 사용자가 없습니다." },
        { status: 404 }
      );
    }

    // 기존 프로필 이미지 URL 가져오기
    const userDoc = querySnapshot.docs[0].ref;
    const existingData = querySnapshot.docs[0].data();
    let imageUrl = existingData.profileImage || "";

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

      // 새 이미지 파일을 Firebase Storage에 업로드
      const newImageRef = ref(
        storage,
        `profile_images/${userId}/${imageFile.name}`
      );
      await uploadBytes(newImageRef, imageFile);

      // 업로드된 새 이미지의 URL 가져오기
      imageUrl = await getDownloadURL(newImageRef);
    }
    // Firestore에 bio와 imageUrl 업데이트
    await updateDoc(userDoc, {
      bio: bio || existingData.bio,
      profileImage: imageUrl || existingData.profileImage,
    });

    return NextResponse.json({
      status: 200,
      data: {
        bio: bio || existingData.bio,
        profileImage: imageUrl || existingData.profileImage,
      },
    });
  } catch (error) {
    console.error("Failed to update profile:", error);
    return NextResponse.json(
      { error: "프로필 업데이트에 실패했습니다." },
      { status: 500 }
    );
  }
}
