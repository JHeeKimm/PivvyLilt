export type TPosts = {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  user_id: string;
  created_at: string;
};

export interface FeedItemProps {
  postId: string;
  title: string;
  content: string;
  imageUrl?: string;
  userId: string;
  createdAt: string;
}
