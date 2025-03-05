import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { ThemeToggle } from "../dashboard/ThemeToggle";
import Image from "next/image";
import Logo from "@/public/logo.svg";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default async function NavBar() {
  return (
    <div className="relative flex flex-col w-full py-5 mx-auto md:flex-row md:items-center md:justify-between">
      <div className="flex flex-row items-center justify-between text-sm lg:justify-start">
        <Link href={"/"} className="flex items-center gap-2">
          <Image
            src={Logo}
            alt="logo"
            className="size-10  dark:invert"
            // width={40}
            // height={40}
          />
          <h4 className="text-3xl font-semibold">Blogit</h4>
        </Link>
        <div className="md:hidden ">
          <ThemeToggle />
        </div>
      </div>
      <nav className="hidden md:flex md:justify-end md:space-x-4 ">
        <ThemeToggle />
        {/* Redirecting to /api/auth/creation before /dashboard */}
        <SignInButton
          signUpForceRedirectUrl={"/api/auth/creation"}
          mode="modal"
        >
          <Button variant="secondary">Sign in</Button>
        </SignInButton>
        <SignUpButton
          signInForceRedirectUrl={"/api/auth/creation"}
          mode="modal"
        >
          <Button>Sign up</Button>
        </SignUpButton>
      </nav>
    </div>
  );
}
