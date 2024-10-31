import { View, Text, FlatList, RefreshControl, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Person } from '@/domain/entities/person';

interface  Props {
  persons?: Person[];
  fetchNextPage?: () => void;
}

export const FamilyList = ({persons, fetchNextPage}: Props)  => {
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onPullToRefresh = async() => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 200));
    queryClient.invalidateQueries({queryKey:['persons_account', 'infinite']});
    setIsRefreshing(false);
  }

  const handleButtonPress=(person: Person) =>{
    console.log(person)
  }

  return (
    <FlatList
        data={persons}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
            <View style={styles.staffItem}>
                <Text style={styles.staffName}>{item.full_name}</Text>
                <Text style={styles.staffName}>{item.last_name}</Text>
                <Text style={styles.staffRole}>{item.email_address}</Text>

                <View style={styles.buttons}>
                  <Button
                    title='Validar cuenta'
                    onPress={() => handleButtonPress(item)} 
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