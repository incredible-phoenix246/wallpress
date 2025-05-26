'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    const buttons = buttonsRef.current

    if (!section || !heading || !buttons) return

    const words = heading.textContent?.split(' ') || []
    heading.innerHTML = words
      .map((word) => `<span class="word">${word}</span>`)
      .join(' ')

    const wordElements = heading.querySelectorAll('.word')
    const buttonElements = buttons.querySelectorAll('button')

    gsap.set(wordElements, {
      opacity: 0,
      y: 50,
      rotationX: -90,
    })

    gsap.set(buttonElements, {
      opacity: 0,
      y: 30,
      scale: 0.8,
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    })

    tl.to(wordElements, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'back.out(1.7)',
    })

    tl.to(
      buttonElements,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.7)',
      },
      '-=0.3'
    )

    buttonElements.forEach((button) => {
      const hoverTl = gsap.timeline({ paused: true })

      hoverTl.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out',
      })

      button.addEventListener('mouseenter', () => hoverTl.play())
      button.addEventListener('mouseleave', () => hoverTl.reverse())
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-20"
    >
      <div className="mx-auto max-w-4xl text-center">
        <h1
          ref={headingRef}
          className="mb-12 text-4xl leading-tight font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl xl:text-7xl"
        >
          DECENTRALIZE YOUR PRESENCE. OWN YOUR FRONTEND.
        </h1>

        <div
          ref={buttonsRef}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button className="min-w-[140px] rounded-xl bg-slate-800 px-8 py-4 text-lg font-semibold text-white transition-colors duration-300 hover:bg-slate-700">
            Download
          </button>

          <button className="min-w-[140px] rounded-xl border-2 border-transparent bg-transparent px-8 py-4 text-lg font-semibold text-gray-800 transition-all duration-300 hover:border-gray-200 hover:bg-gray-100">
            Learn More
          </button>
        </div>
      </div>
    </section>
  )
}
