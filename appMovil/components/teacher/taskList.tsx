import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Modal, Alert } from 'react-native';
import Header from '@/components/Header';
import { Ionicons } from '@expo/vector-icons';
import { Calendar, DateData } from 'react-native-calendars';

const initialAssignments = [
    { id: '1', title: 'Tarea de Álgebra', dueDate: '2023-06-15', notified: false },
    { id: '2', title: 'Proyecto de Geometría', dueDate: '2023-06-20', notified: true },
    // ... más tareas
];

const AssignmentsScreen = ({ onBack }: { onBack: () => void }) => {
    const [assignments, setAssignments] = useState(initialAssignments);
    const [newAssignment, setNewAssignment] = useState({ title: '', dueDate: '' });
    const [modalVisible, setModalVisible] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);

    const addAssignment = () => {
        if (newAssignment.title.trim() === '' || newAssignment.dueDate === '') {
            Alert.alert('Error', 'Por favor, ingrese un título y una fecha para la tarea');
            return;
        }
        const newId = (assignments.length + 1).toString();
        setAssignments([...assignments, { 
            id: newId, 
            title: newAssignment.title, 
            dueDate: newAssignment.dueDate,
            notified: false 
        }]);
        setNewAssignment({ title: '', dueDate: '' });
        setModalVisible(false);
    };

    const notifyParents = (assignmentId: string) => {
        setAssignments(assignments.map(assignment => 
            assignment.id === assignmentId ? { ...assignment, notified: true } : assignment
        ));
        Alert.alert('Éxito', 'Se ha notificado a los padres sobre esta tarea');
    };

    const onDateSelect = (date: DateData) => {
        setNewAssignment({...newAssignment, dueDate: date.dateString});
        setShowCalendar(false);
    };

    const renderAssignmentItem = ({ item }) => (
        <View style={styles.assignmentItem}>
            <View>
                <Text style={styles.assignmentTitle}>{item.title}</Text>
                <Text style={styles.assignmentDate}>Fecha límite: {item.dueDate}</Text>
            </View>
            {!item.notified && (
                <TouchableOpacity 
                    style={styles.notifyButton} 
                    onPress={() => notifyParents(item.id)}
                >
                    <Text style={styles.notifyButtonText}>Notificar</Text>
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header 
                title="Tareas" 
                onBack={onBack}
                leftComponent={
                    <TouchableOpacity onPress={onBack} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                }
            />
            <View style={styles.container}>
                <FlatList
                    data={assignments}
                    keyExtractor={(item) => item.id}
                    renderItem={renderAssignmentItem}
                />
                <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                    <Text style={styles.addButtonText}>Agregar Tarea</Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Nueva Tarea</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Título de la tarea"
                            value={newAssignment.title}
                            onChangeText={(text) => setNewAssignment({...newAssignment, title: text})}
                        />
                        <TouchableOpacity style={styles.dateButton} onPress={() => setShowCalendar(true)}>
                            <Text>{newAssignment.dueDate || 'Seleccionar fecha límite'}</Text>
                        </TouchableOpacity>
                        {showCalendar && (
                            <Calendar
                                onDayPress={onDateSelect}
                                markedDates={{[newAssignment.dueDate]: {selected: true, marked: true}}}
                            />
                        )}
                        <TouchableOpacity style={styles.button} onPress={addAssignment}>
                            <Text style={styles.buttonText}>Agregar Tarea</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                            <Text style={styles.buttonText}>Cancelar</Text>
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
    },
    backButton: {
        padding: 10,
    },
    assignmentItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    assignmentTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    assignmentDate: {
        fontSize: 14,
        color: '#666',
    },
    notifyButton: {
        backgroundColor: '#4CAF50',
        padding: 8,
        borderRadius: 5,
    },
    notifyButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#3b5998',
        padding: 15,
        margin: 16,
        borderRadius: 5,
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
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
        height: 40,
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    dateButton: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#3b5998',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 10,
        width: '100%',
    },
    cancelButton: {
        backgroundColor: '#999',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default AssignmentsScreen;