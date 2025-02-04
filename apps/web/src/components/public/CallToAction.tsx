"use client";
// import HelixImage from "@/assets/images/helix2.png";
// import EmojiImage from "@/assets/images/emojistar.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const CallToAction = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <div className="bg-black py-[72px] text-white sm:py-24" ref={containerRef}>
      <div className="container relative max-w-xl">
        <motion.div style={{ translateY }}>
          {/* <Image
            src={HelixImage}
            alt="helix"
            className="absolute left-[calc(100%+36px)] top-6"
          /> */}
        </motion.div>
        <motion.div style={{ translateY }}>
          {/* <Image
            src={EmojiImage}
            alt="emoji"
            className="absolute -top-[120px] right-[calc(100%+30px)]"
          /> */}
        </motion.div>

        <h2 className="text-3xl font-bold tracking-tighter sm:text-6xl">
          Singla Icon
        </h2>
        <p className="mt-5 text-xl  text-white/70">
          ১৫০০ পরিবার আমাদের সাথে সংযুক্ত আছে তাই আজই আপনিও যুক্ত হউন ।
        </p>
      </div>
    </div>
  );
};
