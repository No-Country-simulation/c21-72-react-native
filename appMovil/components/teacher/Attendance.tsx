import React, { useState } from 'react';
import { View, Text, FlatList, Switch, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import Header from '@/components/Header';
import { Ionicons } from '@expo/vector-icons';

type Student = {
    id: string;
    name: string;
    present: boolean;
    justification?: string;
};

const initialStudents: Student[] = [
    { id: '1', name: 'Juan Pérez', present: true },
    { id: '2', name: 'María García', present: false },
    { id: '3', name: 'Carlos Rodríguez', present: true },
    { id: '4', name: 'Ana Martínez', present: true },
    { id: '5', name: 'Luis Sánchez', present: false },
    { id: '6', name: 'Laura Fernández', present: true },
    { id: '7', name: 'Pedro Gómez', present: false },
    { id: '8', name: 'Sofía López', present: true },
];

const AttendanceScreen = ({ onBack }: { onBack: () => void }) => {
    const [students, setStudents] = useState<Student[]>(initialStudents);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [justification, setJustification] = useState('');
    const [classDate, setClassDate] = useState(new Date().toISOString().split('T')[0]);

    const toggleAttendance = (id: string) => {
        setStudents(students.map(student => 
            student.id === id ? { ...student, present: !student.present, justification: student.present ? '' : student.justification } : student
        ));
    };

    const openJustificationModal = (student: Student) => {
        setSelectedStudent(student);
        setJustification(student.justification || '');
        setModalVisible(true);
    };

    const saveJustification = () => {
        if (selectedStudent) {
            setStudents(students.map(student => 
                student.id === selectedStudent.id ? { ...student, justification } : student
            ));
        }
        setModalVisible(false);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header 
                title="Control de Asistencia" 
                onBack={onBack}
                leftComponent={
                    <TouchableOpacity onPress={onBack} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                }
            />
            <View style={styles.container}>
                <Text style={styles.dateText}>Fecha de clase: {classDate}</Text>
                <FlatList
                    data={students}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.studentItem}>
                            <Text style={styles.studentName}>{item.name}</Text>
                            <View style={styles.attendanceControls}>
                                <Switch
                                    value={item.present}
                                    onValueChange={() => toggleAttendance(item.id)}
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={item.present ? "#f5dd4b" : "#f4f3f4"}
                                />
                                <Text style={styles.attendanceText}>{item.present ? 'Sí' : 'No'}</Text>
                                {!item.present && (
                                    <TouchableOpacity onPress={() => openJustificationModal(item)}>
                                        <Text style={styles.justifyButton}>Justificar</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    )}
                />
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Justificación de Inasistencia</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setJustification}
                            value={justification}
                            placeholder="Ingrese el motivo de la inasistencia"
                            multiline
                        />
                        <TouchableOpacity style={styles.button} onPress={saveJustification}>
                            <Text style={styles.buttonText}>Guardar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        padding: 10,
    },
    backButton: {
        padding: 10,
    },
    dateText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    studentItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    studentName: {
        fontSize: 16,
    },
    attendanceControls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    attendanceText: {
        marginLeft: 10,
    },
    justifyButton: {
        color: '#3b5998',
        marginLeft: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    input: {
        height: 100,
        width: '100%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: '#3b5998',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default AttendanceScreen;