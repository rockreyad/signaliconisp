import type { IconProps } from "@/types/global";
import { cn } from "@/lib/utils";

const MinusIcon = ({ className, ...props }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(className)}
      {...props}
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
};

export default MinusIcon;
