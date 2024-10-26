import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AuthProvider from '@/presentation/providers/AuthProvider';

SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient()

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });


  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AuthProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} /> 
            <Stack.Screen name="splash" options={{ headerShown: false }} />
            <Stack.Screen name="auth" options={{ headerShown: false }} />
            {/* <Stack.Screen name="auth/LoginScreen" options={{ headerShown: false }} />
            <Stack.Screen name="auth/RegisterScreen" options={{ headerShown: false }} /> */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="director/teacher/[teacherId]" options={{ headerShown: false }}/>
            <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
          </Stack>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>

  );
}