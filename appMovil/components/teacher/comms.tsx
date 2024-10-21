import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, Modal } from 'react-native';
import Header from '@/components/Header';
import { Ionicons } from '@expo/vector-icons';

const studentsWithParents = [
    {
        id: '1',
        name: 'Juan Pérez',
        type: 'student',
        parents: [
            { id: 'p1', name: 'Ana Pérez', type: 'parent' },
            { id: 'p2', name: 'Carlos Pérez', type: 'parent' }
        ]
    },
    {
        id: '2',
        name: 'María García',
        type: 'student',
        parents: [
            { id: 'p3', name: 'Laura García', type: 'parent' }
        ]
    },
    {
        id: '3',
        name: 'Carlos Rodríguez',
        type: 'student',
        parents: [
            { id: 'p4', name: 'Elena Rodríguez', type: 'parent' },
            { id: 'p5', name: 'José Rodríguez', type: 'parent' }
        ]
    },
    {
        id: '4',
        name: 'Sofía López',
        type: 'student',
        parents: [
            { id: 'p6', name: 'Marta López', type: 'parent' },
            { id: 'p7', name: 'Roberto López', type: 'parent' }
        ]
    },
    {
        id: '5',
        name: 'Diego Martínez',
        type: 'student',
        parents: [
            { id: 'p8', name: 'Carmen Martínez', type: 'parent' }
        ]
    },
    {
        id: '6',
        name: 'Valentina Fernández',
        type: 'student',
        parents: [
            { id: 'p9', name: 'Patricia Fernández', type: 'parent' },
            { id: 'p10', name: 'Alejandro Fernández', type: 'parent' }
        ]
    },
    {
        id: '7',
        name: 'Mateo Sánchez',
        type: 'student',
        parents: [
            { id: 'p11', name: 'Isabel Sánchez', type: 'parent' },
            { id: 'p12', name: 'Miguel Sánchez', type: 'parent' }
        ]
    },
    {
        id: '8',
        name: 'Lucía Gómez',
        type: 'student',
        parents: [
            { id: 'p13', name: 'Silvia Gómez', type: 'parent' }
        ]
    },
    {
        id: '9',
        name: 'Daniel Torres',
        type: 'student',
        parents: [
            { id: 'p14', name: 'Beatriz Torres', type: 'parent' },
            { id: 'p15', name: 'Francisco Torres', type: 'parent' }
        ]
    },
    {
        id: '10',
        name: 'Emma Ruiz',
        type: 'student',
        parents: [
            { id: 'p16', name: 'Natalia Ruiz', type: 'parent' },
            { id: 'p17', name: 'Javier Ruiz', type: 'parent' }
        ]
    }
];

const CommunicationsScreen = ({ onBack }: { onBack: () => void }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const [message, setMessage] = useState('');
    const [expandedStudent, setExpandedStudent] = useState(null);

    const openMessageModal = (contact) => {
        setSelectedContact(contact);
        setModalVisible(true);
    };

    const sendMessage = () => {
        console.log(`Mensaje enviado a ${selectedContact?.name}: ${message}`);
        setModalVisible(false);
        setMessage('');
    };

    const toggleExpand = (studentId) => {
        setExpandedStudent(expandedStudent === studentId ? null : studentId);
    };

    const renderContactItem = ({ item }) => (
        <View style={styles.studentGroup}>
            <TouchableOpacity style={styles.contactItem} onPress={() => openMessageModal(item)}>
                <View style={styles.studentInfo}>
                    <Text style={styles.contactName}>{item.name}</Text>
                    <Text style={styles.contactType}>Estudiante</Text>
                </View>
                <View style={styles.parentIcons}>
                    {item.parents.map((parent, index) => (
                        <TouchableOpacity key={parent.id} onPress={() => toggleExpand(item.id)}>
                            <Ionicons name="person-circle-outline" size={24} color="#3b5998" />
                        </TouchableOpacity>
                    ))}
                </View>
            </TouchableOpacity>
            {expandedStudent === item.id && (
                <View style={styles.parentDetails}>
                    {item.parents.map((parent) => (
                        <TouchableOpacity 
                            key={parent.id} 
                            style={styles.parentItem} 
                            onPress={() => openMessageModal(parent)}
                        >
                            <Text style={styles.contactName}>{parent.name}</Text>
                            <Text style={styles.contactType}>Padre/Madre</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header 
                title="Comunicaciones" 
                onBack={onBack}
                leftComponent={
                    <TouchableOpacity onPress={onBack} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                }
            />
            <View style={styles.container}>
                <FlatList
                    data={studentsWithParents}
                    keyExtractor={(item) => item.id}
                    renderItem={renderContactItem}
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
                        <Text style={styles.modalTitle}>Nuevo mensaje para {selectedContact?.name}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Escriba su mensaje aquí"
                            multiline
                            value={message}
                            onChangeText={setMessage}
                        />
                        <TouchableOpacity style={styles.button} onPress={sendMessage}>
                            <Text style={styles.buttonText}>Enviar</Text>
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
    studentGroup: {
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    contactItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    studentInfo: {
        flex: 1,
    },
    contactName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    contactType: {
        fontSize: 14,
        color: '#666',
    },
    parentIcons: {
        flexDirection: 'row',
        marginLeft: 10,
    },
    parentIconButton: {
        marginLeft: 5,
    },
    parentDetails: {
        backgroundColor: '#f9f9f9',
    },
    parentItem: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
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
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        textAlignVertical: 'top',
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

export default CommunicationsScreen;
