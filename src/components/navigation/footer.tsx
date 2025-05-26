import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Twitter, Github, Youtube } from "lucide-react";
import BlurImage from "../miscellaneous/blur-image";
// import Link from "";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SOCIAL_LINKS = [
  {
    href: "https://x.com/WalpressApp",
    icon: Twitter,
    label: "Twitter",
    hoverEffect: { scale: 1.3, rotation: 10, backgroundColor: "#1DA1F2" },
  },
  {
    href: "https://github.com/WalPress/site-builder",
    icon: Github,
    label: "GitHub",
    hoverEffect: { scale: 1.3, rotation: -10, backgroundColor: "#333" },
  },
  {
    href: "https://www.youtube.com/@WalpressAPP",
    icon: Youtube,
    label: "YouTube",
    hoverEffect: { scale: 1.3, rotation: 5, backgroundColor: "#FF0000" },
  },
];

const ANIMATION_CONFIG = {
  floating: {
    count: 5,
    duration: { base: 3, variance: 2 },
    movement: { y: -20, xVariance: 40 },
  },
  logo: {
    duration: 1.2,
    ease: "elastic.out(1, 0.5)",
  },
  chars: {
    duration: 0.05,
    stagger: 0.02,
    ease: "power2.out",
  },
  social: {
    duration: 0.6,
    stagger: 0.15,
    ease: "back.out(2)",
  },
  copyright: {
    duration: 0.8,
    ease: "power3.out",
  },
  hover: {
    duration: 0.3,
    ease: "power2.out",
  },
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLParagraphElement>(null);

  const createFloatingElements = useCallback(() => {
    const background = backgroundRef.current;
    if (!background) return;

    for (let i = 0; i < ANIMATION_CONFIG.floating.count; i++) {
      const element = document.createElement("div");
      element.className =
        "absolute w-2 h-2 bg-slate-200 rounded-full opacity-30";
      element.style.left = `${Math.random() * 100}%`;
      element.style.top = `${Math.random() * 100}%`;
      background.appendChild(element);

      const { duration, movement } = ANIMATION_CONFIG.floating;
      gsap.to(element, {
        y: movement.y,
        x: Math.random() * movement.xVariance - movement.xVariance / 2,
        duration: duration.base + Math.random() * duration.variance,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        delay: Math.random() * 2,
      });
    }
  }, []);

  const setupTextAnimation = useCallback(() => {
    const tagline = taglineRef.current;
    if (!tagline || !tagline.textContent) return null;

    const chars = tagline.textContent.split("");
    tagline.innerHTML = chars
      .map((char) => (char === " " ? " " : `<span class="char">${char}</span>`))
      .join("");

    return tagline.querySelectorAll(".char");
  }, []);

  const setupSocialHoverEffects = useCallback(() => {
    const social = socialRef.current;
    if (!social) return;

    const socialIcons = social.querySelectorAll("a");

    socialIcons.forEach((icon, index) => {
      const hoverTl = gsap.timeline({ paused: true });
      const effect = SOCIAL_LINKS[index]?.hoverEffect;

      if (effect) {
        hoverTl.to(icon, {
          ...effect,
          duration: ANIMATION_CONFIG.hover.duration,
          ease: ANIMATION_CONFIG.hover.ease,
        });

        const handleMouseEnter = () => hoverTl.play();
        const handleMouseLeave = () => hoverTl.reverse();

        icon.addEventListener("mouseenter", handleMouseEnter);
        icon.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          icon.removeEventListener("mouseenter", handleMouseEnter);
          icon.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    });
  }, []);

  const initializeAnimations = useCallback(() => {
    const elements = {
      footer: footerRef.current,
      logo: logoRef.current,
      tagline: taglineRef.current,
      social: socialRef.current,
      copyright: copyrightRef.current,
    };

    if (Object.values(elements).some((el) => !el)) {
      console.warn("Footer: Some required elements not found");
      return;
    }

    createFloatingElements();

    const charElements = setupTextAnimation();
    if (!charElements) return;

    gsap.set(elements.logo, {
      scale: 0,
      rotation: -360,
      opacity: 0,
    });

    gsap.set(charElements, {
      opacity: 0,
      y: 50,
      rotation: 15,
    });

    if (elements.social) {
      gsap.set(elements.social.children, {
        opacity: 0,
        scale: 0,
        y: 30,
      });
    }

    gsap.set(elements.copyright, {
      opacity: 0,
      y: 30,
      skewY: 5,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: elements.footer,
        start: "top 90%",
        end: "bottom 10%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(elements.logo, {
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: ANIMATION_CONFIG.logo.duration,
      ease: ANIMATION_CONFIG.logo.ease,
    });

    tl.to(
      charElements,
      {
        opacity: 1,
        y: 0,
        rotation: 0,
        duration: ANIMATION_CONFIG.chars.duration,
        stagger: ANIMATION_CONFIG.chars.stagger,
        ease: ANIMATION_CONFIG.chars.ease,
      },
      "-=0.6"
    );

    tl.to(
      elements.social?.children || [],
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: ANIMATION_CONFIG.social.duration,
        stagger: ANIMATION_CONFIG.social.stagger,
        ease: ANIMATION_CONFIG.social.ease,
      },
      "-=0.4"
    );

    tl.to(
      elements.copyright,
      {
        opacity: 1,
        y: 0,
        skewY: 0,
        duration: ANIMATION_CONFIG.copyright.duration,
        ease: ANIMATION_CONFIG.copyright.ease,
      },
      "-=0.3"
    );

    setupSocialHoverEffects();
  }, [createFloatingElements, setupTextAnimation, setupSocialHoverEffects]);

  useEffect(() => {
    initializeAnimations();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [initializeAnimations]);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-20"
    >
      <div ref={backgroundRef} className="absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-2xl space-y-10 text-center">
        <div ref={logoRef} className="flex justify-center">
          <div className="relative">
            <BlurImage
              src="/footer_logo.png"
              alt="Reworkd"
              width={80}
              height={80}
            />
          </div>
        </div>

        <p
          ref={taglineRef}
          className="mx-auto max-w-lg text-xl leading-relaxed font-medium text-gray-600"
        >
          Empowering creators to own their digital presence without
          intermediaries.
        </p>

        <div ref={socialRef} className="flex justify-center space-x-8">
          {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <Icon className="h-6 w-6 text-gray-700" />
            </a>
          ))}
        </div>

        <p
          ref={copyrightRef}
          className="text-sm font-semibold tracking-wider text-gray-500"
        >
          © WALPRESS 2025. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
