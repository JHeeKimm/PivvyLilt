import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

export default function PhotoCard({
  postId,
  imageUrl,
}: {
  postId: string;
  imageUrl: string;
}) {
  return (
    <Card className="grow min-w-80 max-w-lg bg-white shadow-md rounded-lg">
      <Link href={`/post/${postId}`}>
        <CardContent className="p-0 bg-gray-200 relative min-h-48 max-h-80">
          <Image
            src={imageUrl || ""}
            alt="Post Image"
            fill={true}
            style={{ objectFit: "cover" }}
          />
        </CardContent>
      </Link>
    </Card>
  );
}
