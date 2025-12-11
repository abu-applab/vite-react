import { violationFormConfig } from "@/lib/form-data";
import { useEffect, useRef, useState } from "react";
import DynamicForm from "../dynamic-form";
import useNetworkRequest from "@/api/useNetworkRequest";
import { API_ENDPOINTS } from "@/api/apiEndpoints";
import { useParams } from "react-router-dom";
import Loader from "../loader";
import { RequestSubmittedModal } from "../service/createNewRequest/requestSubmittedModal";
import { getDynamicViolationFormConfig, parseApiError } from "@/lib/utils";
import { useTranslation } from "react-i18next";

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


export const ViolationFormHandler = ({ onBack }: ViolationFormHandlerProps) => {
  const [formState, setFormState] = useState<Record<string, any>>({ ...initialFormState });
  const [formConfig, setFormConfig] = useState(violationFormConfig)
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const fieldRefs = useRef<Record<string, HTMLElement | null>>({});
  const networkRequest = useNetworkRequest();
  const { id } = useParams();
  const [isSubmittedModalOpen, setSubmittedModal] = useState(false);
  const [referenceMessage, setReferenceMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { t } = useTranslation();

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
          const violationPhotos = documentsList.filter((doc: any) => (doc?.createdBy !== "# D365CRMSB" && doc?.createdBy !== "# QHSE-SBX"));
          const closeoutEvidence = documentsList.filter((doc: any) => (doc?.createdBy === "# D365CRMSB" || doc?.createdBy === "# QHSE-SBX"));

          const updatedFormData = {
            ...findingData,
            violationPhotos,
            closeoutEvidence,
          };

          setFormState(updatedFormData);

          // ⬇️ Generate dynamic form config based on finding type
          const newConfig = getDynamicViolationFormConfig(findingData.findingType, findingData.actionPartyFindingStatus, findingData.findingNumber );

          setFormConfig(newConfig as any);
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
    e?.preventDefault();

    const newErrors = validateForm(formState, formConfig, t);
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
        documents: formState.documents.map((doc: { fileBytes: string, fileName: string, mimeType: string }) => ({
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

  const isSubmittedReport = Boolean(formState?.findingType === "Compliance - الإمتثال و أفضل الممارسات" || formState?.findingType === "Not Inspected - لم يتم التفتيش")
  const isClosedReport = Boolean(formState?.actionPartyFindingStatus === "Closed+" || formState?.actionPartyFindingStatus === "Closed-")

  return (
    <div>
      <DynamicForm
        config={formConfig as any}
        formData={formState}
        errors={errors}
        setErrors={setErrors}
        fieldRefs={fieldRefs}
        handleInputChange={handleInputChange}
        handlePerviousButton={() => onBack()}
        handleSubmit={handleSubmit}
        isSubmittedApplication={isSubmittedReport || isClosedReport}
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
  t: any,
  updatedFields: string[] = [] // validate only these, else validate all on submit
) => {
  const errors: Record<string, string> = {};

  // Utility Validators
  const isDigitsOnly = (val: string) => /^\d+$/.test(val);

  const hasEmojiOrUnicodeSymbols = (val: string) =>
    /[^\u0000-\u007F\u0600-\u06FF\s]/.test(val);

  const allowedCommentChars = (val: string) =>
    /^[A-Za-z0-9\u0600-\u06FF\s.,!?-]+$/.test(val);

  // Extract all fields
  const allFields = formConfig.sections.flatMap((section: any) => section.fields);

  allFields.forEach((field: any) => {
    const { id, required, type, disabled } = field;

    // Skip disabled fields
    if (disabled) return;

    // Validate only updated fields during typing
    const shouldValidate =
      updatedFields.length > 0 ? updatedFields.includes(id) : true;

    if (!shouldValidate) return;

    const rawValue = formState?.[id];
    const value = typeof rawValue === "string" ? rawValue.trim() : rawValue;

    if (type === "text" || type === "textarea") {

      // Required rule
      if (required && (!value || value.length === 0)) {
        errors[id] = `${t(field.label)} is required`;
        return;
      }

      // If empty and not required → no further validation
      if (!value) return;

      // Minimum length: 3 chars
      if (value.length < 3) {
        errors[id] = `${t(field.label)} must be at least 3 characters`;
        return;
      }

      // Digits only
      if (isDigitsOnly(value)) {
        errors[id] = "This field cannot contain digits only.";
        return;
      }

      // Emoji or unicode outside allowed sets
      if (hasEmojiOrUnicodeSymbols(value)) {
        errors[id] = "Emojis or special Unicode symbols are not allowed.";
        return;
      }

      // Allowed characters check
      if (!allowedCommentChars(value)) {
        errors[id] =
          "Only letters, numbers, spaces, and . , ! ? - are allowed.";
      }
    }
  });

  if (!formState?.documents?.length) errors.closeoutEvidence = "Please upload at least one document";

  return errors;
};

