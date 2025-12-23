import { botReportFormConfig } from "@/lib/form-data";
import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import DynamicForm from "../dynamic-form";
import useNetworkRequest from "@/api/useNetworkRequest";
import Loader from "../loader";
import { RequestSubmittedModal } from "../service/createNewRequest/requestSubmittedModal";
import { API_ENDPOINTS } from "@/api/apiEndpoints";
import { allowedCommentChars, hasEmojiOrUnicodeSymbols, isDigitsOnly, isEmpty, parseApiError } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { useTranslation } from "react-i18next";
import type { Step } from "../applicationPage/addNewApplication";
import { useParams } from "react-router-dom";

interface BotRequestAndReportsFromHandlerProps {
    setCreateBotReports: Dispatch<SetStateAction<boolean>>
}

const initialBotReportsSteps = [
    { title: "data", completed: false, active: true, stepNumber: "1" },
    { title: "warehouses", completed: false, active: false, stepNumber: "2" },
    { title: "retail_outlets_shops", completed: false, active: false, stepNumber: "3" },
    { title: "accomadations", completed: false, active: false, stepNumber: "4" },
    { title: "open_yards", completed: false, active: false, stepNumber: "5" },
]

export const BotReportsFromHandler = ({ setCreateBotReports }: BotRequestAndReportsFromHandlerProps) => {
    const [formState, setFormState] = useState<Record<string, any>>({});
    const [formConfig, _setFormConfig] = useState(botReportFormConfig)
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const fieldRefs = useRef<Record<string, HTMLElement | null>>({});
    const networkRequest = useNetworkRequest();
    const [isSubmittedModalOpen, setSubmittedModal] = useState(false);
    const [referenceMessage, setReferenceMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { contact, selectedCompany } = useApp()
    const { t } = useTranslation();
    const [botReportsSteps, setBotReportsSteps] = useState<Step[]>(initialBotReportsSteps)
    const { id } = useParams();
    const navigate = useNavigate();


    const handleInputChange = (fieldId: string, value: any) => {
        setFormState((prev) => ({ ...prev, [fieldId]: value }));
        setErrors((prev) => ({ ...prev, [fieldId]: "" }));
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        e?.stopPropagation();

        const newErrors = validateBotRequestForm(formConfig[0], formState, t);
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            const firstErrorFieldId = Object.keys(newErrors)[0];
            const el = fieldRefs.current[firstErrorFieldId];
            el?.scrollIntoView({ behavior: "smooth", block: "center" });
            el?.focus({ preventScroll: true });
            return;
        }

        const formData = new FormData();

        formData.append("Company", selectedCompany?.accountID ?? '');
        formData.append("ContactPerson", contact?.id ?? "");
        formData.append("Description", formState.Description ?? '');
        formData.append("BotRequestCategory", formState.BotRequestCategory ?? '');

        if (formState.Attachment) {
            formData.append("Attachment", formState.Attachment);
        }

        try {
            setIsLoading(true);

            const response = await networkRequest(
                API_ENDPOINTS.createBotServiceRequest,
                {
                    method: "POST",
                    body: formData, // ✅ IMPORTANT
                    // ❌ DO NOT set Content-Type manually
                }
            );

            if (response.success) {
                setReferenceMessage(response.message);
                setSubmittedModal(true);
            }
        } catch (error) {
            setErrorMessage(parseApiError(error));
            setSubmittedModal(true);
        } finally {
            setIsLoading(false);
        }
    };


    const handleTryAgain = () => {
        setSubmittedModal(false);
        handleSubmit()
    }

    const onBack = () => {
        setCreateBotReports(false)
        setSubmittedModal(false);
    }

    const goToNextStep = (e?: React.FormEvent) => {
        e?.preventDefault();
        e?.stopPropagation();
        let newErrors: Record<string, string> = {};

        setBotReportsSteps((prevSteps) => {
            const currentIndex = prevSteps.findIndex((s) => s.active);

            if (currentIndex === -1) return prevSteps;

            // ✅ Validate only if not on last step
            if (currentIndex < formConfig?.length) {
                const stepConfig = formConfig?.[currentIndex];

                newErrors = validateBotRequestForm(stepConfig, formState, t)
                if (Object.keys(newErrors).length > 0) {
                    setErrors(newErrors);
                    const firstErrorFieldId = Object.keys(newErrors)[0];
                    const el = fieldRefs.current[firstErrorFieldId];
                    if (el) {
                        el.scrollIntoView({ behavior: "smooth", block: "center" });
                        el.focus({ preventScroll: true });
                    }
                    return prevSteps; // ⛔ Stop step change
                }
            }

            return prevSteps.map((step, index) => {
                if (index === currentIndex) {
                    return { ...step, active: false, completed: true };
                }
                if (index === currentIndex + 1) {
                    return { ...step, active: true };
                }
                return step;
            });
        });
    };


    const goToPreviousStep = () => {
        if (botReportsSteps[0].active) {
            if (id) {
                navigate("/portal/bot-reports", { replace: true });
            } else {
                setCreateBotReports(false)
            }
        } else {
            setBotReportsSteps((prevSteps) => {
                const currentIndex = prevSteps.findIndex((s) => s.active)
                if (currentIndex <= 0) {
                    setCreateBotReports(false)
                }

                return prevSteps.map((step, index) => {
                    if (index === currentIndex) {
                        return { ...step, active: false }
                    } else if (index === currentIndex - 1) {
                        return { ...step, active: true, completed: false }
                    }
                    return step
                })
            })
        }
    }

    const handleStepClick = (clickedStep: Step) => {
        setBotReportsSteps((prev) => {
          const currentIndex = prev.findIndex(
            (step) => step.title === clickedStep.title
          );
      
          const previousStep = prev[currentIndex - 1];
      
          // 🚫 block if neither this step nor previous step is completed
          if (
            !clickedStep.completed &&
            !(previousStep && previousStep.completed)
          ) {
            return prev;
          }
      
          return prev.map((step) => ({
            ...step,
            active: step.title === clickedStep.title,
          }));
        });
      };
      

    const renderActiveStep = () => {
        const isLastStepActive = botReportsSteps[botReportsSteps.length - 1]?.active === true;

        const activeStep = botReportsSteps.find((s) => s.active)
        if (!activeStep) return null

        const currentIndex = Number(activeStep.stepNumber) - 1
        const activeConfig = formConfig?.[currentIndex]
        if (!activeConfig) return null

        return (
            <DynamicForm
                config={activeConfig as any}
                formData={formState}
                errors={errors}
                setErrors={setErrors}
                fieldRefs={fieldRefs}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                hidePreviousButton={false}
                isLastStepActive={isLastStepActive}
                goToNextStep={goToNextStep}
                handlePerviousButton={goToPreviousStep}
                isBotReports={true}
            />
        )
    }

    return (
        <div>
            <div className="flex items-center bg-white h-10 rounded-lg shadow-md gap-2 max-md:justify-between mt-6">
                {botReportsSteps.map((step) => (
                    <button key={step.title} className={`py-2.5 h-full md:ml-10 text-sm font-medium hover:text-maroon-100 ${step.active ? 'text-maroon-100 border-b-2 border-maroon-100' : 'text-black hover:text-gray-500'} focus:outline-none focus:text-maroon-100 cursor-pointer`} onClick={() => handleStepClick(step)} > {t(step.title)}
                    </button>
                ))}
            </div>
            {renderActiveStep()}
            <RequestSubmittedModal
                open={isSubmittedModalOpen}
                onOpenChange={setSubmittedModal}
                onGoToRequest={() => onBack()}
                referenceMessage={referenceMessage}
                handleTryAgain={handleTryAgain}
                errorMessage={errorMessage}
                buttonText="view_bot_request"
                title="bot_request_submitted_successfully"
                heading="bot_request_submitted"
            />

            {isLoading && <Loader />}
        </div>
    )
}

