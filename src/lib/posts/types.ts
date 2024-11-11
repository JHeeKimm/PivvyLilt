export type TPosts = {
  id: string;
  content: string;
  imageUrl?: string;
  userId: string;
  createdAt: string;
  commentsCount: number;
  likesCount: number;
  isLikedByUser: boolean;
};

export interface FeedItemProps {
  postId: string;
  content: string;
  imageUrl?: string;
  userId: string;
  createdAt: string;
  commentsCount: number;
  likesCount: number;
  isLikedByUser: boolean;
  onEdit?: () => void;
}

export interface INewPost {
  content: string;
  image?: File | string | null;
  userId?: string;
}

export interface EditPostFormProps {
  post: TPosts;
  onCancel: () => void;
}

export interface FetchPostsResponse {
  posts: TPosts[];
  nextPage?: number;
}

export interface FetchPostResponse {
  post: TPosts;
}
