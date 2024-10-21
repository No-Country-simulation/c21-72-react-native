import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import Header from '@/components/Header';

const EventsScreen = ({ onBack }: { onBack: () => void }) => {
    const events = [
        { id: '1', title: 'Reunión de padres', date: '2023-07-15' },
        { id: '2', title: 'Feria de ciencias', date: '2023-08-20' },
        { id: '3', title: 'Día del deporte', date: '2023-09-10' },
        // Añade más eventos aquí
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header 
                title="Eventos" 
                onBack={onBack}
            />
            <View style={styles.container}>
                <FlatList
                    data={events}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.eventItem}>
                            <Text style={styles.eventTitle}>{item.title}</Text>
                            <Text style={styles.eventDate}>{item.date}</Text>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#3b5998',
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
    eventTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    eventDate: {
        fontSize: 14,
        color: '#666',
    },
});

export default EventsScreen;