import Modal from "@/components/common/Modal";
import ProfileEditPage from "@/app/(afterLogin)/profile/[nickname]/edit/page";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Page(props: any) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <Modal>
        <ProfileEditPage {...props} />
      </Modal>
    </div>
  );
}
