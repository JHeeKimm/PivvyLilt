import Modal from "@/components/common/Modal";
import PostDetailPage from "@/app/(services)/post/[postId]/page";

export default function Page(props: any) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <Modal>
        <PostDetailPage {...props} />
      </Modal>
    </div>
  );
}
