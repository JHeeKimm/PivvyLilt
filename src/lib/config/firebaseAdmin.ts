import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

// Firebase Admin SDK 초기화
if (!getApps().length) {
  initializeApp({
    credential: cert("./firebase-adminsdk.json"),
  });
}

export const adminAuth = getAuth();
