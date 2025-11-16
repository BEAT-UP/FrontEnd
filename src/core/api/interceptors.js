// 요청 인터셉터
const requestInterceptor = async (config) => {
    // Firebase 토큰 가져오기
    try{
        const {authService} = await import('../../features/auth/authService');
        const token = await authService.getToken();
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
    }catch(error){
        console.error('토큰 가져오기 실패: ', error);
    }
    return config;
}

// 응답 인터셉터
const responseInterceptor = (response) => response;

const errorInterceptor = (error) => {
    console.error('API Error: ', error.response?.data || error.message);

    // 401 오류 시 로그아웃 처리
    if(error.response?.status === 401){
        console.warn('인증 오류: 토큰이 유효하지 않습니다.');
    }
    return Promise.reject(error);
};

// 인터셉터 설정 함수
export const setupInterceptors = (apiClient) => {
    apiClient.interceptors.request.use(
        requestInterceptor,
        (error) => Promise.reject(error)
    );

    apiClient.interceptors.response.use(
        responseInterceptor,
        errorInterceptor
    )
}