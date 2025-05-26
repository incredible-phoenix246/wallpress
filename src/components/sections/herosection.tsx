'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import Link from 'next/link'
import { useCommentPopupStore } from '../miscellaneous/commentPopupStore'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin)
}

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const paragraphRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const downloadInfoRef = useRef<HTMLParagraphElement>(null)
  const { openPopup } = useCommentPopupStore()

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

    const headingText = heading.textContent || ''
    const words = headingText.split(' ')
    heading.innerHTML = words
      .map((word) => `<span class="word">${word}</span>`)
      .join(' ')
    const wordElements = heading.querySelectorAll('.word')

    const paragraphText = paragraph.textContent || ''
    const paragraphWords = paragraphText.split(' ')
    paragraph.innerHTML = paragraphWords
      .map((word) => `<span class="word">${word}</span>`)
      .join(' ')
    const paragraphWordElements = paragraph.querySelectorAll('.word')

    gsap.set(hero, {
      opacity: 0,
      scale: 1.1,
    })

    gsap.set(content, {
      opacity: 0,
      y: 50,
    })

    gsap.set(wordElements, {
      opacity: 0,
      y: 50,
      rotationX: -90,
    })

    gsap.set(paragraphWordElements, {
      opacity: 0,
      y: 30,
    })

    gsap.set(buttons.children, {
      opacity: 0,
      y: 30,
      scale: 0.8,
    })

    gsap.set(downloadInfo, {
      opacity: 0,
      y: 20,
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    })

    tl.to(hero, {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: 'power3.out',
    })

    tl.to(
      content,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      },
      '-=0.8'
    )

    tl.to(
      wordElements,
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)',
      },
      '-=0.6'
    )

    tl.to(
      paragraphWordElements,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.02,
        ease: 'power2.out',
      },
      '-=0.4'
    )

    tl.to(
      buttons.children,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
      },
      '-=0.3'
    )

    tl.to(
      downloadInfo,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      },
      '-=0.2'
    )

    const buttonElements = buttons.querySelectorAll('button')
    buttonElements.forEach((button, index) => {
      const hoverTl = gsap.timeline({ paused: true })

      if (index === 0) {
        hoverTl.to(button, {
          scale: 1.05,
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          duration: 0.3,
          ease: 'power2.out',
        })
      } else {
        hoverTl.to(button, {
          scale: 1.05,
          boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
          duration: 0.3,
          ease: 'power2.out',
        })
      }

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

    gsap.to(content, {
      y: -10,
      duration: 3,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section
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
      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center justify-center text-center max-md:px-6"
      >
        <h2
          ref={headingRef}
          className="mb-8 text-4xl font-black text-[#101828] md:text-5xl lg:text-6xl xl:text-7xl"
        >
          BUILD, HOST & LAUNCH DECENTRALIZED SITES
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
            <button
              onClick={() => openPopup()}
              className="rounded-xl bg-slate-800 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-slate-700"
            >
              Download
            </button>
            <button>
              <Link
                href="https://github.com/WalPress/site-builder"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex items-center gap-3 rounded-xl border-2 border-gray-300 bg-white px-8 py-4 text-lg font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:border-gray-400 hover:bg-gray-50"
              >
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GITHUB
              </Link>
            </button>
          </div>

          <p
            ref={downloadInfoRef}
            className="relative z-[10] text-sm text-[#1D2939]"
            onClick={() => openPopup()}
          >
            Download for MacOS (Silicon Chip)
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
