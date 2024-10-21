import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '@/components/Header';

const scheduleData = {
    'Lunes': [
        { time: '8:00 - 9:30', subject: 'Matemáticas' },
        { time: '9:45 - 11:15', subject: 'Lenguaje' },
        { time: '11:30 - 13:00', subject: 'Ciencias' },
    ],
    'Martes': [
        { time: '8:00 - 9:30', subject: 'Historia' },
        { time: '9:45 - 11:15', subject: 'Inglés' },
        { time: '11:30 - 13:00', subject: 'Educación Física' },
    ],
    // ... (agregar más días)
};

export default function Schedule({ onBack }: { onBack: () => void }) {
    return (
        <View style={styles.container}>
            <Header title="Horario" onBack={onBack} />
            <ScrollView>
                {Object.entries(scheduleData).map(([day, classes]) => (
                    <View key={day} style={styles.dayContainer}>
                        <Text style={styles.dayTitle}>{day}</Text>
                        {classes.map((classItem, index) => (
                            <View key={index} style={styles.classItem}>
                                <Text style={styles.classTime}>{classItem.time}</Text>
                                <Text style={styles.classSubject}>{classItem.subject}</Text>
                            </View>
                        ))}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    dayContainer: {
        marginBottom: 20,
    },
    dayTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: '#f0f0f0',
        padding: 10,
    },
    classItem: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    classTime: {
        width: 100,
        fontWeight: 'bold',
    },
    classSubject: {
        flex: 1,
    },
});