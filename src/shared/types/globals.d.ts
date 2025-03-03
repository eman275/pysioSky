type FreshChatConfig = {
  open?: boolean

  token: string
  host: string
  siteId: string
  scriptUrl: string
  locale?: string

  config?: {
    headerProperty?: FreshChatHeader
  }
}

type FreshChatHeader = {
  direction?: string
  appName?: string
  hideChatButton?: boolean
}

type FCWidget = {
  isLoaded(): boolean
  init(config: FreshChatConfig): void
  setConfig(config: Partial<FreshChatConfig>): void
  destroy(): void
  open(): void
  hide(): void
  show(): void

  isInitialized(): boolean
}
interface Window {
  fcWidget: FCWidget
}

// env
declare type CustomProcessEnv = 'development' | 'uat' | 'testing'
