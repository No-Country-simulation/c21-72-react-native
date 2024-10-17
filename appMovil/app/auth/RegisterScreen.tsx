import { GradientBackground } from '@/components/Gradientbg';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';
import LogoLogin from '@/assets/images/Login.svg';
import { ButtonLogin } from '@/components/ui/Button';
import { RadioButton } from '@/components/ui/Radio';

const RegisterScreen = () => {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  const handleSubmit = () => {
    console.log("submit")
  }

  const handlePress = (value: number) => {
    setSelectedValue(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <GradientBackground >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.containerLogo}>
            <LogoLogin width={294} height={132}/>
          </View>

          <View style={{marginVertical:20}}>
            <Text style={styles.headerTxt}>
                Ingrese información solicitada
            </Text>
          </View>

          <View style={styles.subView}>
            <TextInput style={styles.nameInput} placeholder="Nombres"  />
            <TextInput style={styles.nameInput} placeholder="Apellidos"  />
            <TextInput style={styles.nameInput} placeholder="Correo"  />
  
            
            <View>
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
              text='Enviar'
            />

          </View>
        </ScrollView>
      </GradientBackground>
    </SafeAreaView>
  )
};

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

export default RegisterScreen;
