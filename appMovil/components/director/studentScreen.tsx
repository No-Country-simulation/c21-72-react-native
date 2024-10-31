import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, ScrollView, TextInput, Alert, ActivityIndicator } from 'react-native';
import Header from '@/components/Header';
import {  useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigation, Link, useRouter } from 'expo-router';

import { useFamilyStore } from '@/presentation/store/director/useFamilyStore';
import FormInputDropdown from '../ui/Select';

import { Controller, useForm } from 'react-hook-form';
import { SkyBlueGradient } from '../ColorsGradient';
import { ButtonLogin } from '../ui/Button';
import { MyIcon } from '../ui/MyIcon';
import { Family } from '@/domain/entities/student';
import { createStudent } from '@/actions/Director';


import { DateTimePickerForm } from '../ui/RenderField';
import { Student } from '../../../api/src/student/entities/student.entity';
import Card from '../ui/Card';
import { LoaderContainer } from '../ui/Loader';

interface  Props {
  onBack: () => void;
}

const SudentScreen = ({onBack}: Props) => {
  const {family, clearFamily} = useFamilyStore()
  const [loading, setLoading] = useState(false);

  const programas = [
    {label: 'Primero', value: 'Primero'}, {label: 'Segundo', value: 'Segundo'}, {label: 'Tercero', value: 'Tercero'}
  ];

  const salones = [
    {label: 'A', value: 'A'}, {label: 'B', value: 'B'}, {label: 'C', value: 'C'}, {label: 'D', value: 'D'},{label: 'E', value: 'E'},
    {label: 'F', value: 'F'},{label: 'G', value: 'G'}
  ];

  const { control, handleSubmit, formState: { errors } } = useForm<Family>();

  const mutation = useMutation({
    
    mutationFn: (data: Family) =>
      createStudent({...data, family}),
    onSuccess(data: Student){

      Alert.alert('Correcto', 'Estudiante registrado correctamente');
      onBack();
    }
  })

  const onSubmit = async (data: Family) => { 
    console.log(data, "data--")
    if (family.length === 0) {
      Alert.alert('Error', 'Debe agregar al menos un familiar antes de continuar.');
      return; 
    }

    setLoading(true);
    mutation.mutate(data, {
      onSettled: () => {
        setLoading(false);
      }
    });
  };

  const renderFormFields = () => (
    <View>
      <Text style={styles.label}>Nombre del estudiante:</Text>
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
        <Text style={styles.error}>{errors.full_name.message}</Text>
      )}

      <Text style={styles.label}>Apellidos del estudiante:</Text>
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
      {errors.last_name && typeof errors.last_name.message === 'string' &&  (
        <Text style={styles.error}>{errors.last_name.message}</Text>
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

      <Text style={styles.label}>Año academico:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            maxLength={4}
            keyboardType='numeric'
          />
        )}
        name="academic_year"
        rules={{ required: 'Este campo es obligatorio' }}
        defaultValue={0}
      />

      
      {errors.academic_year && typeof errors.academic_year.message === 'string' &&  (
        <Text style={styles.error}>{errors.academic_year.message}</Text>
      )}

      <Text style={styles.label}>fecha de admisión</Text>
      {/* <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="date_of_admission"
        rules={{ required: 'Este campo es obligatorio' }}
        defaultValue=""
      /> */}
      <View style={{
        marginLeft: 20,
        marginRight:20,
        marginTop: 15 }}
      >
        <DateTimePickerForm control={control} />
      </View>


      {/* {errors.date_of_admission && typeof errors.date_of_admission.message === 'string' &&  (
        <Text style={styles.error}>{errors.date_of_admission.message}</Text>
      )} */}

      <Text style={styles.label}>Correo electronico</Text>
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
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'El formato del email es incorrecto'
          }
        }}
        defaultValue={undefined}
      />
      {errors.email_address && typeof errors.email_address.message === 'string' &&  (
        <Text style={styles.error}>{errors.email_address.message}</Text>
      )}

      <Text style={styles.label}>Dirección de domicilio</Text>
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
        <Text style={styles.error}>{errors.address.message}</Text>
      )}

      <Text style={styles.label}>Grado Escolar</Text>
      <View style={{
        marginLeft: 20,
        marginRight:20,
        marginTop: 15 }}
      >
        
        <FormInputDropdown
          name="grado"
          placeholder="Seleccione grado escolar"
          control={control}
          options={programas}
          rules={{required: 'Este campo es requerido'}}
        /> 
      </View>

      <Text style={styles.label}>Salón Escolar</Text>
      <View style={{
        marginLeft: 20,
        marginRight:20,
        marginTop: 15 }}
      >
        
        <FormInputDropdown
          name="salon"
          placeholder="Seleccione salón escolar "
          control={control}
          options={salones}
          rules={{required: 'Este campo es requerido'}}
        /> 
      </View>
    </View>
  );

  const renderFamilyList = () => (
    <View>
      {family.length > 0 && (
        <View>
          <Text style={styles.staffName}>Familiares</Text>
          {family.map((member, index) => (
            <View key={index} style={styles.staffItem}>
              <Card key={index}>
                <Text style={styles.staffName}>Id: {member.personId}</Text>
                <Text style={styles.staffName}>Nombre: {member.full_name}</Text>
                <Text style={styles.staffName}>Apellido: {member.last_name}</Text>
                <Text style={styles.staffName}>Email: {member.email_address}</Text>
                <Text style={styles.staffName}>Dirección: {member.address}</Text>
                <Text style={styles.staffName}>Genero: {member.male}</Text>
                <Text style={styles.staffName}>Parentesco: {member.type}</Text>
              </Card>

            </View>
          ))}
        </View>
      )}
    </View>
  );

  useEffect(() => {
    clearFamily();
}, [clearFamily]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Nuevo Estudiante"
        onBack={onBack}
      />
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <View style={styles.detailsContainer}>
          {renderFormFields()} 
          <View style={{ marginLeft: 20,
            marginRight:20,
            marginTop: 15}}
          >
            <SkyBlueGradient>
              <Link 
                href="director/student/AddFamilyMember" 
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'transparent',
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 10,
                }}
              >
                <Pressable>
                  <Text style={{color: '#fff',}}>Agregar familiar</Text>
                </Pressable>
              </Link>
            </SkyBlueGradient>
          
            {renderFamilyList()}

            <ButtonLogin
              onPress={handleSubmit(onSubmit)}
              IconComponent={<MyIcon name="arrow-forward-outline" color="white" />}
              text='Enviar'
              disabled={mutation.isPending}
            />

            {loading && (
              <LoaderContainer />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#3b5998',
  },

  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    padding: 16,
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
  
  staffItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  staffName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },

 
  
});



export default SudentScreen;


