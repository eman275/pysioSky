'use client'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/tabs'
import { useCurrentLocale } from '@/shared/locales/client'
import FAQBarItem from './faq-bar-item'
import { useState } from 'react'
import FAQToggleItem from './faq-toggle-item'

const FAQBar = () => {
  const locale = useCurrentLocale()
  const [activeTab, setActiveTab] = useState('category1')

  const categories = [
    { id: 'category1', content: <FAQToggleItem /> },
    { id: 'category2', content: <FAQToggleItem /> },
    { id: 'category3', content: <FAQToggleItem /> },
    { id: 'category4', content: <FAQToggleItem /> },
    { id: 'category5', content: <FAQToggleItem /> },
  ]

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  return (
    <Tabs
      className='overflow-x-auto bg-neutral-1 p-0 scrollbar-none'
      variant='vertical'
      defaultValue='category1'
      dir={locale === 'en' ? 'ltr' : 'rtl'}
      onValueChange={handleTabChange}
    >
      <TabsList className='grid min-w-[670px] grid-cols-5 gap-4'>
        {categories.map((category) => (
          <TabsTrigger
            key={category.id}
            value={category.id}
            className='w-full p-0'
          >
            <FAQBarItem isActive={activeTab === category.id} />
          </TabsTrigger>
        ))}
      </TabsList>

      {categories.map((category) => (
        <TabsContent key={category.id} className='mt-6' value={category.id}>
          {category.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default FAQBar
