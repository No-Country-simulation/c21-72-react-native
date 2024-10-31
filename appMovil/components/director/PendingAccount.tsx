import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import Header from '@/components/Header';

import { useNavigation, router } from 'expo-router';
import Family from './account/Family';
import Student from './account/Student';


interface  Props {
  onBack: () => void;
}

const PeddingAccount = ({onBack}: Props) => {
  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState('Family')
 

  return (
    <SafeAreaView style={styles.safeArea}>
        <Header
          title="Cuentas pendientes"
          onBack={onBack}
        />
        <View style={styles.container}>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === "Family" && styles.activeTab]}
              onPress={() => setActiveTab('Family')}
            >
              <Text style={styles.tabText}>Familia</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, activeTab === "Students" && styles.activeTab]}
              onPress={() => setActiveTab('Students')}
            >
              <Text style={styles.tabText}>Estudiante</Text>
            </TouchableOpacity>

          </View>
          {
            activeTab ==="Family" ? (
              <Family />
            ): (
              <Student />
            )
          }

        


          {/*  */}
        </View> 
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
    },
    tabContainer:{
      flexDirection: 'row',
      marginBottom: 10,
      marginTop: 10
    },

    tab:{
      flex: 1,
      padding: 10,
      backgroundColor: '#CAD6FF',
      alignItems: 'center',
      borderRadius: 5,
      marginHorizontal: 5,
    },
    activeTab:{
      backgroundColor: '#007AFF'
    },
    tabText:{
      color: '#fff',
      fontWeight: 'bold'
    }
});



export default PeddingAccount;