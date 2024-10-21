import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Modal, TextInput } from 'react-native';
import Header from '@/components/Header';
import { Ionicons } from '@expo/vector-icons';

const messagesData = [
    { id: '1', from: 'Prof. García', subject: 'Reunión de padres', date: '2023-05-01', read: true },
    { id: '2', from: 'Dirección', subject: 'Cambio de horario', date: '2023-05-03', read: false },
    { id: '3', from: 'Prof. Martínez', subject: 'Desempeño en Matemáticas', date: '2023-05-05', read: false },
];

export default function Communications({ onBack, onSchedule }: { onBack: () => void, onSchedule: () => void }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [newMessage, setNewMessage] = useState({ to: '', subject: '', body: '' });

    const sendMessage = () => {
        // Aquí iría la lógica para enviar el mensaje
        console.log('Mensaje enviado:', newMessage);
        setModalVisible(false);
        setNewMessage({ to: '', subject: '', body: '' });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header 
                title="Comunicaciones" 
                onBack={onBack}
            />
            <View style={styles.container}>
                <FlatList
                    data={messagesData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.messageItem}>
                            <Text style={styles.from}>{item.from}</Text>
                            <Text style={[styles.subject, !item.read && styles.unread]}>{item.subject}</Text>
                            <Text style={styles.date}>{item.date}</Text>
                        </TouchableOpacity>
                    )}
                />
                <TouchableOpacity style={styles.newMessageButton} onPress={() => setModalVisible(true)}>
                    <Text style={styles.newMessageButtonText}>Nuevo Mensaje</Text>
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
                        <Text style={styles.modalTitle}>Nuevo Mensaje</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => setNewMessage({...newMessage, to: text})}
                            value={newMessage.to}
                            placeholder="Para"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => setNewMessage({...newMessage, subject: text})}
                            value={newMessage.subject}
                            placeholder="Asunto"
                        />
                        <TextInput
                            style={[styles.input, styles.bodyInput]}
                            onChangeText={(text) => setNewMessage({...newMessage, body: text})}
                            value={newMessage.body}
                            placeholder="Mensaje"
                            multiline
                        />
                        <TouchableOpacity style={styles.button} onPress={sendMessage}>
                            <Text style={styles.buttonText}>Enviar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                            <Text style={styles.buttonText}>Cancelar</Text>
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
    messageItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    from: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    subject: {
        fontSize: 14,
    },
    unread: {
        fontWeight: 'bold',
    },
    date: {
        fontSize: 12,
        color: '#666',
    },
    newMessageButton: {
        backgroundColor: '#3b5998',
        padding: 15,
        margin: 16,
        borderRadius: 5,
    },
    newMessageButtonText: {
        color: '#fff',
        textAlign: 'center',
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
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },
    bodyInput: {
        height: 100,
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
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});