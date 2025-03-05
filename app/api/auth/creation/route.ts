import prisma from "@/app/utils/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || userId === null || userId === undefined) {
    throw new Error("Something went wrong");
  }

  let dbUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  // Create a new user if they don't exist

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: userId,
        firstName: user?.firstName ?? "",
        lastName: user?.lastName ?? "",
        email: user?.emailAddresses[0]?.emailAddress ?? "",
        profileImage: `https://avatar.vercel.sh/${user?.firstName}`,
      },
    });
  }

  return NextResponse.redirect(
    process.env.NODE_ENV === "production"
      ? "https://blogits.vercel.app/dashboard"
      : "http://localhost:3000/dashboard"
  );
}
