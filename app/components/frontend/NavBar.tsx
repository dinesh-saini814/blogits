import { Button } from "@/components/ui/button";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import React from "react";
import { ThemeToggle } from "../dashboard/ThemeToggle";
import Image from "next/image";
import Logo from "@/public/logo.png";

export default async function NavBar() {
  return (
    <div className="relative flex flex-col w-full py-5 mx-auto md:flex-row md:items-center md:justify-between">
      <div className="flex flex-row items-center justify-between text-sm lg:justify-start">
        <Link href={"/"} className="flex items-center gap-2">
          <Image
            src={Logo}
            alt="logo"
            className="size-10"
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
        <LoginLink>
          <Button variant={"secondary"}>Sign in</Button>
        </LoginLink>
        <RegisterLink>
          <Button>Sign up</Button>
        </RegisterLink>
      </nav>
    </div>
  );
}
