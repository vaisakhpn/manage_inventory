import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const CustomInput = ({
  control,
  name,
  placeholder,
  label,
  disabled,
  type = "text",
}) => {
  return (
    <div className="w-full">
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <div className="flex flex-col  gap-1.5">
            <FormItem className="relative flex flex-col">
              <FormLabel className=" absolute -top-0.5 bg-slate-50 left-4 px-1 text-sm text-gray-700 text-14  font-medium ">
                {label}
              </FormLabel>
              <div className="flex flex-col pb-2">
                <FormControl>
                  <Input
                    placeholder={placeholder}
                    disabled={disabled}
                    type={type}
                    className="text-16 placeholder:text-16 border-gray-300 text-gray-900 placeholder:text-gray-400"
                    {...field}
                  />
                </FormControl>

                <FormMessage className=" text-12 text-red-500" />
              </div>
            </FormItem>
          </div>
        )}
      />
    </div>
  );
};

export default CustomInput;
