import React from 'react';
import { Redirect } from 'expo-router';
import { useAuthStore } from '@/presentation/store/auth/useAuthStore';

export default function Index() {
  const { status } = useAuthStore();

  if (status === 'authenticated') {
    return <Redirect href="/(tabs)" />;
  } else {
    return <Redirect href="/splash" />;
  }
}