'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin)
}

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const line1Ref = useRef<HTMLHeadingElement>(null)
  const line2Ref = useRef<HTMLHeadingElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const line1 = line1Ref.current
    const line2 = line2Ref.current
    const buttons = buttonsRef.current
    const background = backgroundRef.current

    if (!section || !line1 || !line2 || !buttons || !background) return

    gsap.set([line1, line2], {
      opacity: 0,
      y: 100,
      skewY: 7,
    })

    gsap.set(buttons.children, {
      opacity: 0,
      y: 50,
      scale: 0.8,
    })

    gsap.set(background, {
      scale: 1.1,
      opacity: 0,
    })

    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse',
      },
    })

    mainTl.to(background, {
      scale: 1,
      opacity: 1,
      duration: 1.5,
      ease: 'power3.out',
    })

    mainTl.to(
      line1,
      {
        opacity: 1,
        y: 0,
        skewY: 0,
        duration: 1.2,
        ease: 'power4.out',
      },
      '-=1'
    )

    mainTl.to(
      line2,
      {
        opacity: 1,
        y: 0,
        skewY: 0,
        duration: 1.2,
        ease: 'power4.out',
      },
      '-=0.8'
    )

    mainTl.to(
      buttons.children,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)',
      },
      '-=0.5'
    )

    gsap.to(section, {
      y: -10,
      duration: 3,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
    })

    const downloadBtn = buttons.children[0] as HTMLElement
    const learnBtn = buttons.children[1] as HTMLElement

    const downloadHover = gsap.timeline({ paused: true })
    downloadHover.to(downloadBtn, {
      scale: 1.1,
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      duration: 0.3,
      ease: 'power2.out',
    })

    downloadBtn.addEventListener('mouseenter', () => downloadHover.play())
    downloadBtn.addEventListener('mouseleave', () => downloadHover.reverse())

    const learnHover = gsap.timeline({ paused: true })
    learnHover.to(learnBtn, {
      scale: 1.05,
      backgroundColor: '#f3f4f6',
      duration: 0.3,
      ease: 'power2.out',
    })

    learnBtn.addEventListener('mouseenter', () => learnHover.play())
    learnBtn.addEventListener('mouseleave', () => learnHover.reverse())

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center overflow-hidden py-20 max-md:py-10"
    >
      <div
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        <div className="mb-12">
          <h1
            ref={line1Ref}
            className="mb-4 text-4xl leading-tight font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl xl:text-7xl"
          >
            DECENTRALIZE YOUR PRESENCE.
          </h1>
          <h1
            ref={line2Ref}
            className="text-4xl leading-tight font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl xl:text-7xl"
          >
            OWN YOUR FRONTEND.
          </h1>
        </div>

        <div
          ref={buttonsRef}
          className="flex flex-col items-center justify-center gap-6 sm:flex-row"
        >
          <button className="min-w-[160px] rounded-2xl bg-slate-800 px-10 py-5 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-slate-700">
            Download
          </button>

          <button className="min-w-[160px] rounded-2xl border-2 border-gray-200 bg-white/80 px-10 py-5 text-lg font-semibold text-gray-800 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-gray-300 hover:bg-white">
            Learn More
          </button>
        </div>
      </div>

      <div className="absolute top-20 left-20 h-2 w-2 animate-pulse rounded-full bg-slate-400 opacity-60" />
      <div
        className="absolute right-32 bottom-32 h-3 w-3 animate-pulse rounded-full bg-slate-300 opacity-40"
        style={{ animationDelay: '1s' }}
      />
      <div
        className="absolute top-1/2 left-10 h-1 w-1 animate-pulse rounded-full bg-slate-500 opacity-50"
        style={{ animationDelay: '2s' }}
      />
    </section>
  )
}
