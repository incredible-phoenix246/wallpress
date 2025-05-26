'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const paragraphRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const downloadInfoRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    const content = contentRef.current
    const heading = headingRef.current
    const paragraph = paragraphRef.current
    const buttons = buttonsRef.current
    const downloadInfo = downloadInfoRef.current

    if (
      !hero ||
      !content ||
      !heading ||
      !paragraph ||
      !buttons ||
      !downloadInfo
    )
      return

    // Set initial states
    gsap.set(hero, {
      opacity: 0,
      y: 50,
    })

    gsap.set(content, {
      opacity: 0,
      y: 30,
    })

    gsap.set(heading, {
      opacity: 0,
      y: 30,
    })

    gsap.set(paragraph, {
      opacity: 0,
      y: 20,
    })

    gsap.set(buttons, {
      opacity: 0,
      y: 20,
    })

    gsap.set(downloadInfo, {
      opacity: 0,
    })

    // Create main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    })

    // Hero container animation
    tl.to(hero, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    })

    // Content wrapper animation
    tl.to(
      content,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      },
      '-=0.6' // Start 0.6s before previous animation ends (equivalent to 0.2s delay)
    )

    // Heading animation
    tl.to(
      heading,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      },
      '-=0.5' // Start 0.5s before previous animation ends (equivalent to 0.3s total delay)
    )

    // Paragraph animation
    tl.to(
      paragraph,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      },
      '-=0.6' // Start 0.6s before previous animation ends (equivalent to 0.5s total delay)
    )

    // Buttons animation
    tl.to(
      buttons,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      },
      '-=0.4' // Start 0.4s before previous animation ends (equivalent to 0.7s total delay)
    )

    // Download info animation
    tl.to(
      downloadInfo,
      {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      },
      '-=0.2' // Start 0.2s before previous animation ends (equivalent to 0.9s total delay)
    )

    // Button hover effects
    const buttonElements = buttons.querySelectorAll('button')
    buttonElements.forEach((button) => {
      const hoverTl = gsap.timeline({ paused: true })

      hoverTl.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out',
      })

      // Tap effect
      const tapTl = gsap.timeline({ paused: true })
      tapTl.to(button, {
        scale: 0.95,
        duration: 0.1,
        ease: 'power2.out',
      })

      button.addEventListener('mouseenter', () => hoverTl.play())
      button.addEventListener('mouseleave', () => hoverTl.reverse())
      button.addEventListener('mousedown', () => tapTl.play())
      button.addEventListener('mouseup', () => tapTl.reverse())
    })

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <header
      ref={heroRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('/hero.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      id="hero"
    >
      <div className="absolute inset-0 bg-black/10" />
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center text-center max-md:px-6"
      >
        <h2
          ref={headingRef}
          className="mb-8 text-4xl font-black text-[#101828] md:text-5xl lg:text-6xl xl:text-7xl"
        >
          BUILD, HOST & LAUNCH
          <br />
          DECENTRALIZED SITES
        </h2>

        <p
          ref={paragraphRef}
          className="mx-auto mb-12 max-w-4xl text-lg font-medium text-[#1D2939] md:text-xl lg:text-2xl"
        >
          Build locally, connect a SuiNS domain, and publish to Walrus — a
          censorship-resistant network. Walpress gives creators, DAOs, and
          developers the power to launch fast.
        </p>

        <div ref={buttonsRef} className="flex flex-col items-center gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
            <button className="rounded-xl bg-slate-800 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-slate-700 hover:shadow-lg">
              Download
            </button>
            <button className="rounded-xl bg-white px-8 py-4 text-lg font-semibold text-slate-800 transition-all duration-300 hover:bg-gray-100 hover:shadow-lg">
              Learn More
            </button>
          </div>

          <p ref={downloadInfoRef} className="text-sm text-[#1D2939]">
            Download for MacOS (Silicon Chip)
          </p>
        </div>
      </div>
    </header>
  )
}

export default Hero
