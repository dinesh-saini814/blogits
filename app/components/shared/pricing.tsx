import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";
import { SubmitButtons } from "../dashboard/SubmitButtons";
import { CreateSubscription } from "@/app/actions";

interface iAppProps {
  id: number;
  cardTitle: string;
  cardDesctiption: string;
  priceTital: string;
  benefits: string[];
}

export const PricingPlans: iAppProps[] = [
  {
    id: 0,
    cardTitle: "Freelancer",
    cardDesctiption: "the best pricing for people starting out",
    benefits: ["1 Site", "Up to 1000 Visitors", "5GB Storage", "Basic Support"],
    priceTital: "Free",
  },
  {
    id: 1,
    cardTitle: "Startup",
    cardDesctiption: "the best pricing plan for professionals",
    benefits: [
      "Unlimited Sites",
      "50K Visitors",
      "50GB Storage",
      "Priority Support",
    ],
    priceTital: "$25",
  },
];

export function PricingTable() {
  return (
    <>
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-semibold text-primary">Pricing</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
          Pricing Plans for everyone to get started!
        </h1>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center leading-tight text-muted-foreground">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt
        aliquid doloremque, consequuntur maiores voluptate omnis laboriosam
        dolores quas unde sint quaerat eaque est vitae accusamus necessitatibus
        nemo ullam odit? Dolorum?
      </p>
      <div className="grid grid-cols-1 gap-8 mt-16 lg:grid-cols-2">
        {PricingPlans.map((item) => (
          <Card key={item.id} className={item.id === 1 ? "border-primary" : ""}>
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                {item.id === 1 ? (
                  <div className="flex items-center justify-between ">
                    <h3 className="text-primary">Startup</h3>
                    <p className="text-sm  rounded-full bg-primary/20 px-3 py-1 font-semibold leading-5 text-primary">
                      Most Popular
                    </p>
                  </div>
                ) : (
                  <>{item.cardTitle}</>
                )}
              </CardTitle>
              <CardDescription>{item.cardDesctiption}</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">
                {item.benefits.map((benefit, index) => (
                  <li key={index} className="flex gap-x-3 items-center">
                    <Check className="text-primary size-5" />
                    {benefit}
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-3xl font-bold tracking-tight">
                {item.priceTital}
              </p>
            </CardContent>
            <CardFooter>
              {item.id === 1 ? (
                <form className="w-full" action={CreateSubscription}>
                  <SubmitButtons text="Buy Plan" className="mt-5 w-full" />
                </form>
              ) : (
                <Button className="mt-5 w-full" variant={"outline"} asChild>
                  <Link href={"/dashboard"}>Try for free</Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
