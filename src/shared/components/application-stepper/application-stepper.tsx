'use client'
import SVGback from '@/shared/components/icons/arrow.svg'
import { ButtonIcon } from '@/shared/components/ui/button'
import { Stepper } from '@/shared/components/ui/stepper'
import { useScopedI18n } from '@/shared/locales/client'
import { StepContract } from '@/shared/types/stepper.types'
import { usePathname } from 'next/navigation'
import { useCallback } from 'react'
import useSMEApplicationSteps from './use-sme-application-steps'
import ChatbotIcon from '@/shared/components/icons/chatbot-icon.svg'
import useFreshChat from '@/shared/hooks/use-fresh-chat'
import { useScreenSize } from '@/shared/hooks/use-screen-size'
import QuoteCountdown from '@/features/quotations/components/shared-components/quote-countdown'
import React from 'react'

export default function ApplicationStepper() {
  const fc = useFreshChat()
  const pathname = usePathname()
  const steps = useSMEApplicationSteps()
  const t = useScopedI18n('application.stepper')
  const tWords = useScopedI18n('common.words')
  const { isLarge } = useScreenSize()

  const findActiveStep = useCallback(
    (steps: StepContract[]) =>
      steps.find((step) => Boolean(pathname?.match(step.matchPattern))),
    [pathname]
  )

  const activeParentStep = findActiveStep(steps)
  const activeChildStep = findActiveStep(activeParentStep?.nestedSteps ?? [])

  const handleStepperBack = () => {
    if (activeChildStep?.goBack) {
      return activeChildStep.goBack()
    }
    if (activeParentStep?.goBack) {
      return activeParentStep.goBack()
    }
  }

  const isTimerDisplayed =
    activeChildStep?.title === t('quotes_list') ||
    activeChildStep?.title === t('quote_customization') ||
    activeChildStep?.title === t('review_policy_details')

  const stepTitleContent = (
    <div className='flex w-full flex-1 flex-col justify-between gap-2 lg:flex-row'>
      <h1 className='text-base font-bold lg:text-xxl'>
        {activeChildStep?.title}
      </h1>
      {isTimerDisplayed && <QuoteCountdown />}
    </div>
  )

  const stepSubtitleContent = (
    <div className='flex text-xs font-bold lg:text-neutral-5'>
      <div>
        <span className='lg:hidden'>{activeChildStep?.index}.</span>{' '}
        {activeParentStep?.title}
      </div>

      {/*step  number display */}
      {activeChildStep && (
        <>
          <span className='mx-1'>&gt;&gt;</span>
          <span>
            {`${t('step')} ${activeChildStep?.index} ${tWords(
              'of'
            )} ${activeParentStep?.nestedSteps?.length}`}
          </span>
        </>
      )}
    </div>
  )

  const backButtonContent = (
    <ButtonIcon
      onClick={handleStepperBack}
      size={isLarge ? 'S' : 'XXS'}
      variant='outlined'
      colorScheme='neutral'
      className='rounded-full border border-neutral-2 bg-base-white hover:border-neutral-2'
    >
      <SVGback className='h-4 w-4 lg:h-6 lg:w-6 rtl:rotate-180' />
    </ButtonIcon>
  )

  return (
    <>
      <div className='px-3 pt-5'>
        {/* mobile header view */}
        <div className='container flex items-center justify-between lg:hidden '>
          {backButtonContent}
          {stepSubtitleContent}
          <ButtonIcon
            onClick={fc.openFreshChat}
            variant='unstyled'
            className='lg:hidden'
          >
            <ChatbotIcon />
          </ButtonIcon>
        </div>

        <Stepper
          activeParentStep={activeParentStep?.index ?? 1}
          activeNestedStep={activeChildStep?.index ?? 1}
          steps={steps}
        />
      </div>

      {/* Desktop header view */}
      <div className='container flex items-center justify-between pt-4 xl:px-[125px]'>
        {/* title section */}
        <section className='mb-2 flex flex-1 items-start gap-2 lg:mb-4 lg:items-center lg:gap-4'>
          {/* back button */}
          <div className='hidden lg:block'>{backButtonContent}</div>

          <div className=' flex-1 gap-0.5 lg:flex lg:flex-col lg:gap-1'>
            {/* step subtitle display */}
            <div className='hidden lg:block'>{stepSubtitleContent}</div>
            {/* step title display */}
            {stepTitleContent}
          </div>
        </section>
      </div>
    </>
  )
}
