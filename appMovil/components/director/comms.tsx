import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import Header from '@/components/Header';

const CommunicationsScreen = ({ onBack }: { onBack: () => void }) => {
    const messages = [
        { id: '1', from: 'Juan Pérez', subject: 'Reunión de profesores', date: '2023-07-10' },
        { id: '2', from: 'María García', subject: 'Informe mensual', date: '2023-07-08' },
        { id: '3', from: 'Carlos Rodríguez', subject: 'Solicitud de presupuesto', date: '2023-07-05' },
        // Añade más mensajes aquí
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header 
                title="Comunicaciones" 
                onBack={onBack}
            />
            <View style={styles.container}>
                <FlatList
                    data={messages}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.messageItem}>
                            <Text style={styles.messageFrom}>{item.from}</Text>
                            <Text style={styles.messageSubject}>{item.subject}</Text>
                            <Text style={styles.messageDate}>{item.date}</Text>
                        </TouchableOpacity>
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
    messageItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    messageFrom: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    messageSubject: {
        fontSize: 14,
        color: '#333',
    },
    messageDate: {
        fontSize: 12,
        color: '#666',
    },
});

export default CommunicationsScreen;