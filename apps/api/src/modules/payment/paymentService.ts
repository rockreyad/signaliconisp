import { ServiceResponse } from "@/common/models/serviceResponse";
import { StatusCodes } from "http-status-codes";
import { CreatePayment, GetPayment, GetPaymentById } from "./paymentModel";
import { paymentRepository } from "./paymentRepository";

const createPayment = async (data: CreatePayment) => {
  const payment = await paymentRepository.createPayment(data);
  return ServiceResponse.success(
    "Payment created successfully",
    payment,
    StatusCodes.CREATED,
  );
};

const getPayments = async (data: GetPayment) => {
  const payments = await paymentRepository.getPayments(data);
  return ServiceResponse.success(
    "Payments fetched successfully",
    payments,
    StatusCodes.OK,
  );
};

const getPaymentById = async (data: GetPaymentById) => {
  const payment = await paymentRepository.getPayment(data.id);
  return ServiceResponse.success(
    "Payment fetched successfully",
    payment,
    StatusCodes.OK,
  );
};

export const paymentService = {
  createPayment,
  getPayments,
  getPaymentById,
};
