import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EmptyState from "../components/dashboard/EmptyState";
import prisma from "../utils/db";
import { requireUser } from "../utils/requireUser";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import DefaultImage from "@/public/default.png";

async function getData(userId: string) {
  const [sites, articles] = await Promise.all([
    prisma.site.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    }),
    prisma.post.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    }),
  ]);
  return { sites, articles };
}

export default async function DashboardIndexPage() {
  const user = await requireUser();
  const { sites, articles } = await getData(user.id);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-5">Your Site</h1>
      {sites.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 mt-5">
          {sites.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <Image
                src={item.imageUrl ?? DefaultImage}
                alt={item.name}
                className=" object-cover w-full h-[200px]"
                width={400}
                height={200}
              />
              <CardHeader>
                <CardTitle className="truncate">{item.name}</CardTitle>
                <CardDescription className=" line-clamp-2">
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
      ) : (
        <EmptyState
          title="You dont have any site created"
          description="you currently dont have any site. Please create new a site "
          buttonLink="/dashboard/sites/new"
          buttonText="Create New Site"
        />
      )}
      <h1 className="text-2xl font-semibold mt-10">Recent Articles</h1>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 mt-5">
          {articles.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <Image
                src={item.imageUrl ?? DefaultImage}
                alt={item.title}
                className=" object-cover w-full h-[200px]"
                width={400}
                height={200}
              />
              <CardHeader>
                <CardTitle className="truncate">{item.title}</CardTitle>
                <CardDescription className=" line-clamp-2">
                  {item.smallDescription}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/dashboard/sites/${item.siteId}/${item.id}`}>
                    Edit Article
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="You dont have any articles created"
          description="you currently dont have any articles. Please create new article "
          buttonLink="/dashboard/sites/new"
          buttonText="Create New article"
        />
      )}
    </div>
  );
}
