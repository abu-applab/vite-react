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
export const submitUpdateCompanyInformation = async ({
  formState,
  urls,
  networkRequest,
  onServiceAdded,
  setReferenceMessage,
}: SubmitCompanyUpdateProps) => {
  // 1️⃣ First API call (JSON)
  const firstBody = {
    agreement: formState.Agreement,
    plot: formState.Plot,
    company: formState.companyId,
    contactPerson: "a2032062-a76e-f011-b4cc-6045bd9e8ac7",
  };

  const firstResponse = await networkRequest(urls[0], {
    method: "POST",
    body: firstBody,
  });

  if (!firstResponse?.success)
    throw new Error("Failed to create company update request");

  const updateRequestId = firstResponse?.data?.companyUpdateRequestId;
  if (!updateRequestId)
    throw new Error("Missing updateRequestId from response");

  // 2️⃣ Second API call (multipart/form-data)
  const secondBody = new FormData();
  secondBody.append("RequiredUpdate", formState.RequiredUpdate);
  secondBody.append("UpdateRequestId", updateRequestId);
  secondBody.append("NewCompanyNameEn", formState.NewCompanyNameEn || "");
  secondBody.append("NewCompanyNameAr", formState.NewCompanyNameAr || "");
  secondBody.append("NewSignatory", formState.NewSignatory || "");
  secondBody.append("Comment", formState.Comment || "");
  secondBody.append("Company", formState.companyId || "");
  secondBody.append("ContactPerson", "d7323f05-356d-f011-b4cc-6045bd9e8ac7");

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

  const refNumber = Object.keys(secondResponse.data).find((k) =>
    k.toLowerCase().endsWith("referenceid")
  );
  setReferenceMessage(refNumber ?? "");

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
  if (contentType === "multipart") {
    const body = new FormData();
    Object.entries(formState).forEach(([key, val]) => {
      body.append(key, val instanceof File || val instanceof Blob ? val : String(val));
    });
    // body.append("Company", companyId);
    body.append("ContactPerson", "d7323f05-356d-f011-b4cc-6045bd9e8ac7");
    return body;
  }

  return {
    ...formState,
    // company: companyId,
    contactPerson: "d7323f05-356d-f011-b4cc-6045bd9e8ac7",
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

  const loadServiceForm = async (baseConfig: any) => {
    let updatedConfig = { ...baseConfig }
    // --- Call getPlots API if needed ---
    if (baseConfig.needsPlots) {
      const body = {
        accountId: selectedCompany?.accountID,
      }
      const plotsResponse = await networkRequest(API_ENDPOINTS.getPlots, {
        method: "GET",
        body,
      });
      const plotsData = plotsResponse?.data || []

      const plotOptions = plotsData.map((item: any) => ({
        id: item.plotID,
        agreementId: item.agreementId,
        name: item.plotNumber,
      }));

      // Step 4: Update baseConfig fields dynamically
       updatedConfig = {
        ...updatedConfig,
        sections: updatedConfig.sections.map((section: any) => ({
          ...section,
          fields: section.fields.map((field: any) => {
            if (field.id.toLowerCase() === "plot") {
              return { ...field, options: plotOptions };
            }
            return field;
          }),
        })),
      };
    }

    // --- Call getSignatory API if needed ---
    if (baseConfig.needsSignatory) {
      const body = {
        companyId: 'da79fca4-9a37-ef11-8409-000d3a26ab14',
      }
      const signatoryResponse = await networkRequest(API_ENDPOINTS.getSignatories, {
        method: "GET",
        body,
      });
      const signatoryData = signatoryResponse?.data || []

      const signatoryOptions = signatoryData.map((s: any) => ({
        id: s.id,
        name: s.manateqID,
      }))

      updatedConfig = {
        ...updatedConfig,
        sections: updatedConfig.sections.map((section: any) => ({
          ...section,
          fields: section.fields.map((field: any) => {
            if (field.id.toLowerCase() === "newsignatory") {
              return { ...field, options: signatoryOptions};
            }
            return field;
          }),
        })),
      };
    }

    return updatedConfig
  }

  return { loadServiceForm }
}
