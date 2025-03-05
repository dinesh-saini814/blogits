"use client";
import Link from "next/link";
import React, { ReactNode } from "react";
import Logo from "@/public/logo.svg";
import Image from "next/image";
import DashboardItems from "../components/dashboard/DashboardItems";
import { LogOutIcon } from "lucide-react";
import { ThemeToggle } from "../components/dashboard/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className=" h-full max-h-screen flex-colum gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link
              href="/"
              className="flex items-center border-b px-4 gap-2 font-semibold"
            >
              <Image
                src={Logo}
                alt="logo"
                width={100}
                height={100}
                className="size-9 dark:invert"
              />
              <h3 className="text-2xl">blogit</h3>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 py-2 lg:py-4 font-medium lg:px-4 ">
              <DashboardItems />
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col ">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <div className="ml-auto flex items-center gap-x-5">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <LogOutIcon className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <SignOutButton>
                    <button>Sign Out</button>
                  </SignOutButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 flex-colum gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </section>
  );
};

export default DashboardLayout;
