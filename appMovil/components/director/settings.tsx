import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Switch, ScrollView } from 'react-native';
import Header from '@/components/Header';

const SettingsScreen = ({ onBack }: { onBack: () => void }) => {
    const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
    const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header 
                title="Configuración" 
                onBack={onBack}
            />
            <ScrollView style={styles.container}>
                <View style={styles.settingItem}>
                    <Text style={styles.settingLabel}>Notificaciones</Text>
                    <Switch
                        value={notificationsEnabled}
                        onValueChange={setNotificationsEnabled}
                    />
                </View>
                <View style={styles.settingItem}>
                    <Text style={styles.settingLabel}>Modo oscuro</Text>
                    <Switch
                        value={darkModeEnabled}
                        onValueChange={setDarkModeEnabled}
                    />
                </View>
                {/* Añade más opciones de configuración aquí */}
            </ScrollView>
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
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    settingLabel: {
        fontSize: 16,
    },
});

export default SettingsScreen;