"use client";
import InstaIcon from "@/assets/icons/insta.svg";
import XIcon from "@/assets/icons/x-social.svg";
import LinkedInIcon from "@/assets/icons/linkedin.svg";
import YoutubeIcon from "@/assets/icons/youtube.svg";
import dayjs from "dayjs";

export const Footer = () => {
  const year = dayjs().format("YYYY");
  return (
    <footer className="border-t border-white/20 bg-black py-5 text-white/60">
      <div className="container">
        <div className="flex flex-col gap-5 sm:flex-row sm:justify-between">
          <div className="text-center">
            {year} Signal Icon All rights are reserved
          </div>
          <ul className="flex justify-center gap-2.5">
            <li>
              <XIcon />
            </li>
            <li>
              <LinkedInIcon />
            </li>
            <li>
              <InstaIcon />
            </li>
            <li>
              <YoutubeIcon />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
