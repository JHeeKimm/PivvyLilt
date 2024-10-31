"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { INewPost } from "@/lib/posts/types";
import { postSchema } from "@/lib/posts/schema";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useCreatePost } from "@/lib/posts/hooks/useCreatePost";
import { BASE_URL } from "@/constants/routes";
import PostFormLayout from "@/components/posts/PostFormLayout";

export default function CreatePost() {
  const router = useRouter();
  const { user } = useAuthStore();

  const [imagePreview, setImagePreview] = useState<string | File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setFocus,
    reset,
  } = useForm<INewPost>({
    resolver: zodResolver(postSchema),
  });
  const { mutateAsync: createPost, isPending: isSaving } = useCreatePost();

  const onSubmit = async (data: INewPost) => {
    const formData = new FormData();
    formData.append("content", data.content);
    formData.append("userId", user?.uid || "");

    if (data.image) {
      formData.append("image", data.image);
    }

    await createPost(formData);
    alert("게시글 등록 성공!");
    reset();
    setImagePreview(null);
    router.push(BASE_URL);
  };

  const onError = () => {
    if (errors.content) {
      setFocus("content");
    }
  };

  return (
    <PostFormLayout
      title="새 게시물"
      onSubmit={handleSubmit(onSubmit, onError)}
      isSaving={isSaving}
      register={register}
      errors={errors}
      setValue={setValue}
      imagePreview={imagePreview}
      setImagePreview={setImagePreview}
    />
  );
}
