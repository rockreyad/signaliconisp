import { FC } from "react";

export const LoadingSkeleton: FC = () => {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col gap-6">
        <div className="h-[46px] w-[120px] self-end bg-gray-200 rounded-lg dark:bg-gray-700" />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-stroke p-4 dark:border-dark-3">
            <div className="h-6 w-32 bg-gray-200 mb-4 rounded dark:bg-gray-700" />
            <div className="space-y-3">
              <div className="h-4 w-3/4 bg-gray-200 rounded dark:bg-gray-700" />
              <div className="h-4 w-2/3 bg-gray-200 rounded dark:bg-gray-700" />
              <div className="h-4 w-1/2 bg-gray-200 rounded dark:bg-gray-700" />
            </div>
          </div>
          <div className="rounded-lg border border-stroke p-4 dark:border-dark-3">
            <div className="h-6 w-32 bg-gray-200 mb-4 rounded dark:bg-gray-700" />
            <div className="space-y-3">
              <div className="h-4 w-3/4 bg-gray-200 rounded dark:bg-gray-700" />
              <div className="h-4 w-2/3 bg-gray-200 rounded dark:bg-gray-700" />
              <div className="h-4 w-1/2 bg-gray-200 rounded dark:bg-gray-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
