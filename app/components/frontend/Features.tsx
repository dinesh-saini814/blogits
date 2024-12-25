interface Feature {
  name: string;
  description: string;
}

const features: Feature[] = [
  {
    name: "Sign up in seconds",
    description:
      "Create an account in seconds and start writing your blog. No credit card required.",
  },
  {
    name: "Write in Markdown",
    description:
      "Write your blog posts in Markdown. It's easy to learn and easy to use.",
  },

  {
    name: "Publish with one click",
    description:
      "Publish your blog posts with one click. No need to worry about hosting.",
  },

  {
    name: "Security",
    description: "Your blog is secure with Blogit. We take security seriously.",
  },
  {
    name: "Performance",
    description:
      "Your blog is fast and reliable with Blogit. No need to worry about downtime.",
  },
  {
    name: "Scalability",
    description:
      "Blogit scales with your blog. No need to worry about traffic spikes.",
  },
];

export function Features() {
  return (
    <div className="py-24 sm:py-32 ">
      <div className="max-w-2xl mx-auto lg:text-center">
        <p className="font-semibold leading-7 text-primary">Blog Faster</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Get your blog up and running in minutes
        </h1>
        <p className="mt-6 text-base leading-snug text-muted-foreground">
          With Blogit, you can create a blog in minutes. Just sign up, create a
          blog, and start writing. We take care of the rest.
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16 ">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-16">
              <div className="text-base font-semibold leading-7 flex items-center">
                <div className="absolute left-6 top-0.5 flex size-10">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                </div>
                {feature.name}
              </div>
              <p className="mt-2 text-sm leading-snug text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
