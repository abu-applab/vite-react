// /network/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("auth_txn");
        if (token && typeof token === "string") {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add response interceptor
// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response && error.response.status === 401) {
//             localStorage.clear();
//             window.location.href = "/login";
//         }
//         // Global error handling
//         return Promise.reject(error);
//     }
// );

export default axiosInstance;
