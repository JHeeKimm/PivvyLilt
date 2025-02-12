import Modal from "@/components/common/Modal";
import ProfileEditPage from "@/app/(afterLogin)/profile/[nickname]/edit/page";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Page(props: any) {
  return (
    <Modal>
      <ProfileEditPage {...props} />
    </Modal>
  );
}
