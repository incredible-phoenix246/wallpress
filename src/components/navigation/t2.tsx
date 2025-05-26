'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Twitter, Github, Youtube } from 'lucide-react'
import BlurImage from '../miscellaneous/blur-image'
import Link from 'next/link'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const socialRef = useRef<HTMLDivElement>(null)
  const copyrightRef = useRef<HTMLParagraphElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const footer = footerRef.current
    const logo = logoRef.current
    const tagline = taglineRef.current
    const social = socialRef.current
    const copyright = copyrightRef.current
    const background = backgroundRef.current

    if (!footer || !logo || !tagline || !social || !copyright || !background)
      return

    const createFloatingElements = () => {
      for (let i = 0; i < 5; i++) {
        const element = document.createElement('div')
        element.className =
          'absolute w-2 h-2 bg-slate-200 rounded-full opacity-30'
        element.style.left = `${Math.random() * 100}%`
        element.style.top = `${Math.random() * 100}%`
        background.appendChild(element)

        gsap.to(element, {
          y: -20,
          x: Math.random() * 40 - 20,
          duration: 3 + Math.random() * 2,
          ease: 'power1.inOut',
          yoyo: true,
          repeat: -1,
          delay: Math.random() * 2,
        })
      }
    }

    createFloatingElements()

    const chars = tagline.textContent?.split('') || []
    tagline.innerHTML = chars
      .map((char) => (char === ' ' ? ' ' : `<span class="char">${char}</span>`))
      .join('')
    const charElements = tagline.querySelectorAll('.char')

    gsap.set(logo, {
      scale: 0,
      rotation: -360,
      opacity: 0,
    })

    gsap.set(charElements, {
      opacity: 0,
      y: 50,
      rotation: 15,
    })

    gsap.set(social.children, {
      opacity: 0,
      scale: 0,
      y: 30,
    })

    gsap.set(copyright, {
      opacity: 0,
      y: 30,
      skewY: 5,
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start: 'top 90%',
        end: 'bottom 10%',
        toggleActions: 'play none none reverse',
      },
    })

    tl.to(logo, {
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'elastic.out(1, 0.5)',
    })

    tl.to(
      charElements,
      {
        opacity: 1,
        y: 0,
        rotation: 0,
        duration: 0.05,
        stagger: 0.02,
        ease: 'power2.out',
      },
      '-=0.6'
    )

    tl.to(
      social.children,
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(2)',
      },
      '-=0.4'
    )

    tl.to(
      copyright,
      {
        opacity: 1,
        y: 0,
        skewY: 0,
        duration: 0.8,
        ease: 'power3.out',
      },
      '-=0.3'
    )

    const socialIcons = social.querySelectorAll('a')
    socialIcons.forEach((icon, index) => {
      const hoverTl = gsap.timeline({ paused: true })

      const effects = [
        { scale: 1.3, rotation: 10, backgroundColor: '#1DA1F2' },
        { scale: 1.3, rotation: -10, backgroundColor: '#333' },
        { scale: 1.3, rotation: 5, backgroundColor: '#FF0000' },
      ]

      hoverTl.to(icon, {
        ...effects[index],
        duration: 0.3,
        ease: 'power2.out',
      })

      icon.addEventListener('mouseenter', () => hoverTl.play())
      icon.addEventListener('mouseleave', () => hoverTl.reverse())
    })

    // gsap.to(logo, {
    //   scale: 1.05,
    //   duration: 2,
    //   ease: 'power1.inOut',
    //   yoyo: true,
    //   repeat: -1,
    // })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-20"
    >
      <div ref={backgroundRef} className="absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-2xl space-y-10 text-center">
        <div ref={logoRef} className="flex justify-center">
          <div className="relative">
            <BlurImage
              src="/footer_logo.png"
              alt="Reworkd"
              width={80}
              height={80}
            />
          </div>
        </div>

        <p
          ref={taglineRef}
          className="mx-auto max-w-lg text-xl leading-relaxed font-medium text-gray-600"
        >
          Empowering creators to own their digital presence without
          intermediaries.
        </p>

        <div ref={socialRef} className="flex justify-center space-x-8">
          <Link
            href="https://x.com/WalpressApp"
            target="_blank"
            className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            <Twitter className="h-6 w-6 text-gray-700" />
          </Link>
          <Link
            href="https://github.com/WalPress/site-builder"
            target="_blank"
            className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            <Github className="h-6 w-6 text-gray-700" />
          </Link>
          <Link
            href="https://www.youtube.com/@WalpressAPP"
            target="_blank"
            className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            <Youtube className="h-6 w-6 text-gray-700" />
          </Link>
        </div>

        <p
          ref={copyrightRef}
          className="text-sm font-semibold tracking-wider text-gray-500"
        >
          © WALPRESS 2025. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  )
}
