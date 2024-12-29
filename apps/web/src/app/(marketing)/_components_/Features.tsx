import Bentodemo from "./bentrogrid";

export const Features = () => {
  return (
    <div className="bg-black py-[72px] text-white sm:py-24 ">
      <div className="container">
        <h2 className="text-center text-5xl font-bold tracking-tighter sm:text-6xl">
          নতুন সংযোগ একদম ফ্রি !!!{" "}
        </h2>
        <div className="mx-auto max-w-xl">
          <p className="mt-5 text-center text-xl text-white/70">
            এখন থেকে এলাকা: গুপিনাথপুর, পূর্ণগুপিনাথপুর, বারইল, হরিশর, হরিপুর,
            দুলালী, রত্নাহার এ ফ্রি সংযোগ। নতুন সংযোগ নিতে যোগাযোগ করুন
            ০১৭৬১৫০৩৯১৮ এই নম্বরে।
          </p>
        </div>
        <div className="mt-32 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Bentodemo />
        </div>
      </div>
    </div>
  );
};
