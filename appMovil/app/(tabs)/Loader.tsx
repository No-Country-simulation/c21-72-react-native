import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'

const Loader = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large"  color="#0000ff"/>
    </View>

  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
    },
    horizontal:{
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: 10
    }
})

export default Loader