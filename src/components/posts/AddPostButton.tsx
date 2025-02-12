import Link from "next/link";
import { PlusCircledIcon } from "@radix-ui/react-icons";

export default function AddPostButton() {
  return (
    <Link href="/create-post" className="absolute right-5 -top-2">
      <PlusCircledIcon className="w-8 h-8 text-primary" />
    </Link>
  );
}
