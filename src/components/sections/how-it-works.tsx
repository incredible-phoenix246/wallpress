'use client'

import { motion } from 'framer-motion'
import BlurImage from '../miscellaneous/blur-image'
import { useCommentPopupStore } from '../miscellaneous/commentPopupStore'

interface Step {
  id: string
  title: string
  description: string[]
  backgroundColor: string
  iconSrc: string
  iconAlt: string
}

const steps: Step[] = [
  {
    id: 'download',
    title: 'DOWNLOAD WALPRESS',
    description: [
      'Get started instantly with our local-first builder.',
      'No signups. No tracking. Just a clean starter kit that runs on your device — giving you full control from the very first click.',
    ],
    backgroundColor: '#73E2A3',
    iconSrc: '/download.png',
    iconAlt: 'Download WalPress',
  },
  {
    id: 'create',
    title: 'CREATE YOUR SITE',
    description: [
      'Design your page your way.',
      'Use the visual editor for hands-on control, or prompt our AI to generate layouts, write copy, or build entire pages. Every part of the site is customizable — and it all happens offline.',
    ],
    backgroundColor: '#FDA29B',
    iconSrc: '/erroe.png',
    iconAlt: 'Create your site',
  },
  {
    id: 'domain',
    title: 'CLAIM YOUR DOMAIN',
    description: [
      'Claim your identity on the decentralized web.',
      "With just your wallet, register a .sui domain — no middlemen, no KYC, no hidden renewals. It's fully yours and fully on-chain.",
    ],
    backgroundColor: '#D6BBFB',
    iconSrc: '/globe.png',
    iconAlt: 'Claim your domain',
  },
  {
    id: 'connect',
    title: 'CONNECT & SHARE',
    description: [
      'Link your creations to the world.',
      'Seamlessly connect your local site to your domain and share it with anyone. Your content stays under your control while being accessible globally.',
    ],
    backgroundColor: '#84CAFF',
    iconSrc: '/link.png',
    iconAlt: 'Connect and share',
  },
  {
    id: 'launch',
    title: 'LAUNCH & THRIVE',
    description: [
      'Go live with confidence.',
      'Deploy your site to the decentralized web with one click. No hosting fees, no downtime, no restrictions — just your content, your way, forever.',
    ],
    backgroundColor: '#FDE272',
    iconSrc: '/star.png',
    iconAlt: 'Launch and thrive',
  },
]

const cardVariants = {
  offscreen: {
    y: 100,
    opacity: 0,
    scale: 0.95,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

const iconVariants = {
  offscreen: {
    scale: 0,
    rotate: -180,
  },
  onscreen: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
      delay: 0.2,
    },
  },
}

const textVariants = {
  offscreen: {
    y: 20,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

const HowItWorks = () => {
  const { openPopup } = useCommentPopupStore()
  return (
    <section
      className="relative mx-auto mb-36 flex w-full max-w-[1500px] flex-col items-center justify-center"
      aria-labelledby="how-it-works-title"
    >
      <div className="flex w-full flex-col items-start justify-center px-20 py-6 max-md:px-5 sm:py-8">
        <h2 className="mb-8 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
          HOW WALPRESS WORKS
        </h2>
        <p className="max-w-3xl text-lg leading-relaxed text-gray-800 md:text-xl">
          Walpress gives you all the tools to build, own, and publish your Web3
          presence — no extra platforms, no middlemen, no compromises.
        </p>
      </div>
      <div className="sr-only">
        <h2 id="how-it-works-title">How WalPress Works - Step by Step Guide</h2>
      </div>

      {steps.map((step, index) => {
        const topPosition = index * 13
        return (
          <motion.div
            key={step.id}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            className="sticky flex w-full justify-center"
            style={{ top: `${topPosition}vh` }}
          >
            <motion.article
              variants={cardVariants}
              className="flex min-h-[500px] w-full flex-col justify-between px-20 py-10 transition-all duration-300 hover:shadow-2xl max-md:px-5 max-md:py-8"
              style={{ backgroundColor: step.backgroundColor }}
            >
              <div className="flex h-[266px] w-full flex-col justify-between">
                <motion.div variants={iconVariants} className="flex-shrink-0">
                  <BlurImage
                    src={step.iconSrc}
                    width={80}
                    height={80}
                    alt={step.iconAlt}
                    className="transition-transform duration-300 hover:scale-110"
                    priority={index < 2}
                  />
                </motion.div>

                <motion.div variants={textVariants} className="space-y-6">
                  <h3 className="text-2xl font-black text-black md:text-3xl lg:text-4xl">
                    {step.title}
                  </h3>
                  <div className="space-y-3">
                    {step.description.map((paragraph, paragraphIndex) => (
                      <motion.p
                        key={paragraphIndex}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.4 + paragraphIndex * 0.1,
                          duration: 0.5,
                        }}
                        className="text-md text-black md:text-xl"
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                    {index === 0 && (
                      <button
                        onClick={() => openPopup()}
                        className="mt-5 rounded-xl bg-slate-800 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-slate-700"
                      >
                        Download
                      </button>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.article>
          </motion.div>
        )
      })}
    </section>
  )
}

export default HowItWorks
