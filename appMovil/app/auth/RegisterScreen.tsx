import { GradientBackground } from '@/components/Gradientbg';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, SafeAreaView, Pressable, Alert } from 'react-native';
import LogoLogin from '@/assets/images/Login.svg';
import { ButtonLogin } from '@/components/ui/Button';
import { RadioButton } from '@/components/ui/Radio';
import Header from '@/components/Header';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import FormInputDropdown from '@/components/ui/Select';
import { LoaderContainer } from '@/components/ui/Loader';
import { MyIcon } from '@/components/ui/MyIcon';
import { useMutation } from '@tanstack/react-query';
import { createAccountPendient } from '@/actions/Director/create-account-pendient';
import { Register } from '@/domain/entities/register';
import { requestAccountPendient } from '@/actions/register/request-acount-pendient';

const RegisterScreen = () => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { control, handleSubmit, formState: { errors } } = useForm();

  const handlePress = (value: string) => {
    setSelectedValue(value);
  };

  const mutation = useMutation({
    
    mutationFn: (data: Register) =>
      requestAccountPendient(data),
    onSuccess(data){
      Alert.alert('Correcto', 'La solicitud fue enviada correctamente');
    }
  })

  const onSubmit = async (data:Register) => {
    // Convertir personId a número
    const formattedData: Register = {
        ...data,
        personId: Number(data.personId) || undefined,
    };

    setLoading(true);
    mutation.mutate(formattedData, {
        onSettled: () => {
            setLoading(false);
        }
    });
};


  


  const onBack = () => {
    router.back();
  };
  return (
    <SafeAreaView style={styles.container}>
     
      <GradientBackground >
         <Header 
          title='Solicitar cuenta'
          onBack={onBack}
        />
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
            <View style={styles.container}>
              
            <Text style={styles.label}>Tipo cuenta</Text>
              <Controller
                control={control}
                name="type"
                rules={{ required: 'Este campo es obligatorio' }}
                defaultValue={null}
                render={({ field: { onChange, value } }) => (
                  <View style={{marginLeft: 20, marginRight:20}}>
                    <RadioButton 
                      value='Padre' 
                      label="Padre" 
                      selected={value === "Padre"}
                      onPress={() => {
                        onChange('Padre')
                        handlePress('Padre')
                      }}
                    />
                    <RadioButton 
                      value='Estudiante'
                      label="Estudiante" 
                      selected={value === "Estudiante"}
                      onPress={() => {
                        onChange('Estudiante')
                        handlePress('Estudiante')
                      }}
                    />
                  </View>
                )}
              />
              {errors.type && typeof errors.type.message === 'string' &&  (
                <Text style={styles.error}>{errors.type.message}</Text>
              )} 
              
              <Text style={styles.label}>Id:</Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    maxLength={13}
                    editable={selectedValue === 'Padre'}
                    
                  />
                )}
                name="personId"
                rules={{ required: selectedValue === 'Padre' ? 'Este campo es obligatorio' : false }}
                defaultValue={selectedValue === 'Estudiante' ? null : ''}
              />
              {errors.personId && typeof errors.personId.message === 'string' &&  (
                <Text style={styles.error}>{errors.personId.message}</Text>
              )}

              <Text style={styles.label}>Numero admision:</Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="admission_number"
                rules={{ required: 'Este campo es obligatorio' }}
                defaultValue=""
              />
              {errors.admission_number && typeof errors.admission_number.message === 'string' &&  (
                <Text style={styles.error}>{errors.admission_number.message}</Text>
              )}
              

              <Text style={styles.label}>Email:</Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="email"
                rules={{
                  required: 'Este campo es obligatorio',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'El formato del email es incorrecto'
                  }
                }}
                defaultValue=""
              />
              {errors.email && typeof errors.email.message === 'string' &&  (
                <Text style={styles.error}>{errors.email.message}</Text>
              )}
            </View>
            
            <ButtonLogin
              onPress={handleSubmit(onSubmit)}
              IconComponent={<MyIcon name="checkmark-circle-outline" color="white" />}
              text='Enviar'
              disabled={mutation.isPending}
            />

            {loading && (
              <LoaderContainer />
            )}

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

  label: {
    marginTop: 10,
    fontSize: 16,
    marginLeft: 20,
    marginRight:20,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    marginLeft: 20,
    marginRight:20,
    borderBottomWidth: 1,
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
  error: {
    color: 'red',
    marginBottom: 10,
  },
  endView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

})

export default RegisterScreen;