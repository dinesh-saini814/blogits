import prisma from "@/app/utils/db";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { FileIcon, PlusCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import DefaultImage from "@/public/default.png";
import Image from "next/image";

async function fetchSites(userId: string) {
  const data = await prisma.site.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function SitesRoute() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/api/auth/login");
  }
  const data = await fetchSites(user.id);
  return (
    <>
      <div className="flex w-full justify-end">
        <Button asChild>
          <Link href={"/dashboard/sites/new"}>
            <PlusCircle className="mr-2 size-4" />
            Create Site
          </Link>
        </Button>
      </div>
      {data === undefined || data.length === 0 ? (
        <div className="flex-center flex-col rounded-md border border-dashed p-8 mt-6 text-center animate-in fade-in-50">
          <div className="flex-center size-20 rounded-full bg-primary/10">
            <FileIcon className="size-10 text-primary" />
          </div>
          <h2 className="mt-6 text-lg font-semibold">
            You don&apos;t have any site created
          </h2>
          <p className="mb-8 mt-2 text-center text-sm leading-5 text-muted-foreground max-w-sm mx-auto">
            You currently dont have any sites please create a site to get
            started
          </p>
          <Button asChild>
            <Link href={"/dashboard/sites/new"}>
              <PlusCircle className="mr-2 size-4" />
              Create Site
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {data.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <Image
                src={item.imageUrl ?? DefaultImage}
                alt={item.name}
                className="rounded-lg object-cover w-full h-[200px]"
                width={400}
                height={200}
              />
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription className="overflow-hidden text-ellipsis ">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/dashboard/sites/${item.id}`}>
                    View Articals
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
