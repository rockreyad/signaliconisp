import React from "react";
import LogoImage from "@/assets/icons/logo.svg";
import MenuIcon from "@/assets/icons/menu.svg";
import { Session } from "next-auth";

interface NavbarProps extends Partial<Session> {}

export const Navbar: React.FC<NavbarProps> = React.memo((props) => {
  const login = props?.user ? "ড্যাশবোর্ড" : "লগইন";
  const href = props?.user ? "/dashboard" : "/signin";
  return (
    <div className="bg-black">
      <div className="px-4">
        <div className="container bg-black">
          <div className="flex items-center justify-between py-4">
            <div className="relative">
              <div className="absolute bottom-0 top-2 w-full bg-[linear-gradient(to_right,#F7AABE,#B57CEC,#E472D1)] blur-md "></div>

              <LogoImage className="relative mt-1 h-12 w-12" />
            </div>
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white border-opacity-30 sm:hidden">
              <MenuIcon className="text-white" />
            </div>
            <nav className="hidden items-center gap-6 text-white sm:flex">
              {/* <a
                href="#"
                className="text-white text-opacity-60 transition hover:text-opacity-100"
              >
                About
              </a> */}
              <a
                href={href}
                className="rounded-lg bg-white px-4 py-2 text-black"
              >
                {login}
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
});

Navbar.displayName = "Navbar";
