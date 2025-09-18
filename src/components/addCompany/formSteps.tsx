import { type StepsType } from "@/context/AppContext"
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface FormStepsProps {
  steps: StepsType[]
  isAddCompany?: boolean
}

const FormSteps = ({steps, isAddCompany}: FormStepsProps) => {
  return (
    <div className={cn("mx-10")}>
          <div className="flex w-full justify-between">
            {steps.map((step, index) => {
              const isCompleted = step.completed
              const isCurrent = step.active
              const isUpcoming = !step.completed && !step.active
              const skipNumber = isAddCompany ? 2 : 1

              if(step.title === 'FormSubmission') {
                 return null;
              }

              return (
                <>
                  <div key={step.stepNumber} className="flex justify-center w-[200px]">
                    {/* Step Circle and Content */}
                    <div className="flex flex-col items-center">
                      <div
                        className={cn("flex h-7 w-7 items-center justify-center rounded-full transition-colors border-2", {
                          "bg-green-600": isCompleted,
                          "border-green-600": isCurrent || isCompleted,
                          "bg-white": isUpcoming,
                        })}
                      >
                        {isCompleted ? (
                          <Check strokeWidth={4} size={15} className="text-white" />
                        ) : isCurrent ? (
                          <div className="h-2.5 w-2.5 rounded-full bg-green-600" />
                        ) : (
                          null
                        )}
                      </div>

                      {/* Step Content */}
                      <div className="mt-3 text-center">
                        <div className="text-xs font-normal text-black">Step {step.stepNumber}</div>
                        <div
                          className={cn("text-sm font-medium leading-tight", {
                            "text-zinc-900": isCurrent,
                            "text-green-600": isCompleted,
                            "text-gray-400": isUpcoming,
                          })}
                        >
                          {step.title}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Connecting Line */}
                 
                  {index < steps.length - skipNumber && (
                    <div
                      className={cn("flex-1 border-t-2 border-dashed border-gray-300 mt-2.5", {
                        "border-green-600 border-solid": isCompleted || index === 0
                      })}
                    />
                  )}
                </>
              )
            })}
          </div>
        </div >
  )
}

export default FormSteps