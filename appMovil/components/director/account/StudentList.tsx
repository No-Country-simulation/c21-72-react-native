import { View, Text, FlatList, RefreshControl, StyleSheet, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Student } from '@/domain/entities/student';
import { useForm } from 'react-hook-form';
import { MyIcon } from '@/components/ui/MyIcon';
import { ButtonLogin } from '@/components/ui/Button';
import { createStudent } from '@/actions/Director';
import { createAccountPendient } from '@/actions/Director/create-account-pendient';


interface  Props {
  students?: Student[];
  fetchNextPage?: () => void;
}

export const StudentList = ({students, fetchNextPage}: Props)  => {
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const onPullToRefresh = async() => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 200));
    queryClient.invalidateQueries({queryKey:['students_account', 'infinite']});
    setIsRefreshing(false);
  }

  const { control, handleSubmit, formState: { errors } } = useForm<Student>();

  const mutation = useMutation({
    
    mutationFn: (data: Student) =>
        
        createAccountPendient({...data, type:"estudiante"}),
    onSuccess(data: Student){
      Alert.alert('Correcto', 'Estudiante registrado correctamente');
    }
  })

  const onSubmit = async (data: Student) => { 
    console.log(data, "data ---")

    setLoading(true);
    mutation.mutate(data, {
      onSettled: () => {
        setLoading(false);
      }
    });
  };

  return (
    <FlatList
        data={students}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
            <View style={styles.staffItem}>
                <Text style={styles.staffName}>{item.full_name}</Text>
                <Text style={styles.staffName}>{item.last_name}</Text>
                <Text style={styles.staffRole}>{item.email_address}</Text>

                <View style={styles.buttons}>
                <ButtonLogin
                    onPress={handleSubmit(data => onSubmit({ ...data, ...item }))}
                    IconComponent={<MyIcon name="checkmark-circle-outline" color="white" />}
                    text='Validar cuenta'
                    disabled={mutation.isPending}
                />
                </View>

                
            </View>
        )}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.8}
        refreshControl={
            <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onPullToRefresh} 
            />
        }
    />
  )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#3b5998',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    staffRole: {
        fontSize: 14,
        color: '#666',
    }, 
    contentContainer:{
        backgroundColor: '#0F56B3',
        position: 'absolute',
        bottom: 10,
        right: 20,
        borderRadius: 50
    },
    iconContainer: {
        width:50,
        height:50,
        justifyContent: 'center',
        alignItems:'center'
    },
    icon:{
        width:26,
        height:26
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10
    }
});