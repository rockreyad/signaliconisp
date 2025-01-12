import type { Request, RequestHandler, Response } from "express";
import { CreatePayment, GetPayment, GetPaymentById } from "./paymentModel";
import { handleServiceResponse } from "@/common/lib/httpHandlers";
import { paymentService } from "./paymentService";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { StatusCodes } from "http-status-codes";
import { bkashService } from "../bkash/bkashService";

const createPayment: RequestHandler = async (req: Request, res: Response) => {
  const data = req.body as CreatePayment;
  const serviceResponse = await paymentService.createPayment(data);
  handleServiceResponse(serviceResponse, res);
};

const bkashCallback: RequestHandler = async (req: Request, res: Response) => {
  const { status, paymentID } = req.query as {
    status: string;
    paymentID: string;
  };

  console.log(status, paymentID);
  if (!status) {
    handleServiceResponse(
      ServiceResponse.failure(
        "Status is required",
        null,
        StatusCodes.BAD_REQUEST,
      ),
      res,
    );
  }
  const serviceResponse = await bkashService.executeResponse(paymentID, status);
  if (serviceResponse?.redirectUrl) {
    res.redirect(serviceResponse.redirectUrl);
  } else {
    handleServiceResponse(
      ServiceResponse.failure(
        "Payment failed",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      ),
      res,
    );
  }
};

const getPayments: RequestHandler = async (req: Request, res: Response) => {
  const { userId, status } = req.query as GetPayment;
  const serviceResponse = await paymentService.getPayments({ userId, status });
  handleServiceResponse(serviceResponse, res);
};

const getPaymentById: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params as GetPaymentById;
  const serviceResponse = await paymentService.getPaymentById({ id });
  handleServiceResponse(serviceResponse, res);
};

export const paymentController: Record<string, RequestHandler> = {
  createPayment,
  bkashCallback,
  getPayments,
  getPaymentById,
};
