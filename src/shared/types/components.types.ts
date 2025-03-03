export type ModalProps = {
  isOpened: boolean
  setIsOpened(_: boolean): void
  onClose?: () => void
}

export type PropsWithClassName = {
  className?: string
}
