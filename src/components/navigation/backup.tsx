'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Twitter, Github, Youtube } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const socialRef = useRef<HTMLDivElement>(null)
  const copyrightRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const footer = footerRef.current
    const logo = logoRef.current
    const tagline = taglineRef.current
    const social = socialRef.current
    const copyright = copyrightRef.current

    if (!footer || !logo || !tagline || !social || !copyright) return

    const words = tagline.textContent?.split(' ') || []
    tagline.innerHTML = words
      .map((word) => `<span class="word">${word}</span>`)
      .join(' ')
    const wordElements = tagline.querySelectorAll('.word')

    gsap.set(logo, {
      scale: 0,
      rotation: -180,
      opacity: 0,
    })

    gsap.set(wordElements, {
      opacity: 0,
      y: 30,
      rotationX: -90,
    })

    gsap.set(social.children, {
      opacity: 0,
      scale: 0,
      rotation: 180,
    })

    gsap.set(copyright, {
      opacity: 0,
      y: 20,
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start: 'top 85%',
        end: 'bottom 15%',
        toggleActions: 'play none none reverse',
      },
    })

    tl.to(logo, {
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 1,
      ease: 'back.out(1.7)',
    })

    tl.to(
      wordElements,
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
      },
      '-=0.5'
    )

    tl.to(
      social.children,
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)',
      },
      '-=0.3'
    )

    tl.to(
      copyright,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      },
      '-=0.2'
    )

    const socialIcons = social.querySelectorAll('a')
    socialIcons.forEach((icon) => {
      const hoverTl = gsap.timeline({ paused: true })

      hoverTl.to(icon, {
        scale: 1.2,
        y: -5,
        duration: 0.3,
        ease: 'power2.out',
      })

      icon.addEventListener('mouseenter', () => hoverTl.play())
      icon.addEventListener('mouseleave', () => hoverTl.reverse())
    })

    gsap.to(logo, {
      y: -5,
      duration: 2,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <footer ref={footerRef} className="bg-gray-50 px-4 py-16">
      <div className="mx-auto max-w-2xl space-y-8 text-center">
        {/* Logo */}
        <div ref={logoRef} className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-800">
            <span className="text-2xl font-bold text-white">W</span>
          </div>
        </div>

        <p
          ref={taglineRef}
          className="mx-auto max-w-md text-lg leading-relaxed text-gray-600"
        >
          Empowering creators to own their digital presence without
          intermediaries.
        </p>

        <div ref={socialRef} className="flex justify-center space-x-6">
          <a
            href="#"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md transition-shadow duration-300 hover:shadow-lg"
          >
            <Twitter className="h-5 w-5 text-gray-700" />
          </a>
          <a
            href="#"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md transition-shadow duration-300 hover:shadow-lg"
          >
            <Github className="h-5 w-5 text-gray-700" />
          </a>
          <a
            href="#"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md transition-shadow duration-300 hover:shadow-lg"
          >
            <Youtube className="h-5 w-5 text-gray-700" />
          </a>
        </div>

        <p
          ref={copyrightRef}
          className="text-sm font-medium tracking-wide text-gray-500"
        >
          © WALPRESS 2025. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  )
}
