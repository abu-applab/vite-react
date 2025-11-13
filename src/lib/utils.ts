import { clsx, type ClassValue } from "clsx"
import { AppWindow, FileText, Home, MessageSquareDot, SquareDashed, SquareLibrary, Wallet } from "lucide-react"
import { twMerge } from "tailwind-merge"

interface SubmitCompanyUpdateProps {
  formState: Record<string, any>;
  urls: string[];
  networkRequest: any;
  setReferenceMessage: (msg: string) => void;
  contactId: string
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const navigationItems = [
  { name: "Home", icon: Home, href: "/portal" },
  { name: "Application", icon: AppWindow, href: "/portal/application" },
  { name: "Payments", icon: Wallet, href: "/portal/payments" },
  { name: "Allocated Plots", icon: SquareDashed, href: "/portal/allocated-plots" },
  { name: "Agreements", icon: FileText, href: "/portal/agreements" },
  {
    name: "Service Request",
    icon: MessageSquareDot,
    children: [
      { name: "General Service Request", href: "/portal/service" },
      { name: "Bot Requests", href: "/portal/bot-requests" },
      { name: "Bot Reports", href: "/portal/bot-reports" },
    ],
  },
  { name: "HSE Findings", icon: SquareLibrary, href: "/portal/violations" },
]

export const getFileType = (fileName: string) => {
  const extension = fileName?.split(".").pop()?.toLowerCase()
  return extension === "pdf" ? "PDF" : "DOC"
}

export const getFileName = (fileName: string) => fileName?.split(".")?.[0]

export const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

/**
 * Handles the chained request for "Update Company Information"
 */

// extract first call logic
export const createCompanyUpdateRequest = async ({ formState, networkRequest, contactId } : {formState: any, networkRequest: any, contactId: string}) => {
  const body = {
    agreement: formState.agreement,
    plot: formState.plot,
    company: formState.company,
    contactPerson: contactId,
  }

  const response = await networkRequest('/createBasicCompanyUpdateRequest'
    , {
    method: "POST",
    body
  });

  if (!response?.success) {
    throw new Error("Failed to create company update request");
  }

  return response?.data?.companyUpdateRequestId;
};


export const submitUpdateCompanyInformation = async ({
  formState,
  urls,
  networkRequest,
  setReferenceMessage,
  contactId,
}: SubmitCompanyUpdateProps) => {

  const secondBody = new FormData();
  
  if (formState.requiredUpdate) {
    String(formState.requiredUpdate)
      .split(",")
      .map(v => v.trim())
      .filter(Boolean)
      .forEach(v => secondBody.append("requiredUpdate", v));
  }
  secondBody.append("updateRequestId", formState.updateRequestId);
  secondBody.append("newCompanyNameEn", formState.newCompanyNameEn || "");
  secondBody.append("newCompanyNameAr", formState.newCompanyNameAr || "");
  secondBody.append("newSignatory", formState.newSignatory || "");
  secondBody.append("comment", formState.comment || "");
  secondBody.append("company", formState.company || "");
  secondBody.append("contactPerson", contactId);
  if (formState.NewCRCopy)
    secondBody.append("NewCRCopy", formState.NewCRCopy);
  if (formState.NOCToWhomItMayConcern)
    secondBody.append("NOCToWhomItMayConcern", formState.NOCToWhomItMayConcern);

  const secondResponse = await networkRequest(urls[1], {
    method: "POST",
    body: secondBody,
  });

  if (!secondResponse?.success)
    throw new Error("Failed to update company details");

  setReferenceMessage(secondResponse.message ?? "");
};

/**
 * Prepares the request body for different content types
 */
export const prepareRequestBody = (
  formState: Record<string, any>,
  contentType: string,
  contactId: string,
) => {
  const requiredUpdateKey = "RequiredUpdateSet";
  let requiredValues: string[] = [];

  if (formState[requiredUpdateKey]) {
    requiredValues = String(formState[requiredUpdateKey])
      .split(",")
      .map(v => v.trim())
      .filter(Boolean);
  }
  if (contentType === "multipart") {
    const body = new FormData();
    Object.entries(formState).forEach(([key, val]) => {
      if (key === requiredUpdateKey) {
        requiredValues.forEach(v => body.append(key, v));
      } else {
        body.append(
          key,
          val instanceof File || val instanceof Blob ? val : String(val)
        );
      }
    });

    body.append("ContactPerson", contactId);
    return body;
  }

  // ✅ JSON request body — send array
  return {
    ...formState,
    [requiredUpdateKey]: requiredValues.length ? requiredValues : undefined,
    contactPerson: contactId,
  };
};


/**
 * Extracts reference number key from API response data
 */
export const extractReferenceNumber = (data: Record<string, any>): string => {
  console.log('data: ', data);
  const refKey = Object.keys(data).find((k) =>
    k.toLowerCase().endsWith("referenceid")
);
  console.log('refKey: ', refKey);
  const refValue = refKey ? data[refKey] : "";
  return refValue;
};

/**
 * Handles API error and returns a clean message
 */
export const parseApiError = (error: any): string => {
  if (error?.data?.Message) return error.data.Message;
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "An unexpected error occurred.";
};

// valiadtion utils

export const isEmpty = (val: any) => val === undefined || val === null || val === ""
export const isDigitsOnly = (val: string) => /^\d+$/.test(val)
export const hasSpecialChars = (val: string) => /[^A-Za-z0-9\u0600-\u06FF\s]/.test(val)
export const isArabic = (val: string) => /[\u0600-\u06FF]/.test(val)
export const isEnglish = (val: string) => /[A-Za-z]/.test(val)
export const isValidEmail = (val: string) =>
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(val);  
export const hasArabicLetters = (val: string) => /[\u0600-\u06FF]/.test(val);
export const isValidPhone = (val: string) => /^\d{8}$/.test(val)
export const isValidPOBox = (val: string) => /^\d{5,8}$/.test(val);
export const isValidBuildingPermitNumber = (val: string) => /^\d{1,10}$/.test(val);
export const hasEmojiOrUnicodeSymbols = (val: string) =>
  /[^\u0000-\u007F\u0600-\u06FF\s]/.test(val);

export const allowedCommentChars = (val: string) =>
  /^[A-Za-z0-9\u0600-\u06FF\s.,!?-]+$/.test(val);
