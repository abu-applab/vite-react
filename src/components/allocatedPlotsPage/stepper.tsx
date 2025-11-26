import { cn } from "@/lib/utils"
import { Milestone, Settings, Construction, } from "lucide-react"

const steps = [
  {
    label: "Pre-Development",
    icon: Milestone,
    status: "completed", // completed | current | upcoming
  },
  {
    label: "Development",
    icon: Construction,
    status: "current",
  },
  {
    label: "Operational",
    icon: Settings,
    status: "upcoming",
  },
]

export function Stepper({ progress }: { progress: typeof steps[number]['label'] }) {
  console.log(progress)
  return (
    <div className="flex items-center justify-center gap-8 w-full">
      {steps.map((step, index) => {
        const Icon = step.icon
        const isCompleted = step.status === "completed"
        const isCurrent = step.label === progress

        return (
          <div key={index} className="flex items-center gap-8">
            <div className="flex flex-col items-center">
              <div className={cn( "flex items-center justify-center w-8 h-8 rounded-full border", isCompleted ? "bg-green-600 text-white border-green-600": isCurrent ? "border-green-600 text-green-600": step.status === "upcoming" && "border-gray-300 text-gray-400" )} >
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span className={cn( "mt-2 text-xs font-medium", isCompleted ? "text-green-600": isCurrent ? "text-black": step.status === "upcoming" && "text-gray-400" )} >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={cn( "h-[1px] w-16", isCompleted ? "bg-green-600" : isCurrent ? "bg-green-600" : "bg-gray-300" )} />
            )}
          </div>
        )
      })}
    </div>
  )
}
