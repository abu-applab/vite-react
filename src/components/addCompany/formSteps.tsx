import { type StepsType } from "@/context/AppContext"
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

interface FormStepsProps {
  steps: StepsType[]
  isAddCompany?: boolean
}

const FormSteps = ({ steps, isAddCompany }: FormStepsProps) => {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const activeStep = scrollRef.current?.querySelector(".active-step");
    if (activeStep && window.innerWidth < 768) {
      activeStep.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [steps]);

  return (
    <div className={cn("md:mx-10")}>
      <div className="w-full overflow-x-auto md:overflow-visible scrollbar-hide">
        <div ref={scrollRef} className="flex max-md:w-[1000px] justify-between">
          {steps.map((step, index) => {
            const isCompleted = step.completed
            const isCurrent = step.active
            const isUpcoming = !step.completed && !step.active
            const skipNumber = isAddCompany ? 2 : 1

            if (step.title === 'FormSubmission') {
              return null;
            }

            return (
              <>
                <div key={step.stepNumber} className={cn("flex justify-center lg:w-[200px] md:w-[100px]", isCurrent && "active-step")}>
                  {/* Step Circle and Content */}
                  <div className="flex flex-col max-md:flex-row gap-2 items-center justify-center">
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
                        className={cn("text-sm font-medium leading-tight max-md:max-w-[200px]", {
                          "text-zinc-900": isCurrent,
                          "text-green-600": isCompleted,
                          "text-gray-400": isUpcoming,
                        })}
                      >
                        {t(step.title)}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Connecting Line */}

                {index < steps.length - skipNumber && (
                  <div
                    className={cn("flex-1 border-t-2 border-dashed border-gray-300 mt-2.5 max-md:mt-6 max-md:mx-2", {
                      "border-green-600 border-solid": isCompleted || index === 0
                    })}
                  />
                )}
              </>
            )
          })}
        </div>
      </div>
    </div >
  )
}

export default FormSteps