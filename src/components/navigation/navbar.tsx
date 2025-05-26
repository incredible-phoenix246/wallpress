import type React from "react";

import { X, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import BlurImage from "../miscellaneous/blur-image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      const heroSection = document.querySelector("#hero");
      if (heroSection) {
        const heroHeight = (heroSection as HTMLElement).offsetHeight;
        setIsPastHero(scrollY > heroHeight - 100);
      } else {
        setIsPastHero(scrollY > window.innerHeight - 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerOffset = 100;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }

    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#products", label: "Products" },
    { href: "#use-case", label: "Use Case" },
    { href: "#resources", label: "Resources" },
    { href: "#pricing", label: "Pricing" },
  ];

  return (
    <>
      <div className="font-cha fixed top-0 right-0 left-0 z-50 flex justify-center px-4">
        <motion.header
          className={cn(
            "flex w-full max-w-[1500px] items-center justify-between py-2 transition-all duration-1000 sm:px-[80px]",
            isScrolled &&
              isPastHero &&
              "mx-auto mt-6 max-w-3xl rounded-full bg-white px-8 py-6 shadow-2xl backdrop-blur-md max-md:mt-4 sm:px-8",
            isScrolled &&
              !isPastHero &&
              "mx-auto mt-6 max-w-3xl rounded-full bg-white/10 px-8 py-6 backdrop-blur-md max-md:mt-4 sm:px-8"
          )}
          initial={{ opacity: 1 }}
          animate={{
            opacity: 1,
            height: isScrolled ? "60px" : "80px",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          <div className="flex items-center space-x-2">
            <BlurImage
              src="/logo.png"
              alt="NeuroCX"
              width={40}
              height={40}
              className="rounded-lg"
            />

            <AnimatePresence mode="wait">
              {!isScrolled && (
                <motion.span
                  key="default"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "text-xl font-semibold text-[#213B4D] transition-colors duration-500"
                  )}
                >
                  WallPress
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <nav className="hidden items-center space-x-8 md:flex">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className={cn(
                  "cursor-pointer text-lg font-medium text-[#213B4D] transition-colors duration-500"
                )}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <motion.div
              animate={{
                height: isScrolled ? "36px" : "44px",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              <Button
                size="lg"
                asChild
                className={cn(
                  "hidden rounded-full transition-all duration-500 md:inline-flex",
                  isPastHero || isScrolled
                    ? "bg-[#213B4D] text-white hover:bg-[#213B4D]/80"
                    : "bg-white text-black hover:bg-gray-100"
                )}
                style={{
                  height: isScrolled ? "36px" : "44px",
                  fontSize: isScrolled ? "14px" : "16px",
                  transition: "all 0.5s ease-in-out",
                }}
              >
                <a href="#">Get started</a>
              </Button>
            </motion.div>

            <motion.button
              className={cn(
                "flex items-center justify-center text-gray-900 transition-colors duration-500 md:hidden"
              )}
              onClick={() => setIsMobileMenuOpen(true)}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="h-6 w-6" />
            </motion.button>
          </div>
        </motion.header>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              className="fixed top-0 right-0 bottom-0 z-50 flex w-[80%] max-w-sm flex-col bg-white text-gray-900 shadow-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 200,
                duration: 0.5,
              }}
            >
              <div className="flex items-center justify-between border-b border-gray-100 p-4">
                <div className="flex items-center space-x-2">
                  <BlurImage
                    src="/logo.png"
                    alt="NeuroCX"
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                  <span className="text-xl font-semibold">WallPress</span>
                </div>
                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-full p-2 hover:bg-gray-100"
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>

              <nav className="flex flex-1 flex-col space-y-2 overflow-y-auto p-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                    className="flex cursor-pointer items-center justify-between border-b border-gray-200 py-4 transition-colors hover:text-blue-600"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              <motion.div
                className="border-t border-gray-100 p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <Button
                  asChild
                  className="w-full rounded-full bg-black text-white hover:bg-gray-800"
                >
                  <a href="#">Get started</a>
                </Button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
