import { SubmitButtons } from "@/app/components/dashboard/SubmitButtons";
import { PricingTable } from "@/app/components/shared/pricing";
import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/requireUser";
import { stripe } from "@/app/utils/stripe";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";

async function getData(userId: string) {
  const data = await prisma.subscription.findUnique({
    where: {
      userId: userId,
    },
    select: {
      status: true,
      User: {
        select: {
          customerId: true,
        },
      },
    },
  });
  return data;
}

export default async function PricingPage() {
  const user = await requireUser();
  const data = await getData(user.id);

  async function createCustomerPortal() {
    "use server";

    const session = await stripe.billingPortal.sessions.create({
      customer: data?.User?.customerId,
      return_url: `http://localhost:3000/dashboard`,
    });

    return redirect(session.url);
  }

  if (data?.status === "active") {
    return (
      <Card className="w-full p-4">
        <CardHeader>
          <CardTitle>Edit your subscription</CardTitle>
          <CardDescription>
            You can edit your subscription at any time by clicking the button
            and view the information below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createCustomerPortal}>
            <SubmitButtons text="View Subscription Details" />
          </form>
        </CardContent>
      </Card>
    );
  }
  return (
    <div>
      <PricingTable />
    </div>
  );
}