export const validateBotRequestForm = (
    config: any,
    formState: Record<string, any>,
    t: any
) => {
    let newErrors: Record<string, string> = {};

    const validateTextLength = (field: any, value: string) => {
        if (field.max && value.length > field.max) {
            return `Maximum ${field.max} characters allowed`;
        }
        if (field.min && value.length < field.min) {
            return `Minimum ${field.min} characters required`;
        }
    };

    config.sections.forEach((section: any) => {
        section.fields?.forEach((field: any) => {
            const rawValue = formState[field.id];
            const value =
                typeof rawValue === "string" ? rawValue.trim() : rawValue;

            /* =======================
               REQUIRED VALIDATION
            ======================= */
            if (field.required && isEmpty(value)) {
                newErrors[field.id] = `${t(field.label)} is required`;
                return;
            }

            /* =======================
               DESCRIPTION VALIDATION
            ======================= */
            if (field.id === "description" && value) {
                const lengthError = validateTextLength(field, value);
                if (lengthError) {
                    newErrors[field.id] = lengthError;
                    return;
                }

                if (isDigitsOnly(value)) {
                    newErrors[field.id] =
                        "This field cannot contain digits only.";
                    return;
                }

                if (hasEmojiOrUnicodeSymbols(value)) {
                    newErrors[field.id] =
                        "Emojis or special Unicode symbols are not allowed.";
                    return;
                }

                if (!allowedCommentChars(value)) {
                    newErrors[field.id] =
                        "Only letters, numbers, spaces, and . , ! ? - are allowed.";
                    return;
                }
            }
        });
    });

    return newErrors;
};


