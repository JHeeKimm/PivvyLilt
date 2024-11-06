// import { LIKE_KEY } from "@/lib/likes/key";
// import { useAuthStore } from "@/store/auth/useAuthStore";
import IconButton from "./IconButton";
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";

interface LikeButtonProps {
  count?: number;
  isLiked: boolean;
  onClick: () => void;
}

export default function LikeButton({
  count,
  isLiked,
  onClick,
}: LikeButtonProps) {
  return (
    <IconButton
      count={count}
      onClick={onClick}
      icon={
        isLiked ? (
          <HeartFilledIcon className="h-5 w-5 text-red-500" />
        ) : (
          <HeartIcon className="h-5 w-5 text-red-500" />
        )
      }
    />
  );
}
