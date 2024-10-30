import { db } from "@/lib/config/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("createdAt", "desc"));
    const postsSnapshot = await getDocs(q);

    const posts = postsSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      createdAt: doc.data().createdAt.toDate().toLocaleString(),
    }));
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetchin posts: ", error);
    return NextResponse.error();
  }
}
