import axios from 'axios';

// İleride .env dosyasına taşıyabilirsin (örn: import.meta.env.VITE_API_URL)
const BASE_URL = 'http://localhost:3000';

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// İhtiyaç halinde buraya Interceptor'lar (Token ekleme, hata yakalama vb.) eklenebilir.
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data?.message || error.message);
        return Promise.reject(error);
    }
);