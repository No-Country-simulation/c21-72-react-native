import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import Header from '@/components/Header';
import { Ionicons } from '@expo/vector-icons';

const teachersData = [
    { id: '1', name: 'Prof. García', subject: 'Matemáticas', email: 'garcia@escuela.edu' },
    { id: '2', name: 'Prof. Martínez', subject: 'Lenguaje', email: 'martinez@escuela.edu' },
    { id: '3', name: 'Prof. López', subject: 'Ciencias', email: 'lopez@escuela.edu' },
];

export default function Teachers({ onBack }: { onBack: () => void }) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <Header title="Profesores" onBack={onBack} />
            <View style={styles.container}>
                <FlatList
                    data={teachersData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.teacherItem}>
                            <View>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.subject}>{item.subject}</Text>
                                <Text>{item.email}</Text>
                            </View>
                            <TouchableOpacity style={styles.contactButton}>
                                <Ionicons name="mail" size={24} color="#3b5998" />
                            </TouchableOpacity>
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
        backgroundColor: '#3b5998', // Color de fondo para el SafeAreaView
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    teacherItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    subject: {
        fontStyle: 'italic',
        marginTop: 4,
    },
    contactButton: {
        padding: 10,
    },
});