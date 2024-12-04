"use client";
import TailwindEditor from "@/app/components/dashboard/EditorWrapper";
import { UploadDropzone } from "@/app/utils/UploadthingComponents";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeftIcon, Atom } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JSONContent } from "novel";
import { useState } from "react";
import { toast } from "sonner";

export default function ArticalCreation({
  params,
}: {
  params: { siteId: string };
}) {
  const [imageUrl, setImageUrl] = useState<undefined | string>(undefined);

  const [value, setValue] = useState<JSONContent | undefined>(undefined);
  return (
    <>
      <div className="flex items-center">
        <Button size="icon" variant="outline" className="mr-3 " asChild>
          <Link href={`/dashboard/sites/${params.siteId}`}>
            <ArrowLeftIcon className="size-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">Create Article</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Articals Details</CardTitle>
          <CardDescription>
            write the description for your articals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-6 ">
            <div className="grid gap-2">
              <Label>Title</Label>
              <Input placeholder="Nextjs blogging application" />
            </div>
            <div className="grid gap-2">
              <Label>Sluck</Label>
              <Input placeholder="Artical Sluck" />
              <Button className="w-fit" variant="secondary" type="button">
                <Atom className="size-4 mr-2" /> Generate Slug
              </Button>
            </div>
            <div className="grid gap-2">
              <Label>Small Description</Label>
              <Textarea
                placeholder="Small Description for yur blog article..."
                className="h-32"
              />
            </div>
            <div className="grid gap-2">
              <Label>Cover Image</Label>
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="uploases image"
                  className="object-cover w-[200px] h-[200px] rounded-lg"
                  width={200}
                  height={200}
                />
              ) : (
                <UploadDropzone
                  onClientUploadComplete={(res) => {
                    setImageUrl(res[0].url);
                    toast.success("Image uploaded successfully");
                  }}
                  endpoint="imageUploader"
                  onUploadError={() => {
                    toast.error("Image upload failed");
                  }}
                />
              )}
            </div>
            <div className="grid gap-2 ">
              <Label>Artical Content</Label>
              <TailwindEditor onChange={setValue} initialValue={value} />
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
