import { API_ENDPOINTS } from "@/api/apiEndpoints";
import useNetworkRequest from "@/api/useNetworkRequest";


export const useProductConfigLoader = () => {
    const networkRequest = useNetworkRequest();
    
    const loadProductionConfig = async () => {
        const response = await networkRequest(API_ENDPOINTS.getHSCodes, {
            method: "GET",
        })
        const updatedConfig = response.data?.map((cn: any) => {
            return {
                id: cn.id,
            value: cn.descriptionEN,}
        })
        return updatedConfig ?? []
    }

    return { loadProductionConfig }
}