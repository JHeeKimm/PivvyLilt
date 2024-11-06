import IconButton from "./IconButton";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

interface DotMenuButtonProps {
  onClick: () => void;
}

export default function DotMenuButton({ onClick }: DotMenuButtonProps) {
  return (
    <IconButton
      onClick={onClick}
      icon={<DotsHorizontalIcon className="h-6 w-6 text-gray-500" />}
    />
  );
}
