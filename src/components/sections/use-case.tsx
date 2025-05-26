import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import UseCaseCard, { type UseCaseCardProps } from "./use-case-card";

export const UseCaseSection = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-400%"]);

  return (
    <section className="relative mx-auto w-full max-w-[1500px]">
      <div className="flex w-full flex-col items-center justify-center px-4 max-md:px-2">
        <h2 className="mb-8 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
          Use case
        </h2>
        <p className="max-w-3xl text-lg leading-relaxed text-gray-800 md:text-xl">
          Walpress is designed for creators, communities, and developers who
          need freedom, speed, and full control. Whether you’re launching a meme
          token or publishing independent research, Walpress keeps your site
          truly yours.
        </p>
      </div>
      <section ref={targetRef} className="relative mx-auto h-[300vh] w-full">
        <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
          <motion.div style={{ x }} className="flex w-full">
            {usecases.map((usecase, index) => (
              <UseCaseCard key={index} {...usecase} />
            ))}
          </motion.div>
        </div>
      </section>
    </section>
  );
};

const usecases: UseCaseCardProps[] = [
  {
    title: "Meme Creators",
    description:
      "Create viral meme pages that can’t be banned or taken down. Go live fast and stay online forever — even when the internet tries to cancel you.",
    imageSrc: "/use1.png",
  },
  {
    title: "INDEPENDENT JOURNALISTS",
    description:
      "Publish stories, reports, or leaks without fear of takedowns. Host your words on censorship-resistant infrastructure, and link it all to a self-owned domain.",
    imageSrc: "/use2.png",
  },
  {
    title: "Hobby Writers & Bloggers",
    description:
      "Write what you want, how you want. Walpress gives you a simple way to create personal blogs that aren’t subject to platform rules or algorithm shifts. ",
    imageSrc: "/use3.png",
  },
  {
    title: "Researchers & Academics",
    description:
      "Distribute whitepapers, findings, and data without the red tape. Use Walpress to preserve your work on decentralized infrastructure — immutable and permanent.",
    imageSrc: "/use4.png",
  },
  {
    title: "DAOs & Token Projects",
    description:
      "Launch clean, fast landing pages for tokens, DAOs, or governance hubs — all without centralized hosting or registrar lock-in. Own your frontend like you own your smart contracts.",
    imageSrc: "/use2.png",
  },
];
