import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import Header from '@/components/Header';

const PerformanceScreen = ({ onBack }: { onBack: () => void }) => {
    const performanceData = [
        { id: '1', subject: 'Matemáticas', averageGrade: 8.5 },
        { id: '2', subject: 'Ciencias', averageGrade: 7.8 },
        // Añade más datos de rendimiento aquí
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header
                title="Rendimiento"
                onBack={onBack}
            />
            <View style={styles.container}>
                <FlatList
                    data={performanceData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.performanceItem}>
                            <Text style={styles.subject}>{item.subject}</Text>
                            <Text style={styles.grade}>Promedio: {item.averageGrade}</Text>
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
    performanceItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    subject: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    grade: {
        fontSize: 14,
        color: '#666',
    },
});

export default PerformanceScreen;