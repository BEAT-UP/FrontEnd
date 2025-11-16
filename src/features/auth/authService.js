import auth from '@react-native-firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";


const TOKEN_KEY = '@auth_token';

export const authService = {
    /**
     * 이메일/비밀번호로 로그인
     */
    signIn: async (email, password) => {
        try{
            const userCredential = await auth().signInWithEmailAndPassword(email, password);
            const token = await userCredential.user.getIdToken();

            // 토큰을 AsyncStorage에 저장
            await AsyncStorage.setItem(TOKEN_KEY, token);

            return{
                user: userCredential.user,
                token: token,
            };
        }catch(error){
            console.error('로그인 오류: ', error);
            throw error;
        }
    },

    /**
     * 이메일/비밀번호로 회원가입
     */
    signUp: async (email, passoword) => {
        try{
            const userCredential = await auth().createUserWithEmailAndPassword(email, passoword);
            const token = await userCredential.user.getIdToken();

            // 토큰을 AsyncStorage에 저장
            await AsyncStorage.setItem(TOKEN_KEY, token);

            return{
                user: userCredential.user,
                token: token,
            };
        }catch(error){
            console.error('회원가입 오류: ', error);
            throw error;
        }
    },

    /**
     * 로그아웃
     */
    signOut: async () => {
        try{
            await auth().signOut();
            await AsyncStorage.removeItem(TOKEN_KEY);
        }catch(error){
            console.error('로그아웃 오류: ', error);
            throw error;
        }
    },

    /**
     * 현재 Firebase 토큰 가져오기
     */
    getToken: async () => {
        try{
            const user = auth().currentUser;
            if(user){
                const token = await user.getIdToken();
                // 토큰 갱신 시 AsyncStorage에도 저장
                await AsyncStorage.setItem(TOKEN_KEY, token);
                return token;
            }

            // 저장된 토큰이 없으면 반환
            const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
            return storedToken;
        }catch(error){
            console.error('토큰 가져오기 오류:', error);
            return null;
        }
    },

    /**
     * 현재 사용자 정보 가져오기
     */
    getCurrentUser: () => {
        return auth().currentUser;
    },

    /**
     * 인증 상태 리스너 설정
     */
    onAuthStateChanged: (callback) => {
        return auth().onAuthStateChanged(callback);
    }
}