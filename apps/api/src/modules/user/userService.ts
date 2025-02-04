import { StatusCodes } from "http-status-codes";

import { ServiceResponse } from "@/common/models/serviceResponse";
import { userRepository } from "@/modules/user/userRepository";

import type { GetUser } from "./userModel";

const getUser = async (data: GetUser) => {
  const user = await userRepository.getUserById(data);

  // if (!user) {
  //   return ServiceResponse.failure(
  //     "User not found",
  //     null,
  //     StatusCodes.NOT_FOUND
  //   );
  // }

  return ServiceResponse.success(
    "User fetched successfully",
    user,
    StatusCodes.OK,
  );
};

const getUserProfile = async (data: GetUser) => {
  const user = await userRepository.getUserProfile(data);

  return ServiceResponse.success(
    "User profile fetched successfully",
    user,
    StatusCodes.OK,
  );
};

export const userService = {
  getUser,
  getUserProfile,
};
