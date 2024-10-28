import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(1, "제목을 입력하세요"),
  content: z.string().min(1, "내용을 입력하세요"),
  image: z.any().optional(),
});

export type PostFormData = z.infer<typeof postSchema>;
