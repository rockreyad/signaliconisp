import { type ClassValue, clsx } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date in Bengali locale
 * @param date - The date to format
 * @returns The formatted date string
 */
export function formatBnDate(date: string) {
  return dayjs(date).locale("bn").format("DD MMM YYYY");
}
