"use client";
import { CreatePostAction } from "@/app/actions";
import TailwindEditor from "@/app/components/dashboard/EditorWrapper";
import { UploadDropzone } from "@/app/utils/UploadthingComponents";
import { PostSchema } from "@/app/utils/zodSchemas";
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
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ArrowLeftIcon, Atom } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JSONContent } from "novel";
import { useActionState, useState } from "react";
import { toast } from "sonner";
import slugify from "react-slugify";
import { SubmitButtons } from "@/app/components/dashboard/SubmitButtons";
import React from "react";

export default function ArticalCreation({
  params,
}: {
  params: { siteId: string };
}) {
  const [imageUrl, setImageUrl] = useState<undefined | string>(undefined);
  const [value, setValue] = useState<JSONContent | undefined>(undefined);
  const [title, setTitle] = useState<undefined | string>(undefined);
  const [slug, setSlug] = useState<undefined | string>(undefined);

  const [lastResult, action] = useActionState(CreatePostAction, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: PostSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  function handelSlugGeneration() {
    const titleTnput = title;

    if (titleTnput?.length === 0 || titleTnput === undefined) {
      return toast.error("Please enter the title first");
    }
    setSlug(slugify(titleTnput));

    return toast.success("Slug generated successfully");
  }

  return (
    <>
      <div className="flex items-center mb-4">
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
          <form
            className="flex flex-col gap-6 "
            id={form.id}
            onSubmit={form.onSubmit}
            action={action}
          >
            <input type="hidden" name="siteId" value={params.siteId} />
            <div className="grid gap-2">
              <Label>Title</Label>
              <Input
                key={fields.title.key}
                name={fields.title.name}
                defaultValue={fields.title.initialValue}
                placeholder="Enter Your Artical Title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                value={title ?? ""}
              />
              <p className="text-red-500 text-sm">{fields.title.errors}</p>
            </div>
            <div className="grid gap-2">
              <Label>Sluck</Label>
              <Input
                key={fields.slug.key}
                name={fields.slug.name}
                defaultValue={fields.slug.initialValue}
                placeholder="Artical Sluck"
                onChange={(e) => {
                  setSlug(e.target.value);
                }}
                value={slug ?? ""}
              />
              <p className="text-red-500 text-sm">{fields.slug.errors}</p>

              <Button
                onClick={handelSlugGeneration}
                className="w-fit"
                variant="secondary"
                type="button"
              >
                <Atom className="size-4 mr-2" /> Generate Slug
              </Button>
            </div>
            <div className="grid gap-2">
              <Label>Small Description</Label>
              <Textarea
                key={fields.smallDescription.key}
                name={fields.smallDescription.name}
                defaultValue={fields.smallDescription.initialValue}
                placeholder="Small Description for your blog article..."
                className="h-32"
              />
              <p className="text-red-500 text-sm">
                {fields.smallDescription.errors}
              </p>
            </div>
            <div className="grid gap-2">
              <Label>Cover Image</Label>
              <input
                type="hidden"
                name={fields.coverImage.name}
                key={fields.coverImage.key}
                defaultValue={fields.coverImage.initialValue}
                value={imageUrl ?? ""}
              />
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="uploases image"
                  className="object-cover w-[250px] h-[250px] rounded-lg"
                  width={250}
                  height={250}
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
              <p className="text-red-500 text-sm">{fields.coverImage.errors}</p>
            </div>
            <div className="grid gap-2 ">
              <Label>Artical Content</Label>
              <input
                type="hidden"
                name={fields.articalContent.name}
                key={fields.articalContent.key}
                defaultValue={fields.articalContent.initialValue}
                value={value ? JSON.stringify(value) : ""}
              />
              <TailwindEditor onChange={setValue} initialValue={value} />
              <p className="text-red-500 text-sm">
                {fields.articalContent.errors}
              </p>
            </div>

            <SubmitButtons text="Create Article" />
          </form>
        </CardContent>
      </Card>
    </>
  );
}
