// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Twitter,
  Linkedin,
  Facebook,
  Github,
  Zap,
  Dribbble,
} from "lucide-react";
import { Badge } from "ui/badge";
import BlurImage from "../miscellaneous/blur-image";

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const linkVariants = {
    hover: {
      x: 4,
      transition: { duration: 0.2 },
    },
  };

  const socialVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.footer
      className="border-t border-gray-200 bg-white px-4 py-16 md:px-6 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          <motion.div
            className="space-y-4 lg:col-span-1"
            variants={itemVariants}
          >
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <BlurImage src="/logo.png" alt="Reworkd" width={40} height={40} />
            </motion.div>
            <p className="max-w-xs text-sm leading-relaxed text-gray-600">
              Empowering creators to own their digital presence without
              intermediaries.
            </p>
          </motion.div>

          <motion.div className="space-y-4" variants={itemVariants}>
            <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">
              PRODUCT
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Download Tool", href: "#" },
                { name: "Documentation", href: "#" },
                { name: "Templates", href: "#", badge: "New" },
                { name: "API Reference", href: "#" },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  variants={linkVariants}
                  whileHover="hover"
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 text-gray-600 transition-colors duration-200 hover:text-gray-900"
                  >
                    {item.name}
                    {item.badge && (
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 px-2 py-0.5 text-xs text-blue-700"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="space-y-4" variants={itemVariants}>
            <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">
              COMPANY
            </h3>
            <ul className="space-y-3">
              {[
                { name: "About us", href: "#" },
                { name: "Careers", href: "#" },
                { name: "Contact Us", href: "#" },
                { name: "Help Centre", href: "#" },
                { name: "Status", href: "#" },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  variants={linkVariants}
                  whileHover="hover"
                >
                  <Link
                    href={item.href}
                    className="text-gray-600 transition-colors duration-200 hover:text-gray-900"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="space-y-4" variants={itemVariants}>
            <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">
              RESOURCES
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Getting Started", href: "#" },
                { name: "SuiNS Guide", href: "#" },
                { name: "Community", href: "#" },
                { name: "Blog", href: "#" },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  variants={linkVariants}
                  whileHover="hover"
                >
                  <Link
                    href={item.href}
                    className="text-gray-600 transition-colors duration-200 hover:text-gray-900"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="space-y-4" variants={itemVariants}>
            <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">
              LEGAL
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Terms", href: "#" },
                { name: "Privacy", href: "#" },
                { name: "Cookies", href: "#" },
                { name: "Licenses", href: "#" },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  variants={linkVariants}
                  whileHover="hover"
                >
                  <Link
                    href={item.href}
                    className="text-gray-600 transition-colors duration-200 hover:text-gray-900"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 flex flex-col items-center justify-between space-y-4 border-t border-gray-200 bg-[##F9FAFB] pt-8 font-bold md:flex-row md:space-y-0"
          variants={itemVariants}
        >
          <motion.p
            className="text-sm text-gray-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            © WALPRESS {new Date().getFullYear()}. ALL RIGHTS RESERVED.
          </motion.p>

          <motion.div
            className="flex space-x-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {[
              { icon: Twitter, href: "#", label: "Twitter" },
              { icon: Linkedin, href: "#", label: "LinkedIn" },
              { icon: Facebook, href: "#", label: "Facebook" },
              { icon: Github, href: "#", label: "GitHub" },
              { icon: Zap, href: "#", label: "Zap" },
              { icon: Dribbble, href: "#", label: "Dribbble" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                className="text-gray-400 transition-colors duration-200 hover:text-gray-600"
                variants={socialVariants}
                whileHover="hover"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
