import prisma from "@/app/utils/db";
import Image from "next/image";
import { notFound } from "next/navigation";
import logo from "@/public/logo.png";
import { ThemeToggle } from "@/app/components/dashboard/ThemeToggle";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DefaultImage from "@/public/default.png";
import { ArrowRight, Clock } from "lucide-react";

async function getData(subDir: string) {
  const data = await prisma.site.findUnique({
    where: {
      subdirectory: subDir,
    },
    select: {
      name: true,
      Posts: {
        select: {
          title: true,
          smallDescription: true,
          imageUrl: true,
          createdAt: true,
          slug: true,
          id: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }
  return data;
}

export default async function BlogPage(props: {
  params: Promise<{ name: string }>;
}) {
  const params = await props.params;
  const { name } = params;
  const data = await getData(name);
  return (
    <>
      <nav className="grid grid-cols-3 my-5  w-full">
        <div className="flex items-center justify-start gap-x-2">
          <Image src={logo} alt="logo" width={40} height={40} />
          <h1 className="text-2xl font-semibold tracking-tight">{data.name}</h1>
        </div>
        <div className="col-span-1" />
        <div className="col-span-1 flex w-full justify-end">
          <ThemeToggle />
        </div>
      </nav>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 mt-5 border-none">
        {data.Posts.map((item) => (
          <Card
            key={item.id}
            className="overflow-hidden p-2 transition-shadow shadow-lg hover:shadow-lg  dark:shadow-zinc-900"
          >
            <Image
              src={item.imageUrl ?? DefaultImage}
              alt={item.title}
              className=" object-cover w-full h-[270px] rounded-lg"
              width={400}
              height={320}
            />
            <CardHeader className="flex flex-col gap-4">
              <div className="flex gap-2 items-center ">
                <Clock className="size-4 opacity-50" />
                <p className="text-sm text-gray-500">
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "long",
                  }).format(new Date(item.createdAt))}
                </p>
              </div>
              <CardTitle className=" line-clamp-2">{item.title}</CardTitle>
              <CardDescription className=" line-clamp-2 ">
                {item.smallDescription}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-end items-center">
              <Button asChild className="w-fit text-end" variant={"ghost"}>
                <Link href={`/blog/${name}/${item.slug}`}>
                  Read More
                  <ArrowRight className="-rotate-45 size-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
