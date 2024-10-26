import { View, Text } from 'react-native'
import React, { PropsWithChildren, useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { useAuthStore } from '../store/auth/useAuthStore';

const AuthProvider = ({children}: PropsWithChildren) => {
  const navigation = useNavigation;
  const router = useRouter()

  const {checkStatus, status} = useAuthStore()

  useEffect (() =>{
    checkStatus();
  }, [])

  useEffect(() => {
    if (status !== 'checking'){
      if(status === 'authenticated'){
        router.replace('/(tabs)')
      }
      else{
        router.replace('/auth/LoginScreen')
      }
    }
  },[status])

  return (
    <>{children}</>
  )
}

export default AuthProvider