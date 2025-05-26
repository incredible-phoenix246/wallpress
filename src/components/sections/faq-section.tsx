'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import BlurImage from '../miscellaneous/blur-image'

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: 'WHAT IS WALPRESS?',
    answer:
      "Walpress is a decentralized website builder that lets you build your frontend locally, connect a wallet-owned SuiNS domain, and deploy censorship-resistant content to the Walrus storage network. It's like WordPress — but for Web3.",
  },
  {
    question: 'DO I NEED TO KNOW HOW TO CODE?',
    answer:
      'No coding knowledge is required! Walpress provides an intuitive drag-and-drop interface that makes it easy for anyone to create professional websites. However, if you do know how to code, you can customize your site further with custom HTML, CSS, and JavaScript.',
  },
  {
    question: 'WHAT KIND OF SITES CAN I BUILD WITH WALPRESS?',
    answer:
      'You can build any type of website including blogs, portfolios, business websites, e-commerce stores, landing pages, and more. Walpress supports all the features you need for modern web development while maintaining decentralization.',
  },
  {
    question: 'WHAT IS SUINS?',
    answer:
      'SuiNS (Sui Name Service) is a decentralized domain name system built on the Sui blockchain. It allows you to register human-readable domain names that you truly own, without relying on traditional DNS providers.',
  },
  {
    question: 'IS THERE A COST TO USE WALPRESS?',
    answer:
      'Walpress itself is free to use. You only pay for blockchain transaction fees when registering domains or deploying content. These costs are minimal and much lower than traditional hosting services.',
  },
  {
    question: 'WHAT IS WALRUS?',
    answer:
      'Walrus is a decentralized storage network that provides censorship-resistant, permanent storage for your website content. It ensures your site remains accessible even if traditional hosting providers fail or censor content.',
  },
  {
    question: 'HOW IS THIS DIFFERENT FROM USING NETLIFY, VERCEL, OR AWS?',
    answer:
      'Unlike traditional hosting providers, Walpress offers true ownership and censorship resistance. Your content is stored on a decentralized network, you own your domain through blockchain technology, and no single entity can take down your site.',
  },
]

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([0]) // First item open by default

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

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
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const avatarVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: 'spring',
        stiffness: 200,
      },
    }),
  }

  return (
    <section className="bg-[#F6F5F0] px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.h2
            className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl"
            variants={itemVariants}
          >
            FREQUENTLY ASKED QUESTIONS
          </motion.h2>
          <motion.p
            className="mx-auto max-w-2xl text-lg text-gray-600"
            variants={itemVariants}
          >
            Everything you need to know about the product and billing.
          </motion.p>
        </motion.div>

        <motion.div
          className="mx-auto mb-20 max-w-4xl space-y-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
        >
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              className="border-b border-gray-200 last:border-b-0"
              variants={itemVariants}
            >
              <motion.button
                className="flex w-full items-center justify-between px-0 py-8 text-left transition-colors duration-200 hover:bg-gray-50/50"
                onClick={() => toggleItem(index)}
                whileTap={{ scale: 0.99 }}
              >
                <span className="pr-4 text-lg font-semibold text-gray-900">
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: openItems.includes(index) ? 0 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {openItems.includes(index) ? (
                    <Minus className="h-6 w-6 flex-shrink-0 text-gray-600" />
                  ) : (
                    <Plus className="h-6 w-6 flex-shrink-0 text-gray-600" />
                  )}
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {openItems.includes(index) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: 'auto',
                      opacity: 1,
                      transition: {
                        height: { duration: 0.3, ease: 'easeOut' },
                        opacity: { duration: 0.2, delay: 0.1 },
                      },
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                      transition: {
                        height: { duration: 0.3, ease: 'easeIn' },
                        opacity: { duration: 0.1 },
                      },
                    }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      className="max-w-3xl pb-8 leading-relaxed text-gray-600"
                      initial={{ y: -10 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                    >
                      {item.answer}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="rounded-2xl bg-white p-12 text-center shadow-sm"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div
            className="mb-8 flex justify-center"
            variants={itemVariants}
          >
            <div className="flex -space-x-4">
              <motion.div
                className="relative"
                custom={0}
                variants={avatarVariants}
                whileHover={{ scale: 1.1, zIndex: 10 }}
              >
                <BlurImage
                  src="/sfs.png"
                  alt="Team member 2"
                  width={60}
                  height={60}
                  className="rounded-full shadow-lg"
                />
              </motion.div>
              <motion.div
                className="relative"
                custom={1}
                variants={avatarVariants}
                whileHover={{ scale: 1.1, zIndex: 10 }}
              >
                <BlurImage
                  src="/cus.png"
                  alt="Team member 2"
                  width={60}
                  height={60}
                  className="rounded-full shadow-lg"
                />
              </motion.div>
              <motion.div
                className="relative"
                custom={2}
                variants={avatarVariants}
                whileHover={{ scale: 1.1, zIndex: 10 }}
              >
                <BlurImage
                  src="/cd.png"
                  alt="Team member 2"
                  width={60}
                  height={60}
                  className="rounded-full shadow-lg"
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.h3
            className="mb-4 text-2xl font-bold text-gray-900"
            variants={itemVariants}
          >
            STILL HAVE QUESTIONS?
          </motion.h3>

          <motion.p
            className="mx-auto mb-8 max-w-md text-gray-600"
            variants={itemVariants}
          >
            Can&apos;t find the answer you&apos;re looking for? Please chat to
            our friendly team.
          </motion.p>

          <motion.button
            className="rounded-lg bg-[#213B4D] px-8 py-4 font-semibold text-white transition-colors duration-200 hover:bg-slate-700"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in touch
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
