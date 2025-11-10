import api from "./api";


export const concertService = {
    /**
     * 공연 목록 검색
     */
    getConcerts: async (params = {}) => {
        const response = await api.get('/concerts', {params});
        return Array.isArray(response.data)
            ? response.data
            : response.data.concerts || [];
    },

    // 공연 상세 조회
    getConcertById: async (id) => {
        const response = await api.get(`/concerts/${id}`);
        return response.data;
    },
};