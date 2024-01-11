import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 *
 * @param monthNum number that represents a month, eg 1 for January
 * @returns month name eg. January
 */
export function getMonthName(monthNum: number) {
  if (isNaN(monthNum) || monthNum > 12 || monthNum < 1) {
    throw new Error("Invalid month");
  }
  const newDate = new Date(2022, monthNum - 1, 1);
  return newDate.toLocaleString("default", { month: "long" });
}
