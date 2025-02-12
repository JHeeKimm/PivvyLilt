import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImagePlus } from "lucide-react";
import { useForm, UseFormRegister, UseFormSetValue } from "react-hook-form";
import Image from "next/image";
import { INewPost } from "@/lib/posts/types";
import { ErrorMessage } from "@/components/common/ErrorMessage";

interface PostFormProps {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isSaving: boolean;
  title: string;
  register: UseFormRegister<INewPost>;
  setValue: UseFormSetValue<INewPost>;
  errors: ReturnType<typeof useForm>["formState"]["errors"];
  imagePreview: File | string | null;
  setImagePreview: React.Dispatch<React.SetStateAction<string | File | null>>;
}

export default function PostFormLayout({
  onSubmit,
  isSaving,
  title,
  register,
  errors,
  setValue,
  imagePreview,
  setImagePreview,
}: PostFormProps) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
      setValue("image", file);
    }
  };

  return (
    <Card className="flex flex-col min-h-96 min-w-80 w-full h-full rounded-lg shadow-md p-4 bg-white space-y-4">
      <form
        onSubmit={onSubmit}
        className="flex flex-col h-full justify-between"
      >
        <CardHeader className="p-0">
          <CardTitle className="p-2 border-b text-xl text-gray-800 text-center">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col p-0 mt-4 space-y-4">
          <textarea
            id="content"
            {...register("content")}
            placeholder="내용을 입력해주세요."
            className="w-full p-2 border-gray-200 focus:outline-none resize-none"
            rows={2}
          />
          {errors.content && (
            <ErrorMessage
              message={errors.content.message as string}
            ></ErrorMessage>
          )}
          <div className="relative min-h-48">
            {imagePreview && (
              <>
                {" "}
                <Image
                  src={
                    typeof imagePreview === "string"
                      ? imagePreview
                      : URL.createObjectURL(imagePreview)
                  }
                  alt="Preview"
                  width={500}
                  height={280}
                  className="rounded-lg object-contain max-h-[280px]"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 left-2 text-white bg-black bg-opacity-50 rounded-full"
                  onClick={() => setImagePreview(null)}
                >
                  ✕
                </Button>
              </>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-0 mt-4 gap-8 justify-between">
          <div>
            <label htmlFor="image-upload">
              <ImagePlus className="w-8 h-8 text-gray-400 cursor-pointer" />
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                {...register("image")}
                onChange={handleImageChange}
              />
            </label>
            {errors.image && (
              <ErrorMessage
                message={errors.image.message as string}
              ></ErrorMessage>
            )}
          </div>
          <Button
            type="submit"
            className="w-auto px-4 py-1"
            disabled={isSaving}
          >
            {isSaving ? "저장 중..." : "저장"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
