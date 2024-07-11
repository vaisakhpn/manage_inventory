import React from "react";
import { Button } from "./ui/button";
import { PiTrashSimpleFill } from "react-icons/pi";

const ModalSideBar = () => {
  return (
    <div>
      <div className="flex flex-row justify-between items-center pb-2">
        <p className="text-xs font-bold ">Serial numbers of Motor PCB</p>
        <div className="flex gap-2">
          <Button className="bg-blue-950 hover:bg-blue-900 text-white text-xl font-light h-6 rounded-[6px] items-center">
            +
          </Button>
          <Button className="bg-red-600  hover:bg-red-500 h-6 rounded-[6px] items-center">
            <PiTrashSimpleFill className="text-white " />
          </Button>
        </div>
      </div>
      <div className="border w-[300px] h-[430px]"></div>
    </div>
  );
};

export default ModalSideBar;
