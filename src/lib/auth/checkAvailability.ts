import { db } from "@/config/firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

// 특정 필드에 대한 중복 검사 함수
export async function checkAvailability(field: string, value: string) {
  const usersRef = collection(db, "users");
  const availabilityQuery = query(usersRef, where(field, "==", value));
  const snapshot = await getDocs(availabilityQuery);

  return snapshot.empty; // 중복 없으면 true, 중복 있으면 false
}
