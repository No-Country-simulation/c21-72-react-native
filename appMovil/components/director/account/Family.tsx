import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPersonAccountByPage } from '@/actions/Director/get-account-pendient';
import Loader from '@/app/(tabs)/Loader';
import { FamilyList } from './FamilyList';

const Family = () => {
  const {isLoading, data, fetchNextPage, hasNextPage} = useInfiniteQuery({
    queryKey: ['persons_account', 'infinite'],
    staleTime: 1000 * 60 * 60, // 1 hour
    initialPageParam: 0,

    queryFn: async (params) => {
        console.log(params, "paramsssss")
        const persons = await getPersonAccountByPage(params.pageParam)
        return persons;
    },
        
    getNextPageParam: (lastPage, allPages) => allPages.length
  });
  
  return (
    <View>
      {isLoading ? (
            <Loader />
          ):(
            <FamilyList
              persons={data?.pages.flat() ?? []}
              fetchNextPage={fetchNextPage} 
              />
            )}
    </View>
  )
}

export default Family

const styles = StyleSheet.create({})