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

export default function DeleteForm({
  params,
}: {
  params: { articleId: string; siteId: string };
}) {
  return (
    <div className="flex flex-1 items-center justify-center h-full">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Delete this article</CardTitle>

          <CardDescription>this action is irreversible</CardDescription>
        </CardHeader>
        <CardFooter className="w-full flex justify-between">
          <Button variant="secondary" className="" asChild>
            <Link href={`/dashboard/sites/${params.siteId}`}>Cancer</Link>
          </Button>
          <form action={DeletePostAction}>
            <input type="hidden" name="articleId" value={params.articleId} />
            <input type="hidden" name="siteId" value={params.siteId} />
            <SubmitButtons variant="destructive" text="Delete" />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
