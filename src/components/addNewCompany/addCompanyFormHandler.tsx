import { AddNewCompanyFormConfig } from "@/lib/form-data";
import { useEffect, useRef, useState } from "react";
import DynamicForm from "../dynamic-form";
import useNetworkRequest from "@/api/useNetworkRequest";
import Loader from "../loader";
import { RequestSubmittedModal } from "../service/createNewRequest/requestSubmittedModal";
import { API_ENDPOINTS } from "@/api/apiEndpoints";
import { parseApiError } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";

interface FormState {
    companyNameEN: string;
    companyNameAR: string;
    crNumber: string;
    telephone: string;
    poBox: string;
    address: string;
}

const initialFormState: FormState = {
    companyNameEN: "",
    companyNameAR: "",
    crNumber: "",
    telephone: "",
    poBox: "",
    address: ""
};

export const AddCompanyFormHandler = () => {
    const { state } = useLocation();
    const companyData = state?.companyData ?? null;
    const [formState, setFormState] = useState<Record<string, any>>({ ...initialFormState });
    const [formConfig, _setFormConfig] = useState(AddNewCompanyFormConfig)
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const fieldRefs = useRef<Record<string, HTMLElement | null>>({});
    const networkRequest = useNetworkRequest();
    const [isSubmittedModalOpen, setSubmittedModal] = useState(false);
    const [referenceMessage, setReferenceMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { contact, fetchCompanies } = useApp()
    const navigate = useNavigate();

    const mapCompanyDataToFormState = (companyData: any) => {
        if (!companyData) return initialFormState;
        return {
          ...initialFormState,
          companyNameEN: companyData.companyNameEN ?? '',
          companyNameAR: companyData.companyNameAR ?? '',
          crNumber: companyData.crNumber ?? '',
          poBox: companyData.poBox ?? '',
          telephone: companyData.telephone ?? '',
          companyId: companyData.companyId ?? '',
          address: companyData.address ?? '',
        };
      };
      

    useEffect(() => {
        if (companyData) {
          const mappedState = mapCompanyDataToFormState(companyData);
          setFormState(mappedState);
        }
      }, [companyData]);
  

    const handleInputChange = (fieldId: string, value: any) => {
        setFormState((prev) => ({ ...prev, [fieldId]: value }));
        setErrors((prev) => ({ ...prev, [fieldId]: "" }));
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        const body = {
            ...formState,
            contactId: contact?.id ?? '', 
        }
        try {
            setIsLoading(true);
            
            const response = await networkRequest(API_ENDPOINTS.associatenewcompany, {
                method: "POST",
                body,
            });
            
            if (response.success) {
                setReferenceMessage(response.message);
                await fetchCompanies()
                setSubmittedModal(true);
            } 
        } catch (error) {
            setErrorMessage(parseApiError(error));
            setIsLoading(false);
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
        setSubmittedModal(false);
        navigate('/portal')
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
                buttonText="view_companies"
                title="company_added_successfully"
                heading="company_added"
            />

            {isLoading && <Loader />}
        </div>
    )
}

// const validateForm = (
//     formState: Record<string, any>,
//     formConfig: any,
//     t: any
// ) => {
//     const errors: Record<string, string> = {};

//     // Loop through all sections & fields
//     formConfig.sections.forEach((section: any) => {
//         section.fields.forEach((field: any) => {
//             const { id, required } = field;
//             const value = formState[id];

//             // Required field validation
//             if (required && (!value || String(value).trim() === "")) {
//                 errors[id] = `${t(field.label)} is required`;
//                 return;
//             }
//             if (id === "poBox" && value && !isValidPOBox(value)) {
//                 errors[id] = "Must contain 5 to 8 digits."
//             }
//             if (field.label === "telephone" && value && !isValidPhone(value)) {
//                 errors[id] = "Must contain exactly 8 digits."
//             }
//         });
//     });

//     return errors;
// };


