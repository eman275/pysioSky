const MobileStepIcon = ({
  styles,
  fill = '',
  iconWidth = '45.5',
}: {
  styles?: string
  fill?: string
  iconWidth?: string
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={iconWidth ? iconWidth : '45.5'}
      height='5'
      viewBox={iconWidth ? '0 0 93 5' : '0 0 45.5 5'}
      fill='none'
      className={styles}
    >
      <rect
        x='0.75'
        width={iconWidth ? iconWidth : '45.5'}
        height='5'
        rx='2.5'
        fill={fill}
      />
    </svg>
  )
}
export default MobileStepIcon
