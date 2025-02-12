export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-inherit h-full">{children}</div>;
}
