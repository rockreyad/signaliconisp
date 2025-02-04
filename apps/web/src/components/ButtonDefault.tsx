import clsx from "clsx";
import Link from "next/link";
import React from "react";

interface ButtonPropTypes {
  label: string;
  link: string;
  customClasses: string;
  children?: React.ReactNode;
}

const ButtonDefault = ({
  label,
  link,
  customClasses,
  children,
}: ButtonPropTypes) => {
  return (
    <>
      <Link
        className={clsx(
          "inline-flex items-center justify-center gap-2.5 text-center font-medium hover:bg-opacity-90",
          customClasses,
        )}
        href={link}
      >
        {children}
        {label}
      </Link>
    </>
  );
};

export default ButtonDefault;
