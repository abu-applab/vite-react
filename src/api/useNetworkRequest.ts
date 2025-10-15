// /network/useNetworkRequest.ts
import axiosInstance from './axiosInstance';

interface NetworkRequestOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: any;
    header?: Record<string, string>;
    signal?: AbortSignal;
    responseType?: string
}

// let index = 0;

export default function useNetworkRequest() {
    const networkRequest = async (
        url: string,
        {
            method = 'GET',
            body,
            header = {},
            signal,
            responseType = "json"
        }: NetworkRequestOptions = {}
    ) => {
        console.log('body: ', body);

        try {
            const headers: Record<string, string> = {
                Accept: '*/*',
                ...header,
            };

            const config: any = {
                url,
                method,
                headers,
                responseType,
                ...(method === 'GET' ? { params: body } : { data: body }),
                ...(signal ? { signal } : {}), // Add signal to axios config
            };

            const response = await axiosInstance(config);
            const data = response.data;


            if (data?.httpStatusCode === 400) {
                // Handle 400
            } else if (data?.httpStatusCode === 401) {
                if (data?.error === 'INVALID_CREDENTIALS') {
                    // Show modal
                }
            }

            return data;
        } catch (error: any) {
            if (error.name === 'AbortError' || error.code === 'ERR_CANCELED') {
                const abortError = new Error('Request was aborted');
                (abortError as any).name = 'AbortError';
                throw abortError;
            }

            const message = error?.response?.data?.message || error.message || 'Request failed';
            const status = error?.response?.status;

            const err = new Error(message);
            (err as any).status = status;
            (err as any).data = error?.response?.data;
            throw err;
        }
    };

    return networkRequest;
}