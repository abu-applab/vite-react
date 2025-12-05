import type { Dispatch, SetStateAction } from "react";
import type { Step } from "./applicationPage/addNewApplication";
import { useTranslation } from "react-i18next";

interface SubmittedFormStepsProps {
    applicationSteps: Step[],
    setApplicationSteps: Dispatch<SetStateAction<Step[]>>,
}

const SubmittedFormSteps = ({ applicationSteps, setApplicationSteps }: SubmittedFormStepsProps) => {
    const { t } = useTranslation();

    const handleStepClick = (index: number) => {
        setApplicationSteps((prevSteps) =>
            prevSteps.map((step, i) => ({
                ...step,
                active: i === index, 
            }))
        );
    };

    return (
        <div className="flex items-center justify-between bg-gray-50 rounded-md p-1 mx-10 mb-6">
            {applicationSteps.map((step, index) => (
                <button
                    key={index}
                    onClick={() => handleStepClick(index)}
                    className={`w-full py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${step.active
                            ? "bg-[#8b0015] text-white"
                            : step.completed
                                ? "bg-[#8b001520] text-[#8b0015]"
                                : "text-gray-500"
                        }`}
                >
                    {step.title === 'document_upload' ? t('uploaded_documents') :  t(step.title)}
                </button>
            ))}
        </div>
    )
}

export default SubmittedFormSteps