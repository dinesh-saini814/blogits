"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-dropdown-menu";
import { UploadDropzone } from "@/app/utils/UploadthingComponents";
import { Atom } from "lucide-react";
import { toast } from "sonner";
import TailwindEditor from "../EditorWrapper";
import { SubmitButtons } from "../SubmitButtons";
import { JSONContent } from "novel";
import { useActionState, useState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { PostSchema } from "@/app/utils/zodSchemas";
import { UpdatePostAction } from "@/app/actions";
import { Input } from "@/components/ui/input";
import slugify from "react-slugify";
import Image from "next/image";

interface EditArticleProps {
  data: {
    id: string;
    title: string;
    articalContent: string;
    smallDescription: string;
    imageUrl: string;
    slug: string;
  };
  siteId: string;
}

export function EditArticle({ data, siteId }: EditArticleProps) {
  const [imageUrl, setImageUrl] = useState<undefined | string>(data.imageUrl);
  const [value, setValue] = useState<JSONContent | undefined>(
    JSON.parse(data.articalContent)
  );
  const [title, setTitle] = useState<undefined | string>(data.title);
  const [slug, setSlug] = useState<undefined | string>(data.slug);

  const [lastResult, action] = useActionState(UpdatePostAction, undefined);
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
    <Card className="mt-5">
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
          <input type="hidden" name="articleId" value={data.id} />
          <input type="hidden" name="siteId" value={siteId} />
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
              defaultValue={data.smallDescription}
              placeholder="Small Description for yur blog article..."
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

          <SubmitButtons text="Edit Article" />
        </form>
      </CardContent>
    </Card>
  );
}
