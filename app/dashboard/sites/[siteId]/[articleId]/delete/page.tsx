import { DeletePostAction } from "@/app/actions";
import { SubmitButtons } from "@/app/components/dashboard/SubmitButtons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default async function DeleteForm(props: {
  params: Promise<{ siteId: string; articleId: string }>;
}) {
  const params = await props.params;
  const { siteId, articleId } = params;
  return (
    <div className="flex flex-1 items-center justify-center h-full">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Delete this article</CardTitle>

          <CardDescription>this action is irreversible</CardDescription>
        </CardHeader>
        <CardFooter className="w-full flex justify-between">
          <Button variant="secondary" className="" asChild>
            <Link href={`/dashboard/sites/${siteId}`}>Cancer</Link>
          </Button>
          <form action={DeletePostAction}>
            <input type="hidden" name="articleId" value={articleId} />
            <input type="hidden" name="siteId" value={siteId} />
            <SubmitButtons variant="destructive" text="Delete" />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
