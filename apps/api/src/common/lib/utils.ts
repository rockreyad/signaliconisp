import { logger } from "@/common/lib/logger";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { StatusCodes } from "http-status-codes";
import dayjs from "dayjs";

export const handleServiceError = (error: Error, operation: string) => {
  const message = `Error during ${operation.toLowerCase()}: ${error.message}`;
  logger.error(message);
  return ServiceResponse.failure(
    `An error occurred during ${operation.toLowerCase()}.`,
    null,
    StatusCodes.INTERNAL_SERVER_ERROR,
  );
};

const invoicePrefix = "INV";
/**
 * Generate a unique invoice number for a subscription
 * @param packageName - The name of the package
 * @param subscriptionId - The ID of the subscription
 * @returns The generated invoice number "INV-STD-1234-250125"
 *
 */
export const generateInvoice = ({
  packageName,
  subscriptionId,
}: {
  packageName: string;
  subscriptionId: string;
}): string => {
  // Get the last 4 digits of the subscription ID
  const subscriptionIdLast4 = subscriptionId.slice(-4);

  const shortPackageName = packageName
    .split(" ")[0]
    .substring(0, 3)
    .toUpperCase();

  // Construct the invoice number
  return `${invoicePrefix}-${shortPackageName}-${subscriptionIdLast4}-${dayjs().format("YYMMDD")}`;
};
