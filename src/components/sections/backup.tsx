'use client'
import { motion } from 'framer-motion'
import type React from 'react'
import BlurImage from '../miscellaneous/blur-image'

const HowItWorks = () => {
  return (
    <section className="relative mx-auto mb-36 flex w-full max-w-[1500px] flex-col items-center justify-center">
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        className="sticky top-0 flex w-full justify-center"
      >
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            offscreen: {
              y: 300,
              opacity: 0,
            },
            onscreen: {
              y: 0,
              opacity: 1,
              transition: {
                type: 'spring',
                bounce: 0.4,
                duration: 0.8,
              },
            },
          }}
          className="flex min-h-[500px] w-full flex-col justify-between rounded-t-[40px] bg-[#73E2A3] px-[80px] py-[60px] max-md:px-[20px] max-md:py-[40px] md:rounded-t-[60px]"
        >
          <BlurImage
            src="/download.png"
            width={100}
            height={100}
            alt="Head to Join the next Cohort!"
          />
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-black md:text-5xl lg:text-6xl">
              DOWNLOAD WALPRESS
            </h2>
            <div className="space-y-2">
              <p className="text-xl font-medium text-black md:text-2xl">
                Get started instantly with our local-first builder.
              </p>
              <p className="text-xl font-medium text-black md:text-2xl">
                No signups. No tracking. Just a clean starter kit that runs on
                your device — giving you full control from the very first click.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        className="sticky top-[17.5vh] flex w-full justify-center"
      >
        <motion.div
          variants={{
            offscreen: {
              y: 300,
              opacity: 0,
            },
            onscreen: {
              y: 0,
              opacity: 100,
              transition: {
                type: 'spring',
                bounce: 0.4,
                duration: 0.8,
              },
            },
          }}
          className="flex min-h-[500px] w-full flex-col justify-between rounded-t-[40px] bg-[#FDA29B] px-[80px] py-[20px] max-md:px-[20px] sm:py-[40px] md:rounded-t-[60px]"
        >
          <BlurImage
            src="/erroe.png"
            width={100}
            height={100}
            alt="Head to Join the next Cohort!"
          />
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-black md:text-5xl lg:text-6xl">
              Create Your Site
            </h2>
            <div className="space-y-2">
              <p className="text-xl font-medium text-black md:text-2xl">
                Design your page your way.
              </p>
              <p className="text-xl font-medium text-black md:text-2xl">
                Use the visual editor for hands-on control, or prompt our AI to
                generate layouts, write copy, or build entire pages. Every part
                of the site is customizable — and it all happens offline.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        className="sticky top-[32.5vh] flex w-full justify-center"
      >
        <motion.div
          variants={{
            offscreen: {
              y: 300,
              opacity: 0,
            },
            onscreen: {
              y: 0,
              opacity: 100,
              transition: {
                type: 'spring',
                bounce: 0.4,
                duration: 0.8,
              },
            },
          }}
          className="flex min-h-[500px] w-full flex-col justify-between rounded-t-[40px] bg-[#D6BBFB] px-[80px] py-[20px] max-md:px-[20px] sm:py-[40px] md:rounded-t-[60px]"
        >
          <BlurImage
            src="/globe.png"
            width={100}
            height={100}
            alt="Head to Join the next Cohort!"
          />
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-black md:text-5xl lg:text-6xl">
              Create Your Site
            </h2>
            <div className="space-y-2">
              <p className="text-xl font-medium text-black md:text-2xl">
                Claim your identity on the decentralized web.
              </p>
              <p className="text-xl font-medium text-black md:text-2xl">
                With just your wallet, register a .sui domain — no middlemen, no
                KYC, no hidden renewals. It’s fully yours and fully on-chain.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        className="sticky top-[47.5vh] flex w-full justify-center"
      >
        <motion.div
          variants={{
            offscreen: {
              y: 300,
              opacity: 0,
            },
            onscreen: {
              y: 0,
              opacity: 100,
              transition: {
                type: 'spring',
                bounce: 0.4,
                duration: 0.8,
              },
            },
          }}
          className="flex min-h-[500px] w-full flex-col justify-between rounded-t-[40px] bg-[#84CAFF] px-[80px] py-[20px] max-md:px-[20px] sm:py-[40px] md:rounded-t-[60px]"
        >
          <BlurImage
            src="/link.png"
            width={100}
            height={100}
            alt="Head to Join the next Cohort!"
          />
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-black md:text-5xl lg:text-6xl">
              Create Your Site
            </h2>
            <div className="space-y-2">
              <p className="text-xl font-medium text-black md:text-2xl">
                Claim your identity on the decentralized web.
              </p>
              <p className="text-xl font-medium text-black md:text-2xl">
                With just your wallet, register a .sui domain — no middlemen, no
                KYC, no hidden renewals. It’s fully yours and fully on-chain.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        className="sticky top-[80vh] flex w-full justify-center"
      >
        <motion.div
          variants={{
            offscreen: {
              y: 300,
              opacity: 0,
            },
            onscreen: {
              y: 0,
              opacity: 100,
              transition: {
                type: 'spring',
                bounce: 0.4,
                duration: 0.8,
              },
            },
          }}
          className="flex min-h-[500px] w-full flex-col justify-between rounded-t-[40px] bg-[#FDE272] px-[80px] py-[20px] max-md:px-[20px] sm:py-[40px] md:rounded-t-[60px]"
        >
          <BlurImage
            src="/star.png"
            width={100}
            height={100}
            alt="Head to Join the next Cohort!"
          />
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-black md:text-5xl lg:text-6xl">
              Create Your Site
            </h2>
            <div className="space-y-2">
              <p className="text-xl font-medium text-black md:text-2xl">
                Claim your identity on the decentralized web.
              </p>
              <p className="text-xl font-medium text-black md:text-2xl">
                With just your wallet, register a .sui domain — no middlemen, no
                KYC, no hidden renewals. It’s fully yours and fully on-chain.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HowItWorks
