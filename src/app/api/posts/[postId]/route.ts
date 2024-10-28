import { db } from "@/lib/config/firebase";
import { doc, getDoc } from "firebase/firestore";

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
