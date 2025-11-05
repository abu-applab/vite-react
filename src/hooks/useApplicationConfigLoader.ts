
import { API_ENDPOINTS } from "@/api/apiEndpoints";
import useNetworkRequest from "@/api/useNetworkRequest";
// import { useApp } from "@/context/AppContext";
import { getApplicationFormConfig } from "@/lib/form-data";

export const useApplicationConfigLoader = () => {
  const networkRequest = useNetworkRequest();
  // const { selectedCompany } = useApp();

  const loadApplicationConfig = async (selectedApplication: string) => {
    let baseConfig = getApplicationFormConfig(selectedApplication);

    let [clusterRes, locationRes] = await Promise.all([
      networkRequest(API_ENDPOINTS.getClusters, { method: "GET" }),
      networkRequest(API_ENDPOINTS.getLocations, { method: "GET" }),
    ]);

    const clusters = clusterRes?.data || [];
    const locations = locationRes?.data || [];

    // map to select options
    const clusterOptions = clusters.map((cluster: any) => ({
      id: cluster.id,
      name: cluster.name,
    }));

    const locationOptions = locations.map((location: any) => ({
      name: location.name,
      id: location.id,
    }));

    // inject into config
    const updatedConfig = baseConfig.map((step: any) => ({
      ...step,
      sections: step.sections?.map((section: any) => ({
        ...section,
        fields: section.fields?.map((field: any) => {
          if (field.id === "Location") {
            return { ...field, options: locationOptions };
          }
          if (field.id === "Cluster") {
            return { ...field, options: clusterOptions };
          }
          return field;
        }),
      })),
    }));

    return updatedConfig;
  };

  return { loadApplicationConfig };
};
