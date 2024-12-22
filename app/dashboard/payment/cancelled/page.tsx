import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XIcon } from "lucide-react";
import Link from "next/link";

export default function Cancellroute() {
  return (
    <div className="w-full h-fit mt-24 flex-1 flex-center ">
      <Card className="w-[350px]">
        <div className="p-6">
          <div className="w-full flex-center">
            <XIcon className="size-12 rounded-full bg-red-500/30 text-red-500 p-2" />
          </div>
          <div className="mt-3 text-center sm:mt-5 w-full">
            <h2 className="text-xl font-semibold">Payment Cancelled</h2>
            <p className="text-sm mt-2 text-muted-foreground tracking-tight">
              Your payment has been cancelled. Please try again.
            </p>
            <Button className="w-full mt-5 " asChild>
              <Link href={"/dashboard"}>Go back to dashboard</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
