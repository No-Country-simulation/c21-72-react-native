import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GradientBackground } from '@/components/Gradientbg';
import Calendar from '@/components/Calendar';
import Results from '@/components/Results';
import Header from '@/components/Header';




const MenuItem = ({ icon, title, onPress }: { icon: string; title: string; onPress: () => void }) => (
  <TouchableOpacity style={stylesMainProfile.menuItem} onPress={onPress}>
    <View style={stylesMainProfile.iconContainer}>
      <Ionicons name={icon as any} size={24} color="#3b5998" />
    </View>
    <Text style={stylesMainProfile.menuItemText}>{title}</Text>
  </TouchableOpacity>
);

export default function HomeScreen() {
  const [activeView, setActiveView] = useState<'home' | 'calendar' | 'results' | 'datasheet' | 'attendance' | 'homework' | 'classroom'>('home');
  const [slideAnim] = useState(new Animated.Value(0));

  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const slideOut = (nextView: typeof activeView) => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setActiveView(nextView);
      slideIn();
    });
  };

  const goBack = () => {
    slideOut('home');
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'calendar':
        return <Calendar onBack={goBack} />;
      case 'results':
        return <Results onBack={goBack} />;
      case 'datasheet':
        return (
          <View style={stylesMainProfile.container}>
            <Header title="Hoja de Datos" onBack={goBack} />
            <Text>Hoja de Datos (por implementar)</Text>
          </View>
        );
      case 'attendance':
        return (
          <View style={stylesMainProfile.container}>
            <Header title="Asistencia" onBack={goBack} />
            <Text>Asistencia (por implementar)</Text>
          </View>
        );
      case 'homework':
        return (
          <View style={stylesMainProfile.container}>
            <Header title="Tareas" onBack={goBack} />
            <Text>Tareas (por implementar)</Text>
          </View>
        );
      case 'classroom':
        return (
          <View style={stylesMainProfile.container}>
            <Header title="Aula de Clases" onBack={goBack} />
            <Text>Aula de Clases (por implementar)</Text>
          </View>
        );
      default:
        return renderHomeView();
    }
  };

  const renderHomeView = () => (
    <View style={stylesMainProfile.container}>
      <ScrollView>
        <View style={stylesMainProfile.header}>
          <View>
            <Text style={stylesMainProfile.greeting}>Hola Estudiante</Text>
            <Text style={stylesMainProfile.subGreeting}>Clase XI-B | No. de lista: 04</Text>
          </View>
          <View style={stylesMainProfile.profileImage} />
        </View>

        <View style={stylesMainProfile.menuGrid}>
          {/* ToDO unificar calendario y asistencia */}
          <MenuItem icon="calendar" title="Eventos" onPress={() => slideOut('calendar')} />
          <MenuItem icon="ribbon" title="Resultados" onPress={() => slideOut('results')} />
          <MenuItem icon="school" title="Asistencia" onPress={() => slideOut('attendance')} />
          <MenuItem icon="document-text" title="Tareas" onPress={() => slideOut('homework')} />
          <MenuItem icon="people" title="Aula de Clases" onPress={() => slideOut('classroom')} />
        </View>
      </ScrollView>
    </View>
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


export const stylesMainProfile = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    padding: 26,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
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