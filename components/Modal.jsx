"use client";

import ModalForm from "./ModalForm";
import ModalSideBar from "./ModalSideBar";
import { Dialog, DialogOverlay, DialogContent } from "./ui/dialog";
import { useRouter } from "next/navigation";

export default function Modal({ openModal, setOpenModal }) {
  const router = useRouter();

  const handleOpenChange = () => {
    const isUserFormModified = localStorage.getItem("userFormModified");
    if (isUserFormModified && JSON.parse(isUserFormModified)) {
      setShowExitConfirmation(true);
    } else {
      setOpenModal(false);
      router.back();
    }
  };

  return (
    <Dialog defaultOpen={true} open={openModal} onOpenChange={handleOpenChange}>
      <DialogOverlay>
        <DialogContent className="overflow-y-hidden w-full  max-w-5xl ">
          <ModalForm />
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
