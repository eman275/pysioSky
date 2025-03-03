import ArrowDown from '@/shared/components/icons/arrow-down.svg'
import ArrowUp from '@/shared/components/icons/arrow-up.svg'
type Props = {
  isOpened: boolean
}

const CostSectionArrows = ({ isOpened }: Props) => {
  return (
    <div className='cursor-pointer self-end pb-2'>
      {isOpened ? <ArrowUp /> : <ArrowDown />}
    </div>
  )
}

export default CostSectionArrows
