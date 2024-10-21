import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GradientBackground } from '@/components/Gradientbg';
import { stylesMainProfile } from './index';

const MenuItem = ({ icon, title }: { icon: string; title: string }) => (
    <TouchableOpacity style={stylesMainProfile.menuItem}>
        <View style={stylesMainProfile.iconContainer}>
            <Ionicons name={icon as any} size={24} color="#3b5998" />
        </View>
        <Text style={stylesMainProfile.menuItemText}>{title}</Text>
    </TouchableOpacity>
);

export default function DirectorScreen() {
    return (
        <GradientBackground>
            <ScrollView style={stylesMainProfile.container}>
                <View style={stylesMainProfile.header}>
                    <View>
                        <Text style={stylesMainProfile.greeting}>Bienvenido, Director</Text>
                        <Text style={stylesMainProfile.subGreeting}>Panel de Control</Text>
                    </View>
                    <View style={stylesMainProfile.profileImage} />
                </View>

                <View style={stylesMainProfile.menuGrid}>
                    <MenuItem icon="school" title="Resumen Escolar" />
                    <MenuItem icon="people" title="Personal" />
                    <MenuItem icon="stats-chart" title="Rendimiento" />
                    <MenuItem icon="cash" title="Finanzas" />
                    <MenuItem icon="calendar" title="Eventos" />
                    <MenuItem icon="settings" title="Configuración" />
                    <MenuItem icon="chatbubbles" title="Comunicaciones" />
                    <MenuItem icon="document-text" title="Informes" />
                </View>
            </ScrollView>
        </GradientBackground>
    );
}
