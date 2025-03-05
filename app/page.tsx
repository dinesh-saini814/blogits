import { HeroPage } from "./components/frontend/HeroPage";
import { Cards } from "./components/frontend/Cards";
import { Logos } from "./components/frontend/Logos";
import { Features } from "./components/frontend/Features";
import { redirect } from "next/navigation";
import NavBar from "./components/frontend/NavBar";
import { PricingTable } from "./components/shared/pricing";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser(); // Fetch user on the server

  if (user) {
    redirect("/dashboard"); // Redirect if already signed in
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <NavBar />
      <HeroPage />
      <Cards />
      <Logos />
      <Features />
      <PricingTable />
    </div>
  );
}
