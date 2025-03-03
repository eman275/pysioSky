'use client'

import { useCallback, useMemo } from 'react'
import { loadAppConfig } from '../lib/config/load-config'
import { useCurrentLocale } from '../locales/client'
import { useScreenSize } from './use-screen-size'

export default function useFreshChat() {
  const { isLarge } = useScreenSize()
  const locale = useCurrentLocale()

  const {
    FRESH_CHAT_TOKEN,
    FRESH_CHAT_HOST,
    FRESH_CHAT_SITE_ID,
    FRESH_CHAT_SCRIPT_URL,
  } = loadAppConfig()

  const freshChatPayload = useMemo(
    () => ({
      token: FRESH_CHAT_TOKEN,
      host: FRESH_CHAT_HOST,
      siteId: FRESH_CHAT_SITE_ID,
      scriptUrl: FRESH_CHAT_SCRIPT_URL,
      locale,

      config: {
        headerProperty: {
          hideChatButton: !isLarge,
          appName: 'tameeni',
          direction: locale === 'en' ? 'ltr' : 'rtl',
        },
      },
    }),
    [
      FRESH_CHAT_HOST,
      FRESH_CHAT_SCRIPT_URL,
      FRESH_CHAT_SITE_ID,
      FRESH_CHAT_TOKEN,
      isLarge,
      locale,
    ]
  )

  const initFreshChat = useCallback(() => {
    //  guard against server side usage
    if (typeof window === 'undefined') return

    window.fcWidget?.init(freshChatPayload)
  }, [freshChatPayload])

  function openFreshChat() {
    window.fcWidget?.open()
  }

  return {
    initFreshChat,
    openFreshChat,
  }
}
