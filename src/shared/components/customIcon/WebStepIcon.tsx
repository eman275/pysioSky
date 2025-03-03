const WebStepIcon = ({
  styles,
  fill = '',
  iconWidth = '165',
}: {
  styles?: string
  fill?: string
  iconWidth?: string
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={iconWidth ? iconWidth : '165'}
      height='5'
      viewBox={iconWidth ? '0 0 335.5 5' : '0 0 165 5'}
      fill='none'
      className={styles}
    >
      <rect
        x='0.75'
        width={iconWidth ? iconWidth : '163.75'}
        height='5'
        rx='2.5'
        fill={fill}
      />
    </svg>
  )
}
export default WebStepIcon
