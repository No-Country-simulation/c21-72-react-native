import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import Header from '@/components/Header';

const StaffScreen = ({ onBack }: { onBack: () => void }) => {
    const staffList = [
        { id: '1', name: 'Juan Pérez', role: 'Profesor' },
        { id: '2', name: 'María García', role: 'Administradora' },
        // Añade más personal aquí
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header
                title="Personal"
                onBack={onBack}
            />
            <View style={styles.container}>
                <FlatList
                    data={staffList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.staffItem}>
                            <Text style={styles.staffName}>{item.name}</Text>
                            <Text style={styles.staffRole}>{item.role}</Text>
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
    staffItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    staffName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    staffRole: {
        fontSize: 14,
        color: '#666',
    },
});

export default StaffScreen;