export type TPosts = {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  userId: string;
  createdAt: string;
  commentsCount: number;
  likesCount: number;
};

export interface FeedItemProps {
  postId: string;
  title: string;
  content: string;
  imageUrl?: string;
  userId: string;
  createdAt: string;
  commentsCount: number;
  likesCount: number;
  onEdit?: () => void;
}

export interface INewPost {
  title: string;
  content: string;
  image?: File | string | null;
  userId?: string;
}

export interface EditPostFormProps {
  post: TPosts;
  onCancel: () => void;
}
