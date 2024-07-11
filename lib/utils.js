import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formSchema = z.object({
  admin: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  product1: z.string().min(2, {
    message: "Product must be specified.",
  }),
  quantity1: z.string().min(1, {
    message: "Quantity must be specified.",
  }),
  product2: z.string().min(2, {
    message: "Product must be specified.",
  }),
  quantity2: z.string().min(1, {
    message: "Quantity must be specified.",
  }),
  usage: z.string().min(2, {
    message: "Usage must be specified.",
  }),
  reason: z.string().min(2, {
    message: "Reason must be specified.",
  }),
  description: z.string().min(10, {
    message: "Description must be specified.",
  }),
});
