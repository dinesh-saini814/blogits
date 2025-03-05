"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "./navLinks";

const DashboardItems = () => {
  const pathName = usePathname();
  return (
    <>
      {navLinks.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={cn(
            pathName === item.href
              ? "bg-muted text-primary"
              : "text-muted-foreground bg-none",
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary/70"
          )}
        >
          <item.icon className="size-4" />
          {item.name}
        </Link>
      ))}
    </>
  );
};

export default DashboardItems;
