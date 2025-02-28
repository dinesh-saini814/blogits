import Image from "next/image";
import React from "react";
import KindLogo from "@/public/logos/kinde.svg";
import VercelLogo from "@/public/logos/vercel.svg";
import NextJsLogo from "@/public/logos/nextjs.svg";

export function Logos() {
  return (
    <div className="py-10 ">
      <h2 className="text-center text-lg font-semibold leading-7 ">
        Trusted by the world&apos;s best companies and organizations.
      </h2>
      <div className="mt-10 grid max-w-lg mx-auto grid-cols-6 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:mx-0 lg:max-w-none lg:grid-cols-5">
        <Image
          src={KindLogo}
          alt="airbnb"
          className="col-span-2 max-h-8 w-full object-contain lg:col-span-1 dark:invert"
        />
        <Image
          src={VercelLogo}
          alt="airbnb"
          className="col-span-2 max-h-8 w-full object-contain lg:col-span-1 dark:invert"
        />
        <Image
          src={NextJsLogo}
          alt="airbnb"
          className="col-span-2 max-h-8 w-full object-contain lg:col-span-1 dark:invert"
        />
        <Image
          src={KindLogo}
          alt="airbnb"
          className="col-span-2 max-h-8 w-full object-contain lg:col-span-1 dark:invert"
        />
        <Image
          src={VercelLogo}
          alt="airbnb"
          className="col-span-2 max-h-8 w-full object-contain lg:col-span-1 dark:invert"
        />
        <Image
          src={NextJsLogo}
          alt="airbnb"
          className="col-span-2 max-h-8 w-full object-contain lg:col-span-1 dark:invert sm:hidden"
        />
      </div>
      {/* <div className="mt-10 grid max-w-lg mx-auto grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:mx-0 lg:max-w-none lg:grid-cols-5">
        <Image
          src={KindLogo}
          alt="airbnb"
          className="col-span-2 max-h-8 w-full object-contain lg:col-span-1 dark:invert"
        />
        <Image
          src={VercelLogo}
          alt="airbnb"
          className="col-span-2 max-h-8 w-full object-contain lg:col-span-1 dark:invert"
        />
        <Image
          src={NextJsLogo}
          alt="airbnb"
          className="col-span-2 max-h-8 w-full object-contain lg:col-span-1 dark:invert"
        />
        <Image
          src={KindLogo}
          alt="airbnb"
          className="col-span-2 max-h-8 w-full object-contain lg:col-span-1 dark:invert"
        />
        <Image
          src={VercelLogo}
          alt="airbnb"
          className="col-span-2 max-h-8 w-full object-contain lg:col-span-1 dark:invert"
        />
      </div> */}
    </div>
  );
}
