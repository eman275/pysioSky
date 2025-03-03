import PolicyArrowUp from '@/shared/components/icons/policy-arrow-up-icon.svg'
import PolicyArrowDown from '@/shared/components/icons/policy-arrow-down-icon.svg'
type Props = {
  isOpened: boolean
}

const PrimarySummaryArrows = ({ isOpened }: Props) => {
  return (
    <div className='cursor-pointer self-start rounded-full border border-primary-6 bg-primary-1 px-[6px] py-2'>
      {isOpened ? <PolicyArrowUp /> : <PolicyArrowDown />}
    </div>
  )
}

export default PrimarySummaryArrows
