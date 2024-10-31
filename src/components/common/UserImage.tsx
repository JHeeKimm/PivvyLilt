import Image from "next/image";
import { CircleUserIcon } from "./icons/UserIcon";

interface UserImageProps {
  profileImage?: string;
  size?: "sm" | "lg";
}

export default function UserImage({ profileImage, size }: UserImageProps) {
  const dimensions = size === "sm" ? 40 : 80;
  const borderWidth = size === "sm" ? "border-2" : "border-4";
  return profileImage ? (
    <Image
      src={profileImage}
      alt="User profileImage"
      width={dimensions}
      height={dimensions}
      className="rounded-full"
    />
  ) : (
    <CircleUserIcon
      width={dimensions}
      height={dimensions}
      className={borderWidth}
    />
  );
}
