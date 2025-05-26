'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { X, Minimize2, Download } from 'lucide-react'
import { cn } from '~/lib/utils'
import { useCommentPopupStore } from './commentPopupStore'

export default function CommentPopup() {
  const { isOpen, isMobile, closePopup, setIsMobile } = useCommentPopupStore()
  const popupRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const popup = popupRef.current
    const overlay = overlayRef.current
    const content = contentRef.current

    if (!popup || !overlay || !content) return

    const handleOutsideClick = (e: MouseEvent) => {
      if (content && !content.contains(e.target as Node)) {
        closePopup()
      }
    }

    if (isOpen) {
      gsap.set(popup, { visibility: 'visible' })

      if (isMobile) {
        gsap.set(content, { y: '100%' })
        gsap.set(overlay, { opacity: 0 })

        const tl = gsap.timeline()
        tl.to(overlay, { opacity: 1, duration: 0.3, ease: 'power2.out' })
        tl.to(content, { y: '0%', duration: 0.5, ease: 'power3.out' }, '-=0.2')
      } else {
        gsap.set(content, { scale: 0.7, opacity: 0, x: 50, y: 50 })
        gsap.set(overlay, { opacity: 0 })

        const tl = gsap.timeline()
        tl.to(overlay, { opacity: 0.3, duration: 0.3, ease: 'power2.out' })
        tl.to(
          content,
          {
            scale: 1,
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'back.out(1.7)',
          },
          '-=0.2'
        )
      }

      setTimeout(() => {
        document.addEventListener('mousedown', handleOutsideClick)
      }, 100)
    } else {
      document.removeEventListener('mousedown', handleOutsideClick)

      if (isMobile) {
        const tl = gsap.timeline()
        tl.to(content, { y: '100%', duration: 0.4, ease: 'power3.in' })
        tl.to(overlay, { opacity: 0, duration: 0.3 }, '-=0.2')
        tl.set(popup, { visibility: 'hidden' })
      } else {
        const tl = gsap.timeline()
        tl.to(content, {
          scale: 0.7,
          opacity: 0,
          x: 50,
          y: 50,
          duration: 0.3,
          ease: 'power3.in',
        })
        tl.to(overlay, { opacity: 0, duration: 0.2 }, '-=0.2')
        tl.set(popup, { visibility: 'hidden' })
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isOpen, isMobile, closePopup])

  const handleDownload = () => {
    const downloadButton = document.querySelector('.download-button')
    if (downloadButton) {
      gsap.to(downloadButton, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
      })
    }

    console.log('Starting download...')
  }

  return (
    <div
      ref={popupRef}
      className={cn(
        'fixed inset-0 z-50',
        isMobile ? 'flex items-end' : 'flex items-end justify-end p-6'
      )}
      style={{ visibility: isOpen ? 'visible' : 'hidden' }}
    >
      <div ref={overlayRef} className="absolute inset-0" />

      <div
        ref={contentRef}
        className={cn(
          'relative z-10 rounded-t-2xl bg-white text-gray-900 shadow-2xl',
          isMobile ? 'w-full max-w-md rounded-t-2xl' : 'w-96 rounded-2xl'
        )}
      >
        <div className="flex items-center justify-between border-b border-gray-700 p-4">
          <h3 className="text-lg font-semibold">Comment</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={closePopup}
              className="rounded-lg p-1.5 transition-colors duration-200 hover:bg-gray-700"
            >
              <Minimize2 className="h-4 w-4" />
            </button>
            <button
              onClick={closePopup}
              className="rounded-lg p-1.5 transition-colors duration-200 hover:bg-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="space-y-4 p-4">
          <div className="space-y-3">
            <div className="space-y-3 text-sm leading-relaxed text-gray-800">
              <p>
                This app is currently in its{' '}
                <span className="font-semibold text-gray-900">
                  Proof of Concept (POC)
                </span>{' '}
                stage. Things might break, behave unexpectedly, or change
                without notice. We&apos;re actively testing and improving—thanks
                for your patience!
              </p>

              <p>
                CTA on the Modal or Tooltip Should have continue or Download
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 p-4">
          <button
            onClick={handleDownload}
            className="download-button flex w-full items-center justify-center gap-2 rounded-lg bg-[#1D2939] px-4 py-3 font-semibold text-white transition-all duration-200 hover:bg-blue-700"
          >
            <Download className="h-5 w-5" />
            Continue to Download
          </button>
        </div>
      </div>
    </div>
  )
}
