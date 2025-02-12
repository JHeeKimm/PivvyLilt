import { cn } from "@/lib/utils";

interface LogoProps {
  withBorder?: boolean;
  className?: string;
}

export default function Logo({ className, withBorder = false }: LogoProps) {
  return (
    <div
      className={cn(
        `w-64 text-2xl font-bold ${
          withBorder
            ? "w-full border-b"
            : "md:min-w-0 md:bg-primary md:text-white"
        }`,
        className
      )}
    >
      PivvyLilt
    </div>
  );
}
