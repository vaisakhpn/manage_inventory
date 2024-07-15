import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const createFormSchema = (numSets) => {
  const sets = {};
  for (let i = 0; i < numSets; i++) {
    sets[`admin${i}`] = z.string().min(1, "Admin/ID is required");
    sets[`product${i}`] = z.string().min(1, "Product is required");
    sets[`quantity${i}`] = z.preprocess(
      (val) => Number(val),
      z
        .number()
        .positive("Must be positive")
        .min(1, "Quantity must be at least 1")
    );
    sets[`serialNumbers${i}`] = z
      .array(
        z.object({
          id: z.number(),
          serialNumber: z.string().min(1, "Serial Number is required"),
        })
      )
      .min(1, "At least one serial number is required");
    sets[`usage${i}`] = z.string().min(1, "Usage is required");
    sets[`reason${i}`] = z.string().min(1, "Reason is required");
    sets[`description${i}`] = z.string().optional();
  }
  return z.object(sets);
};

export const createFormSchemaForSets = createFormSchema;

export const formSchema = createFormSchema(1);
