import React from "react";
import { Button } from "./ui/button";
import { PiTrashSimpleFill } from "react-icons/pi";
import { useFieldArray, Controller } from "react-hook-form";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ModalSideBar = ({ control, index }) => {
  const { fields, remove } = useFieldArray({
    control,
    name: `serialNumbers${index}`,
  });

  const handleRemoveSerialNumber = (id) => {
    remove(id);
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center pb-2">
        <p className="text-xs font-bold ">Serial numbers</p>
      </div>
      <div className="border  sm:w-[300px] w-[275px] sm:h-[430px] h-[350px] overflow-y-auto">
        <Table>
          <TableCaption>Serial numbers</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>Serial Number</TableHead>
              <TableHead className="text-right">Remove</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((item, idx) => (
              <TableRow key={item.id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>
                  <Controller
                    name={`serialNumbers${index}[${idx}].serialNumber`}
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="w-full border pl-2"
                        placeholder="Serial Number"
                      />
                    )}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    type="button"
                    className="bg-red-600 hover:bg-red-500 h-6 rounded-[6px] items-center"
                    onClick={() => handleRemoveSerialNumber(idx)}
                  >
                    <PiTrashSimpleFill className="text-white" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ModalSideBar;
