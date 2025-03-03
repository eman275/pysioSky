import InsuranceCardIcon from '@/assets/images/icons/tameeniApp/InsuranceCard.svg'
import NotificationsIcon from '@/assets/images/icons/tameeniApp/Notifications.svg'
import RealtimeIcon from '@/assets/images/icons/tameeniApp/Realtime.svg'
import CompareIcon from '@/assets/images/icons/tameeniApp/compare.svg'

export const TameeniAppFeatures = () => {
  return (
    <div
      className='flex h-full w-full flex-col px-4 lg:w-6/12 lg:px-0 xl:w-5/12'
      data-testid='tameeni-app-features'
    >
      <h2
        className='mb-6 text-xl font-bold text-gray-800'
        data-testid='tameeni-app-features-title'
      >
        {'title'}
      </h2>
      <ul className='mr-2.5' data-testid='tameeni-app-features-list'>
        <li
          className='flex items-center gap-7 text-lg'
          data-testid='insurance-card-list-item'
        >
          <InsuranceCardIcon
            className='w-14'
            data-testid='insurance-card-list-item-logo'
          />
          <span data-testid='insurance-card-list-item-title'>
            {'information'}
          </span>
        </li>
        <li
          className='flex items-center gap-7 text-lg'
          data-testid='real-time-list-item'
        >
          <RealtimeIcon data-testid='real-time-list-item-logo' />
          <span data-testid='real-time-list-item-title'>
            {'instant_response'}
          </span>
        </li>
        <li
          className='flex items-center gap-7 text-lg'
          data-testid='customer-support-list-item'
        >
          <NotificationsIcon data-testid='customer-support-list-item-logo' />
          <span data-testid='customer-support-list-item-title'>
            {'customer_support'}
          </span>
        </li>
        <li
          className='flex items-center gap-7 text-lg'
          data-testid='insurance-provider-list-item'
        >
          <CompareIcon data-testid='insurance-provider-list-item-logo' />
          <span data-testid='insurance-provider-list-item-title'>
            {'insurance_provider'}
          </span>
        </li>
      </ul>
    </div>
  )
}
