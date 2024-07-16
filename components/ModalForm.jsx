"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import {
  createFormSchemaForSets,
  generateNewDefaultValues,
  resetSingleRemainingSet,
} from "../lib/utils.js";
import { Button } from "@/components/ui/button";
import { Form } from "./ui/form";
import CustomInput from "./CustomInput";
import CustomSelectTag from "./CustomSelectTag";
import { Textarea } from "./ui/textarea";
import ModalSideBar from "./ModalSideBar.jsx";

import { useToast } from "@/components/ui/use-toast";
import { PiTrashSimpleFill } from "react-icons/pi";

const ModalForm = () => {
  const [loading, setLoading] = useState([]);

  const [inputSets, setInputSets] = useState([
    {
      productName: "product1",
      quantityName: "quantity1",
      usageName: "usage1",
      descriptionName: "description1",
    },
  ]);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(createFormSchemaForSets(inputSets.length)),
    defaultValues: {
      serialNumbers: inputSets.map(() => []),
    },
  });

  const { control, handleSubmit, setValue, getValues, watch, trigger, reset } =
    form;

  const addNewSet = () => {
    const newSetIndex = inputSets.length;
    setInputSets([
      ...inputSets,
      {
        productName: `product${newSetIndex}`,
        quantityName: `quantity${newSetIndex}`,
        usageName: `usage${newSetIndex}`,
        descriptionName: `description${newSetIndex}`,
      },
    ]);

    form.resolver = zodResolver(createFormSchemaForSets(newSetIndex + 1));
  };

  const handleSerialNumberClick = async (index) => {
    try {
      const isValid = await trigger([
        `product${index}`,
        `quantity${index}`,
        `usage${index}`,
        `reason${index}`,
        `description${index}`,
      ]);

      if (isValid) {
        setLoading((prevLoading) => {
          const newLoading = [...prevLoading];
          newLoading[index] = true;
          return newLoading;
        });
        const values = getValues();
        const quantity = values[`quantity${index}`];
        const product = values[`product${index}`];

        if (quantity && !isNaN(quantity)) {
          const existingSerialNumbers = JSON.parse(
            localStorage.getItem(product) || "[]"
          );

          const newSerialNumbers = Array.from(
            { length: parseInt(quantity) },
            (_, i) => ({
              id: existingSerialNumbers.length + i + 1,
              serialNumber: "",
            })
          );

          const serialNumbers = [...existingSerialNumbers, ...newSerialNumbers];

          setValue(`serialNumbers${index}`, serialNumbers);
          setLoading((prevLoading) => {
            const newLoading = [...prevLoading];
            newLoading[index] = false;
            return newLoading;
          });
        }
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const saveSerialNumbers = async (index) => {
    const isValid = await trigger(`serialNumbers${index}`);

    if (isValid) {
      setLoading((prevLoading) => {
        const newLoading = [...prevLoading];
        newLoading[index] = true;
        return newLoading;
      });
      const values = getValues();
      const product = values[`product${index}`];
      const serialNumbers = values[`serialNumbers${index}`];

      localStorage.setItem(product, JSON.stringify(serialNumbers));

      toast({
        title: "Success",
        description: "Serial numbers saved successfully!",
      });

      setLoading((prevLoading) => {
        const newLoading = [...prevLoading];
        newLoading[index] = true;
        return newLoading;
      });

      return true;
    } else {
      toast({
        title: "Error",
        description: "Serial number is repeated or not entered",
      });
      return false;
    }
  };

  const onSubmit = async (data) => {
    try {
      const products = inputSets.map((_, index) => {
        return {
          productName: data[`product${index}`],
          quantity: data[`quantity${index}`],
          usage: data[`usage${index}`],
          reason: data[`reason${index}`],
          description: data[`description${index}`],
          serialNumbers: data[`serialNumbers${index}`] || [],
        };
      });

      console.log(products);

      let allValid = true;
      for (let i = 0; i < inputSets.length; i++) {
        const result = await saveSerialNumbers(i);
        if (!result) {
          allValid = false;
        }
      }

      if (allValid) {
        toast({
          title: "Submitted",
          description: "Your form has been submitted successfully!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveProduct = (index) => {
    try {
      if (inputSets.length === 1) {
        return;
      } else {
        const newInputSets = inputSets.filter((_, i) => i !== index);
        setInputSets(newInputSets);
        const newSchema = createFormSchemaForSets(newInputSets.length);
        form.resolver = zodResolver(newSchema);
        const newDefaultValues = generateNewDefaultValues(
          form,
          newInputSets,
          index
        );
        reset(newDefaultValues);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="flex sm:flex-col  w-full max-h-[600px] flex-row justify-center gap-5 py-10">
      <div className="grid grid-cols-1 mt-2 max-h-screen">
        <h2 className="font-bold text-2xl pl-3 pt-5">Check In</h2>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {inputSets.map((set, index) => (
              <div
                key={index}
                className="flex sm:flex-row  flex-col  gap-8 border-b pb-4 mb-4"
              >
                <div>
                  <div className="w-full flex justify-end">
                    <div className="flex justify-end items-center w-1/6">
                      <Button
                        type="button"
                        className="bg-red-600 hover:bg-red-500 h-6 rounded-[6px] items-center"
                        onClick={() => handleRemoveProduct(index)}
                      >
                        <PiTrashSimpleFill className="text-white" />
                      </Button>
                      <Button
                        type="button"
                        className="text-sm w-full flex justify-end font-bold text-blue-600"
                        onClick={addNewSet}
                      >
                        Add new
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col w-full pb-3 max-w-[615px]">
                    <CustomInput
                      name={`admin${index}`}
                      label="Admin/ID"
                      placeholder="#ASDF43RFF"
                      control={form.control}
                    />
                  </div>
                  <div className="flex sm:flex-row flex-col ">
                    <div className="flex flex-col w-full max-w-[480px]">
                      <div className="flex sm:flex-row flex-col gap-3">
                        <div>
                          <CustomSelectTag
                            control={form.control}
                            name={`product${index}`}
                            label="Products"
                            placeholder="Select a product"
                          />
                        </div>
                        <div className="w-full">
                          <CustomInput
                            name={`quantity${index}`}
                            label="Quantity"
                            placeholder="12"
                            control={form.control}
                            type="number"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 ml-2 items-end">
                      <div className="flex flex-col gap-2 mt-2">
                        <Button
                          type="button"
                          disabled={loading[index]}
                          onClick={() => handleSerialNumberClick(index)}
                          className="bg-[#005AA0] hover:bg-blue-950 h-12 rounded-xl text-white"
                        >
                          Serial Number
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex sm:flex-row flex-col w-full mb-7 mt-7">
                    <div className="w-full max-w-[310px] pr-2">
                      <CustomInput
                        name={`usage${index}`}
                        label="Usage"
                        placeholder="In Milk Analyzer"
                        control={form.control}
                      />
                    </div>
                    <div className="flex w-full">
                      <CustomSelectTag
                        control={form.control}
                        name={`reason${index}`}
                        label="Reason"
                        placeholder="Select a reason"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 w-full max-w-[615px]">
                    <p className="pl-2 text-sm text-gray-400 text-14 font-medium">
                      Description
                    </p>
                    <Controller
                      control={form.control}
                      name={`description${index}`}
                      render={({ field }) => (
                        <Textarea
                          placeholder="Type a description"
                          className="text-16 w-full max-w-2xl border rounded-xl placeholder:text-16 border-gray-300 text-gray-900 placeholder:text-gray-400"
                          {...field}
                        />
                      )}
                    />
                  </div>
                </div>
                <div key={index} className="flex flex-col gap-4">
                  <ModalSideBar
                    control={control}
                    watch={watch}
                    index={index}
                    setValue={setValue}
                    saveSerialNumbers={saveSerialNumbers}
                    disabled={loading[index]}
                  />
                </div>
              </div>
            ))}
            <div className="flex justify-end gap-2">
              <Button
                type="submit"
                className="bg-[#005AA0] sm:w-3/12 w-5/12 h-12 text-white hover:bg-blue-950 rounded-xl"
              >
                Check In
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ModalForm;
