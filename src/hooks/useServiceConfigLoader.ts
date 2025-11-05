import { API_ENDPOINTS } from "@/api/apiEndpoints";
import useNetworkRequest from "@/api/useNetworkRequest";
import { useApp } from "@/context/AppContext";

export const useServiceFormConfigLoader = () => {
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