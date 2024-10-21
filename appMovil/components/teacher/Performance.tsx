import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Header from '@/components/Header';
import { Ionicons } from '@expo/vector-icons';

const classPerformance = [
    { id: '1', className: 'Matemáticas 101', averageGrade: 8.5, students: 30 },
    { id: '2', className: 'Álgebra Avanzada', averageGrade: 7.8, students: 25 },
    { id: '3', className: 'Geometría', averageGrade: 8.2, students: 28 },
    { id: '4', className: 'Cálculo', averageGrade: 7.5, students: 22 },
    { id: '5', className: 'Estadística', averageGrade: 8.0, students: 26 },
    // ... más clases
];

const PerformanceScreen = ({ onBack }: { onBack: () => void }) => {
    const [expandedClass, setExpandedClass] = useState(null);

    const toggleExpand = (classId) => {
        setExpandedClass(expandedClass === classId ? null : classId);
    };

    const renderClassItem = ({ item }) => (
        <TouchableOpacity style={styles.classItem} onPress={() => toggleExpand(item.id)}>
            <View style={styles.classHeader}>
                <Text style={styles.className}>{item.className}</Text>
                <Text style={styles.averageGrade}>Promedio: {item.averageGrade.toFixed(1)}</Text>
            </View>
            {expandedClass === item.id && (
                <View style={styles.classDetails}>
                    <Text>Número de estudiantes: {item.students}</Text>
                    <Text>Rendimiento: {getPerformanceLabel(item.averageGrade)}</Text>
                </View>
            )}
        </TouchableOpacity>
    );

    const getPerformanceLabel = (grade) => {
        if (grade >= 9) return 'Excelente';
        if (grade >= 8) return 'Muy Bueno';
        if (grade >= 7) return 'Bueno';
        if (grade >= 6) return 'Regular';
        return 'Necesita Mejorar';
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header 
                title="Rendimiento de Clases" 
                onBack={onBack}
                leftComponent={
                    <TouchableOpacity onPress={onBack} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                }
            />
            <View style={styles.container}>
                <FlatList
                    data={classPerformance}
                    keyExtractor={(item) => item.id}
                    renderItem={renderClassItem}
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
    backButton: {
        padding: 10,
    },
    classItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    classHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    className: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    averageGrade: {
        fontSize: 14,
        color: '#666',
    },
    classDetails: {
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
});

export default PerformanceScreen;