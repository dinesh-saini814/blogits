import prisma from "@/app/utils/db";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Book, FileIcon, PlusCircle, Settings } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getData(userId: string, siteId: string) {
  const data = await prisma.post.findMany({
    where: {
      userId: userId,
      siteId: siteId,
    },
    select: {
      imageUrl: true,
      title: true,
      createdAt: true,
      id: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function SiteIdRoute({
  params,
}: {
  params: { siteId: string };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const data = await getData(user.id, params.siteId);
  return (
    <>
      <div className="flex w-full justify-end gap-x-4">
        <Button asChild variant="secondary">
          <Link href={"#"}>
            <Book className="mr-2 size-4" />
            View Blog
          </Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href={"#"}>
            <Settings className="mr-2 size-4" />
            Settings
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/dashboard/sites/${params.siteId}/create`}>
            <PlusCircle className="mr-2 size-4" />
            Create Artical
          </Link>
        </Button>
      </div>
      {data === undefined || data.length === 0 ? (
        <div className="flex-center flex-col rounded-md border border-dashed p-8 mt-6 text-center animate-in fade-in-50">
          <div className="flex-center size-20 rounded-full bg-primary/10">
            <FileIcon className="size-10 text-primary" />
          </div>
          <h2 className="mt-6 text-lg font-semibold">
            You don&apos;t have any Articals created
          </h2>
          <p className="mb-8 mt-2 text-center text-sm leading-5 text-muted-foreground max-w-sm mx-auto">
            You currently dont have any Articals please create a Artical to get
            started
          </p>
          <Button asChild>
            <Link href={`/dashboard/sites/${params.siteId}/create`}>
              <PlusCircle className="mr-2 size-4" />
              Create Artical
            </Link>
          </Button>
        </div>
      ) : (
        <h1>here is data</h1>
      )}
    </>
  );
}
