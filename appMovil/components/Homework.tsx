import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import Header from '@/components/Header';

const homeworkData = [
    { id: '1', subject: 'Matemáticas', description: 'Ejercicios 1-10 pág. 45', dueDate: '2023-05-10', status: 'Entregado', grade: 'Excelente' },
    { id: '2', subject: 'Lenguaje', description: 'Ensayo sobre "El Quijote"', dueDate: '2023-05-15', status: 'Pendiente', grade: '' },
    { id: '3', subject: 'Ciencias', description: 'Proyecto: Ciclo del agua', dueDate: '2023-05-20', status: 'Entregado', grade: 'Debe mejorar' },
];

const Badge = ({ text, color }: { text: string, color: string }) => (
    <View style={[styles.badge, { backgroundColor: color }]}>
        <Text style={styles.badgeText}>{text}</Text>
    </View>
);

export default function Homework({ onBack }: { onBack: () => void }) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <Header title="Tareas" onBack={onBack} />
            <View style={styles.container}>
                <FlatList
                    data={homeworkData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.homeworkItem}>
                            <View style={styles.homeworkHeader}>
                                <Text style={styles.subject}>{item.subject}</Text>
                                <Badge 
                                    text={item.status} 
                                    color={item.status === 'Entregado' ? '#4CAF50' : '#FFC107'}
                                />
                            </View>
                            <Text>{item.description}</Text>
                            <Text style={styles.dueDate}>Fecha de entrega: {item.dueDate}</Text>
                            {item.grade && (
                                <Text style={[
                                    styles.grade,
                                    item.grade === 'Excelente' ? styles.excellent : styles.needsImprovement
                                ]}>
                                    Nota: {item.grade}
                                </Text>
                            )}
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
    homeworkItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    homeworkHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    subject: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    dueDate: {
        fontStyle: 'italic',
        color: '#666',
        marginTop: 8,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    grade: {
        marginTop: 8,
        fontWeight: 'bold',
    },
    excellent: {
        color: '#4CAF50',
    },
    needsImprovement: {
        color: '#FF9800',
    },
});