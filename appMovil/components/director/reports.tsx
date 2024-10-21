import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import Header from '@/components/Header';

const ReportsScreen = ({ onBack }: { onBack: () => void }) => {
    const reports = [
        { id: '1', title: 'Informe de Rendimiento Académico', date: '2023-06-30' },
        { id: '2', title: 'Informe Financiero Trimestral', date: '2023-06-15' },
        { id: '3', title: 'Informe de Asistencia', date: '2023-07-01' },
        // Añade más informes aquí
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header 
                title="Informes" 
                onBack={onBack}
            />
            <View style={styles.container}>
                <FlatList
                    data={reports}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.reportItem}>
                            <Text style={styles.reportTitle}>{item.title}</Text>
                            <Text style={styles.reportDate}>{item.date}</Text>
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
    reportItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    reportTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    reportDate: {
        fontSize: 14,
        color: '#666',
    },
});

export default ReportsScreen;