'use client'

import { motion } from 'framer-motion'
import BlurImage from '../miscellaneous/blur-image'
import { cn } from '~/lib/utils'

export interface UseCaseCardProps {
  title: string
  description: string
  imageSrc: string
  className?: string
}

export default function UseCaseCard({
  title,
  description,
  imageSrc,
  className,
}: UseCaseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'relative w-full min-w-[380px] overflow-hidden transition-shadow duration-300 md:min-w-[680px] lg:min-w-[1440px]',
        className
      )}
    >
      <div className="flex flex-col lg:flex-row">
        <motion.div
          className="flex flex-1 flex-col justify-center p-8 lg:p-12"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.h2
            className="mb-6 text-2xl leading-tight font-bold tracking-tight text-gray-900 lg:text-3xl xl:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {title}
          </motion.h2>

          <motion.p
            className="text-base leading-relaxed text-gray-600 lg:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {description}
          </motion.p>
        </motion.div>

        <motion.div
          className="relative flex min-h-[300px] flex-1 items-center justify-center lg:min-h-[420px]"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            className="relative flex h-full w-full items-center justify-center overflow-hidden"
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <BlurImage
              src={imageSrc}
              alt="illustration"
              width={688}
              height={420}
              className="object-cover transition-transform duration-700"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
