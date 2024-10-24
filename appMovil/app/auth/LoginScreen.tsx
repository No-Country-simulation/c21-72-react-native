import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput, Alert, Image, Dimensions, TouchableOpacity } from 'react-native'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import { GradientBackground } from '@/components/Gradientbg';
import { ButtonLogin } from '@/components/ui/Button'
import { useRouter } from 'expo-router';
import { MyIcon } from '@/components/ui/MyIcon';
import { useAuthStore } from '@/presentation/store/auth/useAuthStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export const LoginScreen = () => {
    const { login } = useAuthStore();
    const [isPosting, setIsPosting] = useState(false)
    const router = useRouter();
    const [form, setForm] = useState({ email: '', password: '' });

    const handleLogin = async () => {
        if (form.email.length === 0 || form.password.length === 0) {
            return;
        }
        setIsPosting(true);

        // Usuarios de demostración
        const demoUsers = {
            'estudiante@demo.com': { role: 'estudiante', password: '1234' },
            'padre@demo.com': { role: 'padre', password: '1234' },
            'profesor@demo.com': { role: 'profesor', password: '1234' },
            'director@demo.com': { role: 'director', password: '1234' }
        };

    const demoUser = demoUsers[form.email as keyof typeof demoUsers];

    if (demoUser && demoUser.password === form.password) {
        setIsPosting(false);
        // Guardar el rol en AsyncStorage para la demostración
        await AsyncStorage.setItem('userRole', demoUser.role);
        // Navegar a la vista correspondiente según el rol
        router.replace('/(tabs)');
    } else {
        // Si no es un usuario de demostración, intenta el login normal
        const resp = await login(form.email, form.password);
        setIsPosting(false);
        if (resp) {
            router.replace('/(tabs)');
            return;
        }
        Alert.alert('Error', 'Usuario o contraseña incorrectos');
    }
}

const handleRegister = () => {
    router.push('/auth/RegisterScreen');
}

return (
    <GestureHandlerRootView style={styles.container}>
        <GradientBackground>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.containerLogo}>
                    <Image
                        source={require('@/assets/images/Login.png')}
                        style={styles.logo}
                    />
                </View>

                <View style={styles.headerContainer}>
                    <Text style={styles.headerTxt}>Ingresar</Text>
                    <Text style={styles.subHeaderTxt}>
                        Por favor, ingrese para continuar
                    </Text>
                </View>

                <View style={styles.subView}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={form.email}
                        onChangeText={(email) => setForm({ ...form, email })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={form.password}
                        onChangeText={(password) => setForm({ ...form, password })}
                        secureTextEntry
                    />

                    <ButtonLogin
                        onPress={handleLogin}
                        IconComponent={<MyIcon name="arrow-forward-outline" color="white" />}
                        text='Ingresar'
                        disabled={isPosting}
                    />

                    <View style={styles.registerContainer}>
                        <Text style={styles.registerText}>¿No tienes cuenta?</Text>
                        <TouchableOpacity onPress={handleRegister}>
                            <Text style={styles.registerLink}>Regístrate</Text>
                        </TouchableOpacity>
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
        alignItems: 'center',
        marginTop: height * 0.05,
    },
    logo: {
        width: width * 0.8,
        height: width * 0.8,
        resizeMode: 'contain',
    },
    headerContainer: {
        marginVertical: height * 0.02,
        alignItems: 'center',
    },
    headerTxt: {
        fontSize: width * 0.06,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: height * 0.01,
    },
    subHeaderTxt: {
        fontSize: width * 0.04,
        color: '#fff',
        textAlign: 'center',
    },
    subView: {
        flex: 1,
        backgroundColor: 'white',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        padding: width * 0.05,
    },
    input: {
        height: height * 0.06,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: height * 0.02,
        fontSize: width * 0.04,
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: height * 0.02,
    },
    registerText: {
        fontSize: width * 0.035,
    },
    registerLink: {
        fontSize: width * 0.035,
        color: '#3b5998',
        fontWeight: 'bold',
        marginLeft: 5,
    },
})

export default LoginScreen