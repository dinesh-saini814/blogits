import { RenderArticle } from "@/app/components/blog/RenderArticle";
import prisma from "@/app/utils/db";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getData(slug: string) {
  const data = await prisma.post.findUnique({
    where: {
      slug: slug,
    },
    select: {
      articalContent: true,
      createdAt: true,
      title: true,
      imageUrl: true,
      smallDescription: true,
    },
  });

  if (!data) {
    return notFound(); // Return a 404 page if no data is found
  }

  return data; // Return the data if found
}

export default async function ArticslPage(props: {
  params: Promise<{ slug: string; name: string }>;
}) {
  const params = await props.params;
  const { slug } = params;
  const { name } = params;

  const data = await getData(slug);

  return (
    <>
      <div className="flex items-center gap-x-3 pt-10 pb-5">
        <Button asChild variant="outline" size={"icon"}>
          <Link href={`/blog/${name}`}>
            <ArrowLeftIcon className="size-4" />
          </Link>
        </Button>
        <h1 className="text-lg  font-medium">Go Back</h1>
      </div>

      <div className="flex flex-col items-center justify-center mb-5">
        <div className="m-auto w-full text-center md:w-7/12 ">
          <h1 className="text-xl font-bold mb-5 md:text-4xl tracking-tight">
            {data.title}
          </h1>
          <p className="text-muted-foreground text-sm md:text-base tracking-tight m-auto w-10/12 mb-5 ">
            {data.smallDescription}
          </p>
        </div>
      </div>
      <div
        className="relative  m-auto mb-10 h-80 w-full max-w-screen-lg overflow-hidden md:mb-10 md:h-[650px] md:w-5/6 md:rounded-2xl lg:w-2/3
			"
      >
        <Image
          src={data.imageUrl}
          alt={data.title}
          className="rounded-2xl w-full h-auto object-cover"
          width={1200}
          height={630}
          priority
        />
      </div>
      <RenderArticle json={JSON.parse(data.articalContent)} />
      <div className="flex gap-2 items-center justify-center ">
        <Clock className="size-4 text-muted-foreground" />
        <p className="text-sm text-muted-foreground ">
          {new Intl.DateTimeFormat("en-US", {
            dateStyle: "long",
          }).format(new Date(data.createdAt))}
        </p>
      </div>
    </>
  );
}
