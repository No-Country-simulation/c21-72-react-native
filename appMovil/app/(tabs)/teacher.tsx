import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GradientBackground } from '@/components/Gradientbg';
import { stylesMainProfile } from './index';

import MyClassesScreen from '@/components/teacher/MyClassesScreen';
import ScheduleScreen from '@/components/teacher/ScheduleScreen';
import GradesScreen from '@/components/teacher/Grades';
import AttendanceScreen from '@/components/teacher/Attendance';
import CommunicationsScreen from '@/components/teacher/comms';
import AssignmentsScreen from '@/components/teacher/taskList';
import PerformanceScreen from '@/components/teacher/Performance';
import EventsScreen from '@/components/teacher/events';

const MenuItem = ({ icon, title, onPress }: { icon: string; title: string; onPress: () => void }) => (
    <TouchableOpacity style={stylesMainProfile.menuItem} onPress={onPress}>
        <View style={stylesMainProfile.iconContainer}>
            <Ionicons name={icon as any} size={24} color="#3b5998" />
        </View>
        <Text style={stylesMainProfile.menuItemText}>{title}</Text>
    </TouchableOpacity>
);

export default function TeacherScreen() {
    const [currentScreen, setCurrentScreen] = useState('Home');

    const renderScreen = () => {
        switch(currentScreen) {
            case 'MyClasses':
                return <MyClassesScreen onBack={() => setCurrentScreen('Home')} onSchedule={() => setCurrentScreen('Schedule')} />;
            case 'Schedule':
                return <ScheduleScreen onBack={() => setCurrentScreen('Home')} />;
            case 'Grades':
                return <GradesScreen onBack={() => setCurrentScreen('Home')} />;
            case 'Attendance':
                return <AttendanceScreen onBack={() => setCurrentScreen('Home')}    />;
            case 'Communications':
                return <CommunicationsScreen onBack={() => setCurrentScreen('Home')} />;
            case 'Assignments':
                return <AssignmentsScreen onBack={() => setCurrentScreen('Home')} />;
            case 'Performance':
                return <PerformanceScreen onBack={() => setCurrentScreen('Home')} />;
            case 'Events':
                return <EventsScreen onBack={() => setCurrentScreen('Home')} />;
            default:
                return renderHomeScreen();
        }
    };

    const renderHomeScreen = () => (
        <ScrollView style={stylesMainProfile.container}>
            <View style={stylesMainProfile.header}>
                <View>
                    <Text style={stylesMainProfile.greeting}>Bienvenido, Profesor</Text>
                    <Text style={stylesMainProfile.subGreeting}>Departamento de Matemáticas</Text>
                </View>
                <View style={stylesMainProfile.profileImage} />
            </View>

            <View style={stylesMainProfile.menuGrid}>
                <MenuItem icon="people" title="Mis Clases" onPress={() => setCurrentScreen('MyClasses')} />
                <MenuItem icon="calendar" title="Horario" onPress={() => setCurrentScreen('Schedule')} />
                <MenuItem icon="create" title="Calificaciones" onPress={() => setCurrentScreen('Grades')} />
                <MenuItem icon="clipboard" title="Asistencia" onPress={() => setCurrentScreen('Attendance')} />
                <MenuItem icon="chatbubbles" title="Comunicaciones" onPress={() => setCurrentScreen('Communications')} />
                <MenuItem icon="document-text" title="Tareas" onPress={() => setCurrentScreen('Assignments')} />
                <MenuItem icon="stats-chart" title="Rendimiento" onPress={() => setCurrentScreen('Performance')} />
                <MenuItem icon="calendar" title="Eventos" onPress={() => setCurrentScreen('Events')} />
            </View>
        </ScrollView>
    );

    return (
        <GradientBackground>
            {renderScreen()}
        </GradientBackground>
    );
}