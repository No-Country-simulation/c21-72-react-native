import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Header from '@/components/Header';

const attendanceData = [
    { date: '2023-05-01', status: 'Presente' },
    { date: '2023-05-02', status: 'Presente' },
    { date: '2023-05-03', status: 'Ausente' },
    { date: '2023-05-04', status: 'Presente' },
    { date: '2023-05-05', status: 'Tardanza' },
];

export default function Attendance({ onBack }: { onBack: () => void }) {
    return (
        <View style={styles.container}>
            <Header title="Asistencia" onBack={onBack} />
            <Text style={styles.summary}>Resumen: 80% de asistencia</Text>
            <FlatList
                data={attendanceData}
                keyExtractor={(item) => item.date}
                renderItem={({ item }) => (
                    <View style={styles.attendanceItem}>
                        <Text>{item.date}</Text>
                        <Text style={[
                            styles.status,
                            item.status === 'Presente' ? styles.present :
                                item.status === 'Ausente' ? styles.absent : styles.late
                        ]}>{item.status}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    summary: {
        fontSize: 18,
        fontWeight: 'bold',
        margin: 10,
    },
    attendanceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    status: {
        fontWeight: 'bold',
    },
    present: {
        color: 'green',
    },
    absent: {
        color: 'red',
    },
    late: {
        color: 'orange',
    },
});