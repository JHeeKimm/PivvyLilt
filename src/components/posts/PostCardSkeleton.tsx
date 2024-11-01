import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import UserImage from "../common/UserImage";
import { Button } from "../ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

export const PostCardSkeleton = () => (
  <Card className="animate-pulse grow min-w-80 max-w-lg bg-white shadow-md rounded-lg">
    <CardHeader className="p-4 flex flex-row items-center justify-between">
      <div className="flex items-center space-x-3">
        <UserImage profileImage="" size="sm" />
        <div>
          <CardTitle className="bg-gray-200" />
          <CardDescription className="bg-gray-200" />
        </div>
      </div>
      <Button variant="ghost" size="icon">
        <DotsHorizontalIcon className="h-6 w-6 text-gray-500" />
      </Button>
    </CardHeader>
    <CardContent className="p-0 bg-gray-200 relative min-h-48 max-h-80" />
    <CardContent className="p-4 bg-gray-200" />
    <CardFooter className="p-2 flex justify-between items-center">
      <Button variant="ghost" size="icon" />
      <Button variant="ghost" size="icon" />
      <Button variant="ghost" size="icon" />
    </CardFooter>
  </Card>
);
