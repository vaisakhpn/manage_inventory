import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CustomSelectTag = ({ control, name, label, placeholder }) => {
  return (
    <div>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <div className="flex flex-col gap-1.5 w-full">
            <FormItem className="relative flex flex-col w-full">
              <FormLabel className="absolute -top-0.5 bg-slate-50 left-4 px-1 text-sm font-medium text-gray-700">
                {label}
              </FormLabel>
              <div className="flex w-full flex-col">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-[300px] text-16 placeholder:text-16  border-gray-300 text-gray-400  ">
                      <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Motor PCB">Motor PCB</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage className=" text-12 text-red-500" />
              </div>
            </FormItem>
          </div>
        )}
      />
    </div>
  );
};

export default CustomSelectTag;
