import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Header from '@/components/Header';

const homeworkData = [
    { id: '1', subject: 'Matemáticas', description: 'Ejercicios 1-10 pág. 45', dueDate: '2023-05-10' },
    { id: '2', subject: 'Lenguaje', description: 'Ensayo sobre "El Quijote"', dueDate: '2023-05-15' },
    { id: '3', subject: 'Ciencias', description: 'Proyecto: Ciclo del agua', dueDate: '2023-05-20' },
];

export default function Homework({ onBack }: { onBack: () => void }) {
    return (
        <View style={styles.container}>
            <Header title="Tareas" onBack={onBack} />
            <FlatList
                data={homeworkData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.homeworkItem}>
                        <Text style={styles.subject}>{item.subject}</Text>
                        <Text>{item.description}</Text>
                        <Text style={styles.dueDate}>Fecha de entrega: {item.dueDate}</Text>
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
    homeworkItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    subject: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    dueDate: {
        fontStyle: 'italic',
        color: '#666',
    },
});