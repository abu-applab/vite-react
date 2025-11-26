import { violationFormConfig } from "@/lib/form-data";
import { useEffect, useRef, useState } from "react";
import DynamicForm from "../dynamic-form";
import useNetworkRequest from "@/api/useNetworkRequest";
import { API_ENDPOINTS } from "@/api/apiEndpoints";
import { useParams } from "react-router-dom";
import Loader from "../loader";
import { RequestSubmittedModal } from "../service/createNewRequest/requestSubmittedModal";
import { parseApiError } from "@/lib/utils";

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

interface ViolationFormHandlerProps {
    onBack: () => void;
}

const validateForm = (formState: any) => {
    const errors: Record<string, string> = {};
  
    if (!formState?.closureComments?.trim()) errors.closureComments = "Closure Comments is required";
    if (!formState?.rootCause?.trim()) errors.rootCause = "Root Cause is required";
    if (!formState?.remedialActionCorrection?.trim()) errors.remedialActionCorrection = "Remedial Action is required";
    if (!formState?.correctiveActionPlan?.trim()) errors.correctiveActionPlan = "Corrective Action Plan is required";
  
    // Optional: require at least 1 document
    if (!formState?.documents?.length) errors.closeoutEvidence = "Please upload at least one document";
  
    return errors;
  };
  

export const ViolationFormHandler = ({ onBack }: ViolationFormHandlerProps) => {
    const [formState, setFormState] = useState<Record<string, any>>({...initialFormState});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const fieldRefs = useRef<Record<string, HTMLElement | null>>({});
    const networkRequest = useNetworkRequest();
    const { id } = useParams();
    const [isSubmittedModalOpen, setSubmittedModal] = useState(false);
    const [referenceMessage, setReferenceMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                const response = await networkRequest(API_ENDPOINTS.GetFindingFromOP, {
                    method: "GET",
                    body: { id: id },
                });

                if (response.success) {
                    const findingData = response.data.finding;
                    const documentsList = response.data.documents || [];

                    // Separate objects based on createdBy condition
                    const violationPhotos = documentsList.filter((doc: any) => doc?.createdBy !== "# D365CRMSB");
                    const closeoutEvidence = documentsList.filter((doc: any) => doc?.createdBy === "# D365CRMSB");

                    setFormState({
                        ...findingData,
                        violationPhotos,
                        closeoutEvidence
                    });
                } else {
                    console.error("API Error:", response.message);
                }
            } catch (error) {
                console.error("Fetch failed:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);
    
    const handleTryAgain = () => {
        setSubmittedModal(false);
        handleSubmit();
    };

    const handleInputChange = (fieldId: string, value: any) => {
        setFormState((prev) => ({ ...prev, [fieldId]: value }));
        setErrors((prev) => ({ ...prev, [fieldId]: "" }));
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        console.log('caled');
        e?.preventDefault();
      
        const newErrors = validateForm(formState);
        setErrors(newErrors);
      
        if (Object.keys(newErrors).length > 0) {
          const firstErrorField = Object.keys(newErrors)[0];
          fieldRefs.current[firstErrorField]?.scrollIntoView({ behavior: "smooth", block: "center" });
          fieldRefs.current[firstErrorField]?.focus({ preventScroll: true });
          return;
        }
      
        try {
          setIsLoading(true);
      
          const body = {
            id: id,
            closureComments: formState.closureComments,
            rootCause: formState.rootCause,
            remedialActionCorrection: formState.remedialActionCorrection,
            correctiveActionPlan: formState.correctiveActionPlan,
            documents: formState.documents.map((doc : {fileBytes: string, fileName: string, mimeType: string }) => ({
              fileBytes: doc.fileBytes,
              fileName: doc.fileName,
              mimeType: doc.mimeType,
            })),
          };
      
          const response = await networkRequest(API_ENDPOINTS.updateFindingDetails, {
            method: "POST",
            body,
          });
      
          if (response.success) setReferenceMessage(response.message);
      
          setSubmittedModal(true);
        } catch (error) {
          console.error("Error:", error);
          setErrorMessage(parseApiError(error));
          setSubmittedModal(true);
        } finally {
          setIsLoading(false);
        }
      };
      


    return (
        <div>
            <DynamicForm
                config={violationFormConfig as any}
                formData={formState}
                errors={errors}
                setErrors={setErrors}
                fieldRefs={fieldRefs}
                handleInputChange={handleInputChange}
                handlePerviousButton={() => onBack()}
                handleSubmit={handleSubmit}
            />

            <RequestSubmittedModal
                open={isSubmittedModalOpen}
                onOpenChange={setSubmittedModal}
                onGoToRequest={() => onBack()}
                referenceMessage={referenceMessage}
                handleTryAgain={handleTryAgain}
                errorMessage={errorMessage}
                buttonText="view_my_requests"
                title="request_submitted_successfully"
                heading="request_submitted"
            />
            {isLoading && <Loader />}
        </div>
    )
}
