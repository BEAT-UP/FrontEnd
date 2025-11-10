import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { formatDateTime } from "../utils/dateUtils";


const ConcertCard = ({ concert, onPress}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => onPress(concert)}>
            <View style={styles.content}>
                <Text style={styles.name} numberOfLines={2}>
                    {concert.name || '제목없음'}
                </Text>

                <Text style={styles.venue} numberOfLines={1}>
                    {concert.venue || '장소 미정'}
                </Text>

                <Text style={styles.startAt}>
                    {formatDateTime(concert.startAt)}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    content: {
        gap: 8,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    venue: {
        fontSize: 14,
        color: '#666',
    },
    startAt: {
        fontSize: 13,
        color: '#888',
    },
});

export default ConcertCard;