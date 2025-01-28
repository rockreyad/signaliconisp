import { apiRoutes } from "@/config";
import { api } from "@/lib/api";
import { Package } from "@repo/validation/package";

export const getAllPackages = async (): Promise<Package[] | null> => {
  const response = await api.get<Package[]>(apiRoutes.package.getAllPackages);

  return response.data;
};
