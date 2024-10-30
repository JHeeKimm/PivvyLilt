"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImagePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
// import { useRouter } from "next/navigation";
import { useState } from "react";
import { INewPost } from "@/lib/posts/types";
import { EditPostFormProps } from "@/lib/posts/types";
import { postSchema } from "@/lib/posts/schema";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { useEditPost } from "@/lib/posts/hooks/useEditPost";

export default function EditPostForm({ post, onCancel }: EditPostFormProps) {
  // const router = useRouter();
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
      title: post.title,
      content: post.content,
      image: post.imageUrl,
    },
  });

  const { mutateAsync: savePost, isPending: isSaving } = useEditPost(post.id);

  const handleFormSubmit = async (data: INewPost) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("updatedAt", new Date().toLocaleString());

    // 이미지를 변경하지 않았을 때 기존 이미지를 유지
    if (typeof imagePreview === "string") {
      formData.append("imageUrl", imagePreview);
    }

    // 새 이미지 파일이 있을 때 추가
    if (data.image) {
      formData.append("image", data.image);
    }

    await savePost(formData);

    // stopEditing 수정 모드 종료
    onCancel();
  };

  const onError = () => {
    if (errors.title) {
      setFocus("title");
    } else if (errors.content) {
      setFocus("content");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("file", file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setValue("image", file);
    }
  };

  return (
    <Card className="bg-white p-6 rounded-lg shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-center">게시글 수정</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(handleFormSubmit, onError)}>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-center w-full border-2 border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                {...register("image")}
                onChange={handleImageChange}
              />
              <label htmlFor="image-upload" className="h-52">
                {typeof imagePreview === "string" ? (
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={336}
                    height={180}
                    className="h-full object-contain"
                  />
                ) : (
                  <>
                    <ImagePlus className="w-8 h-8 text-gray-400" />
                    <span className="mt-2 text-sm text-gray-500">
                      이미지를 선택하세요
                    </span>
                  </>
                )}
              </label>
            </div>
            {errors.image && (
              <ErrorMessage message={errors.image.message as string} />
            )}
          </div>
          <div>
            <Label htmlFor="title" className="block mb-2">
              제목
            </Label>
            <Input
              id="title"
              placeholder="게시글 제목을 입력하세요"
              {...register("title")}
            />
            {errors.title && (
              <ErrorMessage message={errors.title.message as string} />
            )}
          </div>
          <div>
            <Label htmlFor="content" className="block mb-2">
              내용
            </Label>
            <Input
              id="content"
              placeholder="게시글 내용을 입력하세요"
              {...register("content")}
            />
            {errors.content && (
              <ErrorMessage message={errors.content.message as string} />
            )}
          </div>
        </CardContent>
        <CardFooter className="gap-3">
          <Button
            type="button"
            variant="secondary"
            className="w-full text-black bg-white border border-black"
            disabled={isSaving}
            onClick={() => onCancel()}
          >
            취소
          </Button>
          <Button type="submit" className="w-full" disabled={isSaving}>
            {isSaving ? "저장 중..." : "저장"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
