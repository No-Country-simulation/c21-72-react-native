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

export default function ParentScreen() {
    return (
        <GradientBackground>
            <ScrollView style={stylesMainProfile.container}>
                <View style={stylesMainProfile.header}>
                    <View>
                        <Text style={stylesMainProfile.greeting}>Bienvenidos, Familia García</Text>
                        <Text style={stylesMainProfile.subGreeting}>Padre/Madre de Ana García</Text>
                    </View>
                    <View style={stylesMainProfile.profileImage} />
                </View>

                <View style={stylesMainProfile.menuGrid}>
                    <MenuItem icon="school" title="Progreso Académico" />
                    <MenuItem icon="calendar" title="Asistencia" />
                    <MenuItem icon="document-text" title="Tareas" />
                    <MenuItem icon="cash" title="Pagos" />
                    <MenuItem icon="chatbubbles" title="Comunicaciones" />
                    <MenuItem icon="calendar" title="Eventos" />
                    <MenuItem icon="time" title="Horario" />
                    <MenuItem icon="people" title="Profesores" />
                </View>
            </ScrollView>
        </GradientBackground>
    );
}
