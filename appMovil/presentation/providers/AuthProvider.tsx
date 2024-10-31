import { View, Text } from 'react-native'
import React, { PropsWithChildren, useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Role, useAuthStore } from '../store/auth/useAuthStore';

const AuthProvider = ({children}: PropsWithChildren) => {
  const navigation = useNavigation;
  const router = useRouter()

  const {checkStatus, status, rol} = useAuthStore()

  useEffect (() =>{
    checkStatus();
  }, [])

  useEffect(() => {
    if (status !== 'checking'){
      if(status === 'authenticated'){
        // router.replace('/(tabs)')

        switch (rol) {
          case Role.DIRECTOR:
            router.replace('/(tabs)/Director');
            break;
          case Role.STUDENT:
            router.replace('/');
            break;
          case Role.TEACHER:
            router.replace('/(tabs)/teacher');
            break;
          case Role.PARENT:
            router.replace('/(tabs)/Parents');
            break;
          default:
            router.replace('/splash');
        }
      }
      else{
        router.replace('/splash')
      }
    }
  },[status])

  return (
    <>{children}</>
  )
}

export default AuthProvider