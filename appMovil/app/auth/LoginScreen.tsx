// import { RootStackParams } from '@/presentation/navigation/StackNavigator'
import React, { useState } from 'react'
import {View,StyleSheet, Text, TextInput, Alert } from 'react-native'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
// import { StackScreenProps } from '@react-navigation/stack';
import LogoLogin from '@/assets/images/Login.svg';

import { GradientBackground } from '@/components/Gradientbg';
import { ButtonLogin } from '@/components/ui/Button'


import { useRouter } from 'expo-router';
import { MyIcon } from '@/components/ui/MyIcon';
import {useAuthStore} from '@/presentation/store/auth/useAuthStore';
// import { API_URL, STAGE } from '@env';




// interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen = () => {
    const {login} = useAuthStore();
    const [isPosting, setIsPosting] = useState(false)

    const router = useRouter();

    const [form, setForm] = useState({
        email:'',
        password:''
    });

    const handleLogin = async () => {
        if (form.email.length === 0 || form.password.length === 0){
            return;
        }
        setIsPosting(true);

        const resp = await login(form.email,form.password)
        setIsPosting(false);
        if (resp){
            router.replace('/(tabs)');
            return;
        } 

        Alert.alert('Error', 'Usuario o contraseña incorrectos');
        
        // router.replace('HomeScreen');
    }

    const handleRegister = async () => {
       router.replace('/auth/RegisterScreen')
    }

    return (
        <GestureHandlerRootView style={styles.container}>
        <GradientBackground >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.containerLogo}>
                    <LogoLogin width={294} height={132}/>
                </View>

                <View style={{marginVertical:20}}>
                    <Text style={styles.headerTxt}>
                        Ingresar
                    </Text>
                    <Text style={styles.headerTxt}>
                        Por favor, ingrese para continuar
                    </Text>
                </View>

                <View style={styles.subView}>

                    <TextInput 
                        style={styles.nameInput} 
                        placeholder="Email"  
                        value={form.email}
                        onChangeText={(email) => setForm({...form, email})}
                    />
                    <TextInput 
                        style={styles.nameInput} 
                        placeholder="Password"  
                        value={form.password}
                        onChangeText={(password) => setForm({...form, password})}
                        secureTextEntry
                    />
        
                    <ButtonLogin 
                        onPress={handleLogin} 
                        IconComponent={<MyIcon name="arrow-forward-outline" color="white" />} 
                        text='Ingresar'
                        disabled={isPosting}
                    />

                    <View
                        style={{
                            alignItems: 'flex-end',
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}>
                        <Text>¿No tienes cuenta?</Text>
                        <Text 
                            // status="primary" 
                            // category="s1"
                            onPress={handleRegister}
                        >
                            {' '}
                            crea una{' '}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </GradientBackground>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    scrollContent: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },

    containerLogo: {
        marginTop: 45,
        marginLeft: 45,
    },

    subView: {
        flex: 1,
        backgroundColor: 'white',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        padding: 20,
    },
    headerTxt: {
        paddingLeft:40,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },

    nameInput: {
        height: 40,
        marginLeft: 20,
        marginRight:20,
        borderBottomWidth: 1,
        marginTop: 30,
    },
    
    btn: {
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    btnTxt: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    
    endView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    endTxt: {
        fontSize: 15,
        marginTop: 30,
        marginLeft: 60,
        fontWeight: 'bold',
    },
    endBtn: {
        marginRight: 80,
    },
})

export default LoginScreen