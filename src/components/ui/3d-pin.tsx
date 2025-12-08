'use client'
import React, { useState } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

type PinVariant = 'dark' | 'light'

export const PinContainer = ({
  children,
  title,
  href,
  className,
  containerClassName,
  variant = 'dark',
}: {
  children: React.ReactNode
  title?: string
  href?: string
  className?: string
  containerClassName?: string
  variant?: PinVariant
}) => {
  const [transform, setTransform] = useState(
    'translate(-50%,-50%) rotateX(0deg)',
  )

  const onMouseEnter = () => {
    setTransform('translate(-50%,-50%) rotateX(40deg) scale(0.8)')
  }
  const onMouseLeave = () => {
    setTransform('translate(-50%,-50%) rotateX(0deg) scale(1)')
  }

  const cardBaseClass =
    'absolute left-1/2 p-4 top-1/2 flex justify-start items-start rounded-2xl shadow-[0_8px_16px_rgb(0_0_0/0.2)] transition duration-700 overflow-hidden'
  const cardVariantClass =
    variant === 'light'
      ? 'bg-white border border-slate-200 text-slate-900 group-hover/pin:border-slate-300'
      : 'bg-black border border-white/[0.1] text-white group-hover/pin:border-white/[0.2]'

  const childVariantClass =
    variant === 'light' ? 'text-slate-900' : 'text-white'

  return (
    <a
      className={cn(
        'relative group/pin z-20  cursor-pointer',
        containerClassName,
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      href={href || '/'}
    >
      <div
        style={{
          perspective: '1000px',
          transform: 'rotateX(70deg) translateZ(0deg)',
        }}
        className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
      >
        <div
          style={{
            transform: transform,
          }}
          className={cn(cardBaseClass, cardVariantClass)}
        >
          <div className={cn(' relative z-20 ', childVariantClass, className)}>
            {children}
          </div>
        </div>
      </div>
      <PinPerspective title={title} href={href} variant={variant} />
    </a>
  )
}

export const PinPerspective = ({
  title,
  href,
  variant = 'dark',
}: {
  title?: string
  href?: string
  variant?: PinVariant
}) => {
  const perspectiveVariants: Record<
    PinVariant,
    {
      badgeClass: string
      badgeUnderline: string
      haloClass: string
      beamClass: string
      dotPrimary: string
      dotSecondary: string
    }
  > = {
    dark: {
      badgeClass: 'bg-zinc-950 text-white ring-1 ring-white/10',
      badgeUnderline:
        'bg-gradient-to-r from-theme-primary/0 via-theme-primary/90 to-theme-primary/0',
      haloClass: 'bg-theme-secondary/[0.08]',
      beamClass: 'bg-gradient-to-b from-transparent to-theme-secondary',
      dotPrimary: 'bg-theme-secondary',
      dotSecondary: 'bg-theme-primary-light',
    },
    light: {
      badgeClass: 'bg-white/90 text-slate-900 ring-1 ring-slate-200',
      badgeUnderline:
        'bg-gradient-to-r from-theme-primary/0 via-theme-primary/70 to-theme-primary/0',
      haloClass: 'bg-theme-primary/[0.14]',
      beamClass: 'bg-gradient-to-b from-transparent to-theme-primary',
      dotPrimary: 'bg-theme-primary',
      dotSecondary: 'bg-theme-primary-light',
    },
  }
  const styles = perspectiveVariants[variant]

  return (
    <motion.div className="pointer-events-none  w-96 h-80 flex items-center justify-center opacity-0 group-hover/pin:opacity-100 z-[60] transition duration-500">
      <div className=" w-full h-full -mt-7 flex-none  inset-0">
        <div className="absolute top-0 inset-x-0  flex justify-center">
          <a
            href={href}
            target={'_blank'}
            className={cn(
              'relative flex space-x-2 items-center z-10 rounded-full py-0.5 px-4',
              styles.badgeClass,
            )}
          >
            <span className="relative z-20 text-xs font-bold inline-block py-0.5">
              {title}
            </span>

            <span
              className={cn(
                'absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] transition-opacity duration-500 group-hover/btn:opacity-40',
                styles.badgeUnderline,
              )}
            ></span>
          </a>
        </div>

        <div
          style={{
            perspective: '1000px',
            transform: 'rotateX(70deg) translateZ(0)',
          }}
          className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
        >
          <>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: '-50%',
                y: '-50%',
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,

                z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 0,
              }}
              className={cn(
                'absolute left-1/2 top-1/2  h-[11.25rem] w-[11.25rem] rounded-[50%] shadow-[0_8px_16px_rgb(0_0_0/0.4)]',
                styles.haloClass,
              )}
            ></motion.div>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: '-50%',
                y: '-50%',
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,

                z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 2,
              }}
              className={cn(
                'absolute left-1/2 top-1/2  h-[11.25rem] w-[11.25rem] rounded-[50%] shadow-[0_8px_16px_rgb(0_0_0/0.4)]',
                styles.haloClass,
              )}
            ></motion.div>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: '-50%',
                y: '-50%',
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,

                z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 4,
              }}
              className={cn(
                'absolute left-1/2 top-1/2  h-[11.25rem] w-[11.25rem] rounded-[50%] shadow-[0_8px_16px_rgb(0_0_0/0.4)]',
                styles.haloClass,
              )}
            ></motion.div>
          </>
        </div>

        <>
          <motion.div
            className={cn(
              'absolute right-1/2 bottom-1/2 translate-y-[14px] w-px h-20 group-hover/pin:h-40 blur-[2px]',
              styles.beamClass,
            )}
          />
          <motion.div
            className={cn(
              'absolute right-1/2 bottom-1/2 translate-y-[14px] w-px h-20 group-hover/pin:h-40',
              styles.beamClass,
            )}
          />
          <motion.div
            className={cn(
              'absolute right-1/2 translate-x-[1.5px] bottom-1/2 translate-y-[14px] w-[4px] h-[4px] rounded-full z-40 blur-[3px]',
              styles.dotPrimary,
            )}
          />
          <motion.div
            className={cn(
              'absolute right-1/2 translate-x-[0.5px] bottom-1/2 translate-y-[14px] w-[2px] h-[2px] rounded-full z-40',
              styles.dotSecondary,
            )}
          />
        </>
      </div>
    </motion.div>
  )
}
