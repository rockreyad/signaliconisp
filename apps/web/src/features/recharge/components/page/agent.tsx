"use client";

import { useState, useCallback } from "react";
import { RechargeHistory } from "../RechargeHistory";
import { ArrowLeft } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { RechargeForm, RechargeFormProps } from "../RechargeForm";

interface AgentRechargePageProps extends Pick<RechargeFormProps, "packages"> {}
const AgentRechargePage = ({ packages }: AgentRechargePageProps) => {
  const [showRechargeForm, setShowRechargeForm] = useState(false);
  const [key, setKey] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleShowRechargeForm = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setShowRechargeForm(true);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [isTransitioning]);

  const handleBack = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setShowRechargeForm(false);
    setTimeout(() => {
      setKey((prev) => prev + 1);
      setIsTransitioning(false);
    }, 300);
  }, [isTransitioning]);

  return (
    <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark">
      <div className="relative h-full">
        <div
          className={cn(
            "absolute left-0 top-0 z-10 transition-opacity duration-300",
            showRechargeForm ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
        >
          <button
            onClick={handleBack}
            disabled={isTransitioning}
            className={cn(
              "flex items-center gap-2 text-gray-600 transition-colors p-2 rounded-lg bg-gray-100 dark:bg-gray-600 dark:text-white",
              isTransitioning
                ? "opacity-50 cursor-not-allowed"
                : "hover:text-gray-800",
            )}
          >
            <ArrowLeft size={20} />
            <span>ফিরে যান</span>
          </button>
        </div>

        <div
          className={cn(
            "w-full transform transition-all duration-300 ease-in-out",
            showRechargeForm
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0 absolute",
          )}
        >
          <div className="pt-12">
            <RechargeForm packages={packages} />
          </div>
        </div>

        <div
          className={cn(
            "w-full transform transition-all duration-300 ease-in-out",
            showRechargeForm
              ? "translate-x-full opacity-0 absolute"
              : "translate-x-0 opacity-100",
          )}
        >
          <RechargeHistory key={key} onRechargeClick={handleShowRechargeForm} />
        </div>
      </div>
    </div>
  );
};

export default AgentRechargePage;
