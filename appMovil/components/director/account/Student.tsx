import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useInfiniteQuery } from '@tanstack/react-query';
import { getStudentAccountByPage } from '@/actions/Director/get-account-pendient';
import Loader from '@/app/(tabs)/Loader';
import { StudentList } from './StudentList';

const Family = () => {
  const {isLoading, data, fetchNextPage, hasNextPage} = useInfiniteQuery({
    queryKey: ['students_account', 'infinite'],
    staleTime: 1000 * 60 * 60, // 1 hour
    initialPageParam: 0,

    queryFn: async (params) => {
      console.log(params, "paramsssss")
      const students = await getStudentAccountByPage(params.pageParam)
      return students;
    },
        
    getNextPageParam: (lastPage, allPages) => allPages.length
  });
  
  return (
    <View>
      {isLoading ? (
        <Loader />
      ):(
        <StudentList
          students={data?.pages.flat() ?? []}
          fetchNextPage={fetchNextPage} 
        />
      )}
    </View>
  )
}

export default Family

const styles = StyleSheet.create({})