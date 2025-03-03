'use client'
import CallIcon from '@/shared/components/icons/call.svg'
import PlayIcon from '@/shared/components/icons/play.svg'
import { Button } from '@/shared/components/ui/button'
import { Card } from '@/shared/components/ui/card'
import useDisclosure from '@/shared/hooks/use-disclosure'
import { useScopedI18n } from '@/shared/locales/client'
import { AwarenessVideoModal } from './awareness-video-modal'
import HowItWorksModal from './how-it-works-modal'
import useFreshChat from '@/shared/hooks/use-fresh-chat'

export const ProgramAwarenessVideo = () => {
  const {
    onOpen: onOpenHowItWorksModal,
    isOpened: isOpenedHowItWorksModal,
    setIsOpened: setIsOpenedHowItWorksModal,
  } = useDisclosure()

  const {
    onOpen: onOpenVideoModal,
    isOpened: isOpenedVideoModal,
    setIsOpened: setIsOpenedVideoModal,
  } = useDisclosure()
  const t = useScopedI18n('landing.programAwarenessVideo')
  const fc = useFreshChat()

  return (
    <Card
      className='max-w-none self-start rounded-xl border-primary-3  bg-primary-7 p-6 md:max-w-[26rem] md:text-start'
      data-testid='program-awareness-section'
    >
      <h4
        className='mb-2 max-w-full font-bold'
        data-testid='program-awareness-title'
      >
        {t('title')}
      </h4>

      <p
        className='mb-4 line-clamp-2 text-sm font-semibold text-neutral-5'
        data-testid='program-awareness-content'
      >
        {t('content')}
      </p>

      {/* Video Preview */}
      <div className='relative mx-auto mb-4 h-[216px] max-w-[368px] overflow-hidden rounded-lg'>
        {/* TODO: update video thumbnail url to real one */}
        <img
          className='mx-auto block'
          alt={t('title')}
          src='/images/awareness-video/awareness-video-thumbnail.jpg'
          data-testid='program-awareness-video-thumbnail'
        />
        <button
          onClick={onOpenVideoModal}
          data-testid='program-awareness-video-play-button'
          className='absolute inset-0 m-auto h-[84px] w-[84px] rounded-full bg-base-black opacity-80'
        >
          <PlayIcon
            className='m-auto'
            data-testid='program-awareness-video-play-icon'
          />
        </button>
      </div>
      <AwarenessVideoModal
        isOpened={isOpenedVideoModal}
        setIsOpened={setIsOpenedVideoModal}
      />

      <div className='flex items-center justify-between'>
        {/* How it works */}
        <Button
          variant='outlined'
          size='S'
          data-testid='program-awareness-how-it-works'
          onClick={onOpenHowItWorksModal}
        >
          {t('how_it_works')}
        </Button>
        <HowItWorksModal
          isOpened={isOpenedHowItWorksModal}
          setIsOpened={setIsOpenedHowItWorksModal}
        />

        {/* Need Assistance */}
        <button
          className='flex items-center text-xs font-bold sm:text-sm'
          data-testid='program-awareness-assistance'
          onClick={fc.openFreshChat}
        >
          <span className='ltr:text-left rtl:text-right'>
            {t('need_assistance')}
          </span>
          <CallIcon className='ms-2' />
        </button>
      </div>
    </Card>
  )
}
