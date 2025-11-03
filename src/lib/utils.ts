import { API_ENDPOINTS } from "@/api/apiEndpoints";
import useNetworkRequest from "@/api/useNetworkRequest";
import { serviceOptions } from "@/constants"
import { clsx, type ClassValue } from "clsx"
import { AppWindow, FileText, Home, MessageSquareDot, SquareDashed, SquareLibrary, Wallet } from "lucide-react"
import { twMerge } from "tailwind-merge"
import { useApp } from "@/context/AppContext";

interface SubmitCompanyUpdateProps {
  formState: Record<string, any>;
  urls: string[];
  networkRequest: any;
  onServiceAdded: (service: any) => void;
  setReferenceMessage: (msg: string) => void;
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
export const createCompanyUpdateRequest = async ({ formState, networkRequest } : {formState: any, networkRequest: any}) => {
  const body = {
    agreement: formState.Agreement,
    plot: formState.Plot,
    company: formState.Company,
    contactPerson: "a2032062-a76e-f011-b4cc-6045bd9e8ac7",
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
  onServiceAdded,
  setReferenceMessage,
}: SubmitCompanyUpdateProps) => {

  const secondBody = new FormData();
  
  if (formState.RequiredUpdate) {
    String(formState.RequiredUpdate)
      .split(",")
      .map(v => v.trim())
      .filter(Boolean)
      .forEach(v => secondBody.append("RequiredUpdate", v));
  }
  secondBody.append("UpdateRequestId", formState.updateRequestId);
  secondBody.append("NewCompanyNameEn", formState.NewCompanyNameEn || "");
  secondBody.append("NewCompanyNameAr", formState.NewCompanyNameAr || "");
  secondBody.append("NewSignatory", formState.NewSignatory || "");
  secondBody.append("Comment", formState.Comment || "");
  secondBody.append("Company", formState.companyId || "");
  secondBody.append("ContactPerson", "a2032062-a76e-f011-b4cc-6045bd9e8ac7");

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

  const serviceTitle =
    serviceOptions.find((s) => s.key === "updateCompanyInformation")?.title ??
    "Update Company Information";

  onServiceAdded({
    id: Object.values(secondResponse.data)[0] || "TEMP-ID",
    plotNumber: Object.values(secondResponse.data)[0] || "Unknown",
    serviceType: serviceTitle,
    submittedDate: new Date().toLocaleDateString(),
    status: "Pending",
  });
};

/**
 * Prepares the request body for different content types
 */
export const prepareRequestBody = (
  formState: Record<string, any>,
  contentType: string,
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

    body.append("ContactPerson", "a2032062-a76e-f011-b4cc-6045bd9e8ac7");
    return body;
  }

  // ✅ JSON request body — send array
  return {
    ...formState,
    [requiredUpdateKey]: requiredValues.length ? requiredValues : undefined,
    contactPerson: "a2032062-a76e-f011-b4cc-6045bd9e8ac7",
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

export const useFormConfigLoader = () => {
  const networkRequest = useNetworkRequest();
  const { selectedCompany } = useApp();

  // ✅ Load plots and return updatedConfig
  const loadServicePlot = async (baseConfig: any) => {
    let updatedConfig = { ...baseConfig };

    if (!baseConfig.needsPlots) return updatedConfig;

    const body = { accountId: selectedCompany?.accountID };

    const response = await networkRequest(API_ENDPOINTS.getPlots, {
      method: "GET",
      body,
    });

    const plots = response?.data || [];

    const plotOptions = plots.map((item: any) => ({
      id: item.plotID,
      agreementId: item.agreementId,
      name: item.plotNumber,
    }));

    updatedConfig = {
      ...updatedConfig,
      sections: updatedConfig.sections.map((section: any) => ({
        ...section,
        fields: section.fields.map((field: any) =>
          field.id.toLowerCase() === "plot"
            ? { ...field, options: plotOptions }
            : field
        ),
      })),
    };

    return updatedConfig;
  };

  // ✅ Load signatories and return updatedConfig
  const loadServiceSignatory = async (baseConfig: any) => {
    let updatedConfig = { ...baseConfig };

    if (!baseConfig.needsSignatory) return updatedConfig;

    const body = { companyId: selectedCompany?.accountID };

    const response = await networkRequest(API_ENDPOINTS.getSignatories, {
      method: "GET",
      body,
    });

    const signatories = response?.data || [];

    const signatoryOptions = signatories.map((s: any) => ({
      id: s.id,
      name: s.nameAr,
    }));

    updatedConfig = {
      ...updatedConfig,
      sections: updatedConfig.sections.map((section: any) => ({
        ...section,
        fields: section.fields.map((field: any) =>
          field.id.toLowerCase() === "newsignatory"
            ? { ...field, options: signatoryOptions }
            : field
        ),
      })),
    };

    return updatedConfig;
  };

  return { loadServicePlot, loadServiceSignatory };
};

