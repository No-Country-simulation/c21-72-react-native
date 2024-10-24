import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, SafeAreaView, Dimensions, Alert, ScrollView, ImageBackground } from 'react-native';
import { GradientBackground } from '@/components/Gradientbg';
import { ButtonLogin } from '@/components/ui/Button';
import { RadioButton } from '@/components/ui/Radio';
import { MyIcon } from '@/components/ui/MyIcon';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const RegisterScreen = () => {
    const router = useRouter();
    const [selectedValue, setSelectedValue] = useState<number | null>(null);
    const [form, setForm] = useState({
        nombres: '',
        apellidos: '',
        correo: '',
    });

    const handleSubmit = () => {
        if (!form.nombres || !form.apellidos || !form.correo || !selectedValue) {
            Alert.alert('Error', 'Por favor, complete todos los campos');
            return;
        }

        Alert.alert(
            'Cuenta creada',
            'Se ha enviado un correo de verificación a su dirección de email. Por favor, verifique su cuenta.',
            [
                {
                    text: 'OK',
                    onPress: () => {
                        console.log('OK Pressed');
                        router.replace('/auth/LoginScreen');
                    }
                }
            ],
            { cancelable: false }
        );
    }

    const handlePress = (value: number) => {
        setSelectedValue(value);
    };

    return (
        <SafeAreaView style={styles.container}>
            <GradientBackground>
                <ImageBackground 
                    source={require('@/assets/images/star_pattern.png')} 
                    style={styles.backgroundImage}
                    resizeMode="cover"
                >
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <View style={styles.contentContainer}>
                            <View style={styles.containerLogo}>
                                <Image
                                    source={require('@/assets/images/Login.png')}
                                    style={styles.logo}
                                />
                            </View>

                            <View style={styles.headerContainer}>
                                <Text style={styles.headerTxt}>
                                    Ingrese información solicitada
                                </Text>
                            </View>

                            <View style={styles.subView}>
                                <TextInput 
                                    style={styles.input} 
                                    placeholder="Nombres" 
                                    value={form.nombres}
                                    onChangeText={(text) => setForm({...form, nombres: text})}
                                />
                                <TextInput 
                                    style={styles.input} 
                                    placeholder="Apellidos" 
                                    value={form.apellidos}
                                    onChangeText={(text) => setForm({...form, apellidos: text})}
                                />
                                <TextInput 
                                    style={styles.input} 
                                    placeholder="Correo" 
                                    value={form.correo}
                                    onChangeText={(text) => setForm({...form, correo: text})}
                                    keyboardType="email-address"
                                />

                                <View style={styles.radioContainer}>
                                    <RadioButton
                                        value={1}
                                        label="Padre"
                                        selected={selectedValue === 1}
                                        onPress={handlePress}
                                    />
                                    <RadioButton
                                        value={2}
                                        label="Estudiante"
                                        selected={selectedValue === 2}
                                        onPress={handlePress}
                                    />
                                </View>

                                <ButtonLogin
                                    onPress={handleSubmit}
                                    text='Crear cuenta'
                                    IconComponent={<MyIcon name="checkmark-circle-outline" color="white" />}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </GradientBackground>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    contentContainer: {
        paddingVertical: height * 0.05,
    },
    containerLogo: {
        alignItems: 'center',
        marginBottom: height * 0.03,
    },
    logo: {
        width: width * 0.3,
        height: width * 0.3,
        resizeMode: 'contain',
    },
    headerContainer: {
        marginBottom: height * 0.03,
        alignItems: 'center',
    },
    headerTxt: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    subView: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 20,
        padding: width * 0.05,
        marginHorizontal: width * 0.05,
    },
    input: {
        height: height * 0.06,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: height * 0.02,
        fontSize: width * 0.04,
    },
    radioContainer: {
        marginVertical: height * 0.02,
    },
})

export default RegisterScreen;