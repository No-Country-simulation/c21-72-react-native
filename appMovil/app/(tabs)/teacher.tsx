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

export default function TeacherScreen() {
    return (
        <GradientBackground>
            <ScrollView style={stylesMainProfile.container}>
                <View style={stylesMainProfile.header}>
                    <View>
                        <Text style={stylesMainProfile.greeting}>Bienvenido, Profesor</Text>
                        <Text style={stylesMainProfile.subGreeting}>Departamento de Matemáticas</Text>
                    </View>
                    <View style={stylesMainProfile.profileImage} />
                </View>

                <View style={stylesMainProfile.menuGrid}>
                    <MenuItem icon="people" title="Mis Clases" />
                    <MenuItem icon="calendar" title="Horario" />
                    <MenuItem icon="create" title="Calificaciones" />
                    <MenuItem icon="clipboard" title="Asistencia" />
                    <MenuItem icon="chatbubbles" title="Comunicaciones" />
                    <MenuItem icon="document-text" title="Tareas" />
                    <MenuItem icon="stats-chart" title="Rendimiento" />
                    <MenuItem icon="calendar" title="Eventos" />
                </View>
            </ScrollView>
        </GradientBackground>
    );
}
