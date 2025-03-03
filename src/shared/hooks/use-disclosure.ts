'use client'

import React from 'react'

type Args = {
  isDefaultOpened?: boolean
}

function useDisclosure(args?: Args) {
  const [isOpened, setIsOpened] = React.useState(args?.isDefaultOpened ?? false)

  const onOpen = React.useCallback(() => {
    setIsOpened(true)
  }, [setIsOpened])

  const onClose = React.useCallback(() => {
    setIsOpened(false)
  }, [setIsOpened])

  const onToggle = React.useCallback(() => {
    setIsOpened((prev) => !prev)
  }, [setIsOpened])

  return {
    isOpened,
    onOpen,
    onClose,
    onToggle,
    setIsOpened,
  }
}

export default useDisclosure
