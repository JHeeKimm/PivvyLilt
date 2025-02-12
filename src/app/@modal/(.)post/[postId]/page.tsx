import Modal from "@/components/common/Modal";
import PostDetailPage from "@/app/(afterLogin)/post/[postId]/page";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Page(props: any) {
  return (
    <Modal>
      <PostDetailPage {...props} />
    </Modal>
  );
}
