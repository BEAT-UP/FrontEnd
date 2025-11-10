/**
 * ISO 8601 형식의 날짜를 한국어 형식으로 변환
 */
export const formatDateTime = (dateString) => {
    if(!dateString) return '날짜 미정';

    try{
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];

        return `${year}년 ${month}월 ${day}일(${dayOfWeek}) ${hours}:${minutes}`;
    }catch(error){
        return dateString; // 파싱 실패시 
    }
}

// 날짜만 추출(YYYY-MM-DD)
export const formatDate = (dateString) => {
    if(!dateString) return '';
    try{
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }catch(error){
        return '';
    }
}