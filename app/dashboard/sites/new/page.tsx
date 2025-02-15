"use client";
import { CreateSiteAction } from "@/app/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useActionState, useState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { siteSchema } from "@/app/utils/zodSchemas";
import { SubmitButtons } from "@/app/components/dashboard/SubmitButtons";

const NewSiteRoute = () => {
  const [lastResult, action] = useActionState(CreateSiteAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: siteSchema,
      });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const [subdirectoryError, setSubdirectoryError] = useState<string>("");

  // Handler for subdirectory input change
  const handleSubdirectoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/\s/.test(value)) {
      setSubdirectoryError("Subdirectory must not contain spaces.");
    } else {
      setSubdirectoryError("");
    }
  };

  return (
    <div className="flex-center flex-1 flex-col ">
      <Card className="max-w-[450px] md:min-w-[450px]">
        <CardHeader>
          <CardTitle>Create Site</CardTitle>
          <CardDescription>create your site here</CardDescription>
        </CardHeader>
        <form id={form.id} onSubmit={form.onSubmit} action={action}>
          <CardContent>
            <div className="flex flex-col gap-y-6">
              <div className="grid gap-2">
                <Label>Site Name</Label>
                <Input
                  name={fields.name.name}
                  key={fields.name.key}
                  defaultValue={fields.name.initialValue}
                  placeholder="Site Name"
                />
                <p className="text-red-500 text-sm">{fields.name.errors}</p>
              </div>
              <div className="grid gap-2">
                <Label>Subdirectory</Label>
                <Input
                  name={fields.subdirectory.name}
                  key={fields.subdirectory.key}
                  defaultValue={fields.subdirectory.initialValue}
                  placeholder="Subdirectory"
                  onChange={handleSubdirectoryChange}
                />
                {/* Show validation error for spaces */}
                <p className="text-red-500 text-sm">
                  {subdirectoryError || fields.subdirectory.errors}
                </p>
              </div>
              <div className="grid gap-2">
                <Label>Description</Label>
                <Textarea
                  name={fields.description.name}
                  key={fields.description.key}
                  defaultValue={fields.description.initialValue}
                  placeholder="Write small description for your site..."
                />
                <p className="text-red-500 text-sm">
                  {fields.description.errors}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButtons text="Create Site" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default NewSiteRoute;
