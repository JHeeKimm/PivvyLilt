import IconButton from "./IconButton";
import { CommentIcon } from "../icons/CommentIcon";

interface CommentButtonProps {
  count?: number;
}

export default function CommentButton({ count }: CommentButtonProps) {
  return <IconButton count={count} icon={<CommentIcon />} />;
}
