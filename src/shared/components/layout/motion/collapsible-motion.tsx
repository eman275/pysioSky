'use client'

import { HTMLMotionProps, motion } from 'framer-motion'
import { ReactNode } from 'react'

interface Props extends HTMLMotionProps<'div'> {
  isOpened: boolean
  children: ReactNode
}

function CollapsibleMotion({ isOpened, children, ...props }: Props) {
  return (
    <motion.div
      initial='collapsed'
      animate={isOpened ? 'open' : 'collapsed'}
      exit='collapsed'
      variants={{
        open: { opacity: 1, height: 'auto' },
        collapsed: { opacity: 0, height: 0 },
      }}
      transition={{ duration: 0.4, ease: [0.5, 0.62, 0.23, 0.98] }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default CollapsibleMotion
