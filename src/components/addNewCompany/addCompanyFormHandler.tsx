import { AddNewCompanyFormConfig } from "@/lib/form-data";
import { useRef, useState } from "react";
import DynamicForm from "../dynamic-form";
import useNetworkRequest from "@/api/useNetworkRequest";
import Loader from "../loader";
import { useTranslation } from "react-i18next";
import { RequestSubmittedModal } from "../service/createNewRequest/requestSubmittedModal";
import { API_ENDPOINTS } from "@/api/apiEndpoints";
import { isValidPhone, isValidPOBox, parseApiError } from "@/lib/utils";

interface Document {
    fileBytes: string;
    fileName: string;
    mimeType: string;
}

interface FormState {
    closureComments: string;
    rootCause: string;
    remedialActionCorrection: string;
    correctiveActionPlan: string;
    documents: Document[];
}

const initialFormState: FormState = {
    closureComments: "",
    rootCause: "",
    remedialActionCorrection: "",
    correctiveActionPlan: "",
    documents: [],
};

export const AddCompanyFormHandler = () => {
    const [formState, setFormState] = useState<Record<string, any>>({ ...initialFormState });
    const [formConfig, _setFormConfig] = useState(AddNewCompanyFormConfig)
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const fieldRefs = useRef<Record<string, HTMLElement | null>>({});
    const networkRequest = useNetworkRequest();
    const [isSubmittedModalOpen, setSubmittedModal] = useState(false);
    const [referenceMessage, setReferenceMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { t } = useTranslation();

    const handleInputChange = (fieldId: string, value: any) => {
        setFormState((prev) => ({ ...prev, [fieldId]: value }));
        setErrors((prev) => ({ ...prev, [fieldId]: "" }));
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();

        const newErrors = validateForm(formState, formConfig, t);
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            const firstErrorField = Object.keys(newErrors)[0];
            fieldRefs.current[firstErrorField]?.scrollIntoView({ behavior: "smooth", block: "center" });
            fieldRefs.current[firstErrorField]?.focus({ preventScroll: true });
            return;
        }
        const body = { ...formState }
        try {
            setIsLoading(true);

            const response = await networkRequest(API_ENDPOINTS.addNewCompany, {
                method: "POST",
                body,
            });

            if (response.success) setReferenceMessage(response.message);

            //   setSubmittedModal(true);
        } catch (error) {
            setErrorMessage(parseApiError(error));
            setIsLoading(false);
            setSubmittedModal(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleTryAgain = () => { }

    const onBack = () => { }

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
                buttonText="view_violation_report"
                title="violation_updated_successfully"
                heading="violation_updated"
            />

            {isLoading && <Loader />}
        </div>
    )
}

const validateForm = (
    formState: Record<string, any>,
    formConfig: any,
    t: any
) => {
    const errors: Record<string, string> = {};

    // Loop through all sections & fields
    formConfig.sections.forEach((section: any) => {
        section.fields.forEach((field: any) => {
            const { id, required } = field;
            const value = formState[id];

            // Required field validation
            if (required && (!value || String(value).trim() === "")) {
                errors[id] = `${t(field.label)} is required`;
                return;
            }
            if (id === "poBox" && value && !isValidPOBox(value)) {
                errors[id] = "Must contain 5 to 8 digits."
            }
            if (field.label === "telephone" && value && !isValidPhone(value)) {
                errors[id] = "Must contain exactly 8 digits."
            }
        });
    });

    return errors;
};


