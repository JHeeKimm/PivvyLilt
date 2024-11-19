import { customServerRequest } from "@/utils/api/server";
import { FetchFollowerCountsResponse, FetchIsFollowingResponse } from "./types";
import { customClientRequest } from "@/utils/api/client";

export const fetchFollowerCounts = async () => {
  const response = await customServerRequest<FetchFollowerCountsResponse>({
    endpoint: `/api/follows/`,
  });
  return response.data;
};

export const fetchIsFollowing = async (
  followerId: string,
  followingId: string
) => {
  const response = await customServerRequest<FetchIsFollowingResponse>({
    endpoint: `/api/follows/is-following?followerId=${followerId}&followingId=${followingId}`,
  });

  return response.isFollowing;
};

export const updateFollow = async (
  method: "DELETE" | "POST",
  followerId: string,
  followingId: string
) => {
  const response = await customClientRequest({
    endpoint: "/api/follows",
    method,
    body: { followerId, followingId },
  });

  return response;
};
