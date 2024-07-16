import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { product } from "@/data/product";

const CustomSelectTag = ({ control, name, label, placeholder, disabled }) => {
  const options = name.startsWith("product")
    ? product.products
    : product.reasons;
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
                  defaultValue={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger
                      disabled={disabled}
                      className="sm:w-[300px] w-[275px] text-16 placeholder:text-16 border-gray-300 text-gray-700"
                    >
                      <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="text-black">
                    {options.map((data) => (
                      <SelectItem key={data.id} value={data.value}>
                        {data.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-12 text-red-500" />
              </div>
            </FormItem>
          </div>
        )}
      />
    </div>
  );
};

export default CustomSelectTag;
