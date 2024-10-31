import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'

export const LoaderContainer = () => {
  return (
    <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
    </View>
  )
}

const styles = StyleSheet.create({
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
    }
})

