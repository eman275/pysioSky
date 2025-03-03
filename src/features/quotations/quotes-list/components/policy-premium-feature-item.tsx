import DoneIcon from '@/shared/components/icons/done-icon.svg'
import { useCurrentLocale } from '@/shared/locales/client'
import { Feature } from '../../resources/quotation.types'
import { cn } from '@/shared/lib/utils'
import InfoTooltip from '@/shared/components/ui/info-tooltip'

type Props = {
  features: Feature[]
  title: string
  isModified?: boolean
}

const PolicyPremiumFeatureItem = ({ features, title, isModified }: Props) => {
  const locale = useCurrentLocale()

  return (
    <div className='flex h-fit flex-col gap-3'>
      <div
        className={cn(
          'w-fit rounded-lg border px-3 py-1 font-semibold',
          isModified ? 'bg-neutral-5 text-white' : 'bg-neutral-2'
        )}
      >
        <p className='text-xs'>{title}</p>
      </div>
      <div className='flex flex-col gap-1'>
        {features.map(
          ({
            nameArabic,
            nameEnglish,
            descriptionArabic,
            descriptionEnglish,
            id,
          }) => (
            <div key={id} className='flex items-start gap-[10px]'>
              <DoneIcon />
              <div className='flex items-center'>
                <span className='relative text-xs'>
                  {locale === 'en' ? nameEnglish : nameArabic}{' '}
                  <div className='absolute ml-1 inline-flex'>
                    <InfoTooltip>
                      {locale === 'en' ? descriptionEnglish : descriptionArabic}
                    </InfoTooltip>
                  </div>
                </span>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}
export default PolicyPremiumFeatureItem
