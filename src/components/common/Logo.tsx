interface LogoProps {
  withBorder?: boolean;
}

export default function Logo({ withBorder = false }: LogoProps) {
  return (
    <div
      className={`p-4 min-w-80 text-lg font-bold ${
        withBorder ? "border-b" : "md:min-w-0 md:bg-gray-600  md:text-white"
      }`}
    >
      PivvyLilt
    </div>
  );
}
