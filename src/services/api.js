import axios from 'axios';


const API_BASE_URL = 'http://10.0.2.2:8080';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type' : 'application/json',
    },
});


// 요청 인터셉터(토큰 추가 등)
api.interceptors.request.use(
    (config) => {
        // 토큰이 있으면 헤더 추가
        const token = 'token'; // 실제로는 AsyncStorage에서 가져와야 함
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터(에러 처리)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;