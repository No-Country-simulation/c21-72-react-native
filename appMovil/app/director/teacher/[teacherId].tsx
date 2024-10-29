import { View, Text, Button, TextInput, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Teacher } from '@/domain/entities/teacher';
import { RadioButton } from '@/components/ui/Radio';
import Header from '@/components/Header';
import { Role } from '@/presentation/store/auth/useAuthStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTeacherById, updateCreateTeacher } from '@/actions/Director';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function teacherId() {
  const router = useRouter();
  const { teacherId } = useLocalSearchParams();

  const teacherIdRef = useRef(teacherId)
  const queryClient = useQueryClient();

  const { control, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const teachernId = Array.isArray(teacherIdRef.current) ? teacherIdRef.current[0] : teacherIdRef.current;

  const {data: teacher} = useQuery({
    queryKey: ['teacher', teacherIdRef.current],
    queryFn: () => getTeacherById(teachernId)
  });

  const mutation = useMutation({
    mutationFn: (data: Teacher) =>
      updateCreateTeacher({...data, id: teachernId}),
    onSuccess(data: Teacher){
      teacherIdRef.current = data.id;
      queryClient.invalidateQueries({queryKey: ['teachers', 'infinite']});
      queryClient.invalidateQueries({queryKey: ['teacher', data.id]});
      router.back();
    }
  })



  if (!teacher) {
    // return <View><Text>... cargando </Text> </View>;
    console.log("no tiene registro")
  }

  

  // const onSubmit = (data:Teacher) => {  
  //   mutation.mutate(data)
  // };

  const onSubmit = async (data: Teacher) => {  
    setLoading(true); // Iniciar loading
    mutation.mutate(data, {
      onSettled: () => {
        setLoading(false); // Terminar loading
      }
    });
  };

  const onBack = () => {
    router.back();
};

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title='Profesor'
        onBack={onBack}
      />

      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Tipo personal</Text>
          <Controller
            control={control}
            name="type"
            rules={{ required: 'Este campo es obligatorio' }}
            defaultValue={null}
            render={({ field: { onChange, value } }) => (
              <View>
                <RadioButton 
                  value={Role.TEACHER} 
                  label="Profesor" 
                  selected={value === Role.TEACHER}
                  onPress={onChange} 
                />
                <RadioButton 
                  value={Role.DIRECTOR}
                  label="Director" 
                  selected={value === Role.DIRECTOR}
                  onPress={onChange} 
                />
              </View>
            )}
          />
          {errors.type && typeof errors.type.message === 'string' && (
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
              required: 'Este campo es obligatorio',
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
              <View>
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
        

          <Button 
            title="Enviar" 
            onPress={handleSubmit(onSubmit)} 
            disabled={mutation.isPending}
          />
          {loading && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}


          {mutation.isError && <Text style={{ color: 'red' }}>Error al enviar datos.</Text>}
          {mutation.isSuccess && <Text>Datos enviados correctamente!</Text>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#3b5998',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    padding: 16,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
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
  },
});
