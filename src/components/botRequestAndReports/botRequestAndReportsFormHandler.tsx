import { botRequestFormConfig } from "@/lib/form-data";
import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import DynamicForm from "../dynamic-form";
import useNetworkRequest from "@/api/useNetworkRequest";
import Loader from "../loader";
import { RequestSubmittedModal } from "../service/createNewRequest/requestSubmittedModal";
import { API_ENDPOINTS } from "@/api/apiEndpoints";
import { allowedCommentChars, hasEmojiOrUnicodeSymbols, isDigitsOnly, isEmpty, parseApiError } from "@/lib/utils";
// import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { useTranslation } from "react-i18next";

interface BotRequestAndReportsFromHandlerProps {
    setCreateBotRequest:  Dispatch<SetStateAction<boolean>>
}

export const BotRequestAndReportsFromHandler = ({setCreateBotRequest}: BotRequestAndReportsFromHandlerProps) => {
    const [formState, setFormState] = useState<Record<string, any>>({});
    const [formConfig, _setFormConfig] = useState(botRequestFormConfig)
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const fieldRefs = useRef<Record<string, HTMLElement | null>>({});
    const networkRequest = useNetworkRequest();
    const [isSubmittedModalOpen, setSubmittedModal] = useState(false);
    const [referenceMessage, setReferenceMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { contact, selectedCompany } = useApp()
    const { t } = useTranslation();
    // const navigate = useNavigate();


    const handleInputChange = (fieldId: string, value: any) => {
        setFormState((prev) => ({ ...prev, [fieldId]: value }));
        setErrors((prev) => ({ ...prev, [fieldId]: "" }));
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        e?.stopPropagation();
      
        const newErrors = validateBotRequestForm(formState, t);
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
        setCreateBotRequest(false)
        setSubmittedModal(false);
    }

    return (
        <div>
            <DynamicForm
                config={formConfig as any}
                formData={formState}
                errors={errors}
                setErrors={setErrors}
                fieldRefs={fieldRefs}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                hidePreviousButton={true}
            />
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

    botRequestFormConfig.sections.forEach((section) => {
        section.fields?.forEach((field) => {
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


