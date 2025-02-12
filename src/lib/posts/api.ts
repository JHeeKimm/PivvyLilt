import { QueryFunctionContext } from "@tanstack/react-query";
import { customServerRequest } from "../../utils/api/server";
import { FetchPostResponse, FetchPostsResponse } from "./types";
import { customClientRequest } from "../../utils/api/client";

export const fetchPost = async (postId: string) => {
  const response = await customServerRequest<FetchPostResponse>({
    endpoint: `/api/posts/${postId}`,
  });

  return response.post;
};

export const fetchPosts = async ({ pageParam = 1 }: QueryFunctionContext) => {
  const response = await customServerRequest<FetchPostsResponse>({
    endpoint: `/api/posts?page=${pageParam}`,
  });
  if (!response) {
    return { posts: [], nextPage: undefined };
  }
  return response;
};

export const fetchUserPosts = async ({
  pageParam = 1,
}: QueryFunctionContext) => {
  const response = await customServerRequest<FetchPostsResponse>({
    endpoint: `/api/posts/read-by-user?page=${pageParam}`,
  });
  if (!response) {
    return { posts: [], nextPage: undefined };
  }
  return response;
};

export const uploadPost = async (formData: FormData) => {
  const response = await customClientRequest({
    endpoint: "/api/posts/create-post",
    method: "POST",
    body: formData,
  });

  return response;
};

export const updatePost = async (postId: string, formData: FormData) => {
  const response = await customClientRequest({
    endpoint: `/api/posts/${postId}`,
    method: "PUT",
    body: formData,
  });

  return response;
};

export const deletePost = async (postId: string) => {
  const response = await customClientRequest({
    endpoint: `/api/posts/${postId}`,
    method: "DELETE",
  });

  return response;
};
