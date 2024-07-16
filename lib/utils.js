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
      .min(1, "At least one serial number is required")
      .refine(
        (serialNumbers) => {
          const serialNumbersSet = new Set(
            serialNumbers.map((sn) => sn.serialNumber)
          );
          return serialNumbersSet.size === serialNumbers.length;
        },
        {
          message: "Serial numbers must be unique",
        }
      );
    sets[`usage${i}`] = z.string().min(1, "Usage is required");
    sets[`reason${i}`] = z.string().min(1, "Reason is required");
    sets[`description${i}`] = z.string().optional();
  }
  return z.object(sets);
};
export const generateNewDefaultValues = (form, newInputSets, index) => {
  return newInputSets.reduce((acc, set, idx) => {
    acc[`admin${idx}`] = form.getValues(`admin${idx >= index ? idx + 1 : idx}`);
    acc[`product${idx}`] = form.getValues(
      `product${idx >= index ? idx + 1 : idx}`
    );
    acc[`quantity${idx}`] = form.getValues(
      `quantity${idx >= index ? idx + 1 : idx}`
    );
    acc[`serialNumbers${idx}`] = form.getValues(
      `serialNumbers${idx >= index ? idx + 1 : idx}`
    );
    acc[`usage${idx}`] = form.getValues(`usage${idx >= index ? idx + 1 : idx}`);
    acc[`reason${idx}`] = form.getValues(
      `reason${idx >= index ? idx + 1 : idx}`
    );
    acc[`description${idx}`] = form.getValues(
      `description${idx >= index ? idx + 1 : idx}`
    );
    return acc;
  }, {});
};

export const createFormSchemaForSets = createFormSchema;

export const formSchema = createFormSchema(1);
