import { View, Text, StyleSheet } from 'react-native'
import React, { ReactNode } from 'react'


interface CardProps {
  index?: number | string;
  children: ReactNode;
}

const Card = ({index, children}:CardProps) => {
  return (
    <View key={index} style={styles.container}>
      <View style={styles.card}>
        <View style={styles.content}>
          {/* <Text style={styles.title}>Título de la Tarjeta</Text>
          <Text style={styles.paragraph}>
            Este es un ejemplo de tarjeta en React Native sin dependencias externas.
          </Text> */}
          {children}
        </View>
      </View>
    </View>
          
  )
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },

  card: {
    width: '100%',
    borderRadius: 8,
    elevation: 3,
    backgroundColor: '#fff',
    overflow: 'hidden',
    marginBottom: 16,
  },
  
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  paragraph: {
    fontSize: 14,
    color: '#555',
  },


})
export default Card