import { clsx } from "./clsx.js";
import { twMerge } from "./tailwind-merge.js";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
