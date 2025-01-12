import type { Response } from "express";
import { ZodError, ZodSchema } from "zod";
import { RequestHandler } from "express";

import { ServiceResponse } from "@/common/models/serviceResponse";

export const handleServiceResponse = (
  serviceResponse: ServiceResponse<any>,
  response: Response,
) => {
  return response.status(serviceResponse.statusCode).send(serviceResponse);
};

export const validateRequest = (schema: ZodSchema): RequestHandler => {
  return (req, res, next) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json(error.issues);
        return;
      }
      res.status(500).json({ error });
    }
  };
};
