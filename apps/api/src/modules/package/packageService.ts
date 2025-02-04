import { StatusCodes } from "http-status-codes";

import { ServiceResponse } from "@/common/models/serviceResponse";
import { packageRepository } from "@/modules/package/packageRepository";

const getPackages = async () => {
  const packages = await packageRepository.getPackages();
  return ServiceResponse.success(
    "Packages fetched successfully",
    packages,
    StatusCodes.OK,
  );
};

const getPackage = async (id: string) => {
  const package_ = await packageRepository.getPackage(id);
  if (!package_) {
    return ServiceResponse.failure(
      "Package not found",
      null,
      StatusCodes.NOT_FOUND,
    );
  }

  return ServiceResponse.success(
    "Package fetched successfully",
    package_,
    StatusCodes.OK,
  );
};

export const packageService = {
  getPackages,
  getPackage,
};
