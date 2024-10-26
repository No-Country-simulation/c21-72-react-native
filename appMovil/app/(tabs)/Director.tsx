import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GradientBackground } from '@/components/Gradientbg';
import { stylesMainProfile } from './index';
import SchoolSummaryScreen from '@/components/director/Schoolsummary';
import StaffScreen from '@/components/director/staffScreen';
import PerformanceScreen from '@/components/director/Performance';
import FinancesScreen from '@/components/director/financesScreens';
import EventsScreen from '@/components/director/events';
import SettingsScreen from '@/components/director/settings';
import CommunicationsScreen from '@/components/director/comms';
import ReportsScreen from '@/components/director/reports';

const MenuItem = ({ icon, title, onPress }: { icon: string; title: string; onPress: () => void }) => (
    <TouchableOpacity style={stylesMainProfile.menuItem} onPress={onPress}>
        <View style={stylesMainProfile.iconContainer}>
            <Ionicons name={icon as any} size={24} color="#3b5998" />
        </View>
        <Text style={stylesMainProfile.menuItemText}>{title}</Text>
    </TouchableOpacity>
);

export default function DirectorScreen() {
    const [currentScreen, setCurrentScreen] = useState('Home');

    const renderScreen = () => {
        switch (currentScreen) {
            case 'SchoolSummary':
                return <SchoolSummaryScreen onBack={() => setCurrentScreen('Home')} />;
            case 'Staff':
                return <StaffScreen  onBack={() => setCurrentScreen('Home')} />;
            case 'Performance':
                return <PerformanceScreen onBack={() => setCurrentScreen('Home')} />;
            case 'Finances':
                return <FinancesScreen onBack={() => setCurrentScreen('Home')} />;
            case 'Events':
                return <EventsScreen onBack={() => setCurrentScreen('Home')} />;
            case 'Settings':
                return <SettingsScreen onBack={() => setCurrentScreen('Home')} />;
            case 'Communications':
                return <CommunicationsScreen onBack={() => setCurrentScreen('Home')} />;
            case 'Reports':
                return <ReportsScreen onBack={() => setCurrentScreen('Home')} />;
            default:
                return (
                    <ScrollView style={stylesMainProfile.container}>
                        <View style={stylesMainProfile.header}>
                            <View>
                                <Text style={stylesMainProfile.greeting}>Bienvenido, Director</Text>
                                <Text style={stylesMainProfile.subGreeting}>Panel de Control</Text>
                            </View>
                            <View style={stylesMainProfile.profileImage} />
                        </View>
                        <View style={stylesMainProfile.menuGrid}>
                            <MenuItem icon="people" title="Personal" onPress={() => setCurrentScreen('Staff')} />
                            <MenuItem icon="stats-chart" title="Rendimiento" onPress={() => setCurrentScreen('Performance')} />
                            <MenuItem icon="calendar" title="Eventos" onPress={() => setCurrentScreen('Events')} />
                            <MenuItem icon="chatbubbles" title="Comunicaciones" onPress={() => setCurrentScreen('Communications')} />
                            <MenuItem icon="document-text" title="Informes" onPress={() => setCurrentScreen('Reports')} />
                        </View>
                    </ScrollView>
                );
        }
    };

    return (
        <GradientBackground>
            {renderScreen()}
        </GradientBackground>
    );
}