import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { SkyBlueGradient } from '../ColorsGradient'

interface ButtonLoginProps {
    onPress?: () => void;
    IconComponent?: React.ReactNode;
    text: String;
    disabled?: boolean;
}

export const ButtonLogin = ({ onPress, IconComponent, text, disabled }: ButtonLoginProps) => {
    return (
        <View style={styles.container}>
            <SkyBlueGradient>
                <TouchableOpacity
                    style={styles.button}
                    onPress={onPress}
                    disabled={disabled}
                >
                    <Text style={styles.text}>{text}</Text>
                    {IconComponent}
                </TouchableOpacity>
            </SkyBlueGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },

    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10
    },
    forgotTex: {
        color: '#808080',
        fontSize: 14,
        textDecorationLine: 'underline'
    }

})