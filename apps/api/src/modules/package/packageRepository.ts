import { db } from "@repo/database";

const getPackages = async () => {
  const packages = await db.internetPackage.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      speed: "asc",
    },
  });

  return packages;
};

const getPackage = async (id: string) => {
  const package_ = await db.internetPackage.findUnique({
    where: { id },
  });
  return package_;
};

export const packageRepository = {
  getPackages,
  getPackage,
};
