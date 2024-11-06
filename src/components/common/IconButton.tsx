import { Button } from "../ui/button";

interface IconButtonProps {
  icon: React.ReactNode;
  count?: number;
  onClick?: () => void;
}

export default function IconButton({
  icon,
  count = 0,
  onClick,
}: IconButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      size="icon"
      className="text-gray-500 gap-1"
    >
      {icon}
      {count > 0 && <span className="text-sm text-gray-500">{count}</span>}
    </Button>
  );
}
