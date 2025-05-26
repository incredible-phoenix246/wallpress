'use client'

import { useEffect, useState } from 'react'
import { Button } from 'ui/button'
import CookieIcon from './cookie-icon'
import { cn } from '~/lib/utils'

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true)
    }, 3000)
  }, [])

  useEffect(() => {
    const cookieConsent = document.cookie
      .split('; ')
      .find((row) => row.startsWith('cookieConsent='))
      ?.split('=')[1]

    setShowBanner(cookieConsent !== 'accepted')
  }, [])

  const acceptCookies = () => {
    document.cookie = 'cookieConsent=accepted; path=/; max-age=31536000'
    setShowBanner(false)
  }

  const declineCookies = () => {
    document.cookie = 'cookieConsent=declined; path=/'
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div
      className={cn(
        'fixed bottom-5 left-1/2 z-[99999] flex w-full -translate-x-1/2 flex-col items-center justify-between gap-x-2 gap-y-3 rounded-2xl bg-gray-900/90 px-4 py-3 text-white shadow-xl shadow-black/50 backdrop-blur-xl transition-all max-sm:max-w-[95%] sm:max-w-[90%] sm:flex-row sm:rounded-3xl sm:bg-gray-900 sm:py-6 md:gap-4 xl:bottom-8 xl:max-w-[1246px] xl:gap-5 xl:px-8',
        isLoaded
          ? 'translate-y-0 opacity-100 duration-700'
          : 'translate-y-[300px] opacity-0 duration-300'
      )}
    >
      <div className="font-inter flex items-start gap-3 sm:items-center xl:gap-x-5">
        <CookieIcon className="size-5 flex-shrink-0 text-gray-300 lg:size-[33px]" />
        <p className="text-[10px] font-light text-gray-200 sm:text-xs lg:text-sm">
          We use cookies and similar technologies to enhance your experience,
          improve functionality, analyze performance, and deliver targeted
          advertisements. Learn more by reviewing our terms and policies.
        </p>
      </div>
      <div className="font-inter flex shrink-0 gap-2 xl:gap-x-6">
        <Button
          variant="outline"
          size="sm"
          className="rounded-3xl border-gray-400 bg-transparent px-4 py-2 text-xs font-normal text-gray-200 hover:bg-gray-800 hover:text-white lg:px-8 lg:py-4 lg:text-sm"
          onClick={declineCookies}
        >
          Decline
        </Button>
        <Button
          size="sm"
          className="rounded-3xl bg-gray-100 px-4 py-2 text-xs text-gray-900 hover:bg-white hover:text-gray-900 lg:px-8 lg:py-4 lg:text-sm"
          onClick={acceptCookies}
        >
          Accept
        </Button>
      </div>
    </div>
  )
}
