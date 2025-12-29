import { botReportFormConfig } from "@/lib/form-data";
import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import DynamicForm from "../dynamic-form";
import useNetworkRequest from "@/api/useNetworkRequest";
import Loader from "../loader";
import { RequestSubmittedModal } from "../service/createNewRequest/requestSubmittedModal";
import { API_ENDPOINTS } from "@/api/apiEndpoints";
import { parseApiError } from "@/lib/utils";
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
    const { contact } = useApp()
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

        const newErrors = validateBotRequestForm(formConfig[formConfig.length -1], formState, t);
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            const firstErrorFieldId = Object.keys(newErrors)[0];
            const el = fieldRefs.current[firstErrorFieldId];
            el?.scrollIntoView({ behavior: "smooth", block: "center" });
            el?.focus({ preventScroll: true });
            return;
        }

        const payload = {
            contactId: contact?.id ?? "",
            month: formState.month,
            year: formState.year,
            retail: {
                totalArea: formState?.retailTotalArea,
                totalAreaOccupied: formState?.retailTotalAreaOccupied,
                occupancyPercent: formState?.retailOccupancyPercent,
            },
            accommodations: {
                totalArea: formState?.accommodationTotalArea,
                totalAreaOccupied: formState?.accommodationTotalAreaOccupied,
                occupancyPercent: formState?.accommodationOccupancyPercent,
            },
            openYards: {
                totalArea: formState?.openYardsTotalArea,
                totalAreaOccupied: formState?.openYardsTotalAreaOccupied,
                occupancyPercent: formState?.openYardsOccupancyPercent,
            },
            warehouses: {
                ambient: {
                    totalArea: formState?.ambientTotalArea,
                    totalAreaOccupied: formState?.ambientTotalAreaOccupied,
                    occupancyPercent: formState?.ambientOccupancyPercent,
                },
                airConditioned: {
                    totalArea: formState?.airConditionedTotalArea,
                    totalAreaOccupied: formState?.airConditionedTotalAreaOccupied,
                    occupancyPercent: formState?.airConditionedOccupancyPercent,
                },
                chilledColdStores: {
                    totalArea: formState?.chilledColdStoresTotalArea,
                    totalAreaOccupied: formState?.chilledColdStoresTotalAreaOccupied,
                    occupancyPercent: formState?.chilledColdStoresOccupancyPercent,
                },
                frozen: {
                    totalArea: formState?.frozenTotalArea,
                    totalAreaOccupied: formState?.frozenTotalAreaOccupied,
                    occupancyPercent: formState?.frozenOccupancyPercent,
                },
                smallStores: {
                    totalArea: formState?.smallStoresTotalArea,
                    totalAreaOccupied: formState?.smallStoresTotalAreaOccupied,
                    occupancyPercent: formState?.smallStoresOccupancyPercent,
                },
                chemical: {
                    totalArea: formState?.chemicalTotalArea,
                    totalAreaOccupied: formState?.chemicalTotalAreaOccupied,
                    occupancyPercent: formState?.chemicalOccupancyPercent,
                },
                mixedUse: {
                    totalArea: formState?.mixedUseTotalArea,
                    totalAreaOccupied: formState?.mixedUseTotalAreaOccupied,
                    occupancyPercent: formState?.mixedUseOccupancyPercent,
                },
            }
        };

        try {
            setIsLoading(true);

            const response = await networkRequest(
                API_ENDPOINTS.createBotServiceReport,
                {
                    method: "POST",
                    body: payload,
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
                buttonText="view_bot_reports"
                title="bot_reports_submitted_successfully"
                heading="bot_reports_submitted"
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

    const error = (
        t: any,
        key: string,
        field: any,
        params: Record<string, any> = {}
    ) => t(key, { field: t(field.label), ...params });

    config.sections.forEach((section: any) => {
        section.fields?.forEach((field: any) => {
            const rawValue = formState[field.id];
            const value =
                typeof rawValue === "string" ? rawValue.trim() : rawValue;

            /* =======================
               REQUIRED
            ======================= */
            if (field.required && (value === undefined || value === "")) {
                newErrors[field.id] = error(t, "required", field);
                return;
            }

            // skip empty non-required fields
            if (value === undefined || value === "") return;

            /* =======================
               NUMERIC VALIDATION
            ======================= */
            if (field.type === "number" || field.isNumeric) {
                const numericValue = Number(value);
                if (numericValue <= 0 && !field.id.toLowerCase().includes("occupancypercent")) {
                    newErrors[field.id] = error(t, "greaterThanZero", field);
                    return;
                }
                if (!/^\d+(\.\d+)?$/.test(value)) {
                    newErrors[field.id] = error(t, "invalidNumber", field);
                }


                // must be > 0

                // no leading zero (except "0" itself)
                if (/^0\d+/.test(value)) {
                    newErrors[field.id] = error(t, "noLeadingZero", field);
                    return;
                }

                /* =======================
                   TOTAL AREA / AREA OCCUPIED
                ======================= */
                if (
                    field.id.toLowerCase().includes("totalarea") ||
                    field.id.toLowerCase().includes("areaoccupied")
                ) {
                    if (value.replace(".", "").length > 10) {
                        newErrors[field.id] = error(t, "maxLength", field, {
                            max: 10,
                        });
                        return;
                    }
                }

                /* =======================
                   OCCUPANCY %
                ======================= */
                if (field.id.toLowerCase().includes("occupancypercent")) {
                    if (numericValue < -1 || numericValue > 100) {
                        newErrors[field.id] = error(t, "digitsRangeBetween", field, {
                            min: 0,
                            max: 100,
                        });
                        return;
                    }
                }
            }
        });
    });

    return newErrors;
};
