import CreatePostPage from "@/app/(afterLogin)/create-post/page";
import Modal from "@/components/common/Modal";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Page(props: any) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <Modal>
        <CreatePostPage {...props} />
      </Modal>
    </div>
  );
}
