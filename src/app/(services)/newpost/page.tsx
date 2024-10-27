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

export default function NewPostPage() {
  return (
    <Card className="bg-white p-6 rounded-lg w-96 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-center">새 게시글 작성</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          {/* <Label htmlFor="image-upload" className="block mb-2">
            이미지 업로드
          </Label> */}
          <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              //   onChange={handleImageUpload}
            />
            {/* {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <label htmlFor="image-upload" className="flex flex-col items-center justify-center">
                    <ImagePlus className="w-8 h-8 text-gray-400" />
                    <span className="mt-2 text-sm text-gray-500">이미지를 선택하세요</span>
                  </label>
                )} */}
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center"
            >
              <ImagePlus className="w-8 h-8 text-gray-400" />
              <span className="mt-2 text-sm text-gray-500">
                이미지를 선택하세요
              </span>
            </label>
          </div>
        </div>
        <div>
          <Label htmlFor="title" className="block mb-2">
            제목
          </Label>
          <Input id="title" placeholder="게시글 제목을 입력하세요" />
        </div>
        <div>
          <Label htmlFor="content" className="block mb-2">
            내용
          </Label>
          <Input id="content" placeholder="게시글 내용을 입력하세요" />
        </div>
      </CardContent>
      <CardFooter className="gap-3">
        <Button
          variant="secondary"
          className="w-full text-black bg-white border border-black"
        >
          취소
        </Button>
        <Button className="w-full">게시글 등록</Button>
      </CardFooter>
    </Card>
  );
}
