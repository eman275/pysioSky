'use client'
type Props = {
  searchParams: {
    url: string
  }
  className?: string
  onLoad?(): void
}

function LoginIframe({ searchParams, className, onLoad }: Props) {
  return (
    <iframe
      title='Sign in'
      onLoad={onLoad}
      src={searchParams.url}
      className={className}
    />
  )
}

export default LoginIframe
