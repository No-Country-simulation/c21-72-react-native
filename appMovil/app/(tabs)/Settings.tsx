import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Switch, Button } from 'react-native';
import Header from '@/components/Header';

export default function Settings({ onBack }: { onBack: () => void }) {
    const [isDarkMode, setIsDarkMode] = React.useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(previousState => !previousState);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header title="Configuración" onBack={onBack} />
            <View style={styles.container}>
                <Text style={styles.text}>Opciones de Configuración</Text>
                <View style={styles.option}>
                    <Text style={styles.optionText}>Modo Oscuro</Text>
                    <Switch
                        value={isDarkMode}
                        onValueChange={toggleDarkMode}
                    />
                </View>
                <View style={styles.option}>
                    <Button
                        title="Cambiar Contraseña"
                        onPress={() => {
                            // Lógica para cambiar la contraseña
                        }}
                    />
                </View>
                {/* Agrega aquí más opciones de configuración */}
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 20,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    optionText: {
        fontSize: 16,
        color: '#fff',
        marginRight: 10,
    },
});