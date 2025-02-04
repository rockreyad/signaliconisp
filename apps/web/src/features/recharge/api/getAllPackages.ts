import type { Package } from "@repo/validation/package";

import { apiRoutes } from "@/config";
import { api } from "@/lib/api";

export const getAllPackages = async (): Promise<Package[] | null> => {
  const response = await api.get<Package[]>(apiRoutes.package.getAllPackages);

  return response.data;
};
