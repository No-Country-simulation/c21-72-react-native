import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Modal, TextInput } from 'react-native';
import Header from '@/components/Header';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';

const initialEvents = [
    { id: '1', title: 'Reunión de padres', date: '2023-06-25' },
    { id: '2', title: 'Feria de Ciencias', date: '2023-07-10' },
    { id: '3', title: 'Examen Final de Matemáticas', date: '2023-07-15' },
    { id: '4', title: 'Excursión al Museo', date: '2023-07-20' },
    { id: '5', title: 'Taller de Arte', date: '2023-07-25' },
    // ... más eventos
];

const EventsScreen = ({ onBack }: { onBack: () => void }) => {
    const [events, setEvents] = useState(initialEvents);
    const [modalVisible, setModalVisible] = useState(false);
    const [newEvent, setNewEvent] = useState({ title: '', date: '' });

    const addEvent = () => {
        if (newEvent.title && newEvent.date) {
            setEvents([...events, { id: String(events.length + 1), ...newEvent }]);
            setModalVisible(false);
            setNewEvent({ title: '', date: '' });
        }
    };

    const renderEventItem = ({ item }) => (
        <View style={styles.eventItem}>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text style={styles.eventDate}>Fecha: {item.date}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header 
                title="Eventos" 
                onBack={onBack}
                leftComponent={
                    <TouchableOpacity onPress={onBack} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                }
            />
            <View style={styles.container}>
                <FlatList
                    data={events}
                    keyExtractor={(item) => item.id}
                    renderItem={renderEventItem}
                />
                <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                    <Text style={styles.addButtonText}>Crear Nuevo Evento</Text>
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
                        <Text style={styles.modalTitle}>Nuevo Evento</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Título del evento"
                            value={newEvent.title}
                            onChangeText={(text) => setNewEvent({...newEvent, title: text})}
                        />
                        <Calendar
                            onDayPress={(day) => setNewEvent({...newEvent, date: day.dateString})}
                            markedDates={{[newEvent.date]: {selected: true, marked: true}}}
                        />
                        <TouchableOpacity style={styles.button} onPress={addEvent}>
                            <Text style={styles.buttonText}>Agregar Evento</Text>
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
    eventItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    eventDate: {
        fontSize: 14,
        color: '#666',
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
        borderColor: '#ccc',
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

export default EventsScreen;