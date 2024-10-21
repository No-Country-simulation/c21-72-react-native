import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import Header from '@/components/Header';

const eventsData = [
    { id: '1', title: 'Feria de Ciencias', date: '2023-05-15', time: '10:00 AM', location: 'Auditorio Principal' },
    { id: '2', title: 'Día del Deporte', date: '2023-05-20', time: '9:00 AM', location: 'Campo Deportivo' },
    { id: '3', title: 'Reunión de Padres', date: '2023-05-25', time: '6:00 PM', location: 'Sala de Conferencias' },
];

export default function Events({ onBack }: { onBack: () => void }) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <Header title="Eventos" onBack={onBack} />
            <View style={styles.container}>
                <FlatList
                    data={eventsData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.eventItem}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text>Fecha: {item.date}</Text>
                            <Text>Hora: {item.time}</Text>
                            <Text>Lugar: {item.location}</Text>
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
        backgroundColor: '#3b5998', // Color de fondo para el SafeAreaView
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    eventItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
});