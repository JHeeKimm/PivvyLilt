import Link from "next/link";
import { PlusCircledIcon } from "@radix-ui/react-icons";

export default function AddPostButton() {
  return (
    <Link href="/newpost" className="absolute right-5 top-0">
      <PlusCircledIcon className="w-8 h-8" />
    </Link>
  );
}
