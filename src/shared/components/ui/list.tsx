'use client'

import { createContext } from '@/shared/lib/helpers/create-context'
import { cn } from '@/shared/lib/utils'
import { PropsWithClassName } from '@/shared/types/components.types'
import { PropsWithChildren } from 'react'

type IconProps = {
  idx?: number
}
type ListContextContract = {
  icon?: React.FC<IconProps>
}
const [ListProvider, useList] = createContext<ListContextContract>({
  name: 'ListComponentContext',
})

type ListProps = PropsWithChildren &
  PropsWithClassName & {
    icon?: React.FC<IconProps>
    ordered?: boolean
  }

function List({ icon, children, className }: ListProps) {
  return (
    <ListProvider value={{ icon }}>
      <ol className={cn('flex flex-col', className)}>{children}</ol>
    </ListProvider>
  )
}

type ListItemProps = PropsWithChildren & PropsWithClassName & { idx?: number }

function ListItem({ children, className, idx }: ListItemProps) {
  const { icon: Icon } = useList()
  return (
    <li className={cn('flex items-center text-sm', className)}>
      <span className='mt-[3px] self-start'>{Icon && <Icon idx={idx} />}</span>
      <div className='flex flex-col'>{children}</div>
    </li>
  )
}

export { List, ListItem }
