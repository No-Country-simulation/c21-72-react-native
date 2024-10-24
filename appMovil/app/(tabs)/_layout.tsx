import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabLayout() {
  // Hook para obtener el esquema de color
  const colorScheme = useColorScheme();
  
  // Hook para manejar el estado del rol del usuario
  const [userRole, setUserRole] = useState<string | null>(null);

  // Hook de efecto para obtener el rol del usuario al montar el componente
  useEffect(() => {
    const getUserRole = async () => {
      const role = await AsyncStorage.getItem('userRole');
      setUserRole(role);
    };
    getUserRole();
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          title: 'Configuración',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
          ),
        }}
      />
      {userRole === 'padre' && (
        <Tabs.Screen
          name="ParentHome"
          options={{
            title: 'Inicio Padre',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'people' : 'people-outline'} color={color} />
            ),
          }}
        />
      )}
      {userRole === 'profesor' && (
        <Tabs.Screen
          name="TeacherHome"
          options={{
            title: 'Inicio Profesor',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'school' : 'school-outline'} color={color} />
            ),
          }}
        />
      )}
      {userRole === 'director' && (
        <Tabs.Screen
          name="DirectorHome"
          options={{
            title: 'Inicio Director',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'business' : 'business-outline'} color={color} />
            ),
          }}
        />
      )}
    </Tabs>
  );
}