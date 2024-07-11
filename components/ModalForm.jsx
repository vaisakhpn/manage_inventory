"use client";
import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { formSchema } from "../lib/utils.js";

import { Button } from "@/components/ui/button";
import { Form } from "./ui/form";
import CustomInput from "./CustomInput";
import CustomSelectTag from "./CustomSelectTag";
import { Textarea } from "./ui/textarea";
import ModalSideBar from "./ModalSideBar.jsx";

const ModalForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  const [inputSets, setInputSets] = useState([
    { productName: "product1", quantityName: "quantity1" },
  ]);

  const addNewSet = () => {
    const newIndex = inputSets.length + 1;
    setInputSets([
      ...inputSets,
      {
        productName: `product${newIndex}`,
        quantityName: `quantity${newIndex}`,
      },
    ]);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex  w-full max-h-[600px]  flex-col justify-center gap-5 py-10">
      <h2 className="font-bold text-2xl pl-3 pt-3">Check In/Check Out</h2>
      <div className="p-2 flex gap-8 ">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex w-full max-w-[615px]">
                <CustomInput
                  name="admin"
                  label="Admin/ID"
                  placeholder="#ASDF43RFF"
                  control={form.control}
                />
              </div>
              <div className="flex">
                <div className="flex flex-col w-full max-w-[480px] ">
                  <div className="flex flex-row gap-3">
                    <div>
                      <CustomSelectTag
                        control={form.control}
                        name="product1"
                        label="Products"
                        placeholder="Motor PCB"
                      />
                    </div>
                    <div className="w-full">
                      <CustomInput
                        name="quantity1"
                        label="Quantity"
                        placeholder="12"
                        control={form.control}
                      />
                    </div>
                  </div>
                  <div className="flex flex-row gap-3">
                    <div>
                      <CustomSelectTag
                        control={form.control}
                        name="product2"
                        label=""
                        placeholder="Motor PCB"
                      />
                    </div>
                    <div className="w-full">
                      <CustomInput
                        name="quantity2"
                        label=""
                        placeholder="12"
                        control={form.control}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-2 items-end">
                  <div className="flex flex-col gap-2 mt-2">
                    <Button
                      type="submit"
                      className="bg-[#005AA0]  hover:bg-blue-950 h-12 rounded-xl text-white "
                    >
                      Serial Number
                    </Button>
                    <div className="flex flex-col justify-end">
                      <Button
                        type="submit"
                        className="bg-gray-300 h-12 hover:bg-blue-950 rounded-xl text-black font-bold "
                      >
                        Selected
                      </Button>
                      <Button
                        type="button"
                        onClick={addNewSet}
                        className="text-sm  flex p-2 justify-end font-bold text-blue-600 "
                      >
                        Add new
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full">
                <div className="w-full max-w-[310px] pr-2">
                  <CustomInput
                    name="usage"
                    label="Usage"
                    placeholder="In Milk Analyzer"
                    control={form.control}
                  />
                </div>
                <div className="flex w-full">
                  <CustomSelectTag
                    control={form.control}
                    name="reason"
                    label="Reason"
                    placeholder="Servicing"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full max-w-[615px]">
                <p className=" pl-2  text-sm text-gray-400 text-14  font-medium">
                  Description
                </p>
                <Textarea
                  placeholder="type test"
                  name="description"
                  className="text-16 w-full max-w-2xl border rounded-xl placeholder:text-16 border-gray-300 text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </form>
          </Form>
        </div>
        <div className="flex flex-col gap-4">
          <ModalSideBar />
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-[#005AA0] w-3/4 h-12  hover:bg-blue-950 rounded-xl text-white "
            >
              Check In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
