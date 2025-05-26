import { gsap } from "gsap";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlurImage from "../miscellaneous/blur-image";
import { cn } from "../../lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      title: "Local-First Site Builder",
      description:
        "Build websites directly on your device with no internet connection or account needed. Use a visual editor or code by hand — it’s flexible, fast, and yours.",
      bgColor: "bg-[#0D0D0D]",
    },
    {
      title: "Wallet-Owned Domains",
      description:
        "Claim your own .sui domain effortlessly with your wallet. Forget about registrars, KYC hassles, and renewal worries — enjoy true ownership on-chain with SuiNS.",
      bgColor: "bg-[#FAC515]",
    },
    {
      title: "Decentralized Deployment",
      description:
        "Publish to Walrus, a censorship-resistant, decentralized storage network. No AWS or Vercel — your content lives across global nodes and can’t be taken down.",
      bgColor: "bg-[#53B1FD]",
    },
    {
      title: "AI-Powered Tools",
      description:
        "Effortlessly create stunning websites, craft engaging content, and design unique visuals using our integrated AI tools. Accelerate your launch while maintaining your vision.",
      bgColor: "bg-[#9B8AFB]",
    },
    {
      title: "Modular Plugin System",
      description:
        "Extend your site with plugins, smart contracts, and UI components. Access a growing marketplace of tools tailored for all kinds of creators.",
      bgColor: "bg-[#F97066]",
    },
    {
      title: "Transparent & Friendly Pricing",
      description:
        "Build for free. Pay only when you publish. AI and plugin utilities are available via microtransactions — no subscriptions, no hidden fees.",
      bgColor: "bg-[#3CCB7F]",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(headingRef.current, { opacity: 0, y: 50 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 30 });
      gsap.set(".feature-card", { opacity: 0, y: 60, scale: 0.9 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      });

      tl.to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      );

      tl.to(
        ".feature-card",
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: {
            amount: 0.6,
            from: "start",
          },
        },
        "-=0.3"
      );

      const cards = document.querySelectorAll(".feature-card");
      cards.forEach((card) => {
        const icon = card.querySelector(".feature-icon");

        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -8,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(icon, {
            scale: 1.1,
            rotation: 5,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(icon, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-gray-50 px-6 py-16 md:px-8 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2
            ref={headingRef}
            className="mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
          >
            WE HAVE EVERYTHING YOU NEED
          </h2>
          <p
            ref={subtitleRef}
            className="mx-auto max-w-4xl text-lg leading-relaxed text-gray-700 md:text-xl"
          >
            Walpress gives you all the tools to build, own, and publish your
            Web3 presence — no extra platforms, no middlemen, no compromises.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className={cn(
                "feature-card flex w-full cursor-pointer flex-col items-start justify-start rounded-2xl bg-gray-900 p-8",
                feature.bgColor
              )}
            >
              <BlurImage
                src={`/cad${index + 1}.png`}
                alt={feature.title}
                width={64}
                height={64}
                className="mb-6 h-16 w-16"
              />

              <h3 className="mb-4 text-xl font-semibold text-white">
                {feature.title}
              </h3>
              <p className="leading-relaxed text-white">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
