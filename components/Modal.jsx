"use client";

import ModalForm from "./ModalForm";
import { Dialog, DialogOverlay, DialogContent } from "./ui/dialog";
import { useRouter } from "next/navigation";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
        <DialogContent className=" overflow-y-auto   w-full max-h-screen  max-w-5xl ">
          <ScrollArea className=" rounded-md   p-4">
            <ModalForm />
          </ScrollArea>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
