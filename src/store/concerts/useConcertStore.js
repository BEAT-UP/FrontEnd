import { create } from 'zustand';

export const useConcertStore = create((set, get) => ({
    // 선택된 공연 정보
    selectedConcert: null,
    setSelectedConcert: (concert) => {
        console.log('공연 선택됨:', concert.name);
        set({selectedConcert: concert});
    },

    // 공연 목록
    concerts: [],

    // 로딩 상태
    isLoading: false,

    // 에러 상태
    error: null,

    // 공연 목록 불러오기
    loadConcerts: async (params = {}) => {
        const {setLoading, setError, setConcerts} = get();
        setLoading(true);
        setError(null);

        try{
            const {concertService} = await import('../../features/concerts/services/concertService');
            const concerts = await concertService.getConcerts(params);
            setConcerts(concerts);
        }catch(error){
            setError(error.message || '공연 목록을 불러오는데 실패했습니다.');
        }finally{
            setLoading(false);
        }
    },

    // 헬퍼 함수들
    setLoading: (loading) => set({isLoading: loading}),
    setError: (error) => set({error}),
    setConcerts: (concerts) => set({ concerts }),
}));