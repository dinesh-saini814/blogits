"use client";
import { UploadDropzone } from "@/app/utils/UploadthingComponents";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { SubmitButtons } from "../SubmitButtons";
import { UpdateImage } from "@/app/actions";

interface formProps {
  siteId: string;
}

export function UploadImageForm({ siteId }: formProps) {
  const [imageUrl, setImageUrl] = useState<undefined | string>(undefined);
  return (
    <Card className="p-4 my-5">
      <CardTitle>Site background Image</CardTitle>
      <CardDescription>
        Change your site background image here..
      </CardDescription>
      <CardContent>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="Site Image"
            width={600}
            height={450}
            className=" object-cover rounded-lg mt-4"
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
      </CardContent>
      <CardFooter>
        <form action={UpdateImage}>
          <input type="hidden" name="siteId" value={siteId} />
          <input type="hidden" name="imageUrl" value={imageUrl} />
          <SubmitButtons text="Save Image" />
        </form>
      </CardFooter>
    </Card>
  );
}
