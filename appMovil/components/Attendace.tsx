import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
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
        <SafeAreaView style={styles.safeArea}>
            <Header title="Asistencia" onBack={onBack} />
            <View style={styles.container}>
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#3b5998',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    summary: {
        fontSize: 18,
        fontWeight: 'bold',
        margin: 16,
    },
    attendanceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
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