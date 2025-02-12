import { customServerRequest } from "@/utils/api/server";
import { FetchCommentsResponse, INewComment } from "./types";
import { customClientRequest } from "@/utils/api/client";

export const fetchComments = async (postId: string, pageParam: number) => {
  const response = await customServerRequest<FetchCommentsResponse>({
    endpoint: `/api/posts/${postId}/comments?page=${pageParam}`,
  });
  if (!response) {
    return { comments: [], nextPage: undefined };
  }
  return response;
};

export const uploadComment = async (
  postId: string,
  newComment: INewComment
) => {
  const response = await customClientRequest({
    endpoint: `/api/posts/${postId}/comments`,
    method: "POST",
    body: newComment,
  });

  return response;
};

export const updateComment = async (
  postId: string,
  commentId: string,
  comment: string
) => {
  const response = await customClientRequest({
    endpoint: `/api/posts/${postId}/comments/${commentId}`,
    method: "PATCH",
    body: comment,
  });

  return response;
};

export const deleteComment = async (postId: string, commentId: string) => {
  const response = await customClientRequest({
    endpoint: `/api/posts/${postId}/comments/${commentId}`,
    method: "DELETE",
  });

  return response;
};
