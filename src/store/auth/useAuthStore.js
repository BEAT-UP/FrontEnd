import { create } from "zustand";
import { DEFAULT_ERROR_MESSAGES, getAuthErrorMessage } from "../../core/config/errors";


export const useAuthStore = create((set, get) => ({
    // 인증 상태
    user: null,
    isAuthenticated: false,
    authLoading: true,
    error: null,

    // 로그인
    login: async (email, password) => {
        const {setAuthLoading, setError} = get();
        setAuthLoading(true);
        setError(null);

        try{
            const {authService} = await import('../../features/auth/authService');
            const result = await authService.signIn(email, password);
            set({
                user: result.user,
                isAuthenticated: true,
                authLoading: false,
                error: null,
            });
            return result;
        }catch(error){
            const errorMessage = getAuthErrorMessage(error, DEFAULT_ERROR_MESSAGES.LOGIN_FAILED);
            setError(errorMessage);
            set({authLoading: false});
            throw error;
        }
    },

    // 회원가입
    signUp: async (email, password) => {
        const {setAuthLoading, setError} = get();
        setAuthLoading(true);
        setError(null);

        try{
            const {authService} = await import('../../features/auth/authService');
            const result = await authService.signUp(email, password);
            set({
                user: result.user,
                isAuthenticated: true,
                authLoading: false,
                error: null,
            });
            return result;
        }catch(error){
            const errorMessage = getAuthErrorMessage(error, DEFAULT_ERROR_MESSAGES.SIGNUP_FAILED);
            setError(errorMessage);
            set({authLoading: false});
            throw error;
        }
    },

    // 로그아웃
    logout: async () => {
        try {
            const {authService} = await import('../../features/auth/authService');
            await authService.signOut();
            set({
                user: null,
                isAuthenticated: false,
                error: null,
            });
        } catch (error) {
            const errorMessage = getAuthErrorMessage(error, DEFAULT_ERROR_MESSAGES.LOGOUT_FAILED);
            setError(errorMessage);
            console.error('로그아웃 오류:', error);
            throw error;
        }
    },

    // 인증 상태 초기화
    setAuthState: (user, isAuthenticated) => {
        set({
            user,
            isAuthenticated,
            authLoading: false,
        });
    },

    // 헬퍼 함수들
    setAuthLoading: (loading) => set({authLoading: loading}),
    setError: (error) => set({error}),
    clearError: () => set({error: null}),
}));