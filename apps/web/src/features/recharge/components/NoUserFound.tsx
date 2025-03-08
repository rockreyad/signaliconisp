import { FC } from "react";
import { UserCircle } from "@phosphor-icons/react";

export const NoUserFound: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-dark-2 rounded-lg shadow-sm">
      <UserCircle size={64} className="text-gray-400 mb-4" weight="thin" />
      <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
        কোনো গ্রাহক পাওয়া যায়নি
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-center">
        দয়া করে সঠিক ফোন নম্বর দিয়ে আবার চেষ্টা করুন
      </p>
    </div>
  );
};
