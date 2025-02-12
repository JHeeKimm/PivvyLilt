import { cn } from "@/lib/utils";
import Link from "next/link";

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  text: string;
}

export default function NavLink({ href, icon, text }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center space-x-2 p-2 hover:bg-secondary/60 rounded-lg"
      )}
    >
      <span className="text-xl">{icon}</span>
      <span>{text}</span>
    </Link>
  );
}
