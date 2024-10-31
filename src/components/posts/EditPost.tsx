"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { INewPost } from "@/lib/posts/types";
import { EditPostFormProps } from "@/lib/posts/types";
import { postSchema } from "@/lib/posts/schema";
import { useEditPost } from "@/lib/posts/hooks/useEditPost";
import PostFormLayout from "./PostFormLayout";

export default function EditPost({ post, onCancel }: EditPostFormProps) {
  const [imagePreview, setImagePreview] = useState<File | string | null>(
    post.imageUrl || null
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setFocus,
  } = useForm<INewPost>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: post.content,
      image: post.imageUrl,
    },
  });

  const { mutateAsync: editPost, isPending: isSaving } = useEditPost(post.id);

  const onSubmit = async (data: INewPost) => {
    const formData = new FormData();
    formData.append("content", data.content);

    // 이미지를 변경하지 않았을 때 기존 이미지를 유지
    if (typeof imagePreview === "string") {
      formData.append("imageUrl", imagePreview);
    }

    // 새 이미지 파일이 있을 때 추가
    if (data.image) {
      formData.append("image", data.image);
    }

    await editPost(formData);

    // stopEditing 수정 모드 종료
    onCancel();
  };

  const onError = () => {
    if (errors.content) {
      setFocus("content");
    }
  };

  return (
    <PostFormLayout
      title="게시물 수정"
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
