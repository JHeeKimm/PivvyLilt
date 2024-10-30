import NewPostPage from "@/app/(services)/newpost/page";
import Modal from "@/components/common/Modal";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Page(props: any) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <Modal>
        <NewPostPage {...props} />
      </Modal>
    </div>
  );
}
