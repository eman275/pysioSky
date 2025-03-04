'use client'
import { useScopedI18n } from '@/shared/locales/client'
import { useEffect, useMemo, useState } from 'react'

const DynamicTitle = () => {
  const tLanding = useScopedI18n('landing')

  const dynamicTitles = useMemo(
    () => [
      tLanding('dynamic_title1'),
      tLanding('dynamic_title2'),
      tLanding('dynamic_title3'),
      tLanding('dynamic_title4'),
    ],
    [tLanding]
  )

  const [dynamicTitle, setDynamicTitle] = useState(dynamicTitles[0])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDynamicTitle(
        (current) =>
          dynamicTitles[
            (dynamicTitles.indexOf(current) + 1) % dynamicTitles.length
          ]
      )
    }, 3000)

    return () => clearInterval(intervalId)
  }, [dynamicTitles])

  return (
    <div className=' my-14 flex flex-col px-1 text-center lg:px-3 '>
      <h1 className=' text-[24px]  lg:text-[36px] font-bold md:text-xxl'>
        {tLanding('page_title')}
        <span className='text-primary-1'>{dynamicTitle}</span>
      </h1>
    </div>
  )
}

export default DynamicTitle
