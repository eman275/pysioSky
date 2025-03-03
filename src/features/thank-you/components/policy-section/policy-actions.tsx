import { Button } from '@/shared/components/ui/button'
import { useScreenSize } from '@/shared/hooks/use-screen-size'
import { ReactElement } from 'react'
type Props = {
  onClick: () => void
  icon?: ReactElement
  title: string
  isLoading?: boolean
}
const PolicyAction = ({ onClick, icon, title, isLoading }: Props) => {
  const { isMedium } = useScreenSize()

  return (
    <Button
      colorScheme='primary'
      variant='glassy'
      size={isMedium ? 'S' : 'XXS'}
      className='ms-auto whitespace-nowrap md:w-fit md:min-w-36'
      startIcon={icon}
      onClick={onClick}
      isLoading={isLoading}
    >
      {title}
    </Button>
  )
}

export default PolicyAction
