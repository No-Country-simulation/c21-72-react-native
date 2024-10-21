import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Header from '@/components/Header';

const SchoolSummaryScreen = ({ onBack }: { onBack: () => void }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <Header
                title="Resumen Escolar"
                onBack={onBack}
            />
            <View style={styles.container}>
                <Text>Aquí va el contenido del resumen escolar</Text>
                {/* Añade más componentes según sea necesario */}
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
        padding: 16,
        backgroundColor: '#fff',
    },
});

export default SchoolSummaryScreen;