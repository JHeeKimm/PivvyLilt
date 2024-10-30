export type TComments = {
  id: string;
  comment: string;
  userId: string;
  postId: string;
  createdAt: string;
};
export interface INewComment {
  comment: string;
  userId: string;
  postId: string;
}

export interface CommentFormProps {
  postId: string;
}

export interface CommentItemProps {
  commentId: string;
  comment: string;
  userId: string;
  createdAt: string;
  postId: string;
}
