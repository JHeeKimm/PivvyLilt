import { NextRequest } from "next/server";
import { decodeAccessToken } from "./decodeAccessToken";

export async function authenticateUser(
  req: NextRequest
): Promise<string | null> {
  const authHeader = req.headers.get("Authorization");
  const accessToken = authHeader?.split(" ")[1];

  if (!accessToken) {
    return null;
  }

  const userId = await decodeAccessToken(accessToken);

  if (!userId) {
    return null;
  }

  return userId;
}
