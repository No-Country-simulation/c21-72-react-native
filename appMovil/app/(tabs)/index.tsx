import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GradientBackground } from '@/components/Gradientbg';

const MenuItem = ({ icon, title }: { icon: string; title: string }) => (
  <TouchableOpacity style={stylesMainProfile.menuItem}>
    <View style={stylesMainProfile.iconContainer}>
      <Ionicons name={icon as any} size={24} color="#3b5998" />
    </View>
    <Text style={stylesMainProfile.menuItemText}>{title}</Text>
  </TouchableOpacity>
);

export default function HomeScreen() {
  return (
    <GradientBackground>
      <ScrollView style={stylesMainProfile.container}>
        <View style={stylesMainProfile.header}>
          <View>
            <Text style={stylesMainProfile.greeting}>Hola Estudiante</Text>
            <Text style={stylesMainProfile.subGreeting}>Clase XI-B | No. de lista: 04</Text>
          </View>
          <View style={stylesMainProfile.profileImage} />
        </View>
        
        <View style={stylesMainProfile.menuGrid}>
          <MenuItem icon="calendar" title="Eventos" />
          <MenuItem icon="ribbon" title="Resultados" />
          <MenuItem icon="newspaper" title="Hoja de Datos" />
          <MenuItem icon="school" title="Asistencia" />
          <MenuItem icon="document-text" title="Tareas" />
          <MenuItem icon="people" title="Aula de Clases" />
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

export const stylesMainProfile = StyleSheet.create({
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