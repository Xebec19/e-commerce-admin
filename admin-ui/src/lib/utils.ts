import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const MAX_FILE_SIZE = 4 * 1024 * 1024;

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

export function getOrderStatusColor(status: string) {
  switch (status) {
    case "processing":
      return "text-yellow-500";

    case "confirmed":
      return "text-green-500";

    case "delivered":
      return "text-blue-500";

    case "cancelled":
      return "text-red-500";

    case "refunded":
      return "text-purple-500";

    default:
      return "text-gray-500";
  }
}
