import FormSteps from "../addCompany/formSteps";
import { Button } from "../ui/button";
import { Card } from "../ui/card"

interface InstructionProps {
    config: any
    goToPreviousStep: () => void
    goToNextStep: () => void
    applicationSteps: any
}

const Instruction = ({ config, goToNextStep, goToPreviousStep, applicationSteps }: InstructionProps) => {
    return (
        <div className="md:px-10 pb-4">
            <div className="mb-8 max-md:border max-md:shadow max-md:p-4 max-md:bg-white max-md:rounded-lg">
                <h3 className="text-xl font-semibold text-foreground">{config.title}</h3>
                <p className="text-muted-foreground text-sm font-normal">{config.description}</p>
                <div className="md:hidden">
                    <FormSteps steps={applicationSteps} />
                </div>
            </div>
            <Card className="px-6">
                {config.sections.map((section: any) => {
                    return (
                        <div>
                            <div>
                                <h3 className="text-lg font-semibold">{section.title}</h3>
                            </div>
                            {
                                (section.key === "requiredDocuments")
                                    ?
                                    <Card className="bg-zinc-50 px-6 border-none shadow-none">
                                        <ul className="space-y-2">
                                            {section.points.map((point: string, index: any) => {
                                                return (
                                                    <li key={index} className="flex items-start gap-2">
                                                        <span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2 flex-shrink-0" />
                                                        <span className="text-sm leading-relaxed">{point}</span>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </Card> :
                                    <div>
                                        <ul className="space-y-2">
                                            {section.points.map((point: string, index: any) => {
                                                return (
                                                    <li key={index} className="flex items-start gap-2">
                                                        <span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2 flex-shrink-0" />
                                                        <span className="text-sm leading-relaxed">{point}</span>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                            }
                        </div>
                    )
                })
                }
                <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={goToPreviousStep}>
                        Previous
                    </Button>
                    <Button type="submit" onClick={goToNextStep} className="bg-maroon-100 hover:bg-[#7A1F2B]">
                        Next
                    </Button>
                </div>
            </Card>
        </div>
    )
}

export default Instruction