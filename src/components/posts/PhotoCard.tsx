import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

export default function PhotoCard({
  postId,
  imageUrl,
  priority,
}: {
  postId: string;
  imageUrl: string;
  priority: boolean;
}) {
  return (
    <Card className="grow max-w-sm bg-white shadow-md rounded-lg">
      <Link href={`/post/${postId}`}>
        <CardContent className="p-0 bg-gray-200 relative min-h-48 max-h-80">
          <Image
            src={imageUrl || ""}
            alt="Post Image"
            fill={true}
            style={{ objectFit: "cover", objectPosition: "center" }}
            placeholder="blur"
            blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsrKmpBwAE2QHyUe82OwAAAABJRU5ErkJggg=="
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
          />
        </CardContent>
      </Link>
    </Card>
  );
}
