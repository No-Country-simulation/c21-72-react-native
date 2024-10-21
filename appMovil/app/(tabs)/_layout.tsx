import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

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
        name="Parents"
        options={{
          title: 'Padres',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'people' : 'people-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="teacher"
        options={{
          title: 'Profesor',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'school' : 'school-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Director"
        options={{
          title: 'Director',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'school' : 'school-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}