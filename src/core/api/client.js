import axios from "axios";
import { API_BASE_URL, API_TIMEOUT } from "../config/constants";
import { setupInterceptors } from "./interceptors";


// axios 인스턴스 생성
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 인터셉터 설정
setupInterceptors(apiClient);

export default apiClient;