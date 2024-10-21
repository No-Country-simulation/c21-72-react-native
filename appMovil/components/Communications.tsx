import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Header from '@/components/Header';

const messagesData = [
    { id: '1', from: 'Prof. García', subject: 'Reunión de padres', date: '2023-05-01', read: true },
    { id: '2', from: 'Dirección', subject: 'Cambio de horario', date: '2023-05-03', read: false },
    { id: '3', from: 'Prof. Martínez', subject: 'Desempeño en Matemáticas', date: '2023-05-05', read: false },
];

export default function Communications({ onBack }: { onBack: () => void }) {
    return (
        <View style={styles.container}>
            <Header title="Comunicaciones" onBack={onBack} />
            <FlatList
                data={messagesData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.messageItem}>
                        <Text style={styles.from}>{item.from}</Text>
                        <Text style={[styles.subject, !item.read && styles.unread]}>{item.subject}</Text>
                        <Text style={styles.date}>{item.date}</Text>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity style={styles.newMessageButton}>
                <Text style={styles.newMessageButtonText}>Nuevo Mensaje</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    messageItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    from: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    subject: {
        fontSize: 14,
    },
    unread: {
        fontWeight: 'bold',
    },
    date: {
        fontSize: 12,
        color: '#666',
    },
    newMessageButton: {
        backgroundColor: '#3b5998',
        padding: 15,
        margin: 10,
        borderRadius: 5,
    },
    newMessageButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});