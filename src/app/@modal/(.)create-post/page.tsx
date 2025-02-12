import CreatePostPage from "@/app/(afterLogin)/create-post/page";
import Modal from "@/components/common/Modal";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Page(props: any) {
  return (
    <Modal>
      <CreatePostPage {...props} />
    </Modal>
  );
}
