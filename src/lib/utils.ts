import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const QUERY_KEYS = {
  PRODUTOS: {
    LIST: "produtos-list",
  },
};
