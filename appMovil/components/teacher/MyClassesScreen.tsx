import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, StyleSheet, Modal } from 'react-native';
import Header from '@/components/Header';
import { Ionicons } from '@expo/vector-icons';

const MyClassesScreen = ({ onBack, onSchedule }: { onBack: () => void, onSchedule: () => void }) => {
    const [selectedClass, setSelectedClass] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const classes = [
        { id: '1', name: 'Matemáticas 101', grade: '10°A', students: [
            { id: '101', name: 'Juan Pérez' },
            { id: '102', name: 'María García' },
            { id: '103', name: 'Carlos López' },
        ]},
        { id: '2', name: 'Álgebra Avanzada', grade: '11°B', students: [
            { id: '201', name: 'Ana Martínez' },
            { id: '202', name: 'Pedro Sánchez' },
            { id: '203', name: 'Laura Rodríguez' },
        ]},
        { id: '3', name: 'Geometría', grade: '9°C', students: [
            { id: '301', name: 'Diego Fernández' },
            { id: '302', name: 'Sofía Ruiz' },
            { id: '303', name: 'Javier Torres' },
        ]},
        { id: '4', name: 'Cálculo', grade: '12°A', students: [
            { id: '401', name: 'Elena Gómez' },
            { id: '402', name: 'Roberto Díaz' },
            { id: '403', name: 'Isabel Moreno' },
        ]},
    ];

    const showClassDetails = (classItem) => {
        setSelectedClass(classItem);
        setModalVisible(true);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header title="Mis Clases" onBack={onBack} />
            <View style={styles.container}>
                <FlatList
                    data={classes}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.classItem}>
                            <View>
                                <Text style={styles.className}>{item.name}</Text>
                                <Text style={styles.classGrade}>{item.grade}</Text>
                            </View>
                            <TouchableOpacity 
                                style={styles.detailsButton}
                                onPress={() => showClassDetails(item)}
                            >
                                <Text style={styles.detailsButtonText}>Ver detalles</Text>
                            </TouchableOpacity>
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
                        <Text style={styles.modalTitle}>{selectedClass?.name} - {selectedClass?.grade}</Text>
                        <Text style={styles.modalSubtitle}>Alumnos:</Text>
                        <FlatList
                            data={selectedClass?.students}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <Text style={styles.studentItem}>{item.id} - {item.name}</Text>
                            )}
                        />
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    classItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    className: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    classGrade: {
        fontSize: 14,
        color: '#666',
    },
    detailsButton: {
        backgroundColor: '#3b5998',
        padding: 8,
        borderRadius: 5,
    },
    detailsButtonText: {
        color: '#fff',
        fontSize: 12,
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
    modalSubtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    studentItem: {
        fontSize: 14,
        marginBottom: 5,
    },
    closeButton: {
        backgroundColor: '#3b5998',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 15,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default MyClassesScreen;