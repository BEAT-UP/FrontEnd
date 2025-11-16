import { useEffect, useState } from "react";
import { 
    Alert, 
    TextInput, 
    View, 
    Text, 
    TouchableOpacity, 
    FlatList, 
    ActivityIndicator, 
    RefreshControl,
    StyleSheet
} from "react-native";
import { useAppStore } from "../store/useAppStore";
import ConcertCard from "../components/Concertcard";


const HomeScreen = ({naviagation}) => {
    const {concerts, isLoading, error, loadConcerts} = useAppStore();

    // 검색 상태
    const [searchQuery, setSearchQuery] = useState('');
    const [searchDate, setSearchDate] = useState('');

    // 초기 로드
    useEffect(() => {
        loadConcerts();
    }, []);

    // 에러 알림
    useEffect(() => {
        if(error){
            Alert.alert('오류', error);
        }
    }, [error]);

    // 검색 실행
    const handleSearch = () => {
        const params = {};
        if(searchQuery.trim()){
            params.query = searchQuery.trim();
        }
        if(searchDate.trim()){
            params.date = searchDate.trim();
        }
        loadConcerts(params);
    }

    // 새로고침
    const handleRefresh = () => {
        loadConcerts();
    }

    // 공연 선택(커뮤니티로 이동)
    const handleConcertPress = (concert) => {
        console.log('공연 선택: ', concert);
    };

    // 공연 카드 랜더링
    const renderConcert = ({item}) => (
        <ConcertCard concert={item} onPress={handleConcertPress}/>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>공연 목록</Text>

            {/* 검색 영역 */}
            <View style={styles.searchContainer}>
            <TextInput
                style={styles.searchInput}
                placeholder="공연명, 아티스트, 공연장 검색"
                value={searchQuery}
                onChangeText={setSearchQuery}
                returnKeyType="search"
                onSubmitEditing={handleSearch}
            />
            <TextInput
                style={styles.searchInput}
                placeholder="날짜 (YYYY-MM-DD)"
                value={searchDate}
                onChangeText={setSearchDate}
                returnKeyType="search"
                onSubmitEditing={handleSearch}
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                <Text style={styles.searchButtonText}>검색</Text>
            </TouchableOpacity>
        </View>

        {/* 공연 목록 */}
        {isLoading && concerts.length === 0 ? (
            <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#007bff" />
            <Text>공연 목록을 불러오는 중...</Text>
            </View>
        ) : (
            <FlatList
            data={concerts}
            renderItem={renderConcert}
            keyExtractor={(item) => item.id}
            refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
            }
            ListEmptyComponent={
                <View style={styles.centerContainer}>
                <Text>공연 정보가 없습니다.</Text>
                </View>
            }
            />
        )}
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  searchContainer: {
    marginBottom: 20,
    gap: 10,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  searchButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
});

export default HomeScreen;