import React from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '@/components/Header';
import { Ionicons } from '@expo/vector-icons';

const weekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

const scheduleData = {
    'Lunes': [
        { time: '08:00 - 09:30', subject: 'Matemáticas 101', grade: '10°A' },
        { time: '10:00 - 11:30', subject: 'Álgebra Avanzada', grade: '11°B' },
        { time: '13:00 - 14:30', subject: 'Geometría', grade: '9°C' },
    ],
    'Martes': [
        { time: '09:00 - 10:30', subject: 'Cálculo', grade: '12°A' },
        { time: '11:00 - 12:30', subject: 'Matemáticas 101', grade: '10°B' },
    ],
    'Miércoles': [
        { time: '08:00 - 09:30', subject: 'Álgebra Avanzada', grade: '11°A' },
        { time: '10:00 - 11:30', subject: 'Geometría', grade: '9°B' },
        { time: '13:00 - 14:30', subject: 'Cálculo', grade: '12°B' },
    ],
    'Jueves': [
        { time: '09:00 - 10:30', subject: 'Matemáticas 101', grade: '10°C' },
        { time: '11:00 - 12:30', subject: 'Álgebra Avanzada', grade: '11°C' },
    ],
    'Viernes': [
        { time: '08:00 - 09:30', subject: 'Geometría', grade: '9°A' },
        { time: '10:00 - 11:30', subject: 'Cálculo', grade: '12°C' },
        { time: '13:00 - 14:30', subject: 'Matemáticas 101', grade: '10°D' },
    ],
};

const ScheduleScreen = ({ onBack }: { onBack: () => void }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <Header 
                title="Horario Semanal" 
                onBack={onBack}
                leftComponent={
                    <TouchableOpacity onPress={onBack} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                }
            />
            <ScrollView style={styles.container}>
                {weekDays.map((day) => (
                    <View key={day} style={styles.dayContainer}>
                        <Text style={styles.dayTitle}>{day}</Text>
                        {scheduleData[day].map((class_, index) => (
                            <View key={index} style={styles.classItem}>
                                <Text style={styles.classTime}>{class_.time}</Text>
                                <View style={styles.classInfo}>
                                    <Text style={styles.classSubject}>{class_.subject}</Text>
                                    <Text style={styles.classGrade}>{class_.grade}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                ))}
            </ScrollView>
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
    dayContainer: {
        marginBottom: 20,
        padding: 10,
    },
    dayTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#3b5998',
    },
    classItem: {
        flexDirection: 'row',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    classTime: {
        width: 100,
        fontWeight: 'bold',
    },
    classInfo: {
        flex: 1,
    },
    classSubject: {
        fontWeight: 'bold',
    },
    classGrade: {
        color: '#666',
    },
});

export default ScheduleScreen;