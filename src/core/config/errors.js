// Firebase Auth 에러 코드
export const AUTH_ERROR_CODES = {
    USER_NOT_FOUND: 'auth/user-not-found',
    WRONG_PASSWORD: 'auth/wrong-password',
    INVALID_EMAIL: 'auth/invalid-email',
    EMAIL_ALREADY_IN_USE: 'auth/email-already-in-use',
    WEAK_PASSWORD: 'auth/weak-password',
    NETWORK_ERROR: 'auth/network-request-failed',
    TOO_MANY_REQUESTS: 'auth/too-many-requests',
    USER_DISABLED: 'auth/user-disabled',
};

// 에러 코드를 사용자 메시지로 매핑
export const AUTH_ERROR_MESSAGES = {
    [AUTH_ERROR_CODES.USER_NOT_FOUND]: '존재하지 않는 사용자입니다.',
    [AUTH_ERROR_CODES.WRONG_PASSWORD]: '비밀번호가 올바르지 않습니다.',
    [AUTH_ERROR_CODES.INVALID_EMAIL]: '유효하지 않은 이메일입니다.',
    [AUTH_ERROR_CODES.EMAIL_ALREADY_IN_USE]: '이미 사용 중인 이메일입니다.',
    [AUTH_ERROR_CODES.WEAK_PASSWORD]: '비밀번호가 너무 약합니다. (최소 6자 이상)',
    [AUTH_ERROR_CODES.NETWORK_ERROR]: '네트워크 오류가 발생했습니다.',
    [AUTH_ERROR_CODES.TOO_MANY_REQUESTS]: '너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.',
    [AUTH_ERROR_CODES.USER_DISABLED]: '비활성화된 계정입니다.',
};

// 기본 에러 메시지
export const DEFAULT_ERROR_MESSAGES = {
    LOGIN_FAILED: '로그인에 실패하였습니다.',
    SIGNUP_FAILED: '회원가입에 실패했습니다.',
    LOGOUt_FAILED: '로그아웃에 실패했습니다.',
    UNKNOWN_ERROR: '알 수 없는 오류가 발생했습니다.',
}

/**
 * Firebase Auth 에러를 사용자 메시지로 변환
 * @param (Error) error -> Firebase Auth 에러 객체
 * @param (string) defaultMessage -> 기본 메시지
 * @returns (string) 에러 메시지
 */
export const getAuthErrorMessage = (error, defaultMessage = DEFAULT_ERROR_MESSAGES.UNKNOWN_ERROR) => {
    if(!error || !error.code){
        return defaultMessage;
    }

    // Firebase Auth 에러 코드 매핑
    const message = AUTH_ERROR_MESSAGES(error.code);
    if(message){
        return message;
    }

    // 매핑되지 않은 에러는 원본 메시지 또는 기본 메시지 변환
    return error.message || defaultMessage;
}