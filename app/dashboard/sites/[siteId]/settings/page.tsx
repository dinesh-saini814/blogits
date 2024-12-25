import { DeleteSiteAction } from "@/app/actions";
import { UploadImageForm } from "@/app/components/dashboard/forms/UploadImageForm";
import { SubmitButtons } from "@/app/components/dashboard/SubmitButtons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function SettingsSiteRoute(props: {
  params: Promise<{ siteId: string }>;
}) {
  const params = await props.params;
  const { siteId } = params;
  return (
    <>
      <div className="flex items-center gap-x-2">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/dashboard/sites/${siteId}`}>
            <ChevronLeft className="size-4" />
          </Link>
        </Button>
        <h3 className="text-lg font-semibold">Go Back</h3>
      </div>

      <UploadImageForm siteId={siteId} />

      <Card className="border-red-500 my-5 bg-red-500/10">
        <CardHeader>
          <CardTitle className="text-red-500">Delete Site</CardTitle>
          <CardDescription>
            This will permanently delete the site and all of its data. This
            action cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <form action={DeleteSiteAction}>
            <input type="hidden" name="siteId" value={siteId} />
            <SubmitButtons variant="destructive" text="Delete Permanent" />
          </form>
        </CardFooter>
      </Card>
    </>
  );
}
