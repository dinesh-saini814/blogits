import EmptyState from "@/app/components/dashboard/EmptyState";
import prisma from "@/app/utils/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { auth } from "@clerk/nextjs/server";
import {
  Book,
  EditIcon,
  MoreHorizontal,
  PlusCircle,
  Settings,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function getData(userId: string, siteId: string) {
  const data = await prisma.site.findUnique({
    where: {
      userId: userId,
      id: siteId,
    },
    select: {
      subdirectory: true,
      id: true,
      Posts: {
        select: {
          imageUrl: true,
          title: true,
          createdAt: true,
          id: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return data;
}

export default async function SiteIdRoute(props: {
  params: Promise<{ siteId: string }>;
}) {
  const params = await props.params;
  const { siteId } = params;

  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const data = await getData(userId, siteId);

  return (
    <>
      <div className="flex w-full justify-end gap-x-4">
        <Button asChild variant="secondary">
          <Link
            href={
              data && data?.subdirectory ? `/blog/${data?.subdirectory}` : "#"
            }
          >
            <Book className="mr-2 size-4" />
            {data && data?.subdirectory ? "View Blog" : "No Blog Available"}
          </Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href={`/dashboard/sites/${data?.id}/settings`}>
            <Settings className="mr-2 size-4" />
            Settings
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/dashboard/sites/${data?.id}/create`}>
            <PlusCircle className="mr-2 size-4" />
            Create Artical
          </Link>
        </Button>
      </div>
      {data?.Posts === undefined || data?.Posts.length === 0 ? (
        <EmptyState
          title="You don't have any Articals created"
          description="You currently dont have any Articals please create a Artical to get
            started"
          buttonText="Create Artical"
          buttonLink={`/dashboard/sites/${data?.id}/create`}
        />
      ) : (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Articals</CardTitle>
            <CardDescription>
              manage your Articals in a simple way
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.Posts.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Image
                        src={item.imageUrl}
                        alt="articla image"
                        width={96}
                        height={96}
                        className="size-24 rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium capitalize">
                      {item.title}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-green-500/10 text-green-500 font-bold "
                      >
                        Published
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Intl.DateTimeFormat("en-US", {
                        dateStyle: "medium",
                      }).format(new Date(item.createdAt))}
                    </TableCell>
                    <TableCell className="text-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/dashboard/sites/${data?.id}/${item.id}`}
                            >
                              <EditIcon />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/dashboard/sites/${data?.id}/${item.id}/delete`}
                            >
                              <Trash2 />
                              Delete
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </>
  );
}
