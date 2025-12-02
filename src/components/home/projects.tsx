'use client'

import React, { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { useOutsideClick } from '@/hooks/use-outside-click'

const Projects = () => {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null,
  )
  const id = useId()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActive(false)
      }
    }

    if (active && typeof active === 'object') {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [active])

  useOutsideClick(ref, () => setActive(null))

  return (
    <LayoutGroup>
      <section className="py-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-neutral-800 dark:text-neutral-200">
          My Projects
        </h2>
        <AnimatePresence>
          {active && typeof active === 'object' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 h-full w-full z-10"
            />
          )}
        </AnimatePresence>
        <AnimatePresence mode="popLayout">
          {active && typeof active === 'object' ? (
            <div className="fixed inset-0 grid place-items-center z-[100]">
              <motion.button
                key={`button-${active.title}-${id}`}
                layout
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                  transition: {
                    duration: 0.05,
                  },
                }}
                className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
                onClick={() => setActive(null)}
              >
                <CloseIcon />
              </motion.button>
              <motion.div
                layoutId={`card-${active.title}-${id}`}
                ref={ref}
                className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
              >
                <motion.div layoutId={`image-${active.title}-${id}`}>
                  <img
                    width={200}
                    height={200}
                    src={active.src}
                    alt={active.title}
                    className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                  />
                </motion.div>

                <div>
                  <div className="flex justify-between items-start p-4">
                    <div className="">
                      <motion.h3
                        layoutId={`title-${active.title}-${id}`}
                        className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                      >
                        {active.title}
                      </motion.h3>
                      <motion.p
                        layoutId={`description-${active.description}-${id}`}
                        className="text-neutral-600 dark:text-neutral-400 text-base"
                      >
                        {active.description}
                      </motion.p>
                    </div>

                    <motion.a
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      href={active.ctaLink}
                      target="_blank"
                      className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                    >
                      {active.ctaText}
                    </motion.a>
                  </div>
                  <div className="pt-4 relative px-4">
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                    >
                      {typeof active.content === 'function'
                        ? active.content()
                        : active.content}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : null}
        </AnimatePresence>
        <ul className="max-w-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-start gap-4">
          {cards.map((card) => (
            <motion.div
              layoutId={`card-${card.title}-${id}`}
              key={card.title}
              onClick={() => setActive(card)}
              className="p-4 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
            >
              <div className="flex gap-4 flex-col w-full">
                <motion.div layoutId={`image-${card.title}-${id}`}>
                  <img
                    width={100}
                    height={100}
                    src={card.src}
                    alt={card.title}
                    className="h-60 w-full rounded-lg object-cover object-top"
                  />
                </motion.div>
                <div className="flex justify-center items-center flex-col">
                  <motion.h3
                    layoutId={`title-${card.title}-${id}`}
                    className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base"
                  >
                    {card.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${card.description}-${id}`}
                    className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-base"
                  >
                    {card.description}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </ul>
      </section>
    </LayoutGroup>
  )
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  )
}

const cards = [
  {
    description: 'Full-stack E-commerce Platform',
    title: 'ShopHub',
    src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=60',
    ctaText: 'View Demo',
    ctaLink: 'https://github.com',
    content: () => {
      return (
        <p>
          A comprehensive e-commerce platform built with React, Node.js, and
          MongoDB. Features include user authentication, product management,
          shopping cart functionality, and secure payment integration with
          Stripe. <br /> <br /> The platform supports multiple vendors, order
          tracking, and an admin dashboard for managing products and orders.
          Implemented responsive design for seamless experience across all
          devices.
        </p>
      )
    },
  },
  {
    description: 'Real-time Chat Application',
    title: 'ChatConnect',
    src: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&auto=format&fit=crop&q=60',
    ctaText: 'View Demo',
    ctaLink: 'https://github.com',
    content: () => {
      return (
        <p>
          A real-time messaging application powered by Socket.io and React.
          Users can create chat rooms, send private messages, and share files
          instantly. <br /> <br /> Features include message encryption, read
          receipts, typing indicators, and push notifications. The backend is
          built with Express.js and uses Redis for caching and session
          management.
        </p>
      )
    },
  },
  {
    description: 'Task Management Dashboard',
    title: 'TaskFlow',
    src: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&auto=format&fit=crop&q=60',
    ctaText: 'View Demo',
    ctaLink: 'https://github.com',
    content: () => {
      return (
        <p>
          A Kanban-style project management tool built with Next.js and Prisma.
          Features drag-and-drop task organization, team collaboration, and
          progress tracking. <br /> <br /> Includes features like task
          assignments, due dates, labels, and activity logs. Integrated with
          GitHub for issue syncing and Slack for notifications. Uses PostgreSQL
          for data persistence.
        </p>
      )
    },
  },
  {
    description: 'AI-Powered Portfolio Generator',
    title: 'PortfolioAI',
    src: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60',
    ctaText: 'View Demo',
    ctaLink: 'https://github.com',
    content: () => {
      return (
        <p>
          An AI-powered tool that generates stunning portfolio websites from
          simple prompts. Built with OpenAI API, React, and Tailwind CSS.
          <br /> <br /> Users can customize themes, layouts, and content through
          an intuitive interface. Features automatic SEO optimization, dark mode
          support, and one-click deployment to Vercel or Netlify.
        </p>
      )
    },
  },
]

export default Projects
