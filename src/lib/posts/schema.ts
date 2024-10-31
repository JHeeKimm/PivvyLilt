import { z } from "zod";

export const postSchema = z.object({
  content: z.string().min(1, "내용을 입력하세요"),
  image: z.any().optional(),
});

export type PostFormData = z.infer<typeof postSchema>;
