
import { API_ENDPOINTS } from "@/api/apiEndpoints";
import useNetworkRequest from "@/api/useNetworkRequest";
import { useApp } from "@/context/AppContext";
import { getApplicationFormConfig } from "@/lib/form-data";
import { useEffect } from "react";

export const useApplicationConfigLoader = () => {
  const networkRequest = useNetworkRequest();
  const { selectedInvestment } = useApp();

  const loadApplicationConfig = async (selectedApplication: string, setFormData: any) => {
    let baseConfig = getApplicationFormConfig(selectedApplication);

    let [clusterRes, iSICSectionsRes, locationRes] = await Promise.all([
      selectedInvestment?.applicationType === 'LogisticsParks' && networkRequest(API_ENDPOINTS.getClusters, { method: "GET" }),
      selectedInvestment?.applicationType !== 'LogisticsParks' && networkRequest(API_ENDPOINTS.getISICSections, { method: "GET" }),
      networkRequest(API_ENDPOINTS.getLocations, { method: "GET" }),
    ]);

    const clusters = clusterRes?.data || [];
    const iSICSections = iSICSectionsRes?.data || [];
    const locations = locationRes?.data || [];

    // map to select options
    const clusterOptions = clusters.map((cluster: any) => ({
      id: cluster.id,
      name: cluster.name,
    }));

    const iSICSectionOptions = iSICSections.map((cluster: any) => ({
      id: cluster.id,
      name: cluster.descriptionEN,
    }));

    const locationOptions = locations
      .filter((location: any) => location.name === selectedInvestment?.location)
      .map((location: any) => ({
        name: location.name,
        id: location.id,
      }));

    if (locationOptions.length > 0) {
      setFormData((prev: Record<string, any>) => ({
        ...prev,
        Location: locationOptions[0].id,
      }));
    }

    // inject into config
    const updatedConfig = baseConfig.map((step: any) => ({
      ...step,
      sections: step.sections?.map((section: any) => ({
        ...section,
        fields: section.fields?.map((field: any) => {
          if (field.id === "location") {
            return { ...field, options: locationOptions };
          }
          if (field.id === "cluster") {
            return { ...field, options: clusterOptions };
          }
          if (field.id === "isicSection") {
            return { ...field, options: iSICSectionOptions };
          }
          return field;
        }),
      })),
    }));

    return updatedConfig;
  };

  return { loadApplicationConfig };
};

export const useISICCodeLoader = (formState: Record<string, any>, setConfig: any, setFormData: any) => {
  const networkRequest = useNetworkRequest();

  useEffect(() => {
    const fetchISICCodes = async () => {
      const sectionId = formState?.isicSection;

      // Only call when valid selection
      if (!sectionId) return;

      try {
        const response = await networkRequest(API_ENDPOINTS.getISICCodesBySectionId, {
          method: "GET",
          body: {sectionId: sectionId}
        })

        const isicCodes = response?.data || [];

        const isicCodeOptions = isicCodes.map((code: any) => ({
          id: code.id,
          name: code.name,
        }));

        setConfig((prevConfig: any) => ({
          ...prevConfig,
          sections: prevConfig.sections.map((section: any) => ({
            ...section,
            fields: section.fields.map((field: any) => {
              if (field.id === "isicCode") {
                return { ...field, options: isicCodeOptions };
              }
              return field;
            }),
          })),
        }));

        // Optional: Reset ISICCode field value when section changes
        setFormData((prev: Record<string, any>) => ({
          ...prev,
          isicCode: "",
        }));
      } catch (error) {
        console.error("Failed to fetch ISIC Codes:", error);
      }
    };

    fetchISICCodes();
  }, [formState?.isicSection]);
};
