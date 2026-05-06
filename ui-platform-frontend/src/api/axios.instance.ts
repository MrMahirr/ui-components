import axios from 'axios';

// Backend'in çalıştığı URL ve API prefix'i
const API_BASE_URL = 'http://localhost:3000/api';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Response Interceptor: Gelen veriyi doğrudan temiz bir şekilde dönmek
// ve global API hatalarını (örneğin 500 hataları) loglamak için
apiClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);