import { db } from "@/lib/config/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function GET() {
  try {
    const postsRef = collection(db, "posts");
    const postsSnapshot = await getDocs(postsRef);

    const posts = postsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return Response.json({ posts });
  } catch (error) {
    console.error("Error fetchin posts: ", error);
    return Response.error();
  }
}
