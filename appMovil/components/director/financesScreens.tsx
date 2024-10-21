import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import Header from '@/components/Header';

const FinancesScreen = ({ onBack }: { onBack: () => void }) => {
    const financialData = [
        { id: '1', category: 'Ingresos', amount: 100000 },
        { id: '2', category: 'Gastos', amount: 80000 },
        { id: '3', category: 'Presupuesto', amount: 120000 },
        // Añade más datos financieros aquí
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header 
                title="Finanzas" 
                onBack={onBack}
            />
            <View style={styles.container}>
                <FlatList
                    data={financialData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.financeItem}>
                            <Text style={styles.category}>{item.category}</Text>
                            <Text style={styles.amount}>${item.amount.toLocaleString()}</Text>
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
    financeItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    category: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    amount: {
        fontSize: 16,
        color: '#3b5998',
    },
});

export default FinancesScreen;