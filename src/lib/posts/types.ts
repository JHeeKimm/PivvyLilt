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
}

export interface INewPost {
  title: string;
  content: string;
  image?: File | null;
  userId?: string;
}
