import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GradientBackground } from '@/components/Gradientbg';
// Importar los componentes de las vistas
import AcademicProgress from '@/components/AcademicProgress';
import Attendance from '@/components/Attendace';
import Homework from '@/components/Homework';
import Payments from '@/components/Payments';
import Communications from '@/components/Communications';
import Events from '@/components/Events';
import Schedule from '@/components/ScheduleParents';
import Teachers from '@/components/Teachers';

const MenuItem = ({ icon, title, onPress }: { icon: string; title: string; onPress: () => void }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
        <View style={styles.iconContainer}>
            <Ionicons name={icon as any} size={24} color="#3b5998" />
        </View>
        <Text style={styles.menuItemText}>{title}</Text>
    </TouchableOpacity>
);

export default function Parents() {
    const [activeView, setActiveView] = useState<string>('home');
    const [slideAnim] = useState(new Animated.Value(0));

    const slideOut = (nextView: string) => {
        Animated.timing(slideAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setActiveView(nextView);
            slideIn();
        });
    };

    const slideIn = () => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const goBack = () => {
        slideOut('home');
    };

    const renderActiveView = () => {
        switch (activeView) {
            case 'progress':
                return <AcademicProgress onBack={goBack} />;
            case 'attendance':
                return <Attendance onBack={goBack} />;
            case 'homework':
                return <Homework onBack={goBack} />;
            case 'payments':
                return <Payments onBack={goBack} />;
            case 'communications':
                return <Communications onBack={goBack} />;
            case 'events':
                return <Events onBack={goBack} />;
            case 'schedule':
                return <Schedule onBack={goBack} />;
            case 'teachers':
                return <Teachers onBack={goBack} />;
            default:
                return renderHomeView();
        }
    };

    const renderHomeView = () => (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Bienvenidos, Familia García</Text>
                    <Text style={styles.subGreeting}>Padre/Madre de Ana García</Text>
                </View>
                <View style={styles.profileImage} />
            </View>

            <View style={styles.menuGrid}>
                <MenuItem icon="school" title="Progreso Académico" onPress={() => slideOut('progress')} />
                <MenuItem icon="calendar" title="Asistencia" onPress={() => slideOut('attendance')} />
                <MenuItem icon="document-text" title="Tareas" onPress={() => slideOut('homework')} />
                <MenuItem icon="cash" title="Pagos" onPress={() => slideOut('payments')} />
                <MenuItem icon="chatbubbles" title="Comunicaciones" onPress={() => slideOut('communications')} />
                <MenuItem icon="calendar" title="Eventos" onPress={() => slideOut('events')} />
                <MenuItem icon="time" title="Horario" onPress={() => slideOut('schedule')} />
                <MenuItem icon="people" title="Profesores" onPress={() => slideOut('teachers')} />
            </View>
        </ScrollView>
    );

    return (
        <GradientBackground>
            <Animated.View style={{
                flex: 1,
                transform: [{
                    translateX: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 300],
                    }),
                }],
            }}>
                {renderActiveView()}
            </Animated.View>
        </GradientBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 60,
        padding: 26,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    subGreeting: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'white',
    },
    menuGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    menuItem: {
        width: '48%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 16,
        alignItems: 'center',
        marginBottom: 16,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(59, 89, 152, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    menuItemText: {
        textAlign: 'center',
        color: '#333',
        fontSize: 12,
    },
});