import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import Header from '@/components/Header';

const paymentsData = [
    { id: '1', concept: 'Matrícula', amount: 500, dueDate: '2023-09-01', status: 'Pendiente' },
    { id: '2', concept: 'Mensualidad Septiembre', amount: 300, dueDate: '2023-09-05', status: 'Pagado' },
    { id: '3', concept: 'Mensualidad Octubre', amount: 300, dueDate: '2023-10-05', status: 'Pendiente' },
];

export default function Payments({ onBack }: { onBack: () => void }) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <Header title="Pagos" onBack={onBack} />
            <View style={styles.container}>
                <FlatList
                    data={paymentsData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.paymentItem}>
                            <Text style={styles.concept}>{item.concept}</Text>
                            <Text>Monto: ${item.amount}</Text>
                            <Text>Fecha límite: {item.dueDate}</Text>
                            <Text style={[
                                styles.status,
                                item.status === 'Pagado' ? styles.paid : styles.pending
                            ]}>{item.status}</Text>
                            {item.status === 'Pendiente' && (
                                <TouchableOpacity style={styles.payButton}>
                                    <Text style={styles.payButtonText}>Pagar</Text>
                                </TouchableOpacity>
                            )}
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
        backgroundColor: '#3b5998',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    paymentItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    concept: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    status: {
        fontWeight: 'bold',
        marginTop: 5,
    },
    paid: {
        color: 'green',
    },
    pending: {
        color: 'red',
    },
    payButton: {
        backgroundColor: '#3b5998',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    payButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
});