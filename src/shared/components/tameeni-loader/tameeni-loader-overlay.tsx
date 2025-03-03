import { cn } from '@/shared/lib/utils'
import TameeniLoader from './tameeni-loader'

const TameeniLoaderOverlay = ({ transparent = true }) => {
  return (
    <div
      className={cn(
        'flex-center fixed inset-0 z-50 h-screen w-screen ',
        transparent ? 'bg-base-black/70' : 'bg-base-white'
      )}
    >
      <TameeniLoader />
    </div>
  )
}

export default TameeniLoaderOverlay
