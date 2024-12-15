import { Button } from "@/components/ui/button";
import { FileIcon, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Url } from "url";

interface EmptyStateProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: Url | string;
}

const EmptyState = ({
  buttonLink,
  buttonText,
  description,
  title,
}: EmptyStateProps) => {
  return (
    <div className="flex-center flex-col rounded-md border border-dashed p-8 mt-6 text-center animate-in fade-in-50">
      <div className="flex-center size-20 rounded-full bg-primary/10">
        <FileIcon className="size-10 text-primary" />
      </div>
      <h2 className="mt-6 text-lg font-semibold">{title}</h2>
      <p className="mb-8 mt-2 text-center text-sm leading-5 text-muted-foreground max-w-sm mx-auto">
        {description}
      </p>
      <Button asChild>
        <Link href={buttonLink || "/"}>
          <PlusCircle className="mr-2 size-4" />
          {buttonText}
        </Link>
      </Button>
    </div>
  );
};

export default EmptyState;
