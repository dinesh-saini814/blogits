import Image from "next/image";
import { Button } from "@/components/ui/button";
import HeroImage from "@/public/heroImage.png";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

export function HeroPage() {
  return (
    <>
      <section className=" relative flex items-center bg-hero bg-cover bg-center">
        <div className="relative w-full items-center py-12 lg:py-20 ">
          <div className="text-center ">
            <span className="text-sm text-primary font-medium tracking-tight capitalize bg-primary/10 px-4 py-2 rounded-full">
              Ultimate Bloging SaaS for your business
            </span>
            <h1 className="mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-none">
              Create your blog
              <span className="block text-primary font-bold ">in minutes</span>
            </h1>
            <p className="max-w-xl mx-auto mt-6 text-base font-light lg:text-lg text-muted-foreground tracking-tighter">
              setting up a blog has never been easier. Start your blog today and
              share your stories with the world.
            </p>
            <div className="flex-center gap-4 w-full mt-5 ">
              <SignInButton
                fallbackRedirectUrl={"/api/auth/creation"}
                forceRedirectUrl={"/api/auth/creation"}
                mode="modal"
              >
                <Button variant={"secondary"}>Sign in</Button>
              </SignInButton>
              <SignUpButton
                fallbackRedirectUrl={"/api/auth/creation"}
                forceRedirectUrl={"/api/auth/creation"}
                mode="modal"
              >
                <Button>Sign up</Button>
              </SignUpButton>
            </div>
          </div>

          <div className="relative items-center w-full py-12 mx-auto mt-12">
            <svg
              className="absolute -mt-24 blur-3xl"
              fill="none"
              viewBox="0 0 400 400"
              height="100%"
              width="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_10_20)">
                <g filter="url(#filter0_f_10_20)">
                  <path
                    d="M128.6 0H0V322.2L106.2 134.75L128.6 0Z"
                    fill="#FACC60"
                    // fill="#D5E3FB"
                  ></path>
                  <path
                    d="M0 322.2V400H240H320L106.2 134.75L0 322.2Z"
                    fill="#FACC15"
                    // fill="#FACC15"
                  ></path>
                  <path
                    d="M320 400H400V78.75L106.2 134.75L320 400Z"
                    fill="#FACafe"
                    // fill="#FACC15"
                  ></path>
                  <path
                    d="M400 0H128.6L106.2 134.75L400 78.75V0Z"
                    fill="#D5E3FB"
                  ></path>
                </g>
              </g>
              <defs>
                <filter
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                  height="720.666"
                  id="filter0_f_10_20"
                  width="720.666"
                  x="-160.333"
                  y="-160.333"
                >
                  <feFlood
                    floodOpacity="0"
                    result="BackgroundImageFix"
                  ></feFlood>
                  <feBlend
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    mode="normal"
                    result="shape"
                  ></feBlend>
                  <feGaussianBlur
                    result="effect1_foregroundBlur_10_20"
                    stdDeviation="80.1666"
                  ></feGaussianBlur>
                </filter>
              </defs>
            </svg>
            {/* <svg
              className="absolute -mt-24 blur-3xl"
              fill="none"
              viewBox="0 0 400 400"
              height="100%"
              width="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient
                  id="lightGradient"
                  cx="50%"
                  cy="50%"
                  r="50%"
                  fx="50%"
                  fy="50%"
                >
                  <stop offset="0%" stop-color="#D5E3FB" stop-opacity="1" />
                  <stop offset="70%" stop-color="#FACC15" stop-opacity="0.6" />
                  <stop offset="100%" stop-color="#FACC15" stop-opacity="0" />
                </radialGradient>
                <filter
                  id="blurEffect"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="80" />
                </filter>
              </defs>
              <rect
                x="0"
                y="0"
                width="400"
                height="400"
                fill="url(#lightGradient)"
                filter="url(#blurEffect)"
              />
            </svg> */}

            <Image
              src={HeroImage}
              alt="hero image"
              priority
              className=" mx-auto z-50 relative object-cover border rounded-lg shadow-2xl lg:rounded-2xl "
              width={900}
              height={700}
            />
          </div>
        </div>
      </section>
    </>
  );
}
