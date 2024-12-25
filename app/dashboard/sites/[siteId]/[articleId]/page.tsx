import { EditArticle } from "@/app/components/dashboard/forms/EditArticle";
import prisma from "@/app/utils/db";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getArticleData(postId: string) {
  const data = await prisma.post.findMany({
    where: {
      id: postId,
    },
    select: {
      imageUrl: true,
      title: true,
      smallDescription: true,
      slug: true,
      articalContent: true,
      id: true,
    },
  });

  if (!data) {
    return notFound();
  }
  return data;
}

export default async function EditRoute(props: {
  params: Promise<{ siteId: string; articleId: string }>;
}) {
  const params = await props.params;
  const { siteId, articleId } = params;

  const data = await getArticleData(articleId);
  return (
    <div>
      <div className="flex items-center">
        <Button size="icon" variant="outline" asChild className="mr-3">
          <Link href={`/dashboard/sites/${siteId}`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="text-lg font-semibold">Edit Article</h1>
      </div>
      <EditArticle data={data[0]} siteId={siteId} />
    </div>
  );
}
