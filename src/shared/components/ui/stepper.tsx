import { cn } from '@/shared/lib/utils'
import { StepContract } from '@/shared/types/stepper.types'

type StepperProps = {
  steps: StepContract[]
  activeParentStep: number
  activeNestedStep: number
}

const finishedStyles = 'bg-secondary-6 text-secondary-6'
const activeStyles = 'bg-primary-6'

const defaultStyles = 'bg-neutral-3'
export const Stepper = ({
  steps,
  activeParentStep,
  activeNestedStep,
}: StepperProps) => {
  return (
    <div
      data-testid='stepper-section'
      className='relative mb-4 after:absolute after:z-[1] after:h-[5px] after:w-full after:bg-neutral-2'
    >
      <div className='container'>
        <ul
          className='flex justify-between gap-1 md:gap-2 lg:gap-4'
          data-testid='stepper-steps-list'
        >
          {steps.map((parentStep) => {
            const {
              index: parentStepNumber,
              title: parentStepTitle,
              nestedSteps,
            } = parentStep

            return (
              <li
                key={parentStepNumber}
                data-testid={`step-${parentStepNumber}-list-item`}
                className={'relative mb-4 w-full '}
              >
                {/* Label in desktop view */}
                <div
                  id={`step-${parentStepNumber}`}
                  className='hidden text-center font-bold lg:block'
                  data-testid={`step-${parentStepNumber}-status-container`}
                >
                  <span data-testid={`step-${parentStepNumber}-status`}>
                    {parentStepNumber}.{' '}
                  </span>
                  <span data-testid={`step-${parentStepNumber}-name`}>
                    {parentStepTitle}
                  </span>
                </div>

                {/* step progress */}
                {!nestedSteps && (
                  <div
                    className={cn([
                      'absolute left-0 right-0 top-4 z-[2] h-[5px] w-full rounded lg:top-[2.5rem]',
                      activeParentStep > parentStepNumber && finishedStyles,
                      activeParentStep === parentStepNumber && activeStyles,
                      activeParentStep < parentStepNumber && defaultStyles,
                    ])}
                  />
                )}
                <div className='absolute inset-x-0 top-4 z-[2] flex h-[5px] w-full justify-between gap-[2px] lg:top-[2.5rem] lg:gap-1'>
                  {nestedSteps?.map((nestedStep) => {
                    const { index: nestedStepNumber } = nestedStep
                    const doesStepBelongToActiveParent =
                      parentStepNumber === activeParentStep

                    const isCurrentStepActive =
                      activeNestedStep === nestedStepNumber

                    const isCurrentStepFinished =
                      activeParentStep > parentStepNumber ||
                      (doesStepBelongToActiveParent &&
                        nestedStepNumber < activeNestedStep)
                    return (
                      <div
                        key={parentStepNumber + nestedStepNumber}
                        style={{
                          width: `${nestedSteps && 100 / nestedSteps?.length}%`,
                        }}
                        className={cn(
                          `h-full rounded`,

                          defaultStyles,

                          doesStepBelongToActiveParent &&
                            isCurrentStepActive &&
                            activeStyles,

                          isCurrentStepFinished && finishedStyles
                        )}
                      />
                    )
                  })}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
