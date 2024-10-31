import { View, Text, SafeAreaView, TextInput, StyleSheet, Pressable, Alert } from "react-native";

import Header from '@/components/Header';

import React, { useState } from 'react';
import {useLocalSearchParams, useRouter } from "expo-router";
import { useFamilyStore } from "@/presentation/store/director/useFamilyStore";
import { ButtonLogin } from "@/components/ui/Button";
import { SkyBlueGradient } from "@/components/ColorsGradient";
import { Controller, useForm } from "react-hook-form";
import { RadioButton } from "@/components/ui/Radio";
import FormInputDropdown from "@/components/ui/Select";

export default function AddFamilyMember() {
    const router = useRouter();
    const {addFamily} = useFamilyStore();
    const { control, handleSubmit, formState: { errors } } = useForm();

    const typeFamily = [
      {value: 'Padre', key: 'Padre'}, 
      {value: 'Madre', key: 'Madre'},
      {value: 'Abuelo', key: 'Abuelo'},
      {value: 'Abuela', key: 'Abuela'},
      {value: 'Hermano', key: 'Hermano'},
      {value: 'Hermana', key: 'Hermana'},
    ];

    const onSubmit = (data) =>{
      const {personId, full_name, last_name, email_address, male, address, type} = data;
       
        // addFamily(idPerson, full_name, last_name, email_address, male, );
        const newFamilyMember = {
          personId: personId,
          full_name: full_name,
          last_name: last_name,
          email_address: email_address === "" ? null: email_address,
          male: male,
          address: address,
          type: type,
      };

      addFamily(newFamilyMember);
      router.back();
    }
    
    const onBack = () => {
      router.back();
    };

  return(
    <SafeAreaView style={styles.safeArea}>
      <Header
          title="Nuevo Estudiante"
          onBack={onBack}
      />
      <View style={styles.container}>
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
            />
          )}
          name="personId"
          rules={{ required: 'Este campo es obligatorio' }}
          defaultValue=""
        />
        {errors.personId && typeof errors.personId.message === 'string' &&  (
          <Text style={styles.error}>{errors.personId.message}</Text>
        )}

        <Text style={styles.label}>Nombres:</Text>
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
          name="full_name"
          rules={{ required: 'Este campo es obligatorio' }}
          defaultValue=""
        />
        {errors.full_name && typeof errors.full_name.message === 'string' &&  (
          <Text style={styles.error}>{errors.full_name.message}</Text>)}

        <Text style={styles.label}>Apellidos:</Text>
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
          name="last_name"
          rules={{ required: 'Este campo es obligatorio' }}
          defaultValue=""
        />
        { errors.last_name && typeof errors.last_name.message === 'string' &&  (
          <Text style={styles.error}>{errors.last_name.message}</Text>
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
          name="email_address"
          rules={{
            // required: 'Este campo es obligatorio',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'El formato del email es incorrecto'
            }
          }}
          defaultValue=""
        />
        {errors.email_address && typeof errors.email_address.message === 'string' &&  (
          <Text style={styles.error}>{errors.email_address.message}</Text>
        )}

        <Text style={styles.label}>Dirección domicilio:</Text>
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
          name="address"
          rules={{ required: 'Este campo es obligatorio' }}
          defaultValue=""
        />
        {errors.address && typeof errors.address.message === 'string' &&  (
          <Text style={styles.error}>{errors.address.message}</Text>)}

        <Text style={styles.label}>Género</Text>
        <Controller
          control={control}
          name="male"
          rules={{ required: 'Este campo es obligatorio' }}
          defaultValue={null}
          render={({ field: { onChange, value } }) => (
            <View style={{marginLeft: 20, marginRight:20}}>
              <RadioButton 
                value='Masculino' 
                label="Masculino" 
                selected={value === "Masculino"}
                onPress={onChange}
              />
              <RadioButton 
                value='Femenino'
                label="Femenino" 
                selected={value === "Femenino"}
                onPress={onChange} 
              />
            </View>
          )}
        />
        {errors.male && typeof errors.male.message === 'string' &&  (
          <Text style={styles.error}>{errors.male.message}</Text>
        )}


        {/* Type family */}

        <Text style={styles.label}>Parentesco</Text>
        <View style={{
          marginLeft: 20,
          marginRight:20,
          marginTop: 15 }}
        >
          
          <FormInputDropdown
            name="type"
            placeholder="Seleccione un tipo de familiar"
            control={control}
            options={typeFamily}
            rules={{required: 'Este campo es requerido'}}
          /> 
        </View>
        <View 
            style={{ marginLeft: 20,
            marginRight:20,
            marginTop: 15}}
        >
          <Pressable 
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#3b5998',
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 10,      
            }}
            onPress={handleSubmit(onSubmit)}>
            <Text style={{color: '#fff',}}>Agregar familiar</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#3b5998',
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
  error: {
    color: 'red',
    marginBottom: 10,
  },
  editButton: {
    color: '#fff',
    fontSize: 14,
  },

  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 2,
  }
})