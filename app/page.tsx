import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { HeroPage } from "./components/frontend/HeroPage";
import { Cards } from "./components/frontend/Cards";
import { Logos } from "./components/frontend/Logos";
import { Features } from "./components/frontend/Features";
import { redirect } from "next/navigation";
import NavBar from "./components/frontend/NavBar";
import { PricingTable } from "./components/shared/pricing";

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const session = await getUser();

  if (session?.id) {
    return redirect("/dashboard");
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
