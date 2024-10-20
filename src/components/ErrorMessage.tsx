type Props = {
  message: string;
};
export function ErrorMessage({ message }: Props) {
  return <p className="text-sm text-red-600 ml-1 mt-1">{message}</p>;
}
