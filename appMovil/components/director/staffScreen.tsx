import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image, RefreshControl } from 'react-native';
import Header from '@/components/Header';
import { getTeacherByPage } from '@/actions/Director/get-teacher';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { Teacher } from '@/domain/entities/teacher';
import Fab from '../ui/Fab';
import Loader from '@/app/(tabs)/Loader';
import { TeacherList } from './teacher/TeacherList';

import { useNavigation, router } from 'expo-router';
import teacherId from '../../app/director/teacher/[teacherId]';

interface  Props {
    teachers?: Teacher[];
    // fetchNextPage?: () => void;
    onBack: () => void;
}
// { onBack }: { onBack: () => void }
const StaffScreen = ({onBack}: Props) => {

    const navigation = useNavigation();

    const {isLoading, data, fetchNextPage, hasNextPage} = useInfiniteQuery({
         queryKey: ['teachers', 'infinite'],
         staleTime: 1000 * 60 * 60, // 1 hour
         initialPageParam: 0,
    
         queryFn: async (params) => {
            console.log(params, "paramsssss")
            const teachers = await getTeacherByPage(params.pageParam)
            return teachers;
        },
            
        getNextPageParam: (lastPage, allPages) => allPages.length
            // return lastPage.length ? allPages.length + 1 : undefined
            // console.log(lastPage, "last page ---", allPages, "----")
            // return allPages.length},
    });

    // const {isLoading, data: teachers = []} = useQuery({
    //    queryKey: ['teachers', 'infinite'],
    //    staleTime: 1000 * 60 * 60, // 1 hour
    //    queryFn: () => getTeacherByPage(0),
    //  });
    

    
    
    
    const staffList = [
        { id: '1', name: 'Juan Pérez', role: 'Profesor' },
        { id: '2', name: 'María García', role: 'Administradora' },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header
                title="Personal"
                onBack={onBack}
            />
            <View style={styles.container}>
                {isLoading ? (
                    <Loader />
                ):(
                    <TeacherList
                        // teachers={teachers}
                        teachers={data?.pages.flat() ?? []}
                        fetchNextPage={fetchNextPage} 
                        // fetchNextPage={hasNextPage ? fetchNextPage : undefined} 
                    />
                )}
                {/* <FlatList
                    data={data?.pages.flat() ?? []}
                    keyExtractor={(item, index) => `${item.id}-${index}`}
                    renderItem={({ item }) => (
                        <View style={styles.staffItem}>
                            <Text style={styles.staffName}>{item.first_name}</Text>
                            <Text style={styles.staffRole}>{item.email_addres}</Text>
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
                /> */}

            </View>
            {/* <View>
                <View style={styles.contentContainer}>
                    <View style={styles.iconContainer}>
                        <Image
                        source={require('../../assets/images/PlusIcon.png')}
                        style={styles.icon}
                        onProgress={() => setCurrentScreen('teacher')}
                        />

                    </View>
                </View>
            </View> */}

            <Fab
                // onPress={() => router.push({pathname: '/director/teacher/', params: {id: 'new'}})}
                onPress={() => router.push('/director/teacher/new')}
            
            />
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
    }
});



export default StaffScreen;