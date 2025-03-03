'use client'
import useFreshChat from '@/shared/hooks/use-fresh-chat'
import Script from 'next/script'

function Scripts() {
  const fc = useFreshChat()
  return (
    <>
      <Script
        src={'https://tameeni.freshchat.com/js/widget.js'}
        id='fresh-chat-url'
        onLoad={() => {
          fc.initFreshChat()
        }}
      />
    </>
  )
}

export default Scripts
