import { cn } from "@/lib/utils";

interface LogoProps {
  withBorder?: boolean;
  className?: string;
}

export default function Logo({ className, withBorder = false }: LogoProps) {
  return (
    <div
      className={cn(
        `min-w-80 text-2xl font-bold ${
          withBorder ? "border-b" : "md:min-w-0 md:bg-gray-600  md:text-white"
        }`,
        className
      )}
    >
      PivvyLilt
    </div>
  );
}
