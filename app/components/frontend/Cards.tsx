import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignUpButton } from "@clerk/nextjs";
import React from "react";

export function Cards() {
  return (
    <>
      <h1 className="text-3xl px-4 font-semibold mb-8">
        Productivity Features
      </h1>
      <div className="sm:flex gap-2 mx-auto px-4">
        <Card className="w-full sm:w-1/2 border flex flex-col justify-between gap-4 ">
          <CardHeader>
            <CardTitle className="text-xl mb-3">
              Free and premium plans for startups of all sizes.
            </CardTitle>
            <CardDescription className="">
              Based on your startups needs, choose the plan that best suits your
              goals and budget. Get started with a free plan today. No credit
              card required.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="rounded-full mt-14" asChild>
              <SignUpButton
                forceRedirectUrl={"/api/auth/creation"}
                fallbackRedirectUrl={"/api/auth/creation"}
                mode="modal"
              >
                <button>Try Demmo</button>
              </SignUpButton>
            </Button>
          </CardFooter>
        </Card>
        <div className="flex flex-col items-center justify-between gap-2 w-full sm:w-1/2 ">
          <Card className="mt-2 sm:mt-0">
            <CardHeader className="mb-5">
              <CardTitle className="text-xl mb-4">
                Pre-designed startup templates
              </CardTitle>
              <CardDescription>
                Choose from a variety of pre-designed templates to kickstart
                your startups online presence. No coding required.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="mt-2">
            <CardHeader className="mb-5">
              <CardTitle className="text-xl mb-4">
                Mobile-friendly websites
              </CardTitle>
              <CardDescription>
                All templates are designed to be mobile-friendly and responsive
                on all devices.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </>
  );
}
