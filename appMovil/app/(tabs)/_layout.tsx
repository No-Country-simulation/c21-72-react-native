import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Role, useAuthStore } from '@/presentation/store/auth/useAuthStore';
import { Button, View, StyleSheet, ViewStyle, Image } from 'react-native';
import { Text } from 'react-native-svg';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const {rol} = useAuthStore()



  return (
    <View style={{flex:1}} >

  <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>


      
      {/* STUDENT */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
        redirect={rol !== Role.STUDENT}
      />
      
      {/* Director */}
      <Tabs.Screen
        name="Director"
        options={{
          title: 'Director',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'school' : 'school-outline'} color={color} />
          ),
        }}
        redirect={rol !== Role.ADMIN}
      />
      

      {/* PARENTS */}

      <Tabs.Screen
        name="Parents"
        options={{
          title: 'Padres',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'people' : 'people-outline'} color={color} />
          ),
        }}
        redirect={rol !== Role.PARENT}
      />

      <Tabs.Screen
        name="Results"
        options={{
          title: 'Resultados',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'list' : 'list-outline'} color={color} />
          ),
        }}
        redirect={rol !== Role.PARENT}
      />

      <Tabs.Screen
        name="Calendar"
        options={{
          title: 'Calendario',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'calendar' : 'calendar-outline'} color={color} />
          ),
        }}
        redirect={rol !== Role.PARENT}

      />
      

      {/* TEACHER */}

      <Tabs.Screen
        name="teacher"
        options={{
          title: 'Profesor',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'school' : 'school-outline'} color={color} />
          ),
        }}
        redirect={rol !== Role.TEACHER}
      />

      {/* All Users */}

      <Tabs.Screen
        name="Loader"
        options={{
         href:null
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
        redirect={rol === undefined}
      />
      
      
    </Tabs>


    </View>
    
  );
}

const styles = StyleSheet.create({
  logoutContainer: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -50 }],
  },
  container:{
    flex:1,
  },
  contentContainer:{
    backgroundColor: '#0F56B3',
    position: 'absolute',
    bottom: 60,
    right: 20,
    borderRadius: 50
  },
  iconContainer: {
    width:50,
    height:50,
    justifyContent: 'center',
    alignItems:'center'
  },
  icon:{
    width:26,
    height:26
  }

});