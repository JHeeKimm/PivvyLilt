import { useState } from "react";
import { Button } from "../ui/button";
import IconButton from "./IconButton";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useFollowMutation } from "@/lib/follows/hooks/useFollowMutation";
import { useIsFollowingQuery } from "@/lib/follows/hooks/useIsFollowingQuery";
import { useOutsideClick } from "@/hooks/useOutsideClick";

interface DotMenuButtonProps {
  followerId: string;
  followingId: string;
}

export default function DotMenuButton({
  followerId,
  followingId,
}: DotMenuButtonProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useOutsideClick(() => {
    setIsMenuOpen(false);
  });

  const { data: isFollowingState, isLoading } = useIsFollowingQuery(
    followerId,
    followingId
  );
  const { mutateAsync: followMutation } = useFollowMutation(
    followerId,
    followingId,
    isFollowingState as boolean
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleFollow = async () => {
    await followMutation();
    setIsMenuOpen(false);
    console.log("handleFollow clicked");
  };
  return (
    <div className="relative text-center" ref={menuRef}>
      <IconButton
        onClick={toggleMenu}
        icon={<DotsHorizontalIcon className="h-6 w-6 text-gray-500" />}
      />

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-24 bg-white border rounded shadow-lg z-10">
          <Button
            className="w-full"
            variant="ghost"
            onClick={handleFollow}
            disabled={isLoading}
          >
            {isFollowingState ? "UnFollow" : "Follow"}
          </Button>
          <Button className="w-full" variant="ghost">
            Chat
          </Button>
        </div>
      )}
    </div>
  );
}
