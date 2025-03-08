import React, { FC } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";

interface SearchFormProps {
  search: string;
  onSearchChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
}

export const SearchForm: FC<SearchFormProps> = ({
  search,
  onSearchChange,
  onSubmit,
  isLoading = false,
}) => {
  return (
    <div className="border-b border-stroke pb-6 dark:border-dark-3">
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:gap-6">
          <div className="flex-1">
            <label
              htmlFor="phoneNumber"
              className="mb-2.5 block font-medium text-dark dark:text-white"
            >
              গ্রাহকের ফোন নম্বর
            </label>
            <div className="relative">
              <input
                type="text"
                id="phoneNumber"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="গ্রাহকের ফোন নম্বর লিখুন"
                className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                disabled={isLoading}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2">
                <MagnifyingGlass size={20} className="text-gray-500" />
              </span>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-gray-600 text-white rounded-lg px-6 py-[15px] hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "অপেক্ষা করুন..." : "খুঁজুন"}
          </button>
        </div>
      </form>
    </div>
  );
};
