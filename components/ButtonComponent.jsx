"use client";

import { useState } from "react";
import Modal from "./Modal";
import { Button } from "./ui/button";

const ButtonComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);

  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <Button
          onClick={openModal}
          className="px-4 py-2 hover:bg-black bg-blue-500 text-white rounded"
        >
          Manage Inventory
        </Button>
      </div>
      {isOpen && <Modal openModal={isOpen} setOpenModal={setIsOpen} />}
    </div>
  );
};

export default ButtonComponent;
