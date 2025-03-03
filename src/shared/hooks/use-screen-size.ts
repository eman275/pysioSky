import { useMediaQuery } from './use-media-query'

export const useScreenSize = () => {
  const isMobile = useMediaQuery(`(max-width:640px)`)
  const isSmall = useMediaQuery(`(min-width:640px)`)
  const isMedium = useMediaQuery(`(min-width:768px)`)
  const isLarge = useMediaQuery(`(min-width:1024px)`)
  const isXL = useMediaQuery(`(min-width:1280px)`)
  const is2XL = useMediaQuery(`(min-width:1536px)`)

  return {
    isMobile,
    isSmall,
    isMedium,
    isLarge,
    isXL,
    is2XL,
  }
}
