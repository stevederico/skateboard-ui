import { clsx, type ClassValue } from "./clsx.js";
import { twMerge } from "./tailwind-merge.js";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
