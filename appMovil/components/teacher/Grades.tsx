import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import Header from '@/components/Header';
import { Ionicons } from '@expo/vector-icons';

const initialStudents = [
    { id: '1', name: 'Juan Pérez', grade: '' },
    { id: '2', name: 'María García', grade: '' },
    { id: '3', name: 'Carlos Rodríguez', grade: '' },
    { id: '4', name: 'Ana Martínez', grade: '' },
    // ... más estudiantes
];

const GradesScreen = ({ onBack }: { onBack: () => void }) => {
    const [students, setStudents] = useState(initialStudents);

    const updateGrade = (id: string, grade: string) => {
        setStudents(students.map(student => 
            student.id === id ? { ...student, grade } : student
        ));
    };

    const saveGrade = (id: string) => {
        const student = students.find(s => s.id === id);
        if (student) {
            // Aquí iría la lógica para guardar la calificación en el backend
            console.log(`Calificación guardada para ${student.name}: ${student.grade}`);
            Alert.alert('Éxito', `Calificación guardada para ${student.name}`);
        }
    };

    const notifyParents = (id: string) => {
        const student = students.find(s => s.id === id);
        if (student) {
            // Aquí iría la lógica para notificar a los padres
            console.log(`Notificación enviada a los padres de ${student.name}`);
            Alert.alert('Éxito', `Notificación enviada a los padres de ${student.name}`);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header 
                title="Calificaciones" 
                onBack={onBack}
                leftComponent={
                    <TouchableOpacity onPress={onBack} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                }
            />
            <View style={styles.container}>
                <FlatList
                    data={students}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.studentItem}>
                            <Text style={styles.studentName}>{item.name}</Text>
                            <View style={styles.gradeContainer}>
                                <TextInput
                                    style={styles.gradeInput}
                                    placeholder="Calificación"
                                    value={item.grade}
                                    onChangeText={(text) => updateGrade(item.id, text)}
                                    keyboardType="numeric"
                                />
                                <TouchableOpacity style={styles.button} onPress={() => saveGrade(item.id)}>
                                    <Text style={styles.buttonText}>Guardar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.button, styles.notifyButton]} onPress={() => notifyParents(item.id)}>
                                    <Text style={styles.buttonText}>Notificar Padres</Text>
                                </TouchableOpacity>
                            </View>
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
    backButton: {
        padding: 10,
    },
    studentItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    studentName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    gradeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    gradeInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 8,
        width: 80,
        marginRight: 10,
    },
    button: {
        backgroundColor: '#3b5998',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    notifyButton: {
        backgroundColor: '#4CAF50',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default GradesScreen;