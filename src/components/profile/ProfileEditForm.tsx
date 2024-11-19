"use client";

import { useEditProfile } from "@/lib/user/hooks/useEditProfile";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import UserImage from "../common/UserImage";

interface ProfileFormValues {
  bio?: string;
  profileImage?: File | string | null;
}

export default function ProfilEditForm() {
  const user = useAuthStore((state) => state.user);
  const userProfileImage = user?.profileImage;
  const userBio = user?.bio;
  const [imagePreview, setImagePreview] = useState<File | string | null>(
    userProfileImage || null
  );

  const { register, handleSubmit, setValue } = useForm<ProfileFormValues>({
    defaultValues: {
      bio: userBio,
      profileImage: userProfileImage,
    },
  });

  const { mutateAsync: editProfile, isPending: isSaving } = useEditProfile(
    user?.nickname as string
  );

  const onSubmit = async (data: ProfileFormValues) => {
    const formData = new FormData();

    // bio가 존재할 때만 추가
    if (data.bio !== undefined) {
      formData.append("bio", data.bio);
    }

    // 이미지 처리
    if (data.profileImage instanceof File) {
      // 새 이미지 파일만 추가
      formData.append("profileImage", data.profileImage);
    }

    await editProfile(formData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
      setValue("profileImage", file);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col min-w-80 w-full h-full rounded-lg shadow-md p-6 bg-white space-y-10"
    >
      <div className="relative flex justify-center">
        <label htmlFor="image-upload" className="cursor-pointer">
          <UserImage
            profileImage={
              typeof imagePreview === "string"
                ? imagePreview
                : imagePreview instanceof File
                ? URL.createObjectURL(imagePreview)
                : undefined
            }
            size="xl"
          />
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            {...register("profileImage")}
            onChange={handleImageChange}
          />
        </label>
        {imagePreview && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 left-1/3 text-white bg-black bg-opacity-50 rounded-full"
            onClick={() => setImagePreview(null)}
          >
            ✕
          </Button>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Bio</label>
        <textarea
          id="bio"
          {...register("bio")}
          placeholder="자기소개를 해주세요."
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <Button type="submit" className="w-auto px-4 py-1" disabled={isSaving}>
        {isSaving ? "저장 중..." : "저장"}
      </Button>
    </form>
  );
}
