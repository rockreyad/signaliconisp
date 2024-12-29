"use client";
import { useState } from "react";
import PlusIcon from "@/assets/icons/plus.svg";
import MinusIcon from "@/assets/icons/minus.svg";
import { motion, AnimatePresence } from "framer-motion";
const items = [
  {
    question: "অর্থপ্রদানের পদ্ধতি:",
    answer:
      " অর্থপ্রদান বিকাশ,নগদ, ব্যাঙ্ক ট্রান্সফার বা কোম্পানি দ্বারা সমর্থিত যেকোনো ডিজিটাল পেমেন্ট প্ল্যাটফর্মের মাধ্যমে করা যেতে পারে।",
  },
  {
    question: "মাসিক সাবস্ক্রিপশন ফি:",
    answer:
      " আদর্শ মাসিক সাবস্ক্রিপশন ফি হল ডিশ এর জন্য 100 টাকা প্রতি গ্রাহক, অগ্রিম প্রদেয়।",
  },
  {
    question: "বিলিং চক্র:",
    answer:
      " এটি মাসিক ভিত্তিতে গণনা করা হয়, পরিষেবা সক্রিয়করণের তারিখ থেকে শুরু করে। বিলিং চক্র শুরু হওয়ার 7 দিনের মধ্যে অর্থপ্রদান করতে হবে।",
  },
  {
    question: "রিষেবা সাসপেনশন: ",
    answer:
      "পনির্ধারিত তারিখের 15 দিনের মধ্যে অর্থ প্রদান না হলে পরিষেবাগুলি স্থগিত করা হতে পারে৷ ",
  },
  {
    question: "ফেরত নীতি: ",
    answer:
      "অর্থপ্রদানের পরে আংশিক মাস বা অব্যবহৃত পরিষেবাগুলির জন্য কোনও ফেরত দেওয়া হবে না।",
  },
  {
    question: "অ্যাকাউন্টের বন্ধ :",
    answer:
      " যে কোনও পক্ষ এক মাসের লিখিত বিজ্ঞপ্তি দিয়ে পরিষেবাটি বন্ধ করতে পারে। মাস শেষ হওয়ার আগে গ্রাহকের দ্বারা বন্ধের  অনুরোধ করা হলে অবশিষ্ট দিনগুলির জন্য কোন ফেরত প্রদান করা হবে না।",
  },
  {
    question: "রক্ষণাবেক্ষণের বাধা:",
    answer:
      "  রক্ষণাবেক্ষণ বা অপ্রত্যাশিত প্রযুক্তিগত সমস্যার কারণে পরিষেবা বাধার জন্য কোম্পানি দায়বদ্ধ নয়, তবে বাধাগুলি কমানোর জন্য প্রচেষ্টা করা হবে।",
  },
];

const AccordinationItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className=" border-b border-white/30 py-7"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center ">
        <span className="flex-1 text-lg font-bold">{question}</span>
        {isOpen ? <MinusIcon /> : <PlusIcon />}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: "16px" }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQs = () => {
  return (
    <div className="bg-black bg-gradient-to-b from-[#5D2CA8] to-black py-[72px] text-white sm:py-24 ">
      <div className="container">
        <h2 className="mx-auto text-center text-5xl tracking-tighter text-white sm:w-[648px] sm:text-6xl">
          ট্রামস এন্ড কন্ডিশন
        </h2>
        <div className="mx-auto mt-12 max-w-[648px]">
          {items.map(({ question, answer }) => (
            <AccordinationItem
              question={question}
              answer={answer}
              key={question}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
